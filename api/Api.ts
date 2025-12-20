import { ApiResponse } from "@/types/api";
import {
  BatchResponse,
  BlogCategoryResponse,
  BlogListResponse,
  BlogResponse,
  Feature,
  ProductCategoryResponse,
  ProductListResponse,
  ServiceListResponse,
  ServiceResponse,
  TestimonialListResponse,
} from "@/types/types";
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

export async function getServiceBySlug(slug: string): Promise<ServiceResponse> {
  const response = await axiosInstance.get<ServiceResponse>(
    `/services/slug/${slug}`
  );
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

//products and product categories
export async function getAllProductCategories(): Promise<ProductCategoryResponse> {
  const response = await axiosInstance.get<ProductCategoryResponse>(
    "ecommerce/categories"
  );

  return response.data;
}
export async function getAllProducts(): Promise<ProductListResponse> {
  const response = await axiosInstance.get<ProductListResponse>("/ecommerce");

  return response.data;
}
export async function getAllProductsWithPagination(params?: {
  page?: number;
  per_page?: number;
}): Promise<ProductListResponse> {
  const response = await axiosInstance.get<ProductListResponse>("/ecommerce", {
    params,
  });

  return response.data;
}

//blogs and blog categories
export async function getAllBlogCategories(): Promise<BlogCategoryResponse> {
  const response = await axiosInstance.get<BlogCategoryResponse>(
    "/blog/categories"
  );

  return response.data;
}
export async function getAllBlogs(): Promise<BlogListResponse> {
  const response = await axiosInstance.get<BlogListResponse>("/blog");
  return response.data;
}
export async function getBlogBySlug(slug: string): Promise<BlogResponse> {
  const response = await axiosInstance.get<BlogResponse>(`/blog/slug/${slug}`);
  return response.data;
}
export async function getAllBlogsWithPagination(params?: {
  page?: number;
  per_page?: number;
}): Promise<BlogListResponse> {
  const response = await axiosInstance.get<BlogListResponse>("/blog", {
    params,
  });

  return response.data;
}

export async function getAllTestimonials(): Promise<TestimonialListResponse> {
  const response = await axiosInstance.get<TestimonialListResponse>(
    "/testimonials"
  );
  return response.data;
}

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
