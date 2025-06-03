import { Input, Pagination } from "antd";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Search } from "lucide-react";
import ManageContentDataCard from "./ManageContentDataCard";

interface PromptData {
  id: string;
  title: string;
  date: string;
  status: "Pending" | "Completed";
  imageUrl: string;
}

interface PromptGridProps {
  prompts: PromptData[];
  onEdit: (id: string) => void;
}

const DailyTips = ({ prompts, onEdit }: PromptGridProps) => {
  return (
    <div className="space-y-1">
      {/* ------------------------------ Add New Content Type ------------------------------ */}
      <Button
        style={{
          background: "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
          boxShadow: " 7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
        }}
        className="w-full group"
      >
        Add Daily Tips <AnimatedArrow />
      </Button>

      {/* ------------------------------ Search Bar ------------------------------ */}
      <div className="flex justify-between items-center px-3 py-5">
        <div></div>
        <Input
          className="!w-full lg:!w-1/2 xl:!w-1/3 !py-2 placeholder:text-white !border-none !bg-[#dbdbdb]"
          placeholder="Search Here..."
          prefix={<Search size={16} color="#000"></Search>}
        ></Input>
      </div>
      {/* ------------------------------ Display All Journal Prompts ------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
        {prompts?.map((prompt) => (
          <ManageContentDataCard
            key={prompt.id}
            id={prompt.id}
            title={prompt.title}
            date={prompt.date}
            status={prompt.status}
            imageUrl={prompt.imageUrl}
            onEdit={onEdit}
          />
        ))}
      </div>
      <div className="w-fit ml-auto">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};

export default DailyTips;
