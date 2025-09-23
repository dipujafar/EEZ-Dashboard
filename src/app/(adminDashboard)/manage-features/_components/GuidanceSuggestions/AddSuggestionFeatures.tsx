"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddGuidanceSuggestionModal from "./AddGuidanceSuggestionModal";
import { Lightbulb } from "@/icons";


export default function AddSuggestionFeatures({ data }: { data: any }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [scenario, setSelectedScenario] = useState("");

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
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pb-4">
              {card?.scenario?.map((item: any, index: number) => (
                <div key={index} className="flex flex-wrap items-center gap-3">
                  <label
                    htmlFor={item}
                    className="text-sm text-black/40 leading-relaxed cursor-pointer"
                  >
                    {item}
                  </label>
                  <Button onClick={() => { setSelectedScenario(item); setSelectedId(card?._id); setOpenEditModal(true); }}  size={"sm"} className="bg-main-color hover:bg-green-900"><Lightbulb /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <AddGuidanceSuggestionModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        selectedId={selectedId}
      />
    </div>
  );
}
