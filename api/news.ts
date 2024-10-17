import { BASE_URL } from ".";

// Fetch all
export const getAllNews = async (title?: string) => {
  try {
    const response = await fetch(`${BASE_URL}/news?title=${title}`);
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await response.json();
    return data.news;
  } catch (error) {
    console.error("get news error", error);
    return [];
  }
};

//add
export const addNews = async (formData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/news/add`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to add News");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("add News error", error);
    return null;
  }
};

//delete
export const deleteNews = async (id: string | undefined) => {
  try {
    const response = await fetch(`${BASE_URL}/news/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete News");
    }
  } catch (error) {
    console.error("delete News error", error);
  }
};

//update
export const updateNews = async (
  id: string | undefined,
  formData: FormData
) => {
  try {
    const response = await fetch(`${BASE_URL}/news/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update News");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("update News error", error);
    return null;
  }
};
