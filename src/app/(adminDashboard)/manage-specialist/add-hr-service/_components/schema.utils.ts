import * as z from "zod"
export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  profileImage: z.instanceof(File).optional(),
  expertiseAreas: z.array(z.string()).min(1, "At least one expertise area is required"),
  document: z.instanceof(File).optional(),
  startDay: z.string().min(1, "Start day is required"),
  endDay: z.string().min(1, "End day is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});


export type FormData = z.infer<typeof formSchema>



export const times = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
]

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]