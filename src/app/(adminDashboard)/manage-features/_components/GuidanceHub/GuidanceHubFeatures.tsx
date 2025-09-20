"use client";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { message, Popconfirm, PopconfirmProps } from "antd";
import { useState } from "react";
import AddCategoriesScenariosModal from "./AddCategoriesScenariosModal";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDeleteGuidanceHubMutation } from "@/redux/api/guidanceHubApi";

export default function GuidanceHubFeatures({ data }: { data: any }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [deleteGuidanceHub] = useDeleteGuidanceHubMutation();



  const confirmBlock: PopconfirmProps["onConfirm"] = async (id) => {
    try {
      await deleteGuidanceHub(id).unwrap();
      message.success("Successfully deleted.");
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  return (
    <div className=" bg-gray-50 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {data?.map((card: any) => (
          <Card
            key={card?._id}
            className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className=" bg-gray-50 rounded-lg">
                  <Avatar className="size-11 rounded-full ">
                    <AvatarImage src={card?.image} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-semibold text-black/50">{card?.name}</h3>
                {
                  <Popconfirm
                    title="Are you sure?"
                    description="You want delete this feature?"
                    onConfirm={() => confirmBlock(card?._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <div className="ml-auto">
                      <div className="size-7 flex justify-center items-center bg-red-500 rounded-full cursor-pointer">
                        <Trash2 size={18} className="text-white" />
                      </div>
                    </div>
                  </Popconfirm>
                }
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pb-4">
              {card?.scenario?.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <Checkbox
                    id={item?.id}
                    checked
                    className="mt-0.5 bg-transparent"
                  />
                  <label
                    htmlFor={item}
                    className="text-sm text-black/40 leading-relaxed cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              ))}

              <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{moment(card?.createdAt).format("MMM DD, YYYY")}</span>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedId(card?._id);
                  setOpenEditModal(true);
                }}
                className="flex items-center gap-2"
              >
                Edit
                <Edit className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <AddCategoriesScenariosModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        selectedId={selectedId}
      />
    </div>
  );
}
