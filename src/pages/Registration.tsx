import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';

const registrationSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم الكامل مطلوب." }),
  email: z.string().email({ message: "صيغة البريد الإلكتروني غير صحيحة." }),
  phone: z.string().min(10, { message: "رقم الهاتف مطلوب (10 أرقام على الأقل)." }),
  city: z.string().min(2, { message: "المدينة مطلوبة." }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const Registration: React.FC = () => {
  const { language, isRTL } = useLanguage();

  const content = {
    ar: {
      title: "انضمي إلينا كمسوّقة",
      subtitle: "املئي النموذج أدناه لبدء رحلتك في التسويق بالعمولة.",
      submit: "إرسال طلب التسجيل",
      fields: {
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        city: "المدينة",
      },
      successMessage: "تم إرسال طلبك بنجاح! سنتواصل معك قريباً.",
    },
    fr: {
      title: "Rejoignez-nous en tant que Marketeuse",
      subtitle: "Remplissez le formulaire ci-dessous pour commencer votre parcours d'affiliation.",
      submit: "Soumettre la demande d'inscription",
      fields: {
        fullName: "Nom Complet",
        email: "Email",
        phone: "Numéro de Téléphone",
        city: "Ville",
      },
      successMessage: "Votre demande a été soumise avec succès ! Nous vous contacterons bientôt.",
    },
  };

  const currentContent = content[language];

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    console.log("Registration Data:", data);
    // ملاحظة: هنا يتم إرسال البيانات إلى Google Sheets
    showSuccess(currentContent.successMessage);
    form.reset();
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

          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
            {currentContent.submit}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Registration;