import { Metadata } from "next";
import VerifyEmailForm from "@/components/(auth)/verifyEmail/VerifyForm";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/image/logo.png"

export const metadata: Metadata = {
  title: "Forget Password",
};

const verifyEmail = () => {
  return (
    <div className="flex justify-center items-center min-h-screen  bg-no-repeat bg-cover origin-center relative z-0 text-main-color ">
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
      <div className="flex justify-center items-center min-w-[500px]   mx-auto text-main-color md:px-12 px-11 py-10 rounded-[40px] bg-white z-20">
        <div>
             <Image
            src={logo}
            alt="logo"
            className="size-32 mx-auto mb-6 rounded-lg"
           
          />
          <div className="mb-6  flex flex-col justify-center items-center gap-y-4">
            <div className="text-center space-y-4 mb-2">
              <div className="text-2xl  font-bold  text-center ">
                <h2 className="flex justify-center items-center text-black/90">
                  <Link href={"/forget-password"}>
                    <IoIosArrowRoundBack size={40} />
                  </Link>
                  Verify Email
                </h2>
              </div>
              <p className="text-black/90">Please enter the otp we have sent you in your email.</p>
            </div>
          </div>
          <VerifyEmailForm></VerifyEmailForm>
        </div>
      </div>
    </div>
  );
};

export default verifyEmail;
