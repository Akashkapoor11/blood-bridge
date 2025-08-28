// client/src/redux/features/auth/authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import toast from "react-hot-toast";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      if (data?.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message || "Logged in");
        // keep existing redirect behavior if your app expects it
        window.location.replace("/");
      }
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    { name, role, email, password, organisationName, hospitalName, website, address, phone },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        organisationName,
        hospitalName,
        website,
        address,
        phone,
      });
      if (data?.success) {
        toast.success(data.message || "Registered successfully");
      }
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Register failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      return res?.data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Fetch user failed";
      return rejectWithValue(message);
    }
  }
);
