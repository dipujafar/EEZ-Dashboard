"use client";
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

      <Button htmlType="submit" size="large" block >
        Send OTP
      </Button>
    </Form>
  );
};

export default ForgetPassForm;
