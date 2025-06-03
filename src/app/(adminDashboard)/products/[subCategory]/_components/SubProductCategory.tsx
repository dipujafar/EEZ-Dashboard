"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { message, Popconfirm, PopconfirmProps } from "antd";
import { useState } from "react";
import AddCategory from "@/components/shared/AddCategory";

// Service categories data array
const serviceCategories = [
  {
    id: 4,
    name: "Electricians",
    icon: "/category_light.png",
    iconColor: "text-green-600",
  },
  {
    id: 5,
    name: "Mechanics",
    icon: "/category_mechanics.png",
    iconColor: "text-blue-600",
  },
  {
    id: 6,
    name: "Electricians",
    icon: "/category_light.png",
    iconColor: "text-green-600",
  },
  {
    id: 7,
    name: "IT Services",
    icon: "/category_computer.png",
    iconColor: "text-green-600",
  },
  {
    id: 8,
    name: "Electricians",
    icon: "/category_light.png",
    iconColor: "text-green-600",
  },
  {
    id: 9,
    name: "Mechanics",
    icon: "/category_mechanics.png",
    iconColor: "text-blue-600",
  },
];

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Successfully deleted");
};

// Individual service card component
function ServiceCard({
  category,
}: {
  category: (typeof serviceCategories)[0];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card className="p-4 flex flex-col items-center space-y-3 hover:shadow-md transition-shadow border-[#BBBBBB]">
        <div className="border-2 rounded-full border-[#268A7E] p-1.5">
          <Image
            src={category.icon}
            alt={category.name}
            width={70}
            height={70}
            className="size-[70px] object-cover"
          />
        </div>

        <h3 className="text-sm font-medium text-gray-900 text-center">
          {category.name}
        </h3>

        <div className="flex space-x-2">
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <Button
              variant="outline"
              className="text-xs px-3 py-1 h-6 border-[#74D5B3] text-[#74D5B3] flex-1"
            >
              Delete
            </Button>
          </Popconfirm>
          <Button
            onClick={() => setOpen(true)}
            className="text-xs px-3 py-1 h-6 bg-[#74D5B3] hover:bg-[#268A7E] text-white w-[60px]"
          >
            Edit
          </Button>
        </div>
      </Card>

      <AddCategory open={open} setOpen={setOpen} title="Edit Category" />
    </>
  );
}

// Main component
export default function SubProductCategory() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center flex-wrap xl:mb-6 mb-4 ">
        <h3 className="lg:text-2xl text-xl font-medium">Electricians</h3>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-[#74D5B3] hover:bg-[#268A7E]"
        >
          <Plus />
          Add Sub Category
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="w-full lg:w-1/3 bg-[#F9F9FA]">
          <Card className="px-4 py-8 flex flex-col items-center space-y-3 hover:shadow-md transition-shadow border-[#BBBBBB] bg-[#F9F9FA]">
            <div className="border-2 rounded-full border-[#268A7E] p-1.5">
              <Image
                src={serviceCategories?.[0]?.icon}
                alt={serviceCategories?.[0]?.name}
                width={70}
                height={70}
                className="size-[100px] object-cover"
              />
            </div>

            <h3 className="text-xl font-medium text-gray-900 text-center">
              {serviceCategories?.[0]?.name}
            </h3>
          </Card>
        </div>

        <div className="p-6 bg-[#F9F9FA] min-h-[calc(100vh-120px)] rounded-lg border  border-[#BBBBBB] ">
          <div>
            <div className=" rounded-lg  shadow-sm">
              <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {serviceCategories.map((category) => (
                  <ServiceCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddCategory open={open} setOpen={setOpen} title="Add new category" />
    </>
  );
}
