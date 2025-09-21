"use client";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Modal } from "antd";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { RiCloseLargeLine } from "react-icons/ri";
import RichTextEditor from "@/app/(adminDashboard)/manage-content-type/_components/RichTextEditor";
import { useCreatePolicyAndRightMutation } from "@/redux/api/policyAndRightApi";
import { Error_Modal } from "@/modals";
import { toast } from "sonner";

// Validation schema
const formSchema = z.object({
  policyTitle: z.string().min(1, "Category name is required"),
  file: z.instanceof(File),
  policyContent: z.string().min(1, "Policy content is required"),
});

type FormData = z.infer<typeof formSchema>;

const AddPolicyRightsLibraryModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createPolicyRightsLibrary] = useCreatePolicyAndRightMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyTitle: "",
      file: undefined,
      policyContent: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("file", file);
      form.clearErrors("file");
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    form.setValue("file", null!);
    // Reset the file input
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      title: data?.policyTitle,
      content: data?.policyContent,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(formattedData));
    if (data?.file) {
      formData.append("image", data?.file);
    }

    // call api for submitting the form
    try {
      await createPolicyRightsLibrary(formData).unwrap();
      toast.success("Policy created successfully");
      form.reset();
      setOpen(false);
    } catch (error: any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };
  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "max-content",
        position: "relative",
      }}
    >
      <div>
        <div className="flex justify-between items-center">
          <div></div>
          <div
            className="size-8 bg-transparent border border-red-500 hover:bg-red-600   rounded-full flex justify-center items-center cursor-pointer group duration-500"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine
              size={14}
              className="text-red-600 group-hover:text-red-100 group"
            />
          </div>
        </div>
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-none py-0 border-none">
            <CardContent className="px-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, onError)}
                  className="space-y-6"
                >
                  {/* Upload Image/Icon Section */}
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Upload Image/Icon
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            {!selectedFile ? (
                              <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="relative overflow-hidden"
                                  asChild
                                >
                                  <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer"
                                  >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose file
                                    <input
                                      id="file-upload"
                                      type="file"
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                  </label>
                                </Button>
                                <span className="text-sm text-gray-500">
                                  No image
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center sm:flex-row gap-3">
                                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border">
                                  <span className="text-sm text-gray-700 truncate max-w-[200px]">
                                    {selectedFile.name}
                                  </span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleFileDelete}
                                    className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="relative overflow-hidden"
                                  asChild
                                >
                                  <label
                                    htmlFor="file-upload-change"
                                    className="cursor-pointer"
                                  >
                                    Change file
                                    <input
                                      id="file-upload-change"
                                      type="file"
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                  </label>
                                </Button>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Template Title Section */}
                  <FormField
                    control={form.control}
                    name="policyTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Policy Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter policy title"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-1">
                    <FormField
                      control={form.control}
                      name="policyContent"
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
                  </div>

                  {/* Save Button */}
                  <div className="pt-4">
                    <Button
                      style={{
                        background:
                          "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
                        boxShadow:
                          " 7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
                      }}
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white group"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Saving..." : "Save"}
                      <AnimatedArrow />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Modal>
  );
};

export default AddPolicyRightsLibraryModal;
