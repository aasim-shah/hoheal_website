import * as z from "zod";

const hotelSchema = z.object({
  hotelName: z.string().min(1, { message: "Hotel name is required" }),
  numberOfRooms: z.string().min(1, { message: "Number of rooms is required" }),
  hotelType: z.string().min(1, { message: "Hotel type is required" }),
  periodOfContract: z.any(),
  businessLocation: z
    .string()
    .min(1, { message: "Business location is required" }),
  officialPhoneNumber: z
    .string()
    .min(1, { message: "Official phone number is required" }),
  businessEmail: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
  servicesRequested: z
    .string()
    .min(1, { message: "Services requested are required" }),
  serviceStartDate: z.any(),
  detail: z.string().optional(),
  logo: z.any().optional(),
  images: z.any().optional(),

  ownerName: z.string().min(1, { message: "Owner name is required" }),
  ownerPhoneNumber: z
    .string()
    .min(1, { message: "Owner phone number is required" }),
  ownerEmail: z.string().email({ message: "Invalid email address" }),
  registrationNumber: z.string().optional(),
  ownerPassword: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
  confirmOwnerPassword: z.string().min(4, { message: "Password must match" }),
  ownerProfilePicture: z.any().optional(),
});

export default hotelSchema;
