import { TActivityItem, TProduct } from "@/types";

export const topSellingProducts: TProduct[] = [
  {
    id: 1,
    name: "Chair with Cushion",
    category: "Furniture",
    price: 124,
    sales: 260,
    imageUrl: "/product_Image_1.png",
  },
  {
    id: 2,
    name: "Hand Bag",
    category: "Accessories",
    price: 564,
    sales: 181,
    imageUrl: "/product_Image_2.png",
  },
  {
    id: 3,
    name: "Sneakers",
    category: "Sports",
    price: 964,
    sales: 134,
    imageUrl: "/product_Image_3.png",
  },
  {
    id: 4,
    name: "Ron Hoodie",
    category: "Fashion",
    price: 769,
    sales: 127,
    imageUrl: "/product_Image_4.png",
  },
  {
    id: 5,
    name: "Smart Watch",
    category: "Electronics",
    price: 999,
    sales: 108,
    imageUrl: "/product_Image_3.png",
  },
];

export const activityData: TActivityItem[] = [
  {
    id: "1",
    type: "order",
    activity: "New Order",
    order_id: "#12345",
    time_ago: "3 hrs ago",
    details: "2 items purchased by John Doe",
    color: "bg-blue-500",
    icon: "shopping-cart",
  },
  {
    id: "2",
    type: "shipped",
    activity: "Order Shipped",
    order_id: "#12345",
    time_ago: "1 day ago",
    details: "Shipped via FedEx",
    color: "bg-green-500",
    icon: "check",
  },
  {
    id: "3",
    type: "product",
    activity: "Added New Products",
    time_ago: "12 days ago",
    details: "New items added in Fashions",
    color: "bg-pink-500",
    icon: "plus",
  },
  {
    id: "4",
    type: "favorited",
    activity: "Product Favorited",
    product: "iPhone 12 Pro",
    time_ago: "2 days ago",
    details: "Added to favorites by Jane Smith",
    color: "bg-red-500",
    icon: "heart",
  },
  {
    id: "5",
    type: "rated",
    activity: "Product Rated",
    product: "Samsung Galaxy S21",
    time_ago: "3 days ago",
    details: "Rated 4.5 stars by John Doe",
    color: "bg-yellow-500",
    icon: "star",
  },
  {
    id: "6",
    type: "discount",
    activity: "Product Discount",
    product: "Nike Air Max",
    time_ago: "4 days ago",
    details: "Discounted price applied",
    color: "bg-cyan-500",
    icon: "diamond",
  },
  {
    id: "7",
    type: "inquiry",
    activity: "Customer Inquiry",
    order_id: "#12346",
    time_ago: "5 days ago",
    details: "Inquiry received from customer",
    color: "bg-purple-500",
    icon: "circle",
  },
];

export const earningData = [
  { month: "Jan", income: 32000, expense: 20000 },
  { month: "Feb", income: 28000, expense: 24000 },
  { month: "Mar", income: 25000, expense: 18000 },
  { month: "Apr", income: 12000, expense: 6000 },
  { month: "May", income: 28000, expense: 24000 },
  { month: "Jun", income: 22000, expense: 18000 },
  { month: "Jul", income: 18000, expense: 22000 },
  { month: "Aug", income: 25000, expense: 30000 },
  { month: "Sep", income: 30000, expense: 28000 },
  { month: "Oct", income: 32000, expense: 28000 },
  { month: "Nov", income: 28000, expense: 22000 },
  { month: "Dec", income: 24000, expense: 18000 },
];


  export const samplePromptsData = [
    {
      id: "1",
      title: "Content Prompt: What is one positive thing that happened at work today?",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/journal_prompt_image.png"
    },
    {
      id: "2",
      title: "Content Prompt: What is one positive thing that happened at work today?",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/journal_prompt_image.png"
    },
    {
      id: "3",
      title: "Content Prompt: What is one positive thing that happened at work today?",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/journal_prompt_image.png"
    },
    {
      id: "4",
      title: "Content Prompt: What is one positive thing that happened at work today?",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/journal_prompt_image.png"
    },
    {
      id: "5",
      title: "Content Prompt: What is one positive thing that happened at work today?",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/journal_prompt_image.png"
    },
    {
      id: "6",
      title: "Content Prompt: What is one positive thing that happened at work today?",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/journal_prompt_image.png"
    },
    {
      id: "7",
      title: "Content Prompt: What is one positive thing that happened at work today?",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/journal_prompt_image.png"
    },
    {
      id: "8",
      title: "Content Prompt: What is one positive thing that happened at work today?",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/journal_prompt_image.png"
    },
    {
      id: "9",
      title: "Content Prompt: What is one positive thing that happened at work today?",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/journal_prompt_image.png"
    }
  ];





  export const sampleDailyTipsData = [
    {
      id: "1",
      title: "Remember to take short breaks during your workday to stay refreshed.",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/daily_tips_image.png"
    },
    {
      id: "2",
      title: "Remember to take short breaks during your workday to stay refreshed.",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/daily_tips_image.png"
    },
    {
      id: "3",
      title: "Remember to take short breaks during your workday to stay refreshed.",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/daily_tips_image.png"
    },
    {
      id: "4",
      title: "Remember to take short breaks during your workday to stay refreshed.",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/daily_tips_image.png"
    },
    {
      id: "5",
      title: "Remember to take short breaks during your workday to stay refreshed.",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/daily_tips_image.png"
    },
    {
      id: "6",
      title: "Remember to take short breaks during your workday to stay refreshed.",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/daily_tips_image.png"
    },
    {
      id: "7",
      title: "Remember to take short breaks during your workday to stay refreshed.",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/daily_tips_image.png"
    },
    {
      id: "8",
      title: "Remember to take short breaks during your workday to stay refreshed.",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/daily_tips_image.png"
    },
    {
      id: "9",
      title: "Remember to take short breaks during your workday to stay refreshed.",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/daily_tips_image.png"
    }
  ];


  export const sampleAdvertisementsData = [
    {
      id: "1",
      title: "Limited time offer: 20% off on resume review services. Make your application stand out!",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/advertisements_image.png"
    },
    {
      id: "2",
      title: "Limited time offer: 20% off on resume review services. Make your application stand out!",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/advertisements_image.png"
    },
    {
      id: "3",
      title: "Limited time offer: 20% off on resume review services. Make your application stand out!",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/advertisements_image.png"
    },
    {
      id: "4",
      title: "Limited time offer: 20% off on resume review services. Make your application stand out!",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/advertisements_image.png"
    },
    {
      id: "5",
      title: "Limited time offer: 20% off on resume review services. Make your application stand out!",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/advertisements_image.png"
    },
    {
      id: "6",
      title: "Limited time offer: 20% off on resume review services. Make your application stand out!",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/advertisements_image.png"
    },
    {
      id: "7",
      title: "Limited time offer: 20% off on resume review services. Make your application stand out!",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/advertisements_image.png"
    },
    {
      id: "8",
      title: "Limited time offer: 20% off on resume review services. Make your application stand out!",
      date: "May 15, 2025",
      status: "Completed" as const,
      imageUrl: "/advertisements_image.png"
    },
    {
      id: "9",
      title: "Limited time offer: 20% off on resume review services. Make your application stand out!",
      date: "May 15, 2025",
      status: "Pending" as const,
      imageUrl: "/advertisements_image.png"
    }
  ];