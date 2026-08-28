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
};

export default generalTermsService;
