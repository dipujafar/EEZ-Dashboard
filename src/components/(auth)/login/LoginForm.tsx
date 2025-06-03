"use client";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = () => {
  const route = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    route.push("/dashboard");
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      style={{ width: "354px" }}
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
        <Input size="large" type="email" placeholder="User Email" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" placeholder="Password" />
      </Form.Item>

      <Form.Item<FieldType> name="remember" valuePropName="checked">
        <Flex justify="space-between" align="center">
          <Checkbox>
            <p className=" font-semibold text-[#818181]">Remember me</p>
          </Checkbox>
          <Link href={"/forget-password"} style={{ textDecoration: "" }}>
            <p className="font-semibold text-[#091A72]">Forgot Password?</p>
          </Link>
        </Flex>
      </Form.Item>

      <Button htmlType="submit" size="large" block >
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
