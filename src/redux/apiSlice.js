import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/axiosInstance,js";

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("contacts?sort=created:desc");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`contact/${id}`);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const createContact = createAsyncThunk(
  "contact/createContact",
  async (newContact, thunkAPI) => {
    try {
      const response = await axiosInstance.post("contact", newContact);
      return response.data;
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getOneContact = createAsyncThunk(
  "contacts/getOneContact",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`contact/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContactTags = createAsyncThunk(
  "contacts/updateContactTags",
  async ({ id, tags }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`contacts/${id}/tags`, { tags });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const apiSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    loading: "false",
    error: null,
    contact: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
      tags: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.resources;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOneContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneContact.fulfilled, (state, action) => {
        state.loading = false;
        const contact = action.payload.resources[0];
        state.contact = {
          id: contact.id,
          firstName: contact.fields["first name"][0]?.value || "",
          lastName: contact.fields["last name"][0]?.value || "",
          email: contact.fields["email"][0]?.value || "",
          avatar: contact.avatar_url || "",
          tags: contact.tags || [],
        };
      })
      .addCase(getOneContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateContactTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContactTags.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTags = action.payload.tags;
        state.contact.tags = [...updatedTags];
      })
      .addCase(updateContactTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default apiSlice.reducer;
