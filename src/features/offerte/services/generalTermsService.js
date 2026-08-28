import api from "@/api/api.js";

const generalTermsService = {
  async getTerms() {
    const response = await api.get("/public/general-terms");
    return response.data;
  },

  async downloadPdf() {
    const response = await api.get("/public/general-terms/pdf", {
      responseType: "blob",
    });
    return response.data;
  },
};

export default generalTermsService;
