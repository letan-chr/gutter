export interface BlogImage {
  id: number;
  blog_id: string;
  image_path: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: number;
  business_id: number;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export type BlogCategoryResponse = {
  data: BlogCategory[];
};

export interface Blog {
  id: number;
  business_id: number;
  blog_category_id: number;
  title: string;
  slug: string;
  content: string; // HTML string
  excerpt: string;
  featured_image: string | null;
  banner_image: string | null;
  status: string;
  is_featured: boolean;
  published_at: string | null;
  views_count: number;
  created_at: string;
  updated_at: string;
  category: BlogCategory | null;
  images: BlogImage[];
}

export interface Stat {
  id: number;
  business_id: number;
  name: string; // e.g. "products"
  value: string; // e.g. "100+"
  image: string | null; // backend may return null
  icon_class: string | null; // e.g. "fas fa user"
  views_count: number;
  created_at: string;
  updated_at: string;
}

export type ProductImage = {
  id: number;
  product_id: string;
  image_path: string;
  order: number;
  created_at: string;
  updated_at: string;
};

export type ProductCategory = {
  id: number;
  business_id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  status: "active" | "inactive" | string; // backend returns "active"
  created_at: string;
  updated_at: string;
};

export type CategoryResponse = {
  data: ProductCategory[];
};

export type Product = {
  id: number;
  business_id: number;
  product_category_id: number | null;
  name: string;
  slug: string;
  description: string;
  banner_image: string;
  price: string; // string because your API returns "466.00"
  status: "active" | "inactive";
  is_featured: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  category: ProductCategory | null;
  images: ProductImage[];
};

export type Partner = {
  id: number;
  business_id: number;
  name: string;
  image: string; // actual field name from API, not "logo"
  link: string;
  order: string; // your API returns "40", "48", etc. → string
  views_count: number;
  created_at: string;
  updated_at: string;
};

export interface Testimonial {
  id: number;
  business_id: number;
  title_prefix: string; // "Dr", "Mrs", "Eng"
  name: string;
  role: string; // example: "Pariatur Consequatu"
  description: string; // testimonial text from API
  image: string; // path: "about/testimonials/...jpg"
  rating: string | number; // API returns string "5"
  company: string; // "Travis Jarvis Inc"
  order: string; // API returns string "10"
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface AboutGalleryImage {
  id: number;
  business_id: number;
  gallery_id: number | string; // API returns "3" as string, so support both
  title: string;
  description: string | null;
  image: string;
  order: string; // returned as "0"
  status: "active" | "inactive" | string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: number;
  business_id: number;
  title: string;
  description: string;
  order: string; // API returns string
  status: "active" | "inactive" | string;
  views_count: number;
  created_at: string;
  updated_at: string;
  images: AboutGalleryImage[];
}

export interface SocialMedia {
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
  youtube: string | null;
  tiktok: string | null;
  pinterest: string | null;
  snapchat: string | null;
  whatsapp: string | null;
  telegram: string | null;
}

export interface ContactItem {
  label: string;
  value: string;
}

export interface Setup {
  id: number;
  business_id: number;
  logo_small: string | null;
  logo_large: string | null;
  favicon: string | null;
  company_motto: string | null;

  social_media: SocialMedia;

  company_address: string | null;
  map_src: string | null;

  phone_numbers: ContactItem[];
  email_addresses: ContactItem[];

  views_count: number;

  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: number;
  business_id: number;
  title_prefix: string;
  name: string;
  position: string;
  address: string;
  phone: string;
  social_media: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
  image: string;
  order: string;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceImage {
  id: number;
  about_service_id: string;
  image_path: string;
  order: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  business_id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  banner_image: string;
  icon_class: string;
  icon_image: string | null;
  order: number;
  is_active: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  images: ServiceImage[];
}

export interface AboutAward {
  id: number;
  business_id: number;
  title: string;
  organization: string;
  year: number;
  date: string | null;
  description: string;
  image: string;
  certificate: string;
  link: string | null;
  order: string; // comes as string ("0")
  status: string; // e.g., "active"
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface BatchResponse {
  blog_post?: { data: Blog[] };

  about_service?: { data: Service[] };

  about_content?: { data: AboutContent }; // SINGLE OBJECT

  about_testimonial?: { data: Testimonial[] };

  about_team?: { data: TeamMember[] };

  about_gallery?: { data: GalleryItem[] };

  about_partner?: { data: Partner[] };

  about_statistic?: { data: Stat[] };

  about_award?: { data: AboutAward[] };

  ecommerce_product?: { data: Product[] };

  about_setup?: { data: Setup }; // SINGLE OBJECT
}

export type Feature = {
  name: string;
  amount?: number;
};

export interface AboutContentTranslation {
  id: number;
  locale: string;
  title?: string;
  description?: string;
  text?: string;
  mission?: string;
  vision?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CoreValueTranslation {
  id: number;
  about_core_value_id: string;
  locale: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CoreValue {
  id: number;
  business_id: number;
  title: string;
  slug: string;
  description: string;
  icon_class: string | null;
  icon_image: string | null;
  order: number;
  views_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  translations: CoreValueTranslation[];
}

export interface AboutContent {
  id: number;
  business_id: number;
  about_image: string;
  text: string;
  mission: string;
  vision: string;
  core_values: CoreValue[]; // ✅ FIXED (was null before)
  views_count: number;
  created_at: string;
  updated_at: string;
  translations: AboutContentTranslation[];
}

export type PageContent = {
  id: number;
  page_id: number;
  business_id: number;
  type: "image" | "video";
  image_path: string | null;
  video_url: string | null;
  video_file: string | null;
  title: string;
  detail: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PageWithContents = {
  id: number;
  business_id: number;
  page_identifier: string;
  created_at: string;
  updated_at: string;
  active_contents: PageContent[];
};

export type HeroContent = {
  id: number;
  page: string;
  title: string;
  description: string;
  image: string | null;
  type: "image" | "video";
  order: number;
};
