"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import {
  useCreateSubscriptionMutation,
  useSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "@/redux/api/subscriptionAPi";
import { toast } from "sonner";
import LoadingSpin from "@/components/loading-spain";
import { useRouter, useSearchParams } from "next/navigation";
import SkeletonSubscriptionForm from "./Skeleton";
import { useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import { formSchema, FormValues } from "./FormShema";

// ─────────────────────────── Schema ───────────────────────────

const SERVICES = [
  { value: "aiChat", label: "AI Chat" },
  { value: "guidanceHub", label: "Guidance Hub" },
  { value: "communicationToolkit", label: "Communication Toolkit" },
] as const;


export default function AddSubscriptionForm() {
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();
  const [updateSubscription, { isLoading: isUpdateLoading }] =
    useUpdateSubscriptionMutation();
  const subscriptionId = useSearchParams().get("id") || "";
  const { data: subscriptionData, isLoading: subscriptionLoading } =
    useSingleSubscriptionQuery(subscriptionId, { skip: !subscriptionId });
  const router = useRouter();

  const sub = subscriptionData?.data;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      creditsPerMonth: "",
      duration: "1",
      featureAccess: {
        guidanceHub: false,
        aiChat: false,
        communicationToolkit: false,
      },
      features: [{ title: "" }],
      services: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const { setValue, watch } = form;

  // ── Populate form when editing ──
  useEffect(() => {
    if (!sub) return;

    setValue("title", sub.title ?? "");
    setValue("description", sub.description ?? "");
    setValue("amount", String(sub.amount ?? ""));
    setValue("creditsPerMonth", String(sub.creditsPerMonth ?? ""));
    setValue("duration", String(sub.duration ?? "30"));
    setValue("featureAccess", {
      guidanceHub: sub.featureAccess?.guidanceHub ?? false,
      aiChat: sub.featureAccess?.aiChat ?? false,
      communicationToolkit: sub.featureAccess?.communicationToolkit ?? false,
    });
    setValue(
      "features",
      sub.features?.length ? sub.features : [{ title: "" }]
    );
    setValue("services", sub.services ?? []);
  }, [sub]);



  // ── Submit ──
  async function onSubmit(values: FormValues) {
    const payload = {
      title: values.title,
      description: values.description,
      amount: Number(values.amount),
      creditsPerMonth: Number(values.creditsPerMonth),
      duration: Number(values.duration),
      type: "premium",
      featureAccess: values.featureAccess,
      features: values.features.filter((f) => f.title.trim() !== ""),
      services: values.services,
    };

    if (subscriptionId && sub) {
      try {
        await updateSubscription({ id: subscriptionId, data: payload }).unwrap();
        toast.success("Plan updated successfully");
        router.push("/subscriptions");
      } catch (error: any) {
        toast.error(error?.data?.message ?? "Update failed");
      }
      return;
    }

    try {
      await createSubscription(payload).unwrap();
      toast.success("Plan created successfully");
      form.reset();
      router.push("/subscriptions");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Creation failed");
    }
  }

  if (subscriptionId && subscriptionLoading) {
    return <SkeletonSubscriptionForm />;
  }

  // ─────────────────────────── UI ───────────────────────────

  return (

    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {subscriptionId ? "Subscription Plan Editor" : "Add Subscription Plan"}
        </CardTitle>
        <CardDescription>Configure plan details and pricing</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* ── Plan Information ── */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Plan Information</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-600">Plan Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Plan Name" className="bg-gray-50 py-5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-600">
                        Cost (Enter 0 for free plans)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            placeholder="Enter Cost"
                            className="bg-gray-50 pl-8 py-5"
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

                {/* Credits Per Month */}
                <FormField
                  control={form.control}
                  name="creditsPerMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-600">Credits Per Month</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Credits Per Month"
                          className="bg-gray-50 py-5"
                          type="number"
                          min="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


              </div>
            </div>

            {/* ── Description ── */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what this plan includes…"
                        className="min-h-[100px] bg-gray-50 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Duration Type ── */}
            <div className="space-y-4">

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-600">Duration (month)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Duration (days)"
                        className="max-w-xs bg-gray-50 py-5"
                        type="number"
                        min="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Feature Access Toggles ── */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Feature Access</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(
                  [
                    { name: "featureAccess.guidanceHub", label: "Guidance Hub" },
                    { name: "featureAccess.aiChat", label: "AI Chat" },
                    { name: "featureAccess.communicationToolkit", label: "Communication Toolkit" },

                  ] as const
                ).map((item) => (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                        <FormLabel className="text-sm text-gray-700 cursor-pointer">
                          {item.label}
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value as boolean}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* ── Features List ── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Features</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ title: "" })}
                  className="flex items-center gap-1 text-xs border-main-color"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Feature
                </Button>
              </div>

              <div className="space-y-2">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`features.${index}.title`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder={`Feature ${index + 1}`}
                              className="bg-gray-50 py-5"
                              {...f}
                            />
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="shrink-0 text-gray-400 hover:text-red-500"
                                onClick={() => remove(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* ── Services ── */}
            <section className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Services</h3>
              <FormField
                control={form.control}
                name="services"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {SERVICES.map((service) => (
                        <FormField
                          key={service.value}
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            const checked = field.value?.includes(service.value);
                            return (
                              <FormItem className="flex items-center space-x-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => {
                                      const current = field.value ?? [];

                                      if (e.target.checked) {
                                        field.onChange([...current, service.value]);
                                      } else {
                                        field.onChange(
                                          current.filter((s) => s !== service.value)
                                        );
                                      }
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  />
                                </FormControl>
                                <FormLabel className="text-sm text-gray-700 cursor-pointer font-normal">
                                  {service.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* ── Submit ── */}
            <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:justify-end">
              <Button
                disabled={isLoading || isUpdateLoading}
                style={{
                  background:
                    "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
                  boxShadow: "7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
                }}
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 group sm:w-auto"
              >
                {subscriptionId ? "Update Plan" : "Create Plan"}
                {isLoading || isUpdateLoading ? <LoadingSpin /> : <AnimatedArrow />}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>

  );
}