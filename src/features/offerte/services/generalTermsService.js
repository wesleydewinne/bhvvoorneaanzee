import api from "@/api/api.js";

const generalTermsService = {
  async getTerms() {
    const response = await api.get("/public/general-terms");
    return response.data;
  },

  getPdfDownloadUrl() {
    const baseUrl = api.defaults.baseURL?.replace(/\/$/, "") || "";
    return `${baseUrl}/public/general-terms/pdf`;
  },

  async downloadPdf() {
    const response = await fetch(this.getPdfDownloadUrl(), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/pdf" },
    });
    if (!response.ok) {
      throw new Error("De algemene voorwaarden konden niet worden gedownload.");
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = "algemene-voorwaarden-bhv-voorne-aan-zee.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  },
};

export default generalTermsService;
