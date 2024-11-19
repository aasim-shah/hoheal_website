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
