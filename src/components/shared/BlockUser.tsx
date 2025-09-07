import { useBlockUserMutation } from "@/redux/api/usersApi";
import { message, Popconfirm, PopconfirmProps } from "antd";
import { CgUnblock } from "react-icons/cg";
import { toast } from "sonner";

export default function BlockUser({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [blockUser, { isLoading }] = useBlockUserMutation();
  const confirmBlock: PopconfirmProps["onConfirm"] = async (e) => {
    try {
      await blockUser({ id, status: true }).unwrap();
      message.success("Blocked the user");
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };
  const unblockUser: PopconfirmProps["onConfirm"] = async (e) => {
    try {
      await blockUser({ id, status: false }).unwrap();
      message.success("Unblocked the user");
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  if (status === "blocked") {
    return (
      <Popconfirm
        title="Unblock the user"
        description="Are you sure to unblock this user?"
        onConfirm={unblockUser}
        okText="Yes"
        cancelText="No"
      >
        <div className="bg-[#012e10]"></div>
        <CgUnblock size={22} color="#012e10" />
      </Popconfirm>
    );
  }

  return (
    <Popconfirm
      title="Block the user"
      description="Are you sure to block this user?"
      onConfirm={confirmBlock}
      okText="Yes"
      cancelText="No"
    >
      <CgUnblock size={22} color="#CD0335" />
    </Popconfirm>
  );
}
