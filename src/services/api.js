import axios from "axios";

// const apiUrl = "/api/";
const apiUrl = "https://cors-anywhere.herokuapp.com/corsdemo/https://live.devnimble.com/api/v1/";
const token = import.meta.env.VITE_API_TOKEN;

export const UserAPI = {
  async getContacts() {
    try {
      const response = await axios.get(`${apiUrl}contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          sort: "created:desc",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
  async deleteContact(id) {
   
    try {
      const response = await axios.delete(`${apiUrl}contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
