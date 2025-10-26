import { createClient } from '@supabase/supabase-js';

// استخدام قيم وهمية إذا لم يتم توفير المتغيرات لمنع تعطل التطبيق في بيئات التطوير
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_anon_key';

// ملاحظة: يجب على المستخدم التأكد من تعيين هذه المتغيرات في بيئة Dyad لكي يعمل الاتصال بـ Supabase.
// إذا كانت القيم وهمية، فإن أي عملية قاعدة بيانات ستفشل لاحقًا.

export const supabase = createClient(supabaseUrl, supabaseAnonKey);