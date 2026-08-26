import api from "@/api/api.js";

const quoteService = {
  async getPublicTrainingTypes() {
    const response = await api.get("/training-catalog");
    return Array.isArray(response.data)
      ? response.data.map((item) => ({
          ...item,
          displayName: customerFacingText(item.name),
          category: item.executionType,
          durationInDays: item.numberOfDays,
          basePrice: item.sellingPrice,
          maxParticipantsPerGroup: item.maximumParticipantsPerGroup,
        }))
      : [];
  },

  async getQuoteEditorTrainingTypes() {
    return this.getPublicTrainingTypes();
  },

  async create(payload) {
    const response = await api.post(
      "/offertes/admin",
      toLegacyCommand(payload),
    );
    const created = response.data;
    if (payload.travelCalculation) {
      await api.put(
        `/offertes/${created.id}`,
        toLegacyUpdateCommand(created.id, payload),
      );
    }
    let refreshed = (await api.get(`/offertes/${created.id}`)).data;
    await syncVatPercentage(refreshed, payload.vatPercentage);
    refreshed = (await api.get(`/offertes/${created.id}`)).data;
    await syncDiscounts(refreshed, payload.discounts || []);
    return { id: created.id, legacy: refreshed };
  },

  async getAllQuotes() {
    const response = await api.get("/offertes");
    return Array.isArray(response.data)
      ? response.data.map(toQuoteSummary)
      : [];
  },

  async getQuote(id) {
    const [response, momentsResponse] = await Promise.all([
      api.get(`/offertes/${id}`),
      api.get(`/offertes/${id}/invoice-moments`),
    ]);
    const discounts = (
      await Promise.all(
        response.data.quoteTrainings.map((training) =>
          api.get(`/offertes/${id}/trainings/${training.id}/discounts`),
        ),
      )
    ).flatMap((item) => item.data);
    return toQuoteDetail(response.data, discounts, momentsResponse.data);
  },

  async update(id, payload) {
    const current = (await api.get(`/offertes/${id}`)).data;
    await api.put(`/offertes/${id}`, toLegacyUpdateCommand(id, payload));
    await syncTrainings(
      id,
      current.quoteTrainings,
      payload.trainingItems,
      payload.vatPercentage,
    );
    let updated = (await api.get(`/offertes/${id}`)).data;
    await syncVatPercentage(updated, payload.vatPercentage);
    updated = (await api.get(`/offertes/${id}`)).data;
    await syncDiscounts(
      updated,
      [
        ...(payload.discounts || []),
        ...(payload.invoiceMoments || []).flatMap((moment) =>
          (moment.discounts || []).map((discount) => ({
            ...discount,
            quoteTrainingId: moment.quoteTrainingId,
            executionNumber: moment.executionNumber,
          })),
        ),
      ],
      true,
    );
    return this.getQuote(id);
  },

  async updateStatus(id, status) {
    const response = await api.patch(`/offertes/${id}/status`, {
      quoteId: id,
      targetStatus: status,
      statusNote: null,
    });
    return response.data;
  },

  async sendQuote(id) {
    const response = await api.post(`/offertes/${id}/send`);
    return response.data;
  },

  async getAcceptanceContext(token) {
    const response = await api.get("/public/quotes/acceptance", {
      params: { token },
    });
    return response.data;
  },

  async acceptQuote(token, acceptance) {
    const response = await api.post("/public/quotes/acceptance", {
      token,
      termsAccepted: true,
      authorityConfirmed: true,
      acceptedByName: acceptance.name,
      acceptedByRole: acceptance.role || null,
    });
    return response.data;
  },

  async deleteQuote(id) {
    await api.delete(`/offertes/${id}`);
  },

  async downloadPdf(id, quoteNumber) {
    let response;
    try {
      response = await api.get(`/offertes/${id}/pdf`, {
        responseType: "blob",
        timeout: 60000,
        headers: { Accept: "application/pdf, application/json" },
        suppressAuthLogout: true,
      });
    } catch (error) {
      const errorBlob = error?.response?.data;
      if (errorBlob instanceof Blob && errorBlob.type?.includes("json")) {
        try {
          const body = JSON.parse(await errorBlob.text());
          throw new Error(body.message || body.detail || error.message);
        } catch (parseError) {
          if (parseError instanceof SyntaxError) throw error;
          throw parseError;
        }
      }
      throw error;
    }

    return {
      blob: response.data,
      fileName: getFileName(
        response.headers["content-disposition"],
        quoteNumber,
      ),
    };
  },

  async submitRequest(payload) {
    const addDays = (days) => {
      const date = new Date();
      date.setDate(date.getDate() + days);
      return date.toISOString().slice(0, 10);
    };
    const selectedNames = payload.trainingSelections.map(
      (selection) =>
        payload.trainingTypes?.find(
          (item) => item.code === selection.trainingCode,
        )?.displayName || selection.trainingCode,
    );
    const contactPersonName = joinContactName(
      payload.contactFirstName,
      payload.contactLastName,
    );
    const response = await api.post("/offertes", {
      companyName: payload.organizationName || contactPersonName,
      contactPersonName,
      contactEmail: payload.email,
      contactPhone: payload.phone || null,
      street: payload.companyAtTrainingAddress
        ? payload.trainingStreet
        : payload.companyStreet,
      houseNumber: payload.companyAtTrainingAddress
        ? payload.trainingHouseNumber
        : payload.companyHouseNumber,
      postalCode: payload.companyAtTrainingAddress
        ? payload.trainingPostalCode
        : payload.companyPostalCode,
      city: payload.companyAtTrainingAddress
        ? payload.trainingCity
        : payload.companyCity,
      customerReference: null,
      quoteSubject: `Offerte ${selectedNames.join(", ")}`,
      introductionText: null,
      closingText: null,
      validUntil: addDays(14),
      trainingLocationName: payload.organizationName || contactPersonName,
      trainingLocationStreet: payload.trainingStreet,
      trainingLocationHouseNumber: payload.trainingHouseNumber,
      trainingLocationPostalCode: payload.trainingPostalCode,
      trainingLocationCity: payload.trainingCity,
      trainingLocationRoom: null,
      trainingLocationAccessInstructions: null,
      trainings: payload.trainingSelections.map((item) => ({
        ...item,
        internalNote: payload.message || null,
      })),
      captcha: payload.captcha,
      website: payload.website || null,
    });
    return response.data;
  },
};

