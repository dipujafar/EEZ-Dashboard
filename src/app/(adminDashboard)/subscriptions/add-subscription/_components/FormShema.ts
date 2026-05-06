import * as z from "zod";

export const formSchema = z
  .object({
    title: z.string().min(1, "Plan name is required"),
    description: z.string().min(1, "Description is required"),
    amount: z.string().min(1, "Amount is required"),
    creditsPerMonth: z.string().min(1, "Credits per month is required"),
    isOneTime: z.boolean(),
    durationType: z.enum(["monthly", "free", "oneTime"]),
    duration: z.string().optional(),
    featureAccess: z.object({
      guidanceHub: z.boolean(),
      aiChat: z.boolean(),
      communicationToolkit: z.boolean(),
    }),
    features: z.array(z.object({ title: z.string().min(1, "Feature title is required") })),
    services: z.array(z.string()),
  })
  .refine(
    (data) => {
      if (data.durationType === "monthly") {
        return !!data.duration && Number(data.duration) > 0;
      }
      return true;
    },
    { message: "Duration (days) is required for monthly plans", path: ["duration"] }
  );

export type FormValues = z.infer<typeof formSchema>;
