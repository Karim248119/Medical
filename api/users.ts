import { User } from "@/types";
import { BASE_URL } from ".";

// Fetch all
export const getAllUsers = async (name?: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users?name=${name}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("get users error", error);
    return [];
  }
};

// add (register)
export const addUser = async (formData: User) => {
  try {
    const response = await fetch(`${BASE_URL}/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add User");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("add User error", error);
    return null;
  }
};

//delete
export const deleteUser = async (id: string | undefined) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete User");
    }
  } catch (error) {
    console.error("delete User error", error);
  }
};

//update
export const updateUser = async (
  id: string | undefined,
  formData: FormData
) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update User");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("update User error", error);
    return null;
  }
};

//login
export const login = async (formData: User) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add User");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("add User error", error);
    return null;
  }
};
