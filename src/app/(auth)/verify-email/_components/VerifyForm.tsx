"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Error_Modal } from "@/modals";
import { useVerifyOtpMutation } from "@/redux/api/authApi";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  otp?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const VerifyEmailForm = () => {
  const route = useRouter();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  //handle password change
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await verifyOtp(values).unwrap();
      sessionStorage?.setItem("resetPasswordToken", res?.data?.resetToken);
      sessionStorage?.removeItem("forgotPasswordToken");
       route.replace("/reset-password");
    } catch (error: any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FieldType> name="otp">
        <Input.OTP size="large" length={4} />
      </Form.Item>

      <Button
        disabled={isLoading}
        loading={isLoading}
        style={{
          background: "linear-gradient(180deg, #4DB6AC 0.89%, #1A2935 100.89%)",
          boxShadow: "7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
        }}
        className="group"
        htmlType="submit"
        size="large"
        block
      >
        Verify Email <AnimatedArrow size={20} />
      </Button>
    </Form>
  );
};

export default VerifyEmailForm;
