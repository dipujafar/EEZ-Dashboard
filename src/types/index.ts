export type TInstrumentsData = {
  name: string;
  image: string;
};


export type TProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  sales: number;
  imageUrl: string;
}


export type TActivityItem = {
  id: string;
  type: 'order' | 'shipped' | 'product' | 'favorited' | 'rated' | 'discount' | 'inquiry';
  activity: string;
  order_id?: string;
  product?: string;
  time_ago: string;
  details: string;
  color: string;
  icon: string;
}