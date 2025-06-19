import { RiDashboardHorizontalFill, RiLogoutCircleLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import Link from "next/link";
import {
  Award,
  ListChecks,
  LogOut,
  Star,
  Wallet,
  WalletCards,
} from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
  },
  {
    key: "customers",
    icon: <GoPeople size={18} />,
    label: <Link href={"/customers"}>Account Details</Link>,
  },
  {
    key: "manage-features",
    icon: <ListChecks  size={18} />,
    label: <Link href={"/manage-features"}>Manage Features</Link>,
  },
  {
    key: "manage-specialist",
    icon: <Award  size={18} />,
    label: <Link href={"/manage-specialist"}>Manage Specialist</Link>,
  },
  {
    key: "earning",
    icon: <Wallet size={18} />,
    label: <Link href={"/earning"}>Earning</Link>,
  },
  {
    key: "subscriptions",
    icon: <WalletCards size={18} />,
    label: <Link href={"/subscriptions"}>Subscriptions</Link>,
  },
  {
    key: "manage-content-type",
    icon: <Star size={18} />,
    label: <Link href={"/manage-content-type"}>Manage Content Type</Link>,
  },
  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/settings"}>Settings</Link>,
  },
  {
    key: "logout",
    icon: <LogOut size={18} />,
    label: <Link href={"/login"} className="!text-[#5F1011]">Logout</Link>,
  }
  //   {
  //     key: "user-request",
  //     icon: <PiListPlusFill size={20} />,
  //     label: <Link href={"/user-request"}>User Request</Link>,
  //   },
  // {
  //     key: "team-member",
  //     icon: <GoPeople size={18} />,
  //     label: <Link href={"/user"}>Team Member</Link>,
  //   },

  //   {
  //     key: "settings",
  //     icon: <IoSettingsOutline size={18} />,
  //     label: <Link href={"/settings"}>Settings</Link>,
  //   },
];
