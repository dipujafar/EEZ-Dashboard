import { Metadata } from "next";
import ForgetPassForm from "@/app/(auth)/forget-password/_components/ForgetPassForm";
import Image from "next/image";
import logo from "@/assets/image/logo.png";

export const metadata: Metadata = {
  title: "Forget Password",
};

const ForgetPasswordPage = () => {
  return (
    <div
      style={{ backgroundImage: `url("/auth-page-bg.png")` }}
      className="flex justify-center items-center min-h-screen  bg-no-repeat bg-cover origin-center relative z-0 text-main-color "
    >
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
      <div className="min-w-[500px] flex justify-center items-center    mx-auto md:px-12 px-11 py-10 rounded-[40px] bg-white/80 text-main-color z-20">
        <div>
          <Image
            src={logo}
            alt="logo"
            className="size-32 mx-auto mb-6 rounded-lg"
          />
          <div className="mb-4">
            <div>
              <p className="text-black/60 text-sm">
               ENTER EMAIL ADDRESS TO RECEIVE VERFICATION CODE
              </p>
              <div className="text-xl  font-bold  ">
                <h2 className="flex  items-center text-black/90 ">
                 
                  Forget Password
                </h2>
              </div>
            </div>
          </div>
          <ForgetPassForm></ForgetPassForm>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
