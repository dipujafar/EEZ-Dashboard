import { Metadata } from "next";
import LoginForm from "@/app/(auth)/login/_components/LoginForm";
import Image from "next/image";
import logo from "@/assets/image/logo.png"

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for SoleSwap.",
};

const LoginPage = () => {
  return (
    <div style={{ backgroundImage: `url("/auth-page-bg.png")` }} className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover origin-center relative z-0 text-main-color">
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
      <div className="flex justify-center items-center mx-auto md:px-12 px-11 py-10 rounded-[40px] bg-white/80 text-main-color z-20 relative min-w-[500px]">
        <div>
          <Image
            src={logo}
            alt="logo"
            className="size-32 mx-auto mb-6 rounded-lg"
           
          />
          <div className="mb-4 ">
            <p className="text-sm text-black/60">WELCOME BACK</p>
            <h2 className="text-xl font-bold text-black/80">Sign In to your Account</h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
