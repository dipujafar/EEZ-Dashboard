import { Metadata } from "next";
import ForgetPassForm from "@/components/(auth)/forgetPassword/ForgetPassForm";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/image/logo.png";

export const metadata: Metadata = {
  title: "Forget Password",
};

const ForgetPasswordPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen  bg-no-repeat bg-cover origin-center relative z-0 text-main-color ">
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
      <div className="min-w-[500px] flex justify-center items-center    mx-auto md:px-12 px-11 py-10 rounded-[40px] bg-white text-main-color z-20">
        <div>
          <Image
            src={logo}
            alt="logo"
            className="size-32 mx-auto mb-6 rounded-lg"
          />
          <div className="mb-6  flex flex-col justify-center items-center gap-y-2">
            <div className="text-center space-y-4 mb-4">
              <div className="text-2xl  font-bold  text-center ">
                <h2 className="flex justify-center items-center text-black/90 ">
                  <Link href={"/login"}>
                    <IoIosArrowRoundBack size={40} />
                  </Link>
                  Forget Password
                </h2>
              </div>
              <p className="text-black/90">
                Please enter your email address to reset your password.
              </p>
            </div>
          </div>
          <ForgetPassForm></ForgetPassForm>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
