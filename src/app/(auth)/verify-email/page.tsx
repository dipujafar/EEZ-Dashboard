import { Metadata } from "next";
import VerifyEmailForm from "@/app/(auth)/verify-email/_components/VerifyForm";
import Image from "next/image";
import logo from "@/assets/image/logo.png";

export const metadata: Metadata = {
  title: "Forget Password",
};

const verifyEmail = () => {
  
  return (
    <div style={{ backgroundImage: `url("/auth-page-bg.png")` }} className="flex justify-center items-center min-h-screen  bg-no-repeat bg-cover origin-center relative z-0 text-main-color ">
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
      <div className="flex justify-center items-center min-w-[400px]   mx-auto text-main-color md:px-12 px-11 py-10 rounded-[40px] bg-white/80 z-20">
        <div>
          <Image
            src={logo}
            alt="logo"
            className="size-32 mx-auto mb-6 rounded-lg"
          />
          <div className="mb-4  space-y-0.5">
            <p className="text-black/60 text-sm">ENTER VERIFICATION CODE</p>
            <h2 className=" text-black/90 text-xl font-semibold">Verify Your Password</h2>
          </div>
          <VerifyEmailForm></VerifyEmailForm>
        </div>
      </div>
    </div>
  );
};

export default verifyEmail;
