-- Create registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  church TEXT NOT NULL,
  parent_name TEXT,
  parent_phone TEXT,
  parent_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting registrations (public access for registration)
CREATE POLICY "Anyone can register" 
ON public.registrations 
FOR INSERT 
WITH CHECK (true);

-- Create policy for reading own registration by email (for checking duplicates)
CREATE POLICY "Anyone can check if email exists" 
ON public.registrations 
FOR SELECT 
USING (true);