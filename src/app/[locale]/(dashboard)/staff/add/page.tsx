import MyImage from "@/components/MyImage";
import AddStaff from "./addStaff";
import image from "/public/images/auth.png";

export default function StaffPage() {
  return (
    <div className="flex flex-col ">
      {/* <div className=" my-10 flex items-center justify-center">
        <MyImage
          classNames="rounded-full"
          src={image}
          w={500}
          h={500}
          containerClasses="h-[18rem] rounded-full w-[18rem]"
        />
        ;
      </div> */}
      <AddStaff />
    </div>
  );
}
