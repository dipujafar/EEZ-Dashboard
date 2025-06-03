import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Feature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: Feature[];
  buttonText: string;
  popular?: boolean;
}

const pricingData: PricingPlan[] = [
  {
    name: "Freemium",
    price: 0,
    period: "Per Month/Free",
    features: [
      { name: "Post up to 5 listing", included: true },
      { name: "1 photo upload listing", included: true },
      { name: "Unlimited messaging", included: true },
      { name: "Appointment reminders", included: false },
      { name: "Email and community support", included: false },
    ],
    buttonText: "Edit",
  },
  {
    name: "Quarterly",
    price: 39.99,
    period: "Per Month",
    features: [
      { name: "Unlimited product updates", included: true },
      { name: "Unlimited product updates", included: true },
      { name: "Unlimited product updates", included: true },
      { name: "Appointment reminders", included: true },
      { name: "Email and community support", included: true },
    ],
    buttonText: "Edit",
    popular: true,
  },
];

export default function SubscriptionContainer() {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {pricingData.map((plan, index) => (
          <Card key={index} className="relative">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg font-medium text-teal-600 mb-4">
                {plan.name}
              </CardTitle>
              <div className="space-y-1">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-teal-600">
                    {plan.price}
                  </span>
                  <span className="text-sm text-teal-600">$</span>
                </div>
                <p className="text-sm text-teal-600">{plan.period}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                          <X className="w-3 h-3 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        feature.included ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <Link href="/add-subscription">
                  <Button
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                    variant="default"
                  >
                    {plan.buttonText}
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
