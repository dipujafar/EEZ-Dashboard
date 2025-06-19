import { Metadata } from "next";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import ResetPasswordForm from "@/app/(auth)/reset-password/_components/ResetPasswordForm";
import logo from "@/assets/image/logo.png";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Forget Password",
};

const ResetPassword = () => {
  return (
    <div style={{ backgroundImage: `url("/auth-page-bg.png")` }}  className="flex justify-center items-center min-h-screen  bg-no-repeat bg-cover origin-center relative z-0 text-main-color ">
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
      <div className="flex justify-center items-center min-w-[500px]   mx-auto   md:px-12 px-11 py-10 rounded-[40px] bg-white/80 z-20 ">
        <div className="w-full">
          <Image
            src={logo}
            alt="logo"
            className="size-32 mx-auto  rounded-lg"
          />
          <p className="text-black/80">SAVE NEW PASSWORD</p>
          <h2 className="text-black/90 text-xl font-semibold mb-4">
            Set New Password
          </h2>

          <ResetPasswordForm></ResetPasswordForm>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
