"use client";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, FileText, Eye, EyeOff } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { days, TFormData, formSchema, times } from "./schema.utils";
import {
  useCrateHrAdminMutation,
  useGetSingleHrAdminQuery,
} from "@/redux/api/hrAdminApi";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function AddNewHrServiceForm() {
  const [expertiseInput, setExpertiseInput] = useState("");
  const [howHelpInput, setHowHelpInput] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [createHr, { isLoading }] = useCrateHrAdminMutation();
  const id = useSearchParams().get("id");
  const { data } = useGetSingleHrAdminQuery(id, {
    skip: !id,
  });

  console.log(data)

  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      expertiseAreas: [],
      howHelp: [],
      startDay: "",
      endDay: "",
      startTime: "",
      endTime: "",
      description: "",
    },
  });

  const expertiseAreas = form.watch("expertiseAreas");
  const howHelp = form.watch("howHelp");

  const handleAddExpertise = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && expertiseInput.trim()) {
      e.preventDefault();
      const currentAreas = form.getValues("expertiseAreas");
      if (!currentAreas.includes(expertiseInput.trim())) {
        form.setValue("expertiseAreas", [
          ...currentAreas,
          expertiseInput.trim(),
        ]);
      }
      setExpertiseInput("");
    }
  };

  const handleRemoveExpertise = (area: string) => {
    const currentAreas = form.getValues("expertiseAreas");
    form.setValue(
      "expertiseAreas",
      currentAreas.filter((a) => a !== area)
    );
  };

  const handleAddHowHelp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && howHelpInput.trim()) {
      e.preventDefault();
      const currentAreas = form.getValues("howHelp");
      if (!currentAreas.includes(howHelpInput.trim())) {
        form.setValue("howHelp", [...currentAreas, howHelpInput.trim()]);
      }
      setHowHelpInput("");
    }
  };

  const handleRemoveHowHelp = (area: string) => {
    const currentAreas = form.getValues("howHelp");
    form.setValue(
      "howHelp",
      currentAreas.filter((a) => a !== area)
    );
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedDocument(file);
      form.setValue("document", file);
    }
  };

  const cancelDocument = () => {
    setSelectedDocument(null);
    form.setValue("document", undefined);
    // Reset the file input
    const fileInput = document.getElementById("document") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = async (data: TFormData) => {
    if (!data.document) {
      return toast.error("Please upload Upload Document / Certificate file");
    }

    const formattedData = {
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      password: data?.password,
      expertise: data?.expertiseAreas,
      availableTime: {
        startDay: data?.startDay,
        endDay: data?.endDay,
        startTime: data?.startTime,
        endTime: data?.endTime,
      },
      description: data?.description,
      qualification: data?.qualification,
      howHelp: data?.howHelp,
    };

    const form = new FormData();
    form.append("data", JSON.stringify(formattedData));
    form.append("documents", data?.document as File);

    try {
      await createHr(form).unwrap();
      toast.success("HR admin created successfully");
      // form.reset();
    } catch (error) {
      toast.error("Failed to create HR admin! Please try again.");
    }

  
    // Handle form submission here
    // You can use router.push() to navigate after successful submission
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  //   {
  // "email": "hrtest@example.com",
  // "phoneNumber": "0212564556",
  // "password": "StrongPass123",
  // "expertise": [
  // "Recruitment",
  // "Training",
  // "Conflict Resolution"
  // ],
  // "availableTime": {
  // "startDay": "2025-09-10",
  // "endDay": "2025-09-15",
  // "startTime": "09:00",
  // "endTime": "17:00"
  // },
  // "description": "HR professional with strong expertise in recruitment and employee management.",
  // "qualification": "MBA in Human Resources",
  // "howHelp": [
  // "Recruitment planning",
  // "Employee training",
  // "Conflict resolution"
  // ]
  // }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter E-mail"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Phone Number"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expertise Areas */}
          <FormField
            control={form.control}
            name="expertiseAreas"
            render={() => (
              <FormItem>
                <FormLabel>Expertise Areas</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      placeholder="Type and press Enter to add expertise area"
                      className="bg-white"
                      value={expertiseInput}
                      onChange={(e) => setExpertiseInput(e.target.value)}
                      onKeyDown={handleAddExpertise}
                    />
                    <div className="flex flex-wrap gap-2">
                      {expertiseAreas?.map((area) => (
                        <Badge
                          key={area}
                          variant="secondary"
                          className="flex items-center gap-1 bg-white hover:bg-gray-300 rounded"
                        >
                          {area}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-red-300 bg-red-500"
                            onClick={() => handleRemoveExpertise(area)}
                          >
                            <X className="h-3 w-3 text-white hover:text-black" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* how to help */}
          <FormField
            control={form.control}
            name="howHelp"
            render={() => (
              <FormItem>
                <FormLabel>How to help</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      placeholder="Type and press Enter to add expertise area"
                      className="bg-white"
                      value={howHelpInput}
                      onChange={(e) => setHowHelpInput(e.target.value)}
                      onKeyDown={handleAddHowHelp}
                    />
                    <div className="flex flex-wrap gap-2">
                      {howHelp?.map((area) => (
                        <Badge
                          key={area}
                          variant="secondary"
                          className="flex items-center gap-1 bg-white hover:bg-gray-300 rounded"
                        >
                          {area}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-red-300 bg-red-500"
                            onClick={() => handleRemoveHowHelp(area)}
                          >
                            <X className="h-3 w-3 text-white hover:text-black" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload Document */}
          <div className="space-y-2">
            <Label>Upload Document / Certificate</Label>
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-4">
                {selectedDocument ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{selectedDocument.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={cancelDocument}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Input
                      id="document"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleDocumentChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="document"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-500">Choose file</span>
                      <span className="text-xs text-gray-400">No document</span>
                    </Label>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Available Time & Date */}
          <div className="space-y-4">
            <Label className="text-base font-medium">
              Available Time & Date
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Day</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day.toLowerCase()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Day</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day.toLowerCase()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* qualification */}
          <FormField
            control={form.control}
            name="qualification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualification</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Phone Number"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <div>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      modules={quillModules}
                      placeholder="Write your policy description here here..."
                      className="bg-white"
                      style={{ height: "300px", overflowY: "hidden" }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row  gap-x-5">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Set password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      <span className="absolute top-1/2 -translate-y-1/2 right-2 ">
                        {showPassword ? (
                          <Eye
                            className="cursor-pointer"
                            onClick={() => setShowPassword(false)}
                            color="gray"
                          />
                        ) : (
                          <EyeOff
                            className="cursor-pointer"
                            onClick={() => setShowPassword(true)}
                            color="gray"
                          />
                        )}
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Confirm  password"
                          type={confirmPassword ? "text" : "password"}
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      <span className="absolute top-1/2 -translate-y-1/2 right-2 ">
                        {showPassword ? (
                          <Eye
                            className="cursor-pointer"
                            onClick={() => setConfirmPassword(false)}
                            color="gray"
                          />
                        ) : (
                          <EyeOff
                            className="cursor-pointer"
                            onClick={() => setConfirmPassword(true)}
                            color="gray"
                          />
                        )}
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-main-color hover:bg-teal-700 text-white py-3 group"
          >
            Save Changes <AnimatedArrow />
          </Button>
        </form>
      </Form>
    </div>
  );
}
