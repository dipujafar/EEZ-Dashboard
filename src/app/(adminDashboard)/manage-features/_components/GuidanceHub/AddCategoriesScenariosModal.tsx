"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  useCreateGuidanceHubMutation,
  useGetSingleGuidanceHubQuery,
  useUpdateGuidanceHubMutation,
} from "@/redux/api/guidanceHubApi";
import { toast } from "sonner";
import { AddCategoryModalSkelton } from "./Skeletons/AddCategoryModalSkelton";

// Validation schema
const formSchema = z.object({
  categoryName: z
    .string()
    .min(1, "Category name is required")
    .min(3, "Category name must be at least 3 characters"),
  file: z.instanceof(File).optional(),
  scenarios: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1, "Scenario text is required"),
        checked: z.boolean(),
      })
    )
    .min(1, "At least one scenario is required"),
  newScenario: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const AddCategoriesScenariosModal = ({
  open,
  setOpen,
  selectedId,
}: {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  selectedId?: string;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createGuidanceHub] = useCreateGuidanceHubMutation();
  const [updateGuidanceHub] = useUpdateGuidanceHubMutation();
  const { data: singleGuidanceHubData, isLoading: isLoadingSingle } =
    useGetSingleGuidanceHubQuery(selectedId, {
      skip: !selectedId,
    });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      file: undefined,
      scenarios: [
        { id: "1", text: "I feel I'm being micromanaged", checked: true },
        {
          id: "2",
          text: "I feel I'm being treated differently than others",
          checked: true,
        },
        { id: "3", text: "My ideas are being ignored", checked: true },
      ],
      newScenario: "",
    },
  });

  // create array for scenarios
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "scenarios",
  });

  const { setValue } = form;

  // a to function to make url to file
  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch image");
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  };

  //  set default for category update time
  useEffect(() => {
    if (singleGuidanceHubData?.data?.name) {
      setValue("categoryName", singleGuidanceHubData?.data?.name);
    }

    if (singleGuidanceHubData?.data?.scenario) {
      setValue(
        "scenarios",
        singleGuidanceHubData?.data?.scenario.map(
          (s: string, index: number) => ({
            id: index.toString(),
            text: s,
            checked: true,
          })
        )
      );
    }

    // console.log("============================");
    // set file url to file
    if (1) {
      // console.log("============================");
      urlToFile(singleGuidanceHubData?.data?.image, "file").then((file) => {
        setSelectedFile(file);
        form.setValue("file", file);
        form.clearErrors("file");
      });
    }
  }, [singleGuidanceHubData, setValue]);

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

  const addScenario = () => {
    const newScenarioText = form.getValues("newScenario");
    if (newScenarioText?.trim()) {
      const newId = Date.now().toString();
      append({
        id: newId,
        text: newScenarioText.trim(),
        checked: false,
      });
      form.setValue("newScenario", "");
    }
  };

  const toggleScenario = (index: number) => {
    const currentScenario = fields[index];
    update(index, {
      ...currentScenario,
      checked: !currentScenario.checked,
    });
  };

  const deleteScenario = (index: number) => {
    remove(index);
  };

  //  --------------- form submitting for create guidance hub ---------------
  const onSubmit = async (data: FormData) => {
    // --------------------making the formatted data ---------------
    const formattedData = {
      name: data.categoryName,
      scenario: data?.scenarios?.filter((s) => s.checked).map((s) => s.text),
    };

    // ------------------ create form data  --------------
    const formData = new FormData();
    formData.append("data", JSON.stringify(formattedData));
    if (data?.file) {
      formData.append("image", data?.file);
    }

    //------------------ if have selected id and single guidance hub data then update guidance hub
    if (selectedId && singleGuidanceHubData?.data?.name) {
      try {
        await updateGuidanceHub({
          id: selectedId,
          data: formData,
        }).unwrap();
        toast.success("Guidance Hub updated successfully");
        setOpen(false);
        return;
      } catch (error: any) {
        toast.error(error?.data?.message);
        return;
      }
    }

    // if (!data?.file) {
    //   toast.error("Please upload image/icon for guidance hub");
    //   return;
    // }

    // -----------------------  create a new guidance hub
    try {
      await createGuidanceHub(formData).unwrap();
      toast.success("Guidance Hub created successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
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
      <>
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
                                        {selectedFile?.name}
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

                      {/* Category Name Section */}
                      <FormField
                        control={form.control}
                        name="categoryName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Category Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Category Name"
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
                            Add Scenario
                          </Label>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </div>

                        <FormField
                          control={form.control}
                          name="newScenario"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Enter Scenario Name"
                                  {...field}
                                  className="flex-1"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addScenario();
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Scenarios List */}
                        <div className="space-y-3">
                          {fields.map((scenario, index) => (
                            <div
                              key={scenario.id}
                              className="flex items-center gap-3 group bg-[#EDF5F6] text-[#204C48] px-2"
                            >
                              <FormField
                                control={form.control}
                                name={`scenarios.${index}.checked`}
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-0">
                                    <FormControl>
                                      <Checkbox
                                        className="border-[#204C48] fill-[#204C48]"
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                          field.onChange(checked);
                                          toggleScenario(index);
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <Label className="flex-1 text-sm text-[#204C48] cursor-pointer">
                                {scenario.text}
                              </Label>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteScenario(index)}
                                className="transition-opacity h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        {/* Scenarios validation error */}
                        {form.formState.errors.scenarios && (
                          <p className="text-sm text-red-600">
                            {form.formState.errors.scenarios.message}
                          </p>
                        )}
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
                          {form.formState.isSubmitting
                            ? selectedId
                              ? "Updating..."
                              : "Saving..."
                            : selectedId
                            ? "Update"
                            : "Save"}
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
      </>
    </Modal>
  );
};

export default AddCategoriesScenariosModal;
