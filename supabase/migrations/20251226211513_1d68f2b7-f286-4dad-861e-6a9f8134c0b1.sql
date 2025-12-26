-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can check if email exists" ON public.registrations;

-- Create a more restrictive policy that only allows checking specific emails (for duplicate detection)
-- This uses a function approach to limit what can be queried
CREATE POLICY "Allow email existence check only" 
ON public.registrations 
FOR SELECT 
USING (false);

-- Create a security definer function to check if an email exists (bypasses RLS safely)
CREATE OR REPLACE FUNCTION public.check_email_exists(check_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.registrations
    WHERE LOWER(email) = LOWER(check_email)
  )
$$;