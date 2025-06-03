"use client";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  opt?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const VerifyEmailForm = () => {
  const route = useRouter();

  //handle password change
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);

    if (values.opt) {
      route.push("/reset-password");
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
      <Form.Item<FieldType> name="opt">
        <Input.OTP size="large" />
      </Form.Item>

      <Button htmlType="submit" size="large" block>
        Verify Email
      </Button>
    </Form>
  );
};

export default VerifyEmailForm;
