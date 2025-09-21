"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
import { useCreateIssueCategoryMutation } from "@/redux/api/issueCategoryApi";
import { toast } from "sonner";

// Validation schema
const formSchema = z.object({
  issue_category: z.string().min(1, "Suggested tag name is required"),
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
  const [create] = useCreateIssueCategoryMutation();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issue_category: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // call api for submitting the form
    const formattedData = { name: data?.issue_category };
    try {
      await create(formattedData).unwrap();
      toast.success("Issue category created successfully");
      form.reset();
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
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
                            placeholder="Enter Issue category"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
