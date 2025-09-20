import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Briefcase, Trash2 } from "lucide-react";
import Link from "next/link";
import { message, Popconfirm } from "antd";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { useDeleteHrAdminMutation } from "@/redux/api/hrAdminApi";

const randomColorPick = (index: number) => {
  const color = Math.floor(Math.random() * 3000000 * index + 2).toString(16);
  return "#" + color;
};

export default function HRServices({ data }: any) {
  const [deleteSpecialist] = useDeleteHrAdminMutation();

  console.log(data)

  const confirmBlock= async (id: string) => {
    try {
      await deleteSpecialist(id).unwrap();
      message.success("Successfully deleted.");
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
        {data?.map((specialist: any) => (
          <Card
            key={specialist?._id}
            className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-4 md:p-6 relative flex flex-col h-full">
              <Popconfirm
                title="Are you sure?"
                description="You want delete this service?"
                onConfirm={() => confirmBlock(specialist?._id)}
                okText="Yes"
                cancelText="No"
              >
                <div className="absolute top-2 right-2 bg-red-500 hover:bg-red-800 cursor-pointer  size-6 flex justify-center items-center rounded-full">
                  <Trash2 size={16} className="text-white" />
                </div>
              </Popconfirm>
              {/* Profile Section */}
              <div className="">
                <div className="flex items-center  gap-3 mb-4">
                  <div className="relative">
                    <Avatar className="size-12">
                      <AvatarImage
                        src={specialist?.user?.profile?.profileImage}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {specialist?.user?.profile?.firstName?.charAt(0) +
                          specialist?.user?.profile?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {specialist?.user?.profile?.firstName +
                        specialist?.user?.profile?.lastName}
                    </h3>
                  </div>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {specialist?.expertise
                    ?.slice(0, 3)
                    ?.map((tag: any, index: number) => (
                      <Badge
                        key={index}
                        style={{ backgroundColor: randomColorPick(index) }}
                        className={`border-0 text-xs font-medium px-2 py-1 rounded-full`}
                      >
                        {tag}
                      </Badge>
                    ))}

                  {specialist?.expertise?.length > 3 && (
                    <Badge
                      className={`bg-[#FF7D00]/70 border-0 text-xs font-medium px-2 py-1 rounded-full`}
                    >
                      ...
                    </Badge>
                  )}
                </div>

                <hr />

                {/* Title */}
                <div className="flex items-start gap-2 my-3">
                  <Briefcase className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: specialist?.description?.slice(0, 100) + "...",
                    }}
                    className="break-words"
                  ></p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {moment(specialist?.createdAt).format("ll")}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <div className="mt-auto">
                <Link
                  href={`/manage-specialist/add-hr-service?id=${specialist?._id}`}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 hover:bg-gray-50 text-[#4E9DA6] border-t-[#59b0ba] border-l-[#448b93] border-b-[#32656a] border-r-[#2a5256]"
                  >
                    Edit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
