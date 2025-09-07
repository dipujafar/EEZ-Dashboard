"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { formSchema, FormValues } from "./FormShema";
import {
  useCreateSubscriptionMutation,
  useSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "@/redux/api/subscriptionAPi";
import { toast } from "sonner";
import LoadingSpin from "@/components/loading-spain";
import { useSearchParams } from "next/navigation";
import SkeletonSubscriptionForm from "./Skeleton";
import { useEffect } from "react";

export default function AddSubscriptionForm() {
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();
  const [updateSubscription, { isLoading: isUpdateLoading }] =
    useUpdateSubscriptionMutation();
  const subscriptionId = useSearchParams().get("id") || "";
  const { data: subscriptionData, isLoading: subscriptionLoading } =
    useSingleSubscriptionQuery(subscriptionId, { skip: !subscriptionId });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planName: subscriptionData?.data?.title || "",
      cost: "",
      featuresPermissions: "",
      customMonths: "",
    },
  });

  const { setValue } = form;

  // --------------------------------- submit form -------------------------------
  async function onSubmit(values: FormValues) {
    const customData = {
      title: values.planName,
      amount: values?.planValidity === "free" ? 0 : Number(values.cost),
      durationType: values?.planValidity === "free" ? "free" : "monthly",
      duration:
        values?.planValidity === "custom"
          ? Number(values?.customMonths)
          : values?.planValidity === "free"
          ? 0
          : Number(values.planValidity),
      description: values.featuresPermissions,
      type: "premium",
    };

    //  -------------------------- if the subscription exists then update it ----------------------------
    if (subscriptionId && subscriptionData?.data) {
      try {
        await updateSubscription({
          id: subscriptionId,
          data: customData,
        }).unwrap();
        toast.success("Plan updated successfully");
        form.reset();
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
      return;
    }

    // -------------------------- if the subscription does not exist then create it ----------------------------
    try {
      await createSubscription(customData).unwrap();
      toast.success("Plan created successfully");
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  }

  // ------------------------------ set default values ------------------------------
  useEffect(() => {
    if (subscriptionData?.data) {
      setValue("planName", subscriptionData?.data?.title);
      setValue("cost", String(subscriptionData?.data?.amount));
      setValue("planValidity", setDefaultSubscriptionDuration() as string);
      setValue(
        "customMonths",
        (setDefaultSubscriptionDuration() === "custom"
          ? String(subscriptionData?.data?.duration)
          : "") as string
      );
      setValue("featuresPermissions", subscriptionData?.data?.description);
    }
  }, [subscriptionData?.data]);

  // ------------------------------------------------------------------------------

  // ---------------------------------------- show skeleton if loading -------------------------------

  if (subscriptionId && subscriptionLoading) {
    return <SkeletonSubscriptionForm />;
  }

  const setDefaultSubscriptionDuration = () => {
    if (subscriptionData?.data?.durationType === "free") {
      return "free";
    } else if (
      subscriptionData?.data?.duration === 1 ||
      subscriptionData?.data?.duration === 3
    ) {
      return `${subscriptionData?.data?.duration}`;
    } else if (
      subscriptionData?.data &&
      (subscriptionData?.data?.duration !== 1 ||
        subscriptionData?.data?.duration !== 3)
    ) {
      return "custom";
    } else {
      return null;
    }
  };

  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {subscriptionId
                ? "Subscription Plan Editor"
                : "Add Subscription Plan"}
            </CardTitle>
            <CardDescription>
              Configure plan details and pricing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Plan Information Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Plan Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="planName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">
                            Plan Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Basic Plan"
                              className="bg-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-600">
                            Cost (Enter 0 for free plans)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                $
                              </span>
                              <Input
                                placeholder="0.00"
                                className="bg-white pl-8"
                                type="number"
                                step="0.01"
                                min="0"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Features & Permissions Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Features & Permissions
                  </h3>

                  <FormField
                    control={form.control}
                    name="featuresPermissions"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Access core career tools, AI assistance, scripts, and job search resources — all for free."
                            className="min-h-[120px] bg-white resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Plan Validity Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Plan Validity
                  </h3>

                  <FormField
                    control={form.control}
                    name="planValidity"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={
                              setDefaultSubscriptionDuration() || field.value
                            }
                            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="free" id="free" />
                              <label
                                htmlFor="free"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id="1" />
                              <label
                                htmlFor="1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                1 Month
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="3" id="3" />
                              <label
                                htmlFor="3"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                3 Month
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="custom" id="custom" />
                              <label
                                htmlFor="custom"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Add any plan month
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("planValidity") === "custom" && (
                    <FormField
                      control={form.control}
                      name="customMonths"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter number of months"
                              className="max-w-xs bg-white"
                              type="number"
                              min="1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:justify-end">
                  <Button
                    disabled={isLoading || isUpdateLoading}
                    style={{
                      background:
                        "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
                      boxShadow: "7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
                    }}
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 group"
                  >
                    {subscriptionId ? "Update" : "Submit"}
                    {isLoading ? <LoadingSpin /> : <AnimatedArrow />}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
