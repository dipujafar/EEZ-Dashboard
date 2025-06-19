"use client";

import {
  Calendar,
  Edit,
  Users,
  Scale,
  AlertTriangle,
  Briefcase,
  TrendingUp,
  Trash2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, message, Popconfirm, PopconfirmProps } from "antd";
import { useState } from "react";
import AddCategoriesScenariosModal from "./AddCategoriesScenariosModal";

interface AssessmentItem {
  id: string;
  text: string;
  checked: boolean;
}

interface WorkplaceCard {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
  items: AssessmentItem[];
  date: string;
  hasAlert?: boolean;
}

const iconMap = {
  users: Users,
  scale: Scale,
  alert: AlertTriangle,
  briefcase: Briefcase,
  trending: TrendingUp,
};

const workplaceData: WorkplaceCard[] = [
  {
    id: "workplace-dynamics",
    title: "Workplace Dynamics",
    icon: "users",
    iconColor: "text-teal-500",
    hasAlert: true,
    items: [
      { id: "1", text: "I feel I'm being micromanaged", checked: true },
      {
        id: "2",
        text: "I feel I'm being treated differently than others",
        checked: true,
      },
      { id: "3", text: "My ideas are being ignored", checked: true },
    ],
    date: "May 15, 2025",
  },
  {
    id: "unfair-treatment",
    title: "Unfair Treatment",
    icon: "scale",
    iconColor: "text-blue-500",
    hasAlert: true,
    items: [
      { id: "4", text: "I feel I'm being micromanaged", checked: true },
      {
        id: "5",
        text: "I feel I'm being treated differently than others",
        checked: true,
      },
      { id: "6", text: "My ideas are being ignored", checked: true },
    ],
    date: "May 15, 2025",
  },
  {
    id: "inappropriate-behaviour",
    title: "Inappropriate Behaviour",
    icon: "alert",
    iconColor: "text-blue-500",
    hasAlert: true,
    items: [
      { id: "7", text: "I feel I'm being micromanaged", checked: true },
      {
        id: "8",
        text: "I feel I'm being treated differently than others",
        checked: true,
      },
      { id: "9", text: "My ideas are being ignored", checked: true },
    ],
    date: "May 15, 2025",
  },
  {
    id: "burnout-workload",
    title: "Burnout & Workload",
    icon: "briefcase",
    iconColor: "text-blue-500",
    hasAlert: true,
    items: [
      { id: "10", text: "I feel I'm being micromanaged", checked: true },
      {
        id: "11",
        text: "I feel I'm being treated differently than others",
        checked: true,
      },
      { id: "12", text: "My ideas are being ignored", checked: true },
    ],
    date: "May 15, 2025",
  },
  {
    id: "career-concerns",
    title: "Career Concerns",
    icon: "trending",
    iconColor: "text-teal-500",
    hasAlert: true,
    items: [
      { id: "13", text: "I feel I'm being micromanaged", checked: true },
      {
        id: "14",
        text: "I feel I'm being treated differently than others",
        checked: true,
      },
      { id: "15", text: "My ideas are being ignored", checked: true },
    ],
    date: "May 15, 2025",
  },
];

export default function GuidanceHubFeatures() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEdit = (cardId: string) => {
    console.log(`Edit clicked for card: ${cardId}`);
  };

  const handleItemChange = (
    cardId: string,
    itemId: string,
    checked: boolean
  ) => {
    console.log(`Item ${itemId} in card ${cardId} changed to: ${checked}`);
  };

  const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Successfully deleted.");
  };

  return (
    <div className=" bg-gray-50 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {workplaceData.map((card) => {
          const IconComponent = iconMap[card.icon as keyof typeof iconMap];

          return (
            <Card
              key={card.id}
              className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <IconComponent className={`h-5 w-5 ${card.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-black/50">{card.title}</h3>
                  {card.hasAlert && (
                    <Popconfirm
                      title="Are you sure?"
                      description="You want delete this feature?"
                      onConfirm={confirmBlock}
                      okText="Yes"
                      cancelText="No"
                    >
                      <div className="ml-auto">
                        <div className="size-7 flex justify-center items-center bg-red-500 rounded-full cursor-pointer">
                          <Trash2 size={18} className="text-white" />
                        </div>
                      </div>
                    </Popconfirm>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pb-4">
                {card.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <Checkbox
                      id={item.id}
                      checked={item.checked}
                      onCheckedChange={(checked) =>
                        handleItemChange(card.id, item.id, checked as boolean)
                      }
                      className="mt-0.5"
                    />
                    <label
                      htmlFor={item.id}
                      className="text-sm text-black/40 leading-relaxed cursor-pointer"
                    >
                      {item.text}
                    </label>
                  </div>
                ))}

                <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{card.date}</span>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div></div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenEditModal(true)}
                  className="flex items-center gap-2"
                >
                  Edit
                  <Edit className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <AddCategoriesScenariosModal
        open={openEditModal}
        setOpen={setOpenEditModal}
      />
    </div>
  );
}
