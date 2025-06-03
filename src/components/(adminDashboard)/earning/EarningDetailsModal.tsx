import { Avatar, Divider, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const EarningDetailsModal = ({ open, setOpen }: TPropsType) => {
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
        <div className="mt-10 ">
          <div className="flex justify-between bg-[#21424617] py-3 px-2 border-b">
            <h4>User name :</h4>
            <p className="font-medium">James Tracy</p>
          </div>

          <div className="flex justify-between  py-3 px-2 border-b">
            <h4>Email :</h4>
            <p className="font-medium">muskantanaz@gmail.com</p>
          </div>

          <div className="flex justify-between bg-[#21424617] py-3 px-2 border-b">
            <h4>Transaction ID : :</h4>
            <p className="font-medium">#123456</p>
          </div>

          <div className="flex justify-between  py-3 px-2 border-b">
            <h4>Date :</h4>
            <p className="font-medium">05/17/2025 </p>
          </div>

          <div className="flex justify-between bg-[#21424617] py-3 px-2 border-b">
            <h4>A/C number :</h4>
            <p className="font-medium">**** **** **** *545</p>
          </div>

          <div className="flex justify-between  py-3 px-2 border-b">
            <h4>Transaction amount :</h4>
            <p className="font-medium">$100</p>
          </div>

          <div className="flex justify-between bg-[#21424617] py-3 px-2 border-b">
            <h4>Package : </h4>
            <p className="font-medium">Premium Plan</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EarningDetailsModal;
