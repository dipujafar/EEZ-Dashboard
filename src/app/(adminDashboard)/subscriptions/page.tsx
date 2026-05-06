import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Button } from "@/components/ui/button";
import SubscriptionContainer from "./_components/SubscriptionContainer";
import Link from "next/link";

const SubscriptionPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Link href={"/subscriptions/add-subscription"} className="flex-1">
          <Button style={{ background: "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)" }} className="w-full  justify-center gap-2 hover:bg-[#17b5c7]  border bg-[#59b0ba]  group">
            Add Subscription Plan <AnimatedArrow />
          </Button>
        </Link>

        <Link href={"/subscriptions/extra-credit"} className="flex-1">
          <Button className="w-full bg-transparent justify-center gap-2 hover:bg-gray-200 text-[#4E9DA6] border border-t-[#59b0ba] border-l-[#448b93] border-b-[#32656a] border-r-[#2a5256] group">
            Extra Credit <AnimatedArrow />
          </Button>
        </Link>

      </div>

      <SubscriptionContainer />
    </div>
  );
};

export default SubscriptionPage;
