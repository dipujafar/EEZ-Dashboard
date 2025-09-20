"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Error_Modal } from "@/modals";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  setPassword?: string;
  reSetPassword?: string;
};

const ResetPasswordForm = () => {
  const route = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const formattedData = {
      confirmPassword: values.reSetPassword,
      newPassword: values.setPassword,
    };
    try {
      await resetPassword(formattedData).unwrap();
      sessionStorage?.removeItem("resetPasswordToken");
      route.replace("/login");
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
        label="New Password"
        name="setPassword"
        rules={[
          { required: true, message: "Please set your password!" },
          {
            pattern: /^(?=.*[A-Z]).+$/,
            message: "Password must include at least one uppercase letter!",
          },
        ]}
      >
        <Input.Password size="large" placeholder="Set your password" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Confirm New Password"
        name="reSetPassword"
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("setPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password size="large" placeholder="Re-enter password" />
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
        Sign In <AnimatedArrow size={20} />
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