function getFileName(contentDisposition, quoteNumber) {
  const utfMatch = contentDisposition?.match(/filename\*=UTF-8''([^;]+)/i);
  const regularMatch = contentDisposition?.match(/filename="?([^";]+)"?/i);
  const encodedName = utfMatch?.[1] || regularMatch?.[1];

  if (encodedName) {
    try {
      return decodeURIComponent(encodedName);
    } catch {
      return encodedName;
    }
  }

  return `offerte-${quoteNumber || "concept"}.pdf`;
}

function splitAddress(value = "") {
  const match = value.trim().match(/^(.*?)[,\s]+(\d+\s*[a-zA-Z0-9-]*)$/);
  return match
    ? { street: match[1].trim(), houseNumber: match[2].trim() }
    : { street: value.trim(), houseNumber: "-" };
}

function joinContactName(firstName = "", lastName = "") {
  return `${firstName.trim()} ${lastName.trim()}`.trim();
}

function splitContactName(value = "") {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts.shift() || "",
    lastName: parts.join(" "),
  };
}

function customerFacingText(value = "") {
  return String(value).replace(/\b0[,.]5\s*(?:dag|day)\b/giu, "halve dag");
}

function toLegacyCommand(payload) {
  const customerAddress = splitAddress(payload.customer.streetAndHouseNumber);
  const locationAddress = splitAddress(
    payload.trainingLocation.streetAndHouseNumber,
  );
  return {
    companyName: payload.customer.organizationName,
    contactPersonName: joinContactName(
      payload.customer.greetingName,
      payload.customer.contactPersonName,
    ),
    contactEmail: payload.customer.contactEmail,
    contactPhone: payload.customer.contactPhone || null,
    street: customerAddress.street,
    houseNumber: customerAddress.houseNumber,
    postalCode: payload.customer.postalCode,
    city: payload.customer.city,
    customerReference: null,
    quoteSubject: payload.coverTitle || payload.trainingItems[0]?.title,
    introductionText: null,
    closingText: null,
    validUntil: payload.validUntil,
    trainingLocationName: payload.trainingLocation.locationName,
    trainingLocationStreet: locationAddress.street,
    trainingLocationHouseNumber: locationAddress.houseNumber,
    trainingLocationPostalCode: payload.trainingLocation.postalCode,
    trainingLocationCity: payload.trainingLocation.city,
    trainingLocationRoom: null,
    trainingLocationAccessInstructions:
      payload.trainingLocation.accessInstructions || null,
    trainings: payload.trainingItems.map((item) => ({
      trainingCode: item.trainingCode,
      participantCount: Number(item.participantCount),
      internalNote: null,
    })),
    captcha: null,
    website: null,
  };
}

