-- ============================================================
-- 060_demo_requests.sql
-- Table for storing landing page demo and setup requests
-- ============================================================

CREATE TABLE IF NOT EXISTS public.demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Allow public unauthenticated submission from the landing page
DROP POLICY IF EXISTS "Allow public insert demo_requests" ON public.demo_requests;
CREATE POLICY "Allow public insert demo_requests" ON public.demo_requests 
  FOR INSERT 
  WITH CHECK (true);

-- Allow service role full management
DROP POLICY IF EXISTS "Allow service_role full demo_requests" ON public.demo_requests;
CREATE POLICY "Allow service_role full demo_requests" ON public.demo_requests 
  FOR ALL 
  USING (true);

CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON public.demo_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON public.demo_requests(email);
