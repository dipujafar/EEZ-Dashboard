import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Briefcase, Trash2 } from "lucide-react";
import Link from "next/link";
import { message, Pagination, Popconfirm, PopconfirmProps } from "antd";

interface Specialist {
  id: number;
  name: string;
  avatar: string;
  tags: Array<{
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    color: string;
  }>;
  title: string;
  date: string;
}

const specialists: Specialist[] = [
  {
    id: 1,
    name: "Jessica Martinez",
    avatar: "/hr-image.png",
    tags: [
      {
        label: "Harassment",
        variant: "default",
        color: "bg-blue-100 text-blue-800",
      },
      {
        label: "Conflict resolution",
        variant: "secondary",
        color: "bg-green-100 text-green-800",
      },
    ],
    title: "Certified HR Advisor & Workplace Conflict Specialist",
    date: "May 21, 2025",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/hr-image.png",
    tags: [
      {
        label: "Employee Relations",
        variant: "default",
        color: "bg-purple-100 text-purple-800",
      },
      {
        label: "Mediation",
        variant: "secondary",
        color: "bg-orange-100 text-orange-800",
      },
    ],
    title: "Senior HR Consultant & Employee Relations Expert",
    date: "May 18, 2025",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    avatar: "/hr-image.png",
    tags: [
      {
        label: "Workplace Safety",
        variant: "default",
        color: "bg-red-100 text-red-800",
      },
      {
        label: "Compliance",
        variant: "secondary",
        color: "bg-yellow-100 text-yellow-800",
      },
    ],
    title: "HR Compliance Officer & Safety Coordinator",
    date: "May 15, 2025",
  },
  {
    id: 4,
    name: "David Rodriguez",
    avatar: "/hr-image.png",
    tags: [
      {
        label: "Training",
        variant: "default",
        color: "bg-indigo-100 text-indigo-800",
      },
      {
        label: "Development",
        variant: "secondary",
        color: "bg-teal-100 text-teal-800",
      },
    ],
    title: "Learning & Development Specialist",
    date: "May 12, 2025",
  },
  {
    id: 5,
    name: "Emily Thompson",
    avatar: "/hr-image.png",
    tags: [
      {
        label: "Recruitment",
        variant: "default",
        color: "bg-pink-100 text-pink-800",
      },
      {
        label: "Talent Acquisition",
        variant: "secondary",
        color: "bg-cyan-100 text-cyan-800",
      },
    ],
    title: "Senior Talent Acquisition Manager",
    date: "May 09, 2025",
  },
  {
    id: 6,
    name: "Robert Kim",
    avatar: "/hr-image.png",
    tags: [
      {
        label: "Benefits",
        variant: "default",
        color: "bg-lime-100 text-lime-800",
      },
      {
        label: "Compensation",
        variant: "secondary",
        color: "bg-amber-100 text-amber-800",
      },
    ],
    title: "Compensation & Benefits Analyst",
    date: "May 06, 2025",
  },
];

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Successfully deleted.");
};

const randomColorPick = (index: number) => {
  const color = Math.floor(Math.random() * 3000000 * index + 2).toString(16);
  return "#" + color;
};

export default function HRServices({ data }: any) {
  console.log(data);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
        {data?.map((specialist: any) => (
          <Card
            key={specialist.id}
            className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-4 md:p-6 relative flex flex-col h-full">
              <Popconfirm
                title="Are you sure?"
                description="You want delete this service?"
                onConfirm={confirmBlock}
                okText="Yes"
                cancelText="No"
              >
                <div className="absolute top-2 right-2 bg-red-500 hover:bg-red-800 cursor-pointer  size-6 flex justify-center items-center rounded-full">
                  <Trash2 size={16} className="text-white" />
                </div>
              </Popconfirm>
              {/* Profile Section */}
              <div className="">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <Image
                      src={
                        specialist?.user?.profile?.profileImage ||
                        "/placeholder.svg"
                      }
                      alt={specialist.name}
                      width={54}
                      height={54}
                      className="rounded-full size-12 object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {specialist.name}
                    </h3>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {specialist?.expertise?.slice(0, 3)?.map((tag: any, index: number) => (
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
                  </div>
                </div>

                <hr />

                {/* Title */}
                <div className="flex items-start gap-2 my-3">
                  <Briefcase className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {specialist?.description}
                  </p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {specialist.date}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <div className="mt-auto">
                <Link href={"/manage-specialist/add-hr-service"}>
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

      <div className="w-fit ml-auto mt-5">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}