function toLegacyUpdateCommand(quoteId, payload) {
  const {
    trainings: _trainings,
    captcha: _captcha,
    website: _website,
    ...core
  } = toLegacyCommand(payload);
  return {
    ...core,
    quoteId,
    travelDistanceKm: Number(payload.travelCalculation?.distanceKm || 0),
    travelFreeKm: Number(payload.travelCalculation?.freeKm || 0),
    travelRatePerKm: Number(payload.travelCalculation?.ratePerKm || 0),
  };
}

const duration = (value) =>
  value?.numberOfDays > 1
    ? "MULTI_DAY"
    : value?.duration?.toLowerCase().includes("dagdeel") ||
        Number(value?.duration?.match(/[\d,.]+/)?.[0]?.replace(",", ".")) <= 5
      ? "HALF_DAY"
      : "FULL_DAY";

function toQuoteDetail(value, discounts, invoiceMoments = []) {
  const contactName = splitContactName(value.customer.contactPerson);
  const customerMessage =
    value.quoteTrainings.find((item) => item.internalNote?.trim())
      ?.internalNote || "";
  const travelPerExecution = value.quoteTrainings.reduce(
    (sum, item) => sum + Math.max(1, item.groupCount),
    0,
  );
  const travelAmount = travelPerExecution
    ? Number(value.travelCosts || 0) / travelPerExecution
    : 0;
  return {
    id: value.id,
    status: value.status,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
    sentAt: value.sentAt,
    acceptedAt: value.acceptedAt,
    acceptanceConfirmationSentAt: value.acceptanceConfirmationSentAt,
    planningMailScheduledFor: value.planningMailScheduledFor,
    planningMailSentAt: value.planningMailSentAt,
    rejectedAt: value.rejectedAt,
    cancelledAt: value.cancelledAt,
    createdBy: "offertebackend",
    updatedBy: "offertebackend",
    quote: {
      quoteId: value.id,
      quoteNumber: value.quoteNumber,
      quoteDate: value.quoteDate,
      validUntil: value.validUntil,
      coverTitle: customerFacingText(value.subject),
      coverSubtitle: "Praktisch, persoonlijk en afgestemd op uw organisatie",
      personalForeword: value.introduction || "",
      requestSummary: value.introduction || "",
      trainingGoal:
        "De deelnemers trainen het veilig en praktisch handelen tijdens de gekozen training.",
      recommendations: [],
      planningNotes: value.closingText || "",
      customerMessage,
      customer: {
        organizationName: value.customer.name,
        contactPersonName: contactName.lastName,
        greetingName: contactName.firstName,
        streetAndHouseNumber:
          `${value.customer.street} ${value.customer.houseNumber}`.trim(),
        postalCode: value.customer.postalCode,
        city: value.customer.city,
        country: value.customer.country || "Nederland",
        contactEmail: value.customer.email || "",
        contactPhone: value.customer.phone || "",
      },
      trainingLocation: {
        locationName: value.trainingLocation.name,
        streetAndHouseNumber:
          `${value.trainingLocation.street} ${value.trainingLocation.houseNumber}`.trim(),
        postalCode: value.trainingLocation.postalCode,
        city: value.trainingLocation.city,
        country: "Nederland",
        accessInstructions: value.trainingLocation.accessInstructions || "",
      },
      trainingItems: value.quoteTrainings.map((item) => ({
        legacyTrainingId: item.id,
        legacyTrainingCode: item.trainingCode,
        trainingCode: item.trainingCode,
        title: customerFacingText(item.trainingName),
        description: customerFacingText(item.description || ""),
        trainingDuration: duration(item),
        participantCount: item.participantCount,
        groupCount: item.groupCount,
        groupCountOverridden: Boolean(item.groupCountOverridden),
        executionCount: item.groupCount,
        quantity:
          item.sellingPriceUnit === "PER_PARTICIPANT"
            ? item.participantCount
            : item.groupCount,
        priceUnitLabel:
          item.sellingPriceUnit === "PER_PARTICIPANT" ? "deelnemer" : "groep",
        unitPriceExcludingVat: item.salesPrice,
        totalExcludingVat: item.baseSalesAmount,
        legacyVatPercentage: Number(item.vatPercentage || 0),
        travelCostsByExecution: Array(Math.max(1, item.groupCount)).fill(
          travelAmount,
        ),
      })),
      discounts: discounts.filter((item) => item.executionNumber == null).map((item) => ({
        legacyDiscountId: item.id,
        legacyTrainingId: item.quoteTrainingId,
        quoteTrainingId: item.quoteTrainingId,
        code: ["LOCATIE", "WELKOM", "PARTNER", "EENMALIG"].includes(
          item.name,
        )
          ? item.name
          : "OVERIG",
        description: item.description || item.name,
        type: item.type,
        value: Number(item.value || 0),
        percentage: item.type === "PERCENTAGE" ? item.value : 0,
        amountExcludingVat:
          item.type === "FIXED_AMOUNT" ? item.value : item.calculatedAmount,
      })),
      invoiceMoments: [...invoiceMoments].sort((left, right) => {
        const leftTraining = value.quoteTrainings.findIndex(
          (training) => training.id === left.quoteTrainingId,
        );
        const rightTraining = value.quoteTrainings.findIndex(
          (training) => training.id === right.quoteTrainingId,
        );
        return leftTraining - rightTraining
          || Number(left.executionNumber) - Number(right.executionNumber);
      }).map((moment) => ({
        ...moment,
        discounts: (moment.discounts || []).map((item) => ({
          id: item.id,
          quoteTrainingId: item.quoteTrainingId,
          executionNumber: item.executionNumber,
          code: item.name || "OVERIG",
          description: item.description || item.name || "",
          type: item.type,
          value: Number(item.value) || 0,
        })),
      })),
      vatPercentage: value.subtotalExcludingVat
        ? Math.round(
            (Number(value.vatAmount) / Number(value.subtotalExcludingVat)) *
              10000,
          ) / 100
        : 0,
      priceSummary: {
        trainingSubtotalExcludingVat: value.quoteTrainings.reduce(
          (sum, item) => sum + Number(item.baseSalesAmount || 0),
          0,
        ),
        travelCostsExcludingVat: Number(value.travelCosts || 0),
        discountTotalExcludingVat: discounts.reduce(
          (sum, item) => sum + Number(item.calculatedAmount || item.value || 0),
          0,
        ),
        totalExcludingVat: Number(value.subtotalExcludingVat || 0),
        vatAmount: Number(value.vatAmount || 0),
        totalIncludingVat: Number(value.totalIncludingVat || 0),
      },
      travelCalculation: {
        distanceKm: value.travelDistanceKm,
        freeKm: value.travelFreeKm,
        ratePerKm: value.travelRatePerKm,
      },
      agreementUrl: `https://www.bhvvoorneaanzee.nl/offerte/akkoord?quoteId=${value.id}`,
    },
  };
}

