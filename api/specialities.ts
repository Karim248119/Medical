import { Speciality } from "@/types";
import { BASE_URL } from ".";

// Fetch all
export const getAllSpecialities = async (title?: string) => {
  try {
    const response = await fetch(`${BASE_URL}/specialities?title=${title}`);
    if (!response.ok) {
      throw new Error("Failed to fetch specialities");
    }
    const data = await response.json();
    return data.specialities;
  } catch (error) {
    console.error("get specialities error", error);
    return [];
  }
};

//add
export const addSpeciality = async (formData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/specialities/add`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to add speciality");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("add speciality error", error);
    return null;
  }
};

//delete
export const deleteSpeciality = async (id: string | undefined) => {
  try {
    const response = await fetch(`${BASE_URL}/specialities/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete speciality");
    }
  } catch (error) {
    console.error("delete speciality error", error);
  }
};

//update
export const updateSpeciality = async (
  id: string | undefined,
  formData: FormData
) => {
  try {
    const response = await fetch(`${BASE_URL}/specialities/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update speciality");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("update speciality error", error);
    return null;
  }
};
