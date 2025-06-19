import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  buttonText: string;
  gradient: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    title: "Basic Plan",
    subtitle: "Unlimited to free subscription plan",
    price: "Free",
    description:
      "Access core career tools, AI assistance, scripts, and job search resources — all for free.",
    buttonText: "EDIT",
    gradient: "bg-gradient-to-r from-teal-600 to-teal-700",
  },
  {
    id: "premium",
    title: "Premium Plan",
    subtitle: "Limited to paid subscription plan",
    price: "$52.00/month",
    description:
      "Access core career tools, plus exclusive live coaching and direct messaging with certified career advisors.",
    buttonText: "EDIT",
    gradient: "bg-gradient-to-r from-teal-600 to-teal-700",
  },
];

export default function SubscriptionContainer() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {pricingPlans.map((plan) => (
          <Card key={plan.id} className="bg-gray-50 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {plan.title}
              </h2>
              <p className="text-sm text-gray-600">{plan.subtitle}</p>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              <div
                style={{
                  background:
                    "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
                  boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.09)",
                }}
                className={`${plan.gradient} text-white text-center py-2 px-6 rounded-lg mb-6`}
              >
                <div className="text-2xl font-bold">{plan.price}</div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-6 min-h-[60px]">
                {plan.description}
              </p>
              <Link href={"/subscriptions/add-subscription"}>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 font-medium border border-t-[#59b0ba] border-l-[#448b93] border-b-[#32656a] border-r-[#2a5256] group"
                >
                  {plan.buttonText}
                  <AnimatedArrow />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
