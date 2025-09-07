import * as z from "zod";

export const formSchema = z
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
    planValidity: z.string().min(1, "Plan validity is required"),
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


 export type FormValues = z.infer<typeof formSchema>;