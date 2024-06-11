import axios, { AxiosRequestConfig } from "axios";
import { setItem, getItem, removeItem } from "./localStorage"; // Replace with your localStorage implementation

const axiosInstance = axios.create({
  // Set your desired default configurations here (optional)
  baseURL: "http://localhost:8080", // Replace with your base URL if needed
});

interface RequestParams {
  [key: string]: string | number | boolean; // Allow any type for params
}

interface RequestPayload {
  [key: string]: any; // Allow any type for payload
}

interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message: string;
  // Add other response properties if relevant (e.g., headers, status)
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  statusCode: number;
  userId: string;
  userName: string;
  // Add other user data if needed
}

export interface SignUpResponse {
  message: string;
  statusCode: number;
  userId?: string;
}

export async function makeRequest<T = any>(
  url: string,
  method: "get" | "post" | "put" | "patch" | "delete" = "get",
  params: RequestParams = {},
  payload: RequestPayload = {},
  optionalHeaders: Record<string, string> = {},
  onSuccess?: (response: ApiResponse<T>) => void,
  onError?: (error: any) => void
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem("accessToken") || "";
    const headers: Record<string, string> = {
      Authorization: token ? `Bearer ${token}` : "",
      ...optionalHeaders,
    };

    const config: AxiosRequestConfig = {
      method,
      url,
      params,
      headers,
      withCredentials: false,
    };

    // Add payload to config for POST/PUT/PATCH requests
    if (["post", "put", "patch"].includes(method.toLowerCase())) {
      config.data = payload;
    }

    const response = await axiosInstance.request<ApiResponse<T>>(config);

    if (onSuccess) {
      onSuccess(response.data);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      await handleRefreshToken();
    }

    if (onError) {
      onError(error);
    }

    throw error;
  }
}

export async function handleRefreshToken(): Promise<string> {
  try {
    const refreshToken = getItem("refreshToken");
    if (!refreshToken) {
      // Handle case where refresh token is missing (e.g., logout)
      throw new Error("Missing refresh token");
    }

    const response = await makeRequest<LoginResponse>("/refreshToken", "post", {}, { refreshToken });

    // Type guard to ensure response has expected structure
    if ("data" in response && response.data.accessToken) {
      const newAccessToken = response.data.accessToken;
      setItem("accessToken", newAccessToken);
      return newAccessToken;
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    removeItem("accessToken");
    removeItem("refreshToken");
    // Handle other errors (e.g., network issues, invalid refresh token)
    throw error;
  }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await makeRequest<LoginResponse>("/login", "post", {}, { email, password });

  console.log("response", response);
  // Type guard to ensure response has expected structure
  if (
    "data" in response &&
    typeof response.data === "object" &&
    "accessToken" in response.data &&
    "refreshToken" in response.data
  ) {
    const { accessToken, refreshToken } = response.data;
    // Assuming setItem is a function to store items, implement it accordingly
    setItem("accessToken", accessToken);
    setItem("refreshToken", refreshToken);
    return response.data; // Return the response
    // Store tokens and return response
  } else {
    throw new Error("Invalid response structure");
  }
}

export async function signup(email: string, password: string, userName: string): Promise<SignUpResponse> {
  const response = await makeRequest<SignUpResponse>("/signup", "put", {}, { email, password, userName });

  if (response) {
    return response;
  } else {
    throw new Error("Invalid response structure");
  }
}

interface UserData {
  id: number;
  name: string;
  // Add other user data fields
}
