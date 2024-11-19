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
