"use client";
import { useEffect, useState } from "react";
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
import RichTextEditor from "./RichTextEditor";
import { toast } from "sonner";
import {
  useCreateManageContentMutation,
  useGetSingleManageContentQuery,
  useUpdateManageContentMutation,
} from "@/redux/api/manageContentApi";
import { Trash2 } from "lucide-react";
import { Spin } from "antd";

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
  selectedId?: string;
}

export const AddContentModal = ({
  isOpen,
  onClose,
  editingContent,
  selectedId,
}: ContentModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [createContent, { isLoading }] = useCreateManageContentMutation();
  const { data: singleManageContentData, isLoading: isSingleContentLoading } =
    useGetSingleManageContentQuery(selectedId, { skip: !selectedId });
  const [updateContent] = useUpdateManageContentMutation();

  console.log(singleManageContentData?.data);

  const form = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      contentType: "",
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

  const { setValue } = form;

  useEffect(() => {
    if (singleManageContentData?.data && selectedId) {
      setValue("contentType", singleManageContentData?.data?.contentType);
      setValue("content", singleManageContentData?.data?.content);
      setValue("date", singleManageContentData?.data?.date);
      setValue("time", singleManageContentData?.data?.time);
      setValue("userTypes", {
        all: singleManageContentData?.data?.targetUsers?.allUser,
        free: singleManageContentData?.data?.targetUsers?.freePlanUser,
        premium: singleManageContentData?.data?.targetUsers?.premiumUser,
      });
    } else {
      form.reset();
    }
  }, [singleManageContentData?.data, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImageFile(null);
    setImagePreviewUrl(null);
  };

  const onSubmit = async (data: ContentFormData) => {
    const formattedData = {
      contentType: data?.contentType,
      content: data?.content,
      date: data?.date,
      time: data?.time,

      targetUsers: {
        allUser: data?.userTypes?.all,
        freePlanUser: data?.userTypes?.free,
        premiumUser: data?.userTypes?.premium,
      },
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(formattedData));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (selectedId && singleManageContentData?.data) {
      try {
        await updateContent({
          id: selectedId,
          data: formData,
        }).unwrap();
        toast.success("Content updated successfully");
        onClose();
        return;
      } catch (error: any) {
        if (error?.data?.message) toast.error(error?.data?.message);
        else toast.error("Something went wrong");
      }
    }

    // if (!imageFile) {
    //   return toast.error("Image is required");
    // }

    try {
      await createContent(formData).unwrap();
      toast.success("Content created successfully");
      form.reset();
      onClose();
    } catch (error: any) {
      if (error?.data?.message) toast.error(error?.data?.message);
      else toast.error("Something went wrong");
    }
  };

  const onError = (errors: any) => {
    toast.error(errors?.userTypes?.message);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {isSingleContentLoading ? (
        <DialogContent>
          <Spin size="large" />
        </DialogContent>
      ) : (
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Content Type</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="contentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Content Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={singleManageContentData?.data?.contentType}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Content Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="journal">Journal</SelectItem>
                        <SelectItem value="dailyTips">Daily Tips</SelectItem>
                        <SelectItem value="advertisements">
                          Advertisements
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload Section */}
              <FormItem>
                <FormLabel>Upload Image/Icon</FormLabel>
                <FormControl>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {imagePreviewUrl ? (
                      <>
                        <img
                          src={imagePreviewUrl}
                          alt="Preview"
                          className="mx-auto max-h-48"
                        />
                        <Button
                          type="button"
                          onClick={handleRemoveImage}
                          className="mt-2 text-sm text-red-500 bg-gray-300 hover:bg-gray-400 rounded-full size-10"
                          variant="ghost"
                        >
                          <Trash2 size={24} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="border-0 text-center"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          No image selected
                        </p>
                      </>
                    )}
                  </div>
                </FormControl>
              </FormItem>

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
                        <Input type="date" {...field} />
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
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-3">
                <FormLabel>User Type</FormLabel>
                <div className="flex space-x-6">
                  {(["all", "free", "premium"] as const).map((key) => (
                    <FormField
                      key={key}
                      control={form.control}
                      name={`userTypes.${key}`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="capitalize">
                              {key === "all"
                                ? "All User"
                                : key === "free"
                                ? "Free Plan User"
                                : "Premium User"}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-main-color hover:bg-emerald-800"
              >
                {isLoading
                  ? selectedId
                    ? "Updating..."
                    : "Saving..."
                  : selectedId
                  ? "Update"
                  : "Save"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};
