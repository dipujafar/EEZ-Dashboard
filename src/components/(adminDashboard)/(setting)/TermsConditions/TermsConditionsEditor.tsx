"use client";

import {
  useGetTermsQuery,
  useUpdateTermsMutation,
} from "@/redux/api/contentApi";
import { Button } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import SettingPagesSkeleton from "../Skeleton/SettingPagesSkeleton";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TermsConditionsEditor = () => {
  const route = useRouter();
  const { data, isLoading } = useGetTermsQuery(undefined);
  const [updateTerms, { isLoading: updateTermsLoading }] =
    useUpdateTermsMutation();
  const [value, setValue] = useState(data?.data?.body ? data?.data?.body : "");





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

  // handle update terms
  const handleUpdateTerms = async () => {
    
    try {
      await updateTerms({ body: value }).unwrap();
      toast.success("Terms updated successfully");
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
        <h4 className="text-2xl font-medium text-text-color">
          Terms & Conditions
        </h4>
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
          background: "#68c0a114",
        }}
      />
      <Button
        onClick={handleUpdateTerms}
        size="large"
        block
        disabled={updateTermsLoading}
        style={{
          marginTop: "20px",
        }}
      >
        Save Changes {updateTermsLoading && "..."}
      </Button>
    </>
  );
};

export default dynamic(() => Promise.resolve(TermsConditionsEditor), {
  ssr: false,
});
