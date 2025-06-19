"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ForgetPassForm = () => {
  const route = useRouter();

  //handle password change
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);

    if (values.email) {
      route.push("/verify-email");
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

      <Button style={{background: "linear-gradient(180deg, #4DB6AC 0.89%, #1A2935 100.89%)", boxShadow: "7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset"}} className="group" htmlType="submit" size="large" block >
        Send OTP
        <AnimatedArrow size={20} />
      </Button>
    </Form>
  );
};

export default ForgetPassForm;
