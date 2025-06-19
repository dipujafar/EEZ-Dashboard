"use client";;
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
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

// Validation schema
const formSchema = z.object({
  issue_category: z.string().min(1, "Suggested tag name is required"),

  scenarios: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1, "Scenario text is required"),
        checked: z.boolean(),
      })
    )
    .min(1, "At least one scenario is required"),
});

type FormData = z.infer<typeof formSchema>;

interface Scenario {
  id: string;
  text: string;
  checked: boolean;
}
const AddIssueCategoryModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issue_category: "",
      scenarios: [
        { id: "1", text: "Harassment", checked: true },
        {
          id: "2",
          text: "Burnout",
          checked: true,
        },
        { id: "3", text: "Promotion", checked: true },
      ],
    },
  });

  const { fields, remove, update } = useFieldArray({
    control: form.control,
    name: "scenarios",
  });

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

  const onSubmit = (data: FormData) => {
    // call api for submitting the form
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
                  {/*  Suggested Tag  Section */}
                  <FormField
                    control={form.control}
                    name="issue_category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Issue category
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter tag suggestion"
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
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white group"
                      style={{
                        background:
                          "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
                        boxShadow:
                          " 7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
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

export default AddIssueCategoryModal;
