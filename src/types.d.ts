type Role =
  | "superAdmin"
  | "hotelAdmin"
  | "hotelManager"
  | "serviceManager"
  | "reception";

interface NavMenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

interface StatsData {
  icon: React.ComponentElement;
  title: string;
  data: {
    total: number;
    change: string;
  };
}

type AddButtonTitle = "hotel" | "service" | "category" | "subcategory";

interface HotelStatsCard {
  payment: string;
  hotelType: string;
  totalRooms: string | number;
  contractDuration: string;
}

interface SubCategory {
  _id: string;
  title: string;
  image: string;
  category: string;
  hotel?: string;
}

interface Category {
  _id: string;
  title: string;
  hotel?: string;
  subCategories?: SubCategory[];
}

interface CommonServiceData {
  _id: string;
  title: string;
  description: string;
  logo: string;
  hotel: {
    _id: string;
    name: string;
  };
  category: Category;
  subCategory: SubCategory;
}

interface Timing {
  title: string;
  from: Date;
  to: Date;
}

interface Item {
  title: string;
  price: string;
  timing?: string;
  availability: string;
}
