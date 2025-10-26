import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

const registrationSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم الكامل مطلوب." }),
  email: z.string().email({ message: "صيغة البريد الإلكتروني غير صحيحة." }),
  phone: z.string().min(10, { message: "رقم الهاتف مطلوب (10 أرقام على الأقل)." }),
  city: z.string().min(2, { message: "المدينة مطلوبة." }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const Registration: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    ar: {
      title: "انضمي إلينا كمسوّقة",
      subtitle: "املئي النموذج أدناه لبدء رحلتك في التسويق بالعمولة. سيتم مراجعة طلبك.",
      submit: "إرسال طلب التسجيل",
      fields: {
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        city: "المدينة",
      },
      successMessage: "تم إرسال طلبك بنجاح! سنتواصل معك قريباً.",
      errorMessage: "فشل إرسال الطلب. يرجى المحاولة مرة أخرى.",
      fullNameError: "الاسم الكامل مطلوب.",
      emailError: "صيغة البريد الإلكتروني غير صحيحة.",
      phoneError: "رقم الهاتف مطلوب (10 أرقام على الأقل).",
      cityError: "المدينة مطلوبة.",
    },
    fr: {
      title: "Rejoignez-nous en tant que Marketeuse",
      subtitle: "Remplissez le formulaire ci-dessous pour commencer votre parcours d'affiliation. Votre demande sera examinée.",
      submit: "Soumettre la demande d'inscription",
      fields: {
        fullName: "Nom Complet",
        email: "Email",
        phone: "Numéro de Téléphone",
        city: "Ville",
      },
      successMessage: "Votre demande a été soumise avec succès ! Nous vous contacterons bientôt.",
      errorMessage: "Échec de l'envoi de la demande. Veuillez réessayer.",
      fullNameError: "Le nom complet est requis.",
      emailError: "Format d'email incorrect.",
      phoneError: "Le numéro de téléphone est requis (au moins 10 chiffres).",
      cityError: "La ville est requise.",
    },
    en: {
      title: "Join Us as a Marketer",
      subtitle: "Fill out the form below to start your affiliate marketing journey. Your application will be reviewed.",
      submit: "Submit Registration Request",
      fields: {
        fullName: "Full Name",
        email: "Email",
        phone: "Phone Number",
        city: "City",
      },
      successMessage: "Your request has been submitted successfully! We will contact you soon.",
      errorMessage: "Failed to submit request. Please try again.",
      fullNameError: "Full name is required.",
      emailError: "Invalid email format.",
      phoneError: "Phone number is required (at least 10 digits).",
      cityError: "City is required.",
    },
  };

  const currentContent = content[language as 'ar' | 'fr' | 'en'];

  // Update Zod schema messages based on current language
  const localizedRegistrationSchema = z.object({
    fullName: z.string().min(3, { message: currentContent.fullNameError }),
    email: z.string().email({ message: currentContent.emailError }),
    phone: z.string().min(10, { message: currentContent.phoneError }),
    city: z.string().min(2, { message: currentContent.cityError }),
  });

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(localizedRegistrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    
    // إرسال البيانات إلى جدول 'marketers' في Supabase
    const { error } = await supabase
      .from('marketers')
      .insert([
        { 
          full_name: data.fullName, 
          email: data.email, 
          phone: data.phone, 
          city: data.city,
          // يمكن إضافة حقل 'status' هنا لتعيين حالة الطلب (مثلاً: 'pending')
        },
      ]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      showError(currentContent.errorMessage);
    } else {
      showSuccess(currentContent.successMessage);
      form.reset();
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className={cn("container py-12 max-w-2xl", isRTL ? 'text-right' : 'text-left')} dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-4xl font-bold mb-2 text-primary">{currentContent.title}</h1>
      <p className="text-lg text-muted-foreground mb-8">{currentContent.subtitle}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{currentContent.fields.fullName}</FormLabel>
                <FormControl>
                  <Input placeholder={currentContent.fields.fullName} {...field} className={isRTL ? 'text-right' : 'text-left'} />
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
                <FormLabel>{currentContent.fields.email}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@email.com" {...field} className={isRTL ? 'text-right' : 'text-left'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{currentContent.fields.phone}</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="06XXXXXXXX" {...field} className={isRTL ? 'text-right' : 'text-left'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{currentContent.fields.city}</FormLabel>
                <FormControl>
                  <Input placeholder={currentContent.fields.city} {...field} className={isRTL ? 'text-right' : 'text-left'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : currentContent.submit}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Registration;