import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle } from "lucide-react";

const churches = [
  "Mar Thoma Church of South Florida",
  "St. Mark's Mar Thoma Church",
  "Mar Thoma Church Atlanta",
  "Orlando Mar Thoma Church",
  "St. Lukes Mar Thoma Church",
  "Jacksonville Mar Thoma Church",
  "Mar Thoma Congregation Chattanooga",
  "Nashville Mar Thoma",
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  birthMonth: z.string().min(1, "Month is required"),
  birthDay: z.string().min(1, "Day is required"),
  birthYear: z.string().min(1, "Year is required"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20, "Phone number is too long"),
  email: z.string().trim().email("Please enter a valid email").max(100, "Email is too long"),
  church: z.string().min(1, "Please select a church"),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  parentEmail: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUnder18, setIsUnder18] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthMonth: "",
      birthDay: "",
      birthYear: "",
      phone: "",
      email: "",
      church: "",
      parentName: "",
      parentPhone: "",
      parentEmail: "",
    },
  });

  const watchBirthMonth = form.watch("birthMonth");
  const watchBirthDay = form.watch("birthDay");
  const watchBirthYear = form.watch("birthYear");

  useEffect(() => {
    if (watchBirthMonth && watchBirthDay && watchBirthYear) {
      const monthIndex = months.indexOf(watchBirthMonth);
      const birthDate = new Date(parseInt(watchBirthYear), monthIndex, parseInt(watchBirthDay));
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setIsUnder18(age < 18);
    }
  }, [watchBirthMonth, watchBirthDay, watchBirthYear]);

  const onSubmit = async (data: FormData) => {
    // Additional validation for under 18
    if (isUnder18) {
      if (!data.parentName?.trim()) {
        form.setError("parentName", { message: "Parent name is required for minors" });
        return;
      }
      if (!data.parentPhone?.trim()) {
        form.setError("parentPhone", { message: "Parent phone is required for minors" });
        return;
      }
      if (!data.parentEmail?.trim()) {
        form.setError("parentEmail", { message: "Parent email is required for minors" });
        return;
      }
      // Validate parent email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.parentEmail)) {
        form.setError("parentEmail", { message: "Please enter a valid parent email" });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Check for duplicate email
      const { data: existing } = await supabase
        .from("registrations")
        .select("email")
        .eq("email", data.email.toLowerCase())
        .maybeSingle();

      if (existing) {
        toast({
          title: "Already Registered",
          description: "This email has already been used for registration.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Format date of birth
      const monthIndex = months.indexOf(data.birthMonth);
      const dateOfBirth = new Date(parseInt(data.birthYear), monthIndex, parseInt(data.birthDay));
      const formattedDob = dateOfBirth.toISOString().split("T")[0];

      // Insert registration
      const { error: insertError } = await supabase.from("registrations").insert({
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        date_of_birth: formattedDob,
        phone_number: data.phone.trim(),
        email: data.email.toLowerCase().trim(),
        church: data.church,
        parent_name: isUnder18 ? data.parentName?.trim() : null,
        parent_phone: isUnder18 ? data.parentPhone?.trim() : null,
        parent_email: isUnder18 ? data.parentEmail?.toLowerCase().trim() : null,
      });

      if (insertError) {
        if (insertError.code === "23505") {
          toast({
            title: "Already Registered",
            description: "This email has already been used for registration.",
            variant: "destructive",
          });
        } else {
          throw insertError;
        }
        setIsSubmitting(false);
        return;
      }

      // Send confirmation email
      try {
        await supabase.functions.invoke("send-registration-email", {
          body: {
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            email: data.email.toLowerCase().trim(),
            church: data.church,
          },
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail registration if email fails
      }

      setIsSuccess(true);
      toast({
        title: "Registration Successful!",
        description: "You've been registered for SRYFC 2026. Check your email for confirmation.",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-ocean-dark">
        <Navbar />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-3xl p-12">
                <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
                <h1 className="text-3xl md:text-4xl font-display font-bold text-ocean-dark mb-4">
                  Registration Complete!
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Thank you for registering for SRYFC 2026. A confirmation email has been sent to your email address.
                </p>
                <Button
                  onClick={() => {
                    setIsSuccess(false);
                    form.reset();
                  }}
                  variant="outline"
                  className="border-2 border-ocean-medium text-ocean-dark hover:bg-ocean-medium hover:text-white"
                >
                  Register Another Person
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ocean-dark">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-sand-light">
              Register for SRYFC 2026
            </h1>
            <p className="text-sand/80 text-center mt-4 max-w-2xl mx-auto">
              Fill out the form below to secure your spot at the conference
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary via-coral to-white mx-auto rounded-full mt-6" />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ocean-dark font-display">First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} className="border-ocean-light focus:border-ocean-medium" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ocean-dark font-display">Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} className="border-ocean-light focus:border-ocean-medium" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <FormLabel className="text-ocean-dark font-display">Date of Birth</FormLabel>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name="birthMonth"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-ocean-light focus:border-ocean-medium">
                                  <SelectValue placeholder="Month" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {months.map((month) => (
                                  <SelectItem key={month} value={month}>
                                    {month}
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
                        name="birthDay"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-ocean-light focus:border-ocean-medium">
                                  <SelectValue placeholder="Day" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {days.map((day) => (
                                  <SelectItem key={day} value={day.toString()}>
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
                        name="birthYear"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-ocean-light focus:border-ocean-medium">
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {years.map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
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

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ocean-dark font-display">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} className="border-ocean-light focus:border-ocean-medium" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ocean-dark font-display">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} className="border-ocean-light focus:border-ocean-medium" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Church Selection */}
                  <FormField
                    control={form.control}
                    name="church"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ocean-dark font-display">Church</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-ocean-light focus:border-ocean-medium">
                              <SelectValue placeholder="Select your church" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {churches.map((church) => (
                              <SelectItem key={church} value={church}>
                                {church}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Parent Information (conditional) */}
                  {isUnder18 && (
                    <div className="border-t border-ocean-light pt-6 mt-6">
                      <h3 className="font-display font-bold text-lg text-ocean-dark mb-4">
                        Parent/Guardian Information
                        <span className="text-sm font-normal text-muted-foreground ml-2">
                          (Required for registrants under 18)
                        </span>
                      </h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="parentName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-ocean-dark font-display">Parent's Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Parent's full name" {...field} className="border-ocean-light focus:border-ocean-medium" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="parentPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-ocean-dark font-display">Parent's Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(555) 123-4567" {...field} className="border-ocean-light focus:border-ocean-medium" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="parentEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-ocean-dark font-display">Parent's Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="parent@example.com" {...field} className="border-ocean-light focus:border-ocean-medium" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-secondary to-coral hover:from-coral hover:to-secondary text-white font-display font-bold text-lg py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
