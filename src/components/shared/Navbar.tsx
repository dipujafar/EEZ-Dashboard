"use client";
import { Avatar, Badge, Flex } from "antd";
import { FaBars } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
import { X } from "lucide-react";
import useGreeting from "@/hooks/useGreeting";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useGetNotificationsQuery, useMarkedRedMutation } from "@/redux/api/notificationApi";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {
  const greeting = useGreeting();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {data: notificationData} = useGetNotificationsQuery({});
  const [markAllAsRead] = useMarkedRedMutation();
  const {data: profileData} = useGetMyProfileQuery({});

  console.log(profileData?.data?.profile);

  // console.log(notificationData?.data);
  const unReadNotifications = notificationData?.data?.reduce((total: number, notification: any) => total + (notification?.isRead ? 0 : 1), 0);

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead({}).unwrap();
      router.push("/notifications");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="flex items-center justify-between w-[97%] font-poppins text-text-color xl:px-8 px-4">
      {/* Header left side */}
      <Flex align="center" gap={20}>
        <button
          onClick={() => setCollapsed(collapsed ? false : true)}
          className="cursor-pointer hover:bg-gray-300 rounded-full duration-1000"
        >
          {collapsed ? (
            <X size={20} className="text-primary-gray" />
          ) : (
            <FaBars size={20} className="text-primary-gray" />
          )}
        </button>
        <div className="flex flex-col ">
          <h2 className="text-lg  font-medium">
            Dashboard
            <span className="block  text-sm font-normal">
              {greeting}, {profileData?.data?.profile?.firstName + " " + profileData?.data?.profile?.lastName} 
            </span>
          </h2>
        </div>
      </Flex>

      {/* Header right side */}
      <Flex align="center" gap={20}>
        {/* Notification */}
        <div  onClick={handleMarkAllAsRead} className="cursor-pointer">
          <div className="flex justify-center items-center size-10  rounded-full cursor-pointer relative border border-main-color">
            <IoNotificationsOutline size={24} color="#AB9D6E" />

           { unReadNotifications > 0 && <Badge
              count={unReadNotifications > 99 ? "99+" : unReadNotifications}
              style={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "var(--color-main)",
                color: "#fff",
                position: "absolute",
                top: "-24px",
                right: "-8px",
                fontSize: "10px",
              }}
            ></Badge>}
          </div>
        </div>

        {/* user profile */}
        <Menubar className="py-8 border-none shadow-none px-0 border ">
          <MenubarMenu>
            <MenubarTrigger className="shadow-none px-0">
              <div
                className={cn(
                  " text-black flex items-center gap-x-1 cursor-pointer"
                )}
              >
                <Avatar
                  src={profileData?.data?.profile?.profileImage}
                  size={40}
                  className="border border-main-color size-16"
                ></Avatar>
                <h4
                  className={cn(
                    "text-base font-medium truncate flex-1",
                    collapsed && "hidden"
                  )}
                >
                  {profileData?.data?.profile?.firstName + " " + profileData?.data?.profile?.lastName}
                </h4>
              </div>
            </MenubarTrigger>
            <MenubarContent className="text-primary-gray">
              <Link href={"/personal-information"}>
                <MenubarItem className="hover:bg-gray-100 cursor-pointer">
                  Profile{" "}
                  <MenubarShortcut>
                    <ChevronRight size={16} />
                  </MenubarShortcut>
                </MenubarItem>
              </Link>
              <MenubarSeparator />

              <MenubarItem
                onClick={() => {
                  dispatch(logout());
                  router.refresh();
                }}
                className="hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Flex>
    </div>
  );
};

export default Navbar;
