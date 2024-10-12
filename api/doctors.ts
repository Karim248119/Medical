import { BASE_URL } from ".";

// Fetch all doctors
export const getAllDoctors = async (
  page?: number,
  limit?: number,
  sp_id?: string,
  name?: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/doctors?page=${page}&limit=${limit}&sp_id=${sp_id}&name=${name}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }
    const data = await response.json();
    return data.doctors;
  } catch (error) {
    console.error("get doctors error", error);
    return [];
  }
};

//add
export const addDoctor = async (formData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/add`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to add doctor");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("add doctor error", error);
    return null;
  }
};

//update
export const updateDoctor = async (
  id: string | undefined,
  formData: FormData
) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update doctor");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("update doctor error:", error);
    return null;
  }
};

//delete
export const deleteDoctor = async (id: string | undefined) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete doctor");
    }
    return null;
  } catch (error) {
    console.error("delete doctor error:", error);
  }
};
