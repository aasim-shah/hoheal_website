import * as z from "zod";

const hotelSchema = z.object({
  hotelName: z.string().min(1, { message: "Hotel name is required" }),
  rooms: z.number().min(1, { message: "Number of rooms is required" }),
  suits: z.number().min(1, { message: "Number of suits is required" }),
  hotelType: z.number().min(1, { message: "Hotel type is required" }),
  periodOfContract: z.any(),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  officialPhoneNumber: z
    .string()
    .min(1, { message: "Official phone number is required" }),
  businessEmail: z.string().email({ message: "Invalid email" }),
  servicesRequested: z
    .number()
    .min(1, { message: "Services requested are required" }),
  serviceStartDate: z.any(),
  detail: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
  logo: z.instanceof(File).nullable().optional(),

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
