"use client"
import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X, Upload, FileText, ImageIcon } from "lucide-react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  profileImage: z.instanceof(File).optional(),
  expertiseAreas: z.array(z.string()).min(1, "At least one expertise area is required"),
  document: z.instanceof(File).optional(),
  startDay: z.string().min(1, "Start day is required"),
  endDay: z.string().min(1, "End day is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const times = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
]

export default function AddNewHrServiceForm() {
  const router = useRouter()
  const [expertiseInput, setExpertiseInput] = useState("")
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null)
  const [description, setDescription] = useState("")

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      expertiseAreas: [],
      startDay: "",
      endDay: "",
      startTime: "",
      endTime: "",
      description: "",
    },
  })

  const expertiseAreas = form.watch("expertiseAreas")

  const handleAddExpertise = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && expertiseInput.trim()) {
      e.preventDefault()
      const currentAreas = form.getValues("expertiseAreas")
      if (!currentAreas.includes(expertiseInput.trim())) {
        form.setValue("expertiseAreas", [...currentAreas, expertiseInput.trim()])
      }
      setExpertiseInput("")
    }
  }

  const handleRemoveExpertise = (area: string) => {
    const currentAreas = form.getValues("expertiseAreas")
    form.setValue(
      "expertiseAreas",
      currentAreas.filter((a) => a !== area),
    )
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedProfileImage(file)
      form.setValue("profileImage", file)
    }
  }

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedDocument(file)
      form.setValue("document", file)
    }
  }

  const cancelProfileImage = () => {
    setSelectedProfileImage(null)
    form.setValue("profileImage", undefined)
    // Reset the file input
    const fileInput = document.getElementById("profile-image") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const cancelDocument = () => {
    setSelectedDocument(null)
    form.setValue("document", undefined)
    // Reset the file input
    const fileInput = document.getElementById("document") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    // Handle form submission here
    // You can use router.push() to navigate after successful submission
  }

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload Profile Image */}
          <div className="space-y-2">
            <Label>Upload Profile Image</Label>
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-4">
                {selectedProfileImage ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="h-4 w-4" />
                      <span className="text-sm">{selectedProfileImage.name}</span>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={cancelProfileImage}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                    <Label htmlFor="profile-image" className="cursor-pointer flex flex-col items-center space-y-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-500">Choose file</span>
                      <span className="text-xs text-gray-400">No image</span>
                    </Label>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

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
                      {expertiseAreas.map((area) => (
                        <Badge key={area} variant="secondary" className="flex items-center gap-1">
                          {area}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => handleRemoveExpertise(area)}
                          >
                            <X className="h-3 w-3" />
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
                    <Button type="button" variant="ghost" size="sm" onClick={cancelDocument}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Input
                      id="document"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleDocumentChange}
                      className="hidden"
                    />
                    <Label htmlFor="document" className="cursor-pointer flex flex-col items-center space-y-2">
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
            <Label className="text-base font-medium">Available Time & Date</Label>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Day</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        field.onChange(value)
                        setDescription(value)
                      }}
                      modules={quillModules}
                      placeholder="Write your policy description here here..."
                      className="bg-white"
                      style={{ height: '300px',
                        overflowY: 'hidden'
                       }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 group">
            Save Changes <AnimatedArrow />
          </Button>
        </form>
      </Form>
    </div>
  )
}
