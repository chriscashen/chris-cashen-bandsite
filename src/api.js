import axios from "axios";

const apiKey = "6ac70dbe-ce1c-4e56-b1a0-f359fa856928"; // API key

const axiosInstance = axios.create({
  baseURL: "https://project-1-api.herokuapp.com", // API URL
  timeout: 10000, // request timeout
  params: {
    api_key: apiKey,
  },
});

// reusable make request function
async function makeRequest(method, path, data = null) {
  try {
    const response = await axiosInstance[method](path, data);
    return response.data;
  } catch (error) {
    console.error(`${method.toUpperCase()} request to ${path} failed:`, error);
    throw error;
  }
}

// API Request functions
export const httpRequest = {
  getShows: function () {
    return makeRequest("get", "/showdates");
  },

  addComment: function (commentData) {
    return makeRequest("post", "/comments", commentData);
  },

  getComments: function () {
    return makeRequest("get", "/comments");
  },

  likeCommentById: function (id) {
    return makeRequest("put", `/comments/${id}/like`);
  },

  deleteCommentById: function (id) {
    return makeRequest("delete", `/comments/${id}`);
  },

  getAPIKey: function () {
    return makeRequest("get", "/register");
  },
};

// GET API GET
async function auth() {
  try {
    const {api_key} = await httpRequest.getAPIKey();
    console.log(api_key);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}