"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor } from "./RichTextEditor";

export interface ContentItem {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  status: "pending" | "complete";
  contentType: string;
  imageUrl?: string;
  userType: "all" | "free" | "premium";
}

const contentSchema = z.object({
  contentType: z.string().min(1, "Content type is required"),
  imageUrl: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  userTypes: z
    .object({
      all: z.boolean(),
      free: z.boolean(),
      premium: z.boolean(),
    })
    .refine((data) => data.all || data.free || data.premium, {
      message: "At least one user type must be selected",
    }),
});

type ContentFormData = z.infer<typeof contentSchema>;

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: Omit<ContentItem, "id">) => void;
  editingContent?: ContentItem | null;
}

export const AddContentModal = ({
  isOpen,
  onClose,
  onSave,
  editingContent,
}: ContentModalProps) => {
  const form = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      contentType: "",
      imageUrl: "",
      content: "",
      date: "",
      time: "",
      userTypes: {
        all: false,
        free: false,
        premium: false,
      },
    },
  });

  useEffect(() => {
    if (editingContent) {
      form.reset({
        contentType: editingContent.contentType,
        imageUrl: editingContent.imageUrl || "",
        content: editingContent.content,
        date: editingContent.date,
        time: editingContent.time,
        userTypes: {
          all: editingContent.userType === "all",
          free: editingContent.userType === "free",
          premium: editingContent.userType === "premium",
        },
      });
    } else {
      form.reset({
        contentType: "",
        imageUrl: "",
        content: "",
        date: "",
        time: "",
        userTypes: {
          all: false,
          free: false,
          premium: false,
        },
      });
    }
  }, [editingContent, form]);

  const onSubmit = (data: ContentFormData) => {
    const userType = data.userTypes.all
      ? "all"
      : data.userTypes.free
      ? "free"
      : "premium";

    const contentData: Omit<ContentItem, "id"> = {
      title: `Content Prompt: ${data.content.substring(0, 50)}...`,
      content: data.content,
      date: data.date,
      time: data.time,
      status: "pending",
      contentType: data.contentType,
      imageUrl: data.imageUrl,
      userType: userType as "all" | "free" | "premium",
    };

    onSave(contentData);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Content Type</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Content Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Content Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="journal">Journal</SelectItem>
                      <SelectItem value="reflection">Reflection</SelectItem>
                      <SelectItem value="prompt">Prompt</SelectItem>
                      <SelectItem value="exercise">Exercise</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image/Icon</FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Input
                        type="url"
                        placeholder="Enter image URL or upload file"
                        {...field}
                        className="border-0 text-center"
                      />
                      <p className="text-sm text-gray-500 mt-2">No image</p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Write your journal prompt here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="mm/dd/yyyy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Time</FormLabel>
                    <FormControl>
                      <Input type="time" placeholder="--:--:--" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3">
              <FormLabel>User Type</FormLabel>
              <div className="flex space-x-6">
                <FormField
                  control={form.control}
                  name="userTypes.all"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>All User</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userTypes.free"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Free Plan User</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userTypes.premium"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Premium User</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800"
            >
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
