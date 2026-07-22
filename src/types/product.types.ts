export type Product = {
  category: { slug: string; name: string };
  slug: string;
  code: number;
  createdAt: string;
  images: string[];
  name: string;
  off: number;
  price: number;
  isFave: boolean;
  priceWithoutOff: number;
  star: number;
  colors: Array<{
    _id: string;
    name: string;
    code: string;
  }>;
  description: string;
  details: Array<{
    key: string;
    value: string;
    _id: string;
  }>;
  isInCart: boolean;
  updatedAt: string;
  __v: number;
  _id: string;
  feedback: {
    averageRating: number;
    totalComments: number;
    totalRatings: number;
  };
};
