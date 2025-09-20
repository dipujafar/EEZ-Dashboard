import { useChangePasswordMutation } from "@/redux/api/authApi";
import { Button, ConfigProvider, Form, Input, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const ChangePasswordModal = ({ open, setOpen }: TPropsType) => {
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  // const [openModal, setOpenModal] = useState(false);

  // @ts-expect-error: Ignoring TypeScript error due to inferred 'any' type for 'values' which is handled in the form submit logic
  const handleSubmit = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      return toast.error("Password doesn't match with confirm password");
    }
    try {
      await changePassword(values).unwrap();
      toast.success("Successfully Change password", {
        duration: 1000,
      });
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
      <Modal
        open={open}
        footer={null}
        centered={true}
        onCancel={() => setOpen(false)}
        closeIcon={false}
        style={{
          minWidth: "max-content",
        }}
      >
        <div className="py-14">
          <div
            className="w-12 h-12 bg-main-color  absolute top-2 right-2 rounded-full cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine
              size={18}
              color="#fff"
              className="absolute top-1/3 left-1/3"
            />
          </div>

          {/* header */}
          <div>
            <h4 className=" text-2xl font-medium text-center">
              Change Password
            </h4>
            <p className="mt-1 text-center">
              Your password must be 8-10 character long.
            </p>
          </div>

          {/* form */}
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorBgContainer: "",
                  colorText: "#000",
                   colorTextPlaceholder: "#808080",
                },
                Form: {
                  labelColor: "var(--color-primary-gray)",
                  labelFontSize: 14,
                },
              },
            }}
          >
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              style={{
                maxWidth: 500,
                marginTop: "25px",
              }}
            >
              {/*  input old password */}
              <Form.Item
                label="Old Password"
                name="oldPassword"
                rules={[
                  { required: true, message: "Please Enter Old Password" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter old password "
                />
              </Form.Item>

              {/*  input  new Password*/}
              <Form.Item
                label="New password"
                name="newPassword"
                rules={[
                  { required: true, message: "Please Enter New  Password" },
                ]}
              >
                <Input.Password size="large" placeholder="Set new password" />
              </Form.Item>

              {/* input  confirm number  */}
              <Form.Item
                label="Re-enter new password"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please Re-enter new password" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter new password"
                />
              </Form.Item>

              {/* <p
                onClick={() => {
                  setOpen(false);
                  setOpenModal(true);
                }}
                className="mb-5 font-medium cursor-pointer text-gray-600"
              >
                Forget password?
              </p> */}

              <Button
                htmlType="submit"
                size="large"
                block
                className="!py-6 border-main-color"
                loading={isLoading}
              >
                Update Password
              </Button>
            </Form>
          </ConfigProvider>
        </div>
      </Modal>
      {/* forget password Modal */}
      {/* <ForgetPasswordModal
        open={openModal}
        setOpen={setOpenModal}
      ></ForgetPasswordModal> */}
    </>
  );
};

export default ChangePasswordModal;
