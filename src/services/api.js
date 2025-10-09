import axios from "axios";

const BASE_URL=import.meta.env.VITE_API_BASE_URL ;

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const fetchAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/preview/`);
    return response.data; // usually an array of posts
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const fetchPostsByCategory = async (categoryId) => {
  if (!categoryId) throw new Error("Category ID is required");

  try {
    const response = await axios.get(`${BASE_URL}/categories/${categoryId}/posts/`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    throw error;
  }
};

export const fetchPostById = async (postId) => {
  if (!postId) throw new Error("Post ID is required");

  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};


export const fetchPostsBySearch = async (query) => {
  try {
    if (!query) return []; 

    const response = await axios.get(`${BASE_URL}/posts/search/`, {
      params: { search: query },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching posts by search:", error);
    throw error;
  }
};