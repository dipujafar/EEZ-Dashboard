import { Metadata } from "next";
import LoginForm from "@/components/(auth)/login/LoginForm";
import Image from "next/image";
import logo from "@/assets/image/logo.png"

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for SoleSwap.",
};

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover origin-center relative z-0 text-main-color">
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
      <div className="flex justify-center items-center mx-auto md:px-12 px-11 py-10 rounded-[40px] bg-white text-main-color z-20 relative min-w-[500px]">
        <div>
          <Image
            src={logo}
            alt="logo"
            className="size-32 mx-auto mb-6 rounded-lg"
           
          />
          <div className="mb-6 flex flex-col justify-center items-center gap-y-4">
            <h2 className="text-2xl font-bold text-black/80">Log in to your account</h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
