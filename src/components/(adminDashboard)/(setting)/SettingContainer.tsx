"use client";
import ChangePasswordModal from "@/components/(adminDashboard)/(setting)/changePassword/ChangePasswordModal";
import { useGetUiSettingsQuery, useUpdateUiSettingsMutation } from "@/redux/api/uiSettingsApi";
import { Skeleton, Switch } from "antd";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "sonner";

const links = [
  {
    lable: "Personal Information",
    path: "personal-information",
  },
  {
    lable: "Change Password",
    path: "changePassword",
  },
  {
    lable: "Terms & Condition",
    path: "terms-condition",
  },
  {
    lable: "Privacy Policy",
    path: "privacy-policy",
  },
  {
    lable: "Schedule Feature Enabled",
    path: "schedule-feature-enabled",
  },
  {
    lable: "State Laws Enabled",
    path: "state-laws-enabled",
  },

];


const SettingContainer = () => {
  const [open, setOpen] = useState(false);
  const { data: uiSettingsData, isLoading } = useGetUiSettingsQuery(undefined);
  const [updateUiSettings] = useUpdateUiSettingsMutation();

  console.log(uiSettingsData?.data?.stateLawsEnabled);



  const onChangeScheduleFeatureEnabled = async (checked: boolean) => {
    try {
      await updateUiSettings({ scheduleFeatureEnabled: !uiSettingsData?.data?.scheduleFeatureEnabled }).unwrap();
    }
    catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong while updating schedule feature setting");
    }
  };

  const onChangeStateLawsEnabled = async (checked: boolean) => {
    try {
      await updateUiSettings({ stateLawsEnabled: !uiSettingsData?.data?.stateLawsEnabled }).unwrap();
    }
    catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong while updating state laws setting");
    }
  };



  return (
    <div className="grid grid-cols-1 gap-5">
      {links?.map((link, inx) => {
        if (link.path === "changePassword") {
          return (
            <div
              key={inx}
              onClick={() => setOpen(!open)}
              className="bg-primary-light-gray shadow-md  p-5 rounded flex justify-between items-center cursor-pointer"
            >
              <h4 className="text-text-color font-medium text-lg">
                {link?.lable}
              </h4>
              <IoIosArrowForward size={18} color="#000" />
            </div>
          );
        } else if (link.path === "schedule-feature-enabled") {
          return isLoading ? <Skeleton.Input className="!h-[62px] !w-full" /> : (
            <div className="bg-primary-light-gray shadow-md  p-5 rounded flex justify-between items-center">
              <h4 className="text-text-color font-medium text-lg">
                {link?.lable}
              </h4>
              <Switch defaultChecked={uiSettingsData?.data?.scheduleFeatureEnabled} onChange={onChangeScheduleFeatureEnabled} />
            </div>
          );
        } else if (link.path === "state-laws-enabled") {
          return isLoading ? <Skeleton.Input className="!h-[62px] !w-full" /> : (
            <div className="bg-primary-light-gray shadow-md  p-5 rounded flex justify-between items-center">
              <h4 className="text-text-color font-medium text-lg">
                {link?.lable}
              </h4>
              <Switch defaultChecked={uiSettingsData?.data?.stateLawsEnabled} onChange={onChangeStateLawsEnabled} />
            </div>
          );
        } else {
          return (
            <Link key={link.path} href={`/${link.path}`}>
              <div className="bg-primary-light-gray shadow-md  p-5 rounded flex justify-between items-center">
                <h4 className="text-text-color font-medium text-lg">
                  {link?.lable}
                </h4>
                <IoIosArrowForward size={18} color="#000" />
              </div>
            </Link>
          );
        }
      })}
      <ChangePasswordModal open={open} setOpen={setOpen}></ChangePasswordModal>
    </div>
  );
};

export default SettingContainer;
