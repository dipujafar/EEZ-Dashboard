"use client";

import { Button } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";
import SettingPagesSkeleton from "../Skeleton/SettingPagesSkeleton";
import {
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
} from "@/redux/api/contentApi";
import { toast } from "sonner";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PrivacyPolicyEditor = () => {
  const route = useRouter();
  const { data, isLoading } = useGetPrivacyQuery(undefined);
  const [value, setValue] = useState(data?.data?.body ? data?.data?.body : "");
  const [updatePrivacy, { isLoading: updatePrivacyLoading }] =
    useUpdatePrivacyMutation();

  useEffect(() => {
    setValue(data?.data?.body ? data?.data?.body : "");
  }, [data?.data?.body]);

  if (isLoading) {
    return <SettingPagesSkeleton />;
  }

  const toolbarOptions = [
    ["image"],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ];

  const moduleConest = {
    toolbar: toolbarOptions,
  };

  // handle update privacy
  const handleUpdatePrivacy = async () => {
   
    try {
      await updatePrivacy({ body: value }).unwrap();
      toast.success("Privacy updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <span
          onClick={() => route.back()}
          className="cursor-pointer bg-main-color p-2 rounded-full"
        >
          <FaArrowLeft size={20} color="#fff" />
        </span>
        <h4 className="text-2xl font-medium text-text-color">Privacy Policy</h4>
      </div>
      <ReactQuill
        modules={moduleConest}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Start writing ......"
        style={{
          border: "1px solid #EFE8FD",
          marginTop: "20px",
          borderRadius: "10px",
          backgroundColor: "#68c0a114",
        }}
      />
      <Button
        onClick={handleUpdatePrivacy}
        size="large"
        block
        disabled={updatePrivacyLoading}
        style={{
          marginTop: "20px",
        }}
      >
        Save Changes {updatePrivacyLoading && "..."}
      </Button>
    </>
  );
};

export default dynamic(() => Promise.resolve(PrivacyPolicyEditor), {
  ssr: false,
});