function toQuoteSummary(value) {
  return {
    id: value.id,
    quoteNumber: value.quoteNumber,
    status: value.status,
    quoteDate: value.quoteDate,
    validUntil: value.validUntil,
    customerOrganization: value.customer?.name,
    customerContactName: value.customer?.contactPerson,
    customerEmail: value.customer?.email,
    totalIncludingVat: value.totalIncludingVat,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
    sentAt: value.sentAt,
    acceptedAt: value.acceptedAt,
    rejectedAt: value.rejectedAt,
    cancelledAt: value.cancelledAt,
  };
}

async function syncTrainings(
  quoteId,
  currentItems,
  desiredItems,
  vatPercentage,
) {
  const desiredIds = new Set(
    desiredItems
      .filter((item) => item.legacyTrainingCode === item.trainingCode)
      .map((item) => item.legacyTrainingId)
      .filter(Boolean),
  );
  await Promise.all(
    currentItems
      .filter((item) => !desiredIds.has(item.id))
      .map((item) => api.delete(`/offertes/${quoteId}/trainings/${item.id}`)),
  );
  const catalog = (await api.get("/training-catalog")).data;
  for (const item of desiredItems) {
    if (
      item.legacyTrainingId &&
      item.legacyTrainingCode === item.trainingCode
    ) {
      await api.put(`/offertes/${quoteId}/trainings/${item.legacyTrainingId}`, {
        quoteTrainingId: item.legacyTrainingId,
        participantCount: Number(item.participantCount),
        description: item.description || item.title,
        salesPrice: Number(item.unitPriceExcludingVat),
        vatPercentage: Number(vatPercentage),
        internalNote: null,
        groupCount: item.groupCountOverridden
          ? Number(item.groupCount)
          : null,
      });
    } else {
      const configuration = catalog.find(
        (entry) => entry.code === item.trainingCode,
      );
      await api.post(`/offertes/${quoteId}/trainings`, {
        quoteId,
        trainingConfigurationId: configuration.trainingConfigurationId,
        participantCount: Number(item.participantCount),
        internalNote: null,
        groupCount: item.groupCountOverridden
          ? Number(item.groupCount)
          : null,
      });
    }
  }
}

