import { Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, message, Popconfirm } from "antd";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { AddContentModal } from "./AddContentModal";
import { useState } from "react";
import { useDeleteManageContentMutation } from "@/redux/api/manageContentApi";

interface PromptCardProps {
  id: string;
  title: string;
  date: string;
  status: "Pending" | "Completed";
  imageUrl: string;
}

const ManageContentDataCard = ({
  id,
  title,
  date,
  status,
  imageUrl,
}: PromptCardProps) => {
  const [openEditContent, setOpenEditContent] = useState(false);
  const [deleteManageContent] = useDeleteManageContentMutation();
  const [selectedId, setSelectedId] = useState<string>("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-blue-100 text-blue-800";
      case "archived":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const confirmBlock = async (id: string) => {
    try {
      await deleteManageContent(id).unwrap();
      message.success("Successfully deleted.");
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  return (
    <Card className="w-full  bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-2">
        <div className="flex flex-col md:flex-row items-center gap-3 ">
          {/* --------------------------- delete option ---------------- */}
          <div className="flex gap-x-2">
            {/* <div className="size-7 flex items-center justify-center rounded-full bg-red-400 cursor-pointer">
              <Trash2 className="size-5 text-white/70" />
            </div> */}

            <Popconfirm
              title="Are you sure?"
              description="You want delete this?"
              onConfirm={() => confirmBlock(id)}
              okText="Yes"
              cancelText="No"
            >
              <div className="">
                <div className="size-6 flex justify-center items-center bg-red-500 rounded-full cursor-pointer">
                  <Trash2 size={16} className="text-white" />
                </div>
              </div>
            </Popconfirm>

            {/* ---------------------------display image ------------------------------ */}
            <div className="w-28  rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={imageUrl}
                alt="content-image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* ---------------------------  details ------------------------------ */}
          <div className="flex-1 min-w-0">
            <h3
              dangerouslySetInnerHTML={{
                __html: title?.slice(0, 70) + "...",
              }}
              className="text-sm font-medium text-gray-900 leading-tight mb-2 break-words"
            ></h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            <Badge
              className={`text-xs font-medium px-2 py-1 mb-2 ${getStatusColor(
                status
              )}`}
              variant="secondary"
            >
              Status: {status}
            </Badge>
            <Button
              size={"sm"}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 text-sm font-medium group text-transparent bg-clip-text bg-gradient-to-b from-[#4E9DA6] to-[#1A2935]"
              onClick={() => {
                setSelectedId(id);
                setOpenEditContent(true);
              }}
              style={{
                border: " 1px solid var(--Linear, #4E9DA6)",
              }}
            >
              Edit
              <AnimatedArrow size={18} className="text-[#1A2935]" />
            </Button>
          </div>
        </div>
      </CardContent>
      <AddContentModal
        isOpen={openEditContent}
        onClose={() => setOpenEditContent(false)}
        onSave={() => {}}
        selectedId={selectedId}
      ></AddContentModal>
    </Card>
  );
};

export default ManageContentDataCard;
