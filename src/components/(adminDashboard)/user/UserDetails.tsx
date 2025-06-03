import { Avatar, Divider, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const UserDetails = ({ open, setOpen }: TPropsType) => {
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
      <div className=" ">
        <div className="flex justify-between items-center">
          <div></div>
          <div
            className="w-10 h-10 bg-transparent border border-red-500 hover:bg-red-600   rounded-full flex justify-center items-center cursor-pointer group duration-500"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine
              size={15}
              className="text-red-600 group-hover:text-red-100 group"
            />
          </div>
        </div>
        <div className="w-fit mx-auto relative">
          <Avatar src="/user_image1.png" size={150} />
        </div>
        <div className="mt-10  ">
          <div className="flex justify-between bg-[#21424617] py-3 px-2 border-b ">
            <h4>User name </h4>
            <p className="font-medium">James Tracy</p>
          </div>

          <div className="flex justify-between py-3  px-2 border-b">
            <h4>Email </h4>
            <p className="font-medium">muskantanaz@gmail.com</p>
          </div>

          <div className="flex justify-between bg-[#21424617] py-3 px-2 border-b">
            <h4>Contact Number </h4>
            <p className="font-medium">+880123456</p>
          </div>

          <div className="flex justify-between py-3 px-2 border-b">
            <h4>Date of Join </h4>
            <p className="font-medium">10 Jan, 2025</p>
          </div>

          <div className="flex justify-between bg-[#21424617] py-3 px-2 border-b">
            <h4>Location </h4>
            <p className="font-medium">Ontario, USA</p>
          </div>
          <div className="flex justify-between  py-3 px-2 border-b">
            <h4>Account Type </h4>
            <p className="font-medium">User</p>
          </div>
          <div className="flex justify-between  bg-[#21424617] py-3 px-2 border-b">
            <h4>Role</h4>
            <p className="font-medium">Employee</p>
          </div>
          <div className="flex justify-between   py-3 px-2 border-b">
            <h4>Subscription Plan </h4>
            <p className="font-medium">Basic</p>
          </div>
          <div className="flex justify-between  bg-[#21424617] py-3 px-2 border-b">
            <h4>Company name </h4>
            <p className="font-medium">N/A</p>
          </div>
          <div className="flex justify-between py-3 px-2 border-b">
            <h4>Streak Progress </h4>
            <p className="font-medium">5 days streak</p>
          </div>
          <div className="flex justify-between py-3 px-2">
            <h4>Status </h4>
            <p className="font-medium">Active</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetails;
