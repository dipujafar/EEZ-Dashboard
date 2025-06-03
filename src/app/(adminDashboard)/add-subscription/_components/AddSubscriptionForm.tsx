"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  subscriptionName: z.string().min(1, {
    message: "Subscription name is required.",
  }),
  subscriptionPrice: z.string().min(1, {
    message: "Subscription price is required.",
  }),
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one feature.",
  }),
})

const availableFeatures = [
  {
    id: "unlimited-updates-1",
    label: "Unlimited product updates",
  },
  {
    id: "unlimited-updates-2",
    label: "Unlimited product updates",
  },
  {
    id: "unlimited-updates-3",
    label: "Unlimited product updates",
  },
  {
    id: "appointment-reminders",
    label: "Appointment reminders",
  },
  {
    id: "email-support",
    label: "Email and community support",
  },
]

export default function AddSubscriptionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscriptionName: "",
      subscriptionPrice: "",
      features: ["unlimited-updates-1", "unlimited-updates-2", "unlimited-updates-3"],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="px-10 p-6 bg-[#F9F9FA] h-[calc(100vh-200px)] rounded-lg ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="xl:space-y-10">
          <FormField
            control={form.control}
            name="subscriptionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Subscriptions Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type name"
                    className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subscriptionPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Subscriptions Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type price"
                    className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features"
            render={() => (
              <FormItem>
                <div className="space-y-3">
                  {availableFeatures.map((feature) => (
                    <FormField
                      key={feature.id}
                      control={form.control}
                      name="features"
                      render={({ field }) => {
                        return (
                          <FormItem key={feature.id} className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(feature.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, feature.id])
                                    : field.onChange(field.value?.filter((value) => value !== feature.id))
                                }}
                                className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 rounded-full"
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal text-teal-600 cursor-pointer">
                              {feature.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg">
            Update
          </Button>
        </form>
      </Form>
    </div>
  )
}
