"use client";
import type React from "react";
import { useEffect, useState } from "react";
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

import {
  useCreatePolicyAndRightMutation,
  useGetSinglePolicyAndRightQuery,
  useUpdatePolicyAndRightMutation,
} from "@/redux/api/policyAndRightApi";

import { Error_Modal } from "@/modals";
import { toast } from "sonner";

// -----------------------------
// 🔵 ZOD VALIDATION SCHEMA
// -----------------------------
const formSchema = z
  .object({
    policyTitle: z.string().min(1, "Title is required"),
    category: z.enum(["federal-law", "state"], {
      required_error: "Category is required",
    }),
    file: z.instanceof(File, {
      message: "Image is required",
    }),
    // federal fields
    policyLaw: z.string().optional(),
    federalContent: z.string().optional(),

    // state fields
    stateName: z.string().optional(),
    stateTitle: z.string().optional(),
    stateContent: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.category === "federal-law") {
      if (!data.policyLaw)
        ctx.addIssue({
          code: "custom",
          message: "Policy Law is required",
          path: ["policyLaw"],
        });

      if (!data.federalContent)
        ctx.addIssue({
          code: "custom",
          message: "Content is required",
          path: ["federalContent"],
        });
    }

    if (data.category === "state") {
      if (!data.stateName)
        ctx.addIssue({
          code: "custom",
          message: "State name is required",
          path: ["stateName"],
        });

      if (!data.stateTitle)
        ctx.addIssue({
          code: "custom",
          message: "State title is required",
          path: ["stateTitle"],
        });

      if (!data.stateContent)
        ctx.addIssue({
          code: "custom",
          message: "Content is required",
          path: ["stateContent"],
        });
    }
  });

type FormData = z.infer<typeof formSchema>;


// -----------------------------
// 🔵 MAIN COMPONENT
// -----------------------------
const AddPolicyRightsLibraryModal = ({
  open,
  setOpen,
  selectedId,
}: {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  selectedId?: string;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: singleData } = useGetSinglePolicyAndRightQuery(selectedId, {
    skip: !selectedId,
  });

  const [createPolicy] = useCreatePolicyAndRightMutation();
  const [updatePolicy] = useUpdatePolicyAndRightMutation();

  // -----------------------------
  // 🔵 REACT-HOOK-FORM SETUP
  // -----------------------------
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyTitle: "",
      category: undefined,
      file: undefined,
      policyLaw: "",
      federalContent: "",
      stateName: "",
      stateTitle: "",
      stateContent: "",
    },
  });

  const { setValue } = form;

  // -----------------------------
  // 🔵 LOAD DATA IN EDIT MODE
  // -----------------------------
  useEffect(() => {
    const d = singleData?.data;
    if (selectedId && d) {
      setValue("policyTitle", d.title);
      setValue("category", d.category);

      if (d.category === "federal-law") {
        setValue("policyLaw", d.federalLaw?.policyLaw || "");
        setValue("federalContent", d.federalLaw?.content || "");
      }

      if (d.category === "state") {
        setValue("stateName", d.state?.stateName || "");
        setValue("stateTitle", d.state?.stateTitle || "");
        setValue("stateContent", d.state?.content || "");
      }
    } else {
      form.reset();
    }
  }, [singleData, selectedId]);

  // -----------------------------
  // 🔵 FILE HANDLING
  // -----------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("file", file);
      form.clearErrors("file");
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    form.setValue("file", null as any);
    const fileInput = document.getElementById("file-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  // -----------------------------
  // 🔵 SUBMIT HANDLER
  // -----------------------------
  const onSubmit = async (data: FormData) => {
    const payload: any = {
      title: data.policyTitle,
      category: data.category,
    };

    if (data.category === "federal-law") {
      payload.federalLaw = {
        policyLaw: data.policyLaw!,
        content: data.federalContent!,
      };
    }

    if (data.category === "state") {
      payload.state = {
        stateName: data.stateName!,
        stateTitle: data.stateTitle!,
        content: data.stateContent!,
      };
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (data.file) formData.append("image", data.file);

    try {
      if (selectedId) {
        await updatePolicy({ id: selectedId, data: formData }).unwrap();
        toast.success("Policy updated successfully");
      } else {
        await createPolicy(formData).unwrap();
        toast.success("Policy created successfully");
        form.reset();
        form.setValue()
      }
      setOpen(false);
      form.reset();
    } catch (error: any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  // -----------------------------
  // 🔵 RENDER
  // -----------------------------
  return (
    <Modal
      open={open}
      footer={null}
      centered
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{ minWidth: "max-content" }}
    >
      <div>
        {/* Close Button */}
        <div className="flex justify-between items-center">
          <div></div>
          <div
            className="size-8 bg-transparent border border-red-500 hover:bg-red-600 rounded-full flex justify-center items-center cursor-pointer group"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={14} className="text-red-600 group-hover:text-red-100" />
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="shadow-none py-0 border-none">
            <CardContent className="px-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  {/* File Upload */}
                  <FormField
                    control={form.control}
                    name="file"
                    render={() => (
                      <FormItem>
                        <FormLabel>Upload Image/Icon</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            {!selectedFile ? (
                              <div className="flex items-center gap-3">
                                <Button variant="outline" asChild>
                                  <label htmlFor="file-upload" className="cursor-pointer">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose File
                                    <input
                                      id="file-upload"
                                      type="file"
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      className="hidden"
                                    />
                                  </label>
                                </Button>
                                <span className="text-sm text-gray-500">No image</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded border">
                                  <span className="text-sm truncate max-w-[200px]">
                                    {selectedFile.name}
                                  </span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleFileDelete}
                                    className="h-6 w-6 p-0"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>

                                <Button variant="outline" asChild>
                                  <label htmlFor="file-upload-change" className="cursor-pointer">
                                    Change File
                                    <input
                                      id="file-upload-change"
                                      type="file"
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      className="hidden"
                                    />
                                  </label>
                                </Button>
                              </div>
                            )}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="policyTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Policy Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter policy title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <select {...field} className="border rounded-md w-full p-2">
                            <option value="">Select category</option>
                            <option value="federal-law">Federal Law</option>
                            <option value="state">State</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Federal Section */}
                  {form.watch("category") === "federal-law" && (
                    <>
                      <FormField
                        control={form.control}
                        name="policyLaw"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Policy Law</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter policy law" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="federalContent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Federal Content</FormLabel>
                            <FormControl>
                              {/* @ts-ignore */}
                              <RichTextEditor value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {/* State Section */}
                  {form.watch("category") === "state" && (
                    <>
                      <FormField
                        control={form.control}
                        name="stateName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter state name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stateTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter state title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stateContent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State Content</FormLabel>
                            <FormControl>
                               {/* @ts-ignore */}
                              <RichTextEditor value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {/* Submit */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full text-white"
                      style={{
                        background:
                          "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
                      }}
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
