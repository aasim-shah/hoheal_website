import Image from "next/image";
import LoginForm from "../../../../components/forms/LoginForm";
import image from "/public/images/auth.png";

const page = () => {
  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Form part */}
      <div className="flex h-full items-center justify-center">
        <LoginForm />
      </div>
      {/* Image part */}
      <div className="hidden lg:block relative">
        <Image src={image} alt="login" priority fill />
      </div>
    </div>
  );
};

export default page;
