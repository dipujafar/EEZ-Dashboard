"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  setPassword?: string;
  reSetPassword?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ResetPasswordForm = () => {
  const route = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    route.push("/login");
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
        label="New Password"
        name="setPassword"
        rules={[{ required: true, message: "Please your set password!" }]}
      >
        <Input.Password size="large" placeholder="Set your password" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Confirm New Password"
        name="reSetPassword"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" placeholder="Re-enter password" />
      </Form.Item>
      <Button
        style={{
          background: "linear-gradient(180deg, #4DB6AC 0.89%, #1A2935 100.89%)",
          boxShadow: "7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
        }}
        className="group"
        htmlType="submit"
        size="large"
        block
      >
        Sign In <AnimatedArrow size={20}/>
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
