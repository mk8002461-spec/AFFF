import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { showSuccess, showError } from '@/utils/toast';
import { Loader2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const authSchema = z.object({
  email: z.string().email({ message: "صيغة البريد الإلكتروني غير صحيحة." }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تتكون من 6 أحرف على الأقل." }),
});

type AuthFormValues = z.infer<typeof authSchema>;

const Auth: React.FC = () => {
  const { language, isRTL, } = useLanguage();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    ar: {
      title: isSigningUp ? "تسجيل حساب جديد" : "تسجيل الدخول",
      subtitle: isSigningUp ? "أدخلي بياناتك لإنشاء حساب مسوّقة." : "أدخلي بريدك الإلكتروني وكلمة المرور.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      submit: isSigningUp ? "تسجيل جديد" : "تسجيل الدخول",
      toggle: isSigningUp ? "لديك حساب بالفعل؟ تسجيل الدخول" : "ليس لديك حساب؟ تسجيل جديد",
      successLogin: "تم تسجيل الدخول بنجاح!",
      successSignup: "تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتأكيد التسجيل.",
    },
    fr: {
      title: isSigningUp ? "Créer un nouveau compte" : "Connexion",
      subtitle: isSigningUp ? "Entrez vos informations pour créer un compte marketeuse." : "Entrez votre email et mot de passe.",
      email: "Email",
      password: "Mot de passe",
      submit: isSigningUp ? "S'inscrire" : "Se connecter",
      toggle: isSigningUp ? "Vous avez déjà un compte ? Connectez-vous" : "Pas de compte ? Inscrivez-vous",
      successLogin: "Connexion réussie !",
      successSignup: "Compte créé avec succès ! Veuillez vérifier votre email pour confirmation.",
    },
  };

  const currentContent = content[language];

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    setIsSubmitting(true);
    const { email, password } = data;
    let error = null;

    if (isSigningUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      error = signUpError;
      if (!error) {
        showSuccess(currentContent.successSignup);
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      error = signInError;
      if (!error) {
        showSuccess(currentContent.successLogin);
      }
    }

    if (error) {
      console.error("Auth Error:", error);
      showError(error.message);
    }
    
    setIsSubmitting(false);
  };

  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  // Redirect authenticated users to the dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className={cn("container py-12 flex justify-center", isRTL ? 'text-right' : 'text-left')} dir={isRTL ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-primary text-center">{currentContent.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6 text-center">{currentContent.subtitle}</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{currentContent.email}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@email.com" {...field} className={isRTL ? 'text-right' : 'text-left'} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{currentContent.password}</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} className={isRTL ? 'text-right' : 'text-left'} />
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
          
          <Button 
            variant="link" 
            className="w-full mt-4 text-sm text-muted-foreground"
            onClick={() => setIsSigningUp(!isSigningUp)}
            disabled={isSubmitting}
          >
            {currentContent.toggle}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;