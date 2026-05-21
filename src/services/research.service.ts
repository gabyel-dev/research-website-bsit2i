import axios from "axios";

/* const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; */

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});

export const researchApi = {
  async getAll() {
    const response = await api.get("/api/researches");
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get(`/api/researches/${id}`);
    return response.data;
  },

  async getMyResearches() {
    const response = await api.get("/api/researches/my");
    return response.data;
  },

  async update(
    id: string,
    payload: { title: string; summary: string; pdf_link?: string },
  ) {
    const response = await api.patch(`/api/researches/${id}`, payload);
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`/api/researches/${id}`);
  },
};