async function syncVatPercentage(quote, vatPercentage) {
  const percentage = Number(vatPercentage);

  await Promise.all(
    (quote.quoteTrainings || []).map((training) =>
      api.put(`/offertes/${quote.id}/trainings/${training.id}`, {
        quoteTrainingId: training.id,
        participantCount: Number(training.participantCount),
        description: training.description || training.trainingName,
        salesPrice: Number(training.salesPrice),
        vatPercentage: percentage,
        internalNote: training.internalNote || null,
        groupCount: training.groupCountOverridden
          ? Number(training.groupCount)
          : null,
      }),
    ),
  );
}

async function syncDiscounts(quote, desiredDiscounts, clearExisting = false) {
  const defaultTraining = quote.quoteTrainings?.[0];
  if (!defaultTraining) return;

  const existingDiscounts = clearExisting
    ? (
        await Promise.all(
          quote.quoteTrainings.map(async (quoteTraining) => {
            const response = await api.get(
              `/offertes/${quote.id}/trainings/${quoteTraining.id}/discounts`,
            );
            return response.data.map((discount) => ({
              ...discount,
              quoteTrainingId: quoteTraining.id,
            }));
          }),
        )
      ).flat()
    : [];

  if (clearExisting) {
    for (const existing of existingDiscounts) {
      await api.delete(
        `/offertes/${quote.id}/trainings/${existing.quoteTrainingId}/discounts/${existing.id}`,
      );
    }
  }

  for (const desired of desiredDiscounts) {
    const training = quote.quoteTrainings.find(
      (item) => item.id === desired.quoteTrainingId,
    ) || quote.quoteTrainings.find(
      (item) => item.trainingCode === desired.quoteTrainingId,
    ) || defaultTraining;
    await api.post(
      `/offertes/${quote.id}/trainings/${training.id}/discounts`,
      toDiscountRequest(desired),
    );
  }
}

function toDiscountRequest(discount) {
  return {
    name: discount.code || discount.description,
    description: discount.description,
    type: discount.type,
    value: Number(discount.value),
    visibleToCustomer: true,
    executionNumber: discount.executionNumber ?? null,
  };
}

export default quoteService;
