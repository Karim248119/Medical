import { BASE_URL } from ".";

// Fetch all appointment
export const getAllAppointments = async (doctorID: string | undefined) => {
  try {
    const response = await fetch(`${BASE_URL}/appointment?doctor=${doctorID}`);
    if (!response.ok) {
      throw new Error("Failed to fetch appointment");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("get appointment error", error);
    return [];
  }
};

//create
export const createAppointment = async (formData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/appointment/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to create appointment");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("create appointment error", error);
    return null;
  }
};

//update
export const updateAppointment = async (
  id: string | undefined,
  formData: FormData
) => {
  try {
    const response = await fetch(`${BASE_URL}/appointment/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update appointment");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("update appointment error:", error);
    return null;
  }
};

//delete
export const deleteAppointment = async (id: string | undefined) => {
  try {
    const response = await fetch(`${BASE_URL}/appointment/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete appointment");
    }
    return null;
  } catch (error) {
    console.error("delete appointment error:", error);
  }
};
