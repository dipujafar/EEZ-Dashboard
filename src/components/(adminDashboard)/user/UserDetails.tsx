import { TUserDataType } from "@/types";
import { Avatar, Image, Modal } from "antd";
import { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  data: TUserDataType | null;
};

const UserDetails = ({ open, setOpen, data }: TPropsType) => {
  const [currentData, setCurrentData] = useState<TUserDataType | null>(null);

  console.log(currentData);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);
  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "max-content",
        position: "relative",
      }}
    >
      <div>
        <div className="flex justify-between items-center">
          <div></div>
          <div
            className="size-8 bg-transparent border border-red-500 hover:bg-red-600   rounded-full flex justify-center items-center cursor-pointer group duration-500"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine
              size={14}
              className="text-red-600 group-hover:text-red-100 group"
            />
          </div>
        </div>
        <div className="w-fit mx-auto relative">
          <Image src={currentData?.profileImage} width={150} height={150} className="rounded-full" />
        </div>
        <div className="mt-10  ">
          <div className="flex justify-between bg-[#21424617] py-3 px-2 border-b ">
            <h4>User name </h4>
            <p className="font-medium">{currentData?.name}</p>
          </div>

          <div className="flex justify-between py-3  px-2 border-b">
            <h4>Email </h4>
            <p className="font-medium">{currentData?.email}</p>
          </div>

          <div className="flex justify-between bg-[#21424617] py-3 px-2 border-b">
            <h4>Contact Number </h4>
            <p className="font-medium">{currentData?.contactNumber}</p>
          </div>

          <div className="flex justify-between py-3 px-2 border-b">
            <h4>Date of Join </h4>
            <p className="font-medium">{currentData?.date}</p>
          </div>

          {/* <div className="flex justify-between bg-[#21424617] py-3 px-2 border-b">
            <h4>Location </h4>
            <p className="font-medium">Ontario, USA</p>
          </div> */}
          {/* <div className="flex justify-between  py-3 px-2 border-b">
            <h4>Account Type </h4>
            <p className="font-medium">User</p>
          </div> */}
          <div className="flex justify-between bg-[#21424617]   py-3 px-2 border-b">
            <h4>Role</h4>
            <p className="font-medium">{data?.type}</p>
          </div>
          {/* <div className="flex justify-between bg-[#21424617]   py-3 px-2 border-b">
            <h4>Subscription Plan </h4>
            <p className="font-medium">Basic</p>
          </div> */}
          <div className="flex justify-between   py-3 px-2 border-b">
            <h4>Company name </h4>
            <p className="font-medium">{data?.companyName}</p>
          </div>
          {/* <div className="flex justify-between bg-[#21424617] py-3 px-2 border-b">
            <h4>Streak Progress </h4>
            <p className="font-medium">5 days streak</p>
          </div> */}
          <div className="flex justify-between  bg-[#21424617]  py-3 px-2 border-b">
            <h4>Status </h4>
            <p className="font-medium">{data?.status}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetails;
