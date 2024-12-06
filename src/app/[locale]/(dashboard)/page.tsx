import AddNewButton from "@/components/AddNewButton";
import LineChart from "@/components/dashboard/LineChart";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("headings");

  return (
    <div className="">
      DASHBOARD
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { useTranslations } from "next-intl";

// import { Form } from "@/components/ui/form";
// import { DatePicker } from "@/components/DatePicker";
// import InputField from "@/components/InputField";
// import { Input } from "@/components/ui/input";

// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// const formSchema = z.object({
//   hotelName: z
//     .string()
//     .min(2, { message: "Hotel name must be at least 2 characters." }),
//   address: z
//     .string()
//     .min(2, { message: "Address must be at least 2 characters." }),
//   ownerName: z
//     .string()
//     .min(2, { message: "Owner name must be at least 2 characters." }),
//   hotelEmail: z.string().email({ message: "Enter a valid email." }),
//   ownerEmail: z.string().email({ message: "Enter a valid email." }),
//   hotelPhoneNumber: z
//     .string()
//     .min(10, { message: "Enter a valid phone number." }),
//   ownerPhoneNumber: z
//     .string()
//     .min(10, { message: "Enter a valid phone number." }),
//   numberOfRooms: z.string().min(1, { message: "Enter the number of rooms." }),
//   hotelType: z.string().min(2, { message: "Hotel type is required." }),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters." }),
//   periodOfContract: z
//     .string()
//     .min(1, { message: "Period of contract is required." }),
//   servicesRequested: z.string().min(2, { message: "Services are required." }),
//   startingDate: z.string().min(2, { message: "Starting date is required." }),
//   description: z
//     .string()
//     .min(10, { message: "Description must be at least 10 characters." }),
// });

// export default function AddHotel() {
//   const [step, setStep] = useState(1);
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

//   //   const form = useForm({
//   //     resolver: zodResolver(formSchema),
//   //     defaultValues: {
//   //       hotelName: "",
//   //       hotelPhoneNumber: "",
//   //       hotelEmail: "",
//   //       numberOfRooms: "",
//   //       hotelType: "",
//   //       address: "",
//   //       periodOfContract: "",
//   //       servicesRequested: "",
//   //       startingDate: "",
//   //       description: "",
//   //       country: "",
//   //       city: "",
//   //       //   logo: "",
//   //       images: "",
//   //       //   businessDocs: "",
//   //       ownerName: "",
//   //       ownerEmail: "",
//   //       ownerPhoneNumber: "",
//   //       //   profilePicture: "",
//   //       password: "",
//   //       confirmPassword: "",
//   //     },
//   //   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       hotelEmail: "",
//       password: "",
//     },
//   });

//   const labelsT = useTranslations("form.labels");
//   const placeholderT = useTranslations("form.placeholders");
//   const handleNext = () => setStep(2);
//   const handleBack = () => setStep(1);

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log({ values });
//   }

//   return (
//     <div className="w-10/12 mx-auto">
//       {/* Step Tracker */}
//       <div className="flex items-center justify-center mb-6 space-x-4">
//         <button onClick={handleBack} className="flex flex-col items-center">
//           <span
//             className={`h-8 flex justify-center items-center text-white w-8 rounded-full ${
//               step === 1 ? "bg-black" : "bg-gray-400"
//             }`}
//           >
//             1
//           </span>
//           <span
//             className={`text-sm mt-1 ${
//               step === 1 ? "text-black" : "text-gray-400"
//             }`}
//           >
//             Hotel Info
//           </span>
//         </button>
//         <div className="w-10 h-1 bg-gray-300 rounded-lg" />
//         <button onClick={handleNext} className="flex flex-col items-center">
//           <span
//             className={`h-8 flex justify-center items-center text-white w-8 rounded-full ${
//               step === 2 ? "bg-black" : "bg-gray-400"
//             }`}
//           >
//             2
//           </span>
//           <span
//             className={`text-sm mt-1 ${
//               step === 2 ? "text-black" : "text-gray-400"
//             }`}
//           >
//             User Info
//           </span>
//         </button>
//       </div>

//       {/* Form */}
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6 border rounded-lg p-4"
//         >
//           {step === 1 && (
//             <>
//               <div className="flex flex-wrap gap-5 justify-evenly">
//                 <div className="w-full lg:w-5/12">
//                   <FormField
//                     control={form.control}
//                     name="hotelEmail"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>{labelsT("hotelEmail")}</FormLabel>
//                         <FormControl>
//                           <Input
//                             className="bg-gray-100 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 {/* <InputField
//                   control={form.control}
//                   name="hotelName"
//                   label={labelsT("hotelName")}
//                   placeholder={placeholderT("hotelName")}
//                   containerClasses="w-full lg:w-5/12"
//                 /> */}
//                 {/* <InputField
//                   control={form.control}
//                   name="hotelEmail"
//                   type="email"
//                   label={labelsT("hotelEmail")}
//                   placeholder={placeholderT("hotelEmail")}
//                   containerClasses="w-full lg:w-5/12"
//                 />
//                 <InputField
//                   control={form.control}
//                   name="hotelPhoneNumber"
//                   type="tel"
//                   label={labelsT("phoneNumber")}
//                   placeholder={placeholderT("phoneNumber")}
//                   containerClasses="w-full lg:w-5/12"
//                 />
//                 <InputField
//                   control={form.control}
//                   name="country"
//                   label={labelsT("country")}
//                   placeholder={placeholderT("country")}
//                   containerClasses="w-full lg:w-5/12"
//                 />
//                 <InputField
//                   control={form.control}
//                   name="city"
//                   label={labelsT("city")}
//                   placeholder={placeholderT("city")}
//                   containerClasses="w-full lg:w-5/12"
//                 />
//                 <InputField
//                   control={form.control}
//                   name="address"
//                   label={labelsT("address")}
//                   placeholder={placeholderT("address")}
//                   containerClasses="w-full lg:w-5/12"
//                 />
//                 <InputField
//                   control={form.control}
//                   name="numberOfRooms"
//                   label={labelsT("numberOfRooms")}
//                   placeholder={labelsT("selectNumberOfRooms")}
//                   containerClasses="w-full lg:w-5/12"
//                 />
//                 <InputField
//                   control={form.control}
//                   name="hotelType"
//                   label={labelsT("hotelType")}
//                   placeholder={placeholderT("hotelType")}
//                   containerClasses="w-full lg:w-5/12"
//                 />

//                 <div className="w-full lg:w-5/12">
//                   <span className="text-sm">{labelsT("startingDate")}</span>
//                   <DatePicker date={selectedDate} setDate={setSelectedDate} />
//                 </div>
//                 <div className="w-full lg:w-5/12">
//                   <span className="text-sm">{labelsT("periodOfContract")}</span>
//                   <DatePicker date={selectedDate} setDate={setSelectedDate} />
//                 </div> */}
//                 {/* <InputField
//                   control={form.control}
//                   name="logo"
//                   type="file"
//                   label={labelsT("logo")}
//                   placeholder={labelsT("logo")}
//                   containerClasses="w-full lg:w-5/12"
//                 />
//                 <InputField
//                   control={form.control}
//                   name="businessDocs"
//                   type="file"
//                   label={labelsT("businessDocs")}
//                   placeholder={labelsT("businessDocs")}
//                   containerClasses="w-full lg:w-5/12"
//                 /> */}
//                 {/* <InputField
//                   control={form.control}
//                   name="description"
//                   label={labelsT("description")}
//                   placeholder={placeholderT("description")}
//                   type="textarea"
//                   className="h-24 resize-none"
//                   containerClasses="w-full lg:w-11/12"
//                 /> */}
//               </div>
//               <div className="w-44 mx-auto">
//                 <Button
//                   type="submit"
//                   //   onClick={handleNext}
//                   className="mt-4 w-full"
//                 >
//                   Next
//                 </Button>
//               </div>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <div className="flex flex-wrap gap-5 justify-evenly">
//                 {/* <InputField
//                   control={form.control}
//                   name="ownerName"
//                   label={labelsT("fullName")}
//                   placeholder={placeholderT("fullName")}
//                   containerClasses="w-full lg:w-5/12"
//                 /> */}
//                 {/* <InputField
//                   control={form.control}
//                   name="ownerEmail"
//                   type="email"
//                   label={labelsT("email")}
//                   placeholder={placeholderT("email")}
//                   containerClasses="w-full lg:w-5/12"
//                 />
//                 <InputField
//                   control={form.control}
//                   name="ownerPhoneNumber"
//                   type="tel"
//                   label={labelsT("phoneNumber")}
//                   placeholder={placeholderT("phoneNumber")}
//                   containerClasses="w-full lg:w-5/12"
//                 /> */}
//                 {/* <InputField
//                   control={form.control}
//                   name="profilePicture"
//                   type="file"
//                   label={labelsT("profilePicture")}
//                   placeholder={placeholderT("profilePicture")}
//                   containerClasses="w-full lg:w-5/12"
//                 /> */}
//                 {/* <InputField
//                   control={form.control}
//                   name="password"
//                   type="password"
//                   label={labelsT("password")}
//                   placeholder={placeholderT("password")}
//                   containerClasses="w-full lg:w-5/12"
//                 />
//                 <InputField
//                   control={form.control}
//                   name="confirmPassword"
//                   type="password"
//                   label={labelsT("confirmPassword")}
//                   placeholder={placeholderT("confirmPassword")}
//                   containerClasses="w-full lg:w-5/12"
//                 /> */}
//               </div>
//               <div className="w-44 mx-auto">
//                 <Button type="submit" className="mt-4 w-full">
//                   {labelsT("submit")}
//                 </Button>
//               </div>
//             </>
//           )}
//         </form>
//       </Form>
//     </div>
//   );
// }
