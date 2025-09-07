import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Button } from "@/components/ui/button";
import SubscriptionContainer from "./_components/SubscriptionContainer";
import Link from "next/link";

const SubscriptionPage = () => {
  return (
    <div className="space-y-6">
      <Link href={"/subscriptions/add-subscription"}>
        <Button className="w-full bg-transparent justify-center gap-2 hover:bg-gray-200 text-[#4E9DA6] border border-t-[#59b0ba] border-l-[#448b93] border-b-[#32656a] border-r-[#2a5256] group">
          Add Subscription Plan <AnimatedArrow />
        </Button>
      </Link>

      <SubscriptionContainer />
    </div>
  );
};

export default SubscriptionPage;
