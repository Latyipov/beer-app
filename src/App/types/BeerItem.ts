export type BeerItem = {
  id: string;
  name: string;
  price: string;
  rating: { average: number; reviews: number };
  image: string;
};
