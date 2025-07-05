
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HeroImage {
  id?: number;
  src: string;
  alt: string;
  createdAt?: string;
  updatedAt?: string;
}
