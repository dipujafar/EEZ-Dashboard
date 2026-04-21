"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDeleteSubscriptionMutation, useGetSubscriptionQuery } from "@/redux/api/subscriptionAPi";
import Link from "next/link";
import SubscriptionSectionSkeleton from "./Skeleton";
import { message, Popconfirm } from "antd";
import { CheckCircle, XCircle } from "lucide-react";

const FEATURE_ACCESS_LABELS: Record<string, string> = {
  guidanceHub: "Guidance Hub",
  aiChat: "AI Chat",
  communicationToolkit: "Communication Toolkit",
  jobSearch: "Job Search",
  workplaceJournal: "Workplace Journal",
};

export default function SubscriptionContainer() {
  const { data: subscriptionData, isLoading } = useGetSubscriptionQuery(undefined);
  const [deleteSubscription] = useDeleteSubscriptionMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteSubscription(id).unwrap();
      message.success("Successfully deleted.");
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  if (isLoading) {
    return <SubscriptionSectionSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {subscriptionData?.data?.map((plan: any) => (
        <Card key={plan?._id} className="bg-gray-50 border-0 shadow-lg flex flex-col">
          <CardHeader className="pb-4">
            {/* Title + badges */}
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h2 className="text-xl font-semibold text-gray-800">{plan?.title}</h2>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 capitalize">
                  {plan?.type}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                    plan?.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {plan?.status}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6 flex flex-col flex-1 gap-5">
            {/* Price banner */}
            <div
              style={{
                background: "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
                boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.09)",
              }}
              className="text-white text-center py-3 px-6 rounded-lg"
            >
              {plan?.durationType === "free" ? (
                <div className="text-2xl font-bold">Free</div>
              ) : (
                <div className="text-2xl font-bold">
                  ${plan?.amount}
                  <span className="text-sm font-medium">
                    {plan?.isOneTime
                      ? " / one-time"
                      : plan?.duration
                      ? ` / ${plan?.duration} days`
                      : ""}
                  </span>
                </div>
              )}
              <p className="text-teal-100 text-xs mt-1 capitalize">{plan?.durationType} plan</p>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">{plan?.description}</p>

            {/* Stats row */}
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <p className="text-xs text-gray-500 mb-0.5">Credits / Month</p>
                <p className="text-lg font-bold text-teal-700">{plan?.creditsPerMonth}</p>
              </div>
              {/* <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <p className="text-xs text-gray-500 mb-0.5">Scenario View Limit</p>
                <p className="text-lg font-bold text-teal-700">
                  {plan?.scenarioViewLimit === 0 ? "Unlimited" : plan?.scenarioViewLimit}
                </p>
              </div> */}
            </div>

            {/* Feature access */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Feature Access
              </p>
              <div className="grid grid-cols-1 gap-1.5">
                {Object.entries(plan?.featureAccess ?? {}).map(([key, enabled]) => (
                  <div key={key} className="flex items-center gap-2">
                    {enabled ? (
                      <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-300 shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        enabled ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {FEATURE_ACCESS_LABELS[key] ?? key}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan features list */}
            {plan?.features?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Included Features
                </p>
                <div className="flex flex-col gap-1.5">
                  {plan.features.map((f: any) => (
                    <div key={f._id} className="flex items-center gap-2">
                      {f.active ? (
                        <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-300 shrink-0" />
                      )}
                      <span className={`text-sm ${f.active ? "text-gray-700" : "text-gray-400"}`}>
                        {f.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services tags */}
            {plan?.services?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Services
                </p>
                <div className="flex flex-wrap gap-2">
                  {plan.services.map((service: string) => (
                    <span
                      key={service}
                      className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full capitalize"
                    >
                      {FEATURE_ACCESS_LABELS[service] ?? service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-auto pt-2">
              <Link href={`/subscriptions/add-subscription?id=${plan?._id}`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 font-medium border border-t-[#59b0ba] border-l-[#448b93] border-b-[#32656a] border-r-[#2a5256] group"
                >
                  Edit
                  <AnimatedArrow />
                </Button>
              </Link>

              <Popconfirm
                title="Delete the plan"
                description="Are you sure to delete this plan?"
                onConfirm={() => handleDelete(plan?._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}