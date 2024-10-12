import { Service } from "@/types";
import { BASE_URL } from ".";

// Fetch all
export const getAllServices = async () => {
  try {
    const response = await fetch(`${BASE_URL}/services`);
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    const data = await response.json();
    return data.services;
  } catch (error) {
    console.error("get services error", error);
    return [];
  }
};

//add
export const addService = async (formData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/services/add`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to add service");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("add service error", error);
    return null;
  }
};

//delete
export const deleteService = async (id: string | undefined) => {
  try {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete service");
    }
  } catch (error) {
    console.error("delete service error", error);
  }
};

//update
export const updateService = async (
  id: string | undefined,
  formData: FormData
) => {
  try {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update service");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("update service error", error);
    return null;
  }
};
