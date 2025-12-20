import { ApiResponse } from "@/types/api";
import { BatchResponse, Feature, ServiceListResponse } from "@/types/types";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getBatchData(
  features: Feature[]
): Promise<BatchResponse> {
  const response = await axiosInstance.post<BatchResponse>("/batch", {
    features,
  });

  return response.data;
}

export async function postContactForm<T>(data: T) {
  const response = await axiosInstance.post<ApiResponse<unknown>>(
    "/contact-message",
    data
  );
  return response.data.data;
}

export async function getAllServices(): Promise<ServiceListResponse> {
  const response = await axiosInstance.get<ServiceListResponse>("/services");
  return response.data;
}

export async function getAllServicesWithPagination(params?: {
  page?: number;
  per_page?: number;
}): Promise<ServiceListResponse> {
  const response = await axiosInstance.get<ServiceListResponse>("/services", {
    params,
  });

  return response.data;
}

const getProducts = async () => {
  const response = await axiosInstance.get("/ecommerce");
  return response.data;
};
const getProductBySlug = async (id: string) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

const getProductCategories = async () => {
  const response = await axiosInstance.get("/product-categories");
  return response.data;
};
const getBlogsCategories = async () => {
  const response = await axiosInstance.get("/blog-categories");
  return response.data;
};
const getBlogs = async () => {
  const response = await axiosInstance.get("/blogs");
  return response.data;
};

const getBlogBySlug = async (id: string) => {
  const response = await axiosInstance.get(`/blogs/${id}`);
  return response.data;
};
const getAllTestimonials = async () => {
  const response = await axiosInstance.get("/testimonials");
  return response.data;
};
const getAllClients = async () => {
  const response = await axiosInstance.get("/partners");
  return response.data;
};
const getAllTeamMembers = async () => {
  const response = await axiosInstance.get("/team-members");
  return response.data;
};
const getAllAboutUsData = async () => {
  const response = await axiosInstance.get("/contents");
  return response.data;
};
const getAllContactUsData = async () => {
  const response = await axiosInstance.get("/setup");
  return response.data;
};

const postNewsletterSubscription = async (data: any) => {
  const response = await axiosInstance.post("/newsletter-subscription", data);
  return response.data;
};
const postProductInquiry = async (data: any) => {
  const response = await axiosInstance.post("/enquiry", data);
  return response.data;
};
const getAllAwards = async () => {
  const response = await axiosInstance.get("/awards");
  return response.data;
};
const getProjects = async () => {
  const response = await axiosInstance.get("/projects");
  return response.data;
};
const getSingleProject = async (id: string) => {
  const response = await axiosInstance.get(`/projects/${id}`);
  return response.data;
};

export {
  getProducts,
  getProductBySlug,
  getProductCategories,
  getBlogsCategories,
  getBlogs,
  getBlogBySlug,
  getAllTestimonials,
  getAllClients,
  getAllTeamMembers,
  getAllAboutUsData,
  getAllContactUsData,
  postNewsletterSubscription,
  postProductInquiry,
  getAllAwards,
  getProjects,
  getSingleProject,
};
