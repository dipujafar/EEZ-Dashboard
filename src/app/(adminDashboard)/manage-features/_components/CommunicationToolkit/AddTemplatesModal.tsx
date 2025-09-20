"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X, HelpCircle, Upload, Trash2 } from "lucide-react";
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
import {
  useCreateCommunicationMutation,
  useGetSingleCommunicationQuery,
  useUpdateCommunicationMutation,
} from "@/redux/api/communicationApi";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import RichTextEditor from "@/app/(adminDashboard)/manage-content-type/_components/RichTextEditor";
import { Error_Modal } from "@/modals";
import { AddCategoryModalSkelton } from "../GuidanceHub/Skeletons/AddCategoryModalSkelton";

// Validation schema
const formSchema = z.object({
  templateTitle: z.string().min(1, "Template  name is required"),

  file: z.instanceof(File).optional(),

  tones: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1, "Tone text is required"),
        checked: z.boolean(),
      })
    )
    .min(1, "At least one must have in tone list"),
  newTone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

const AddTemplatesModal = ({
  open,
  setOpen,
  selectedId,
}: {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  selectedId?: string;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createCommunication] = useCreateCommunicationMutation();
  const { data: singleCommunicationData, isLoading: isLoadingSingle } =
    useGetSingleCommunicationQuery(selectedId, { skip: !selectedId });
    const [updateCommunication] = useUpdateCommunicationMutation();


    

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      templateTitle: "",
      file: undefined,
      tones: [],
      newTone: "",
    },
  });

  

  // create array for tones
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "tones",
  });

  const {setValue} = form;

  // ---------------- set Default value ---------------- //
  useEffect(() => {
    if (singleCommunicationData?.data && selectedId) {
      form.setValue("templateTitle", singleCommunicationData?.data?.title);
     if (singleCommunicationData?.data?.tone) {
      setValue(
        "tones",
        singleCommunicationData?.data?.tone?.map(
          (s: string, index: number) => ({
            id: index.toString(),
            text: s,
            checked: true,
          })
        )
      );
    }
      form.setValue("message", singleCommunicationData?.data?.message);
    }else {
      form.reset();
    }
  }, [singleCommunicationData?.data, selectedId]);


 

  


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

  const addTone = () => {
    const newToneText = form.getValues("newTone");
    if (newToneText?.trim()) {
      const newId = Date.now().toString();
      append({
        id: newId,
        text: newToneText.trim(),
        checked: true,
      });
      form.setValue("newTone", "");
    }
  };

  const toggleTone = (index: number) => {
    const currentScenario = fields[index];
    update(index, {
      ...currentScenario,
      checked: !currentScenario.checked,
    });
  };

  const deleteTone = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      title: data?.templateTitle,
      tone: data?.tones?.map((s) => s?.text),
      message: data?.message,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(formattedData));
    if (data?.file) {
      formData.append("image", data?.file);
    }

    // ---------------------- if have selected id and single communication data then update communication ---------------------- //
    if (selectedId && singleCommunicationData?.data) {
      try {
        await updateCommunication({
          id: selectedId,
          data: formData,
        }).unwrap();
        toast.success("Template updated successfully");
        setOpen(false);
        return;
      } catch (error: any) {
        Error_Modal({ title: error?.data?.message });
        return;
      }
    }


    if(!data?.file) {
      toast.error("Please upload image or icon");
    }

    try {
      await createCommunication(formData).unwrap();
      toast.success("Template created successfully");
      form.reset();
      setOpen(false);
    } catch (error: any) {
      Error_Modal({ title: error?.data?.message });
    }
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
      {isLoadingSingle && selectedId ? (
        <div>
          <AddCategoryModalSkelton />
        </div>
      ) : (
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
                    onSubmit={form.handleSubmit(onSubmit)}
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
                      name="templateTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Template Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter template title"
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Add Scenario Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Add Tone
                        </Label>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </div>

                      <FormField
                        control={form.control}
                        name="newTone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter tone name and press enter to add list"
                                {...field}
                                className="flex-1"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addTone();
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* tones List */}
                      <div className="space-y-3">
                        {fields.map((tone, index) => (
                          <div
                            key={tone.id}
                            className="flex items-center gap-3 group bg-[#EDF5F6] text-[#204C48] px-2"
                          >
                            <FormField
                              control={form.control}
                              name={`tones.${index}.checked`}
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-0">
                                  <FormControl>
                                    <Checkbox
                                      className="border-[#204C48] fill-[#204C48]"
                                      checked={field.value}
                                      onCheckedChange={(checked) => {
                                        field.onChange(checked);
                                        toggleTone(index);
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <Label className="flex-1 text-sm text-[#204C48] cursor-pointer">
                              {tone.text}
                            </Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteTone(index)}
                              className="transition-opacity h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      {/* tones validation error */}
                      {form.formState.errors.tones && (
                        <p className="text-sm text-red-600">
                          {form.formState.errors.tones.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <FormField
                        control={form.control}
                        name="message"
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
                        {form.formState.isSubmitting ? selectedId ? "Saving...": "Updating..." : selectedId ? "Update" : "Save"}
                        <AnimatedArrow />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddTemplatesModal;
