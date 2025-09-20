"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Error_Modal } from "@/modals";
import { useForgetPasswordMutation } from "@/redux/api/authApi";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
};

const ForgetPassForm = () => {
  const route = useRouter();
  const [forgetPass, { isLoading }] = useForgetPasswordMutation();

  //handle password change
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    try {
      const res = await forgetPass(values).unwrap();
      sessionStorage?.setItem("forgotPasswordToken", res?.data?.forgetToken);
      route.push("/verify-email");
    } catch (error: any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            message: "Please enter a valid email address!",
          },
        ]}
      >
        <Input size="large" placeholder="Email" />
      </Form.Item>

      <Button
        loading={isLoading}
        disabled={isLoading}
        style={{
          background: "linear-gradient(180deg, #4DB6AC 0.89%, #1A2935 100.89%)",
          boxShadow: "7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
        }}
        className="group"
        htmlType="submit"
        size="large"
        block
      >
        Send OTP
        <AnimatedArrow size={20} />
      </Button>
    </Form>
  );
};

export default ForgetPassForm;
