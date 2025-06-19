"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

const formSchema = z
  .object({
    planName: z.string().min(1, "Plan name is required"),
    cost: z
      .string()
      .min(1, "Cost is required")
      .refine((val) => {
        const num = Number.parseFloat(val.replace("$", ""));
        return !isNaN(num) && num >= 0;
      }, "Please enter a valid cost (0 or greater)"),
    featuresPermissions: z
      .string()
      .min(1, "Features and permissions are required"),
    planValidity: z.enum(["unlimited", "1month", "3month", "custom"]),
    customMonths: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.planValidity === "custom" && !data.customMonths) {
        return false;
      }
      return true;
    },
    {
      message: "Custom months value is required when custom option is selected",
      path: ["customMonths"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

export default function AddSubscriptionForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planName: "",
      cost: "0.00",
      featuresPermissions: "",
      planValidity: "unlimited",
      customMonths: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    // Handle form submission here
  }

  function onCancel() {
    form.reset();
  }

  return (
    <div className="">
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Subscription Plan Editor
            </CardTitle>
            <CardDescription>
              Configure plan details, features, and pricing
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
                  <h3 className="text-sm font-medium text-gray-900">
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
                            defaultValue={field.value}
                            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="unlimited"
                                id="unlimited"
                              />
                              <label
                                htmlFor="unlimited"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Unlimited
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1month" id="1month" />
                              <label
                                htmlFor="1month"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                1 Month
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="3month" id="3month" />
                              <label
                                htmlFor="3month"
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
                    style={{
                      background:
                        "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
                      boxShadow: "7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
                    }}
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 group"
                  >
                    Submit
                    <AnimatedArrow />
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
