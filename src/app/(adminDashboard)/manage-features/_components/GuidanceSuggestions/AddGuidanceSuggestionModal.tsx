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
import { HelpCircle, Trash2 } from "lucide-react";
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
import { useUpdateGuidanceHubMutation } from "@/redux/api/guidanceHubApi";
import { toast } from "sonner";
import { AddCategoryModalSkelton } from "../GuidanceHub/Skeletons/AddCategoryModalSkelton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateGuidanceHubSuggestionMutation,
  useGetSpecificGuidanceHubSuggestionQuery,
  useUpdateSpecificGuidanceHubSuggestionMutation,
} from "@/redux/api/guidanceSuggestionApi";

// Validation schema
const formSchema = z.object({
  suggestion: z
    .string()
    .min(1, "Category name is required")
    .min(3, "Category name must be at least 3 characters"),
  file: z.instanceof(File).optional(),
  tips: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1, "Scenario text is required"),
        checked: z.boolean(),
      })
    )
    .min(1, "At least one scenario is required"),
  newTips: z.string().optional(),
  suggestedScript: z.string().min(1, "Suggested script is required"),
});

type FormData = z.infer<typeof formSchema>;

const AddGuidanceSuggestionModal = ({
  open,
  setOpen,
  selectedId,
  scenario,
}: {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  selectedId?: string;
  scenario?: string;
}) => {
  const [createGuidanceHubSuggestion] =
    useCreateGuidanceHubSuggestionMutation();
  const [suggestionId, setSuggestionId] = useState<string | null>(null);
  const [updateGuidanceHubSuggestion] = useUpdateSpecificGuidanceHubSuggestionMutation();
  const { data: singleGuidanceHubSuggestionData, isLoading: isLoadingSingle } =
    useGetSpecificGuidanceHubSuggestionQuery(
      { category: selectedId, scenario },
      {
        skip: !selectedId && !scenario,
      }
    );

  console.log({suggestionId});

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      suggestion: "",
      tips: [],
      newTips: "",
      suggestedScript: "",
    },
  });

  // create array for scenarios
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "tips",
  });

  const { setValue } = form;

  //  set default for category update time
  useEffect(() => {
    if (singleGuidanceHubSuggestionData?.data?._id) {
      setSuggestionId(singleGuidanceHubSuggestionData?.data?._id);
    }
    if (singleGuidanceHubSuggestionData?.data?.suggestion) {
      setValue("suggestion", singleGuidanceHubSuggestionData?.data?.suggestion);
    }
    if (singleGuidanceHubSuggestionData?.data?.suggestedScript) {
      setValue(
        "suggestedScript",
        singleGuidanceHubSuggestionData?.data?.suggestedScript
      );
    }

    if (singleGuidanceHubSuggestionData?.data?.tips) {
      setValue(
        "tips",
        singleGuidanceHubSuggestionData?.data?.tips?.map(
          (s: string, index: number) => ({
            id: index.toString(),
            text: s,
            checked: true,
          })
        )
      );
    } else {
      form.reset();
    }
  }, [singleGuidanceHubSuggestionData, selectedId, scenario]);

  const addScenario = () => {
    const newScenarioText = form.getValues("newTips");
    if (newScenarioText?.trim()) {
      const newId = Date.now().toString();
      append({
        id: newId,
        text: newScenarioText.trim(),
        checked: true,
      });
      form.setValue("newTips", "");
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
      suggestion: data.suggestion,
      tips: data?.tips?.filter((s) => s.checked).map((s) => s.text),
      suggestedScript: data?.suggestedScript,
      category: selectedId,
      scenario: scenario,
    };

    //------------------ if have selected id and single guidance hub data then update guidance hub
    if (suggestionId && singleGuidanceHubSuggestionData?.data) {
      try {
        await updateGuidanceHubSuggestion({
          id: suggestionId,
          data: formattedData,
        }).unwrap();
        toast.success("Guidance Hub suggestion updated successfully");
        setOpen(false);
        return;
      } catch (error: any) {
        toast.error(error?.data?.message);
        return;
      }
    }

   

    // -----------------------  create a new guidance hub
    try {
      await createGuidanceHubSuggestion(formattedData).unwrap();
      toast.success("Guidance Hub Suggestion created successfully");
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
                      {/* Suggestion Name Section */}
                      <FormField
                        control={form.control}
                        name="suggestion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Suggestion
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Suggestion"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Add Tips Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium text-gray-700">
                            Add Tips
                          </Label>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </div>

                        <FormField
                          control={form.control}
                          name="newTips"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Enter tip name and press enter to add in list"
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
                                name={`tips.${index}.checked`}
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
                        {form?.formState?.errors?.tips && (
                          <p className="text-sm text-red-600">
                            {form?.formState?.errors?.tips?.message}
                          </p>
                        )}
                      </div>

                      {/* suggested Script field */}
                      <FormField
                        control={form.control}
                        name="suggestedScript"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Suggestion Script
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter Suggestion Scripts"
                                {...field}
                                className="w-full min-h-[120px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                            ? singleGuidanceHubSuggestionData?.data
                              ? "Updating..."
                              : "Saving..."
                            : singleGuidanceHubSuggestionData?.data
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

export default AddGuidanceSuggestionModal;
