create table public.members (
  id uuid references auth.users on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  first_name text not null,
  last_name text not null,
  parent text,
  dob date not null,
  primary_phone text not null,
  secondary_phone text,
  email text not null,
  address_line1 text not null,
  address_suburb text not null,
  primary key (id)
);

-- Set up Row Level Security (RLS)
alter table public.members enable row level security;

-- Create policies
create policy "Users can view their own profile"
  on members for select
  using (
    auth.uid() = id 
    and auth.jwt()->>'role' = 'member'
  );

create policy "Users can update their own profile"
  on members for update
  using (
    auth.uid() = id 
    and auth.jwt()->>'role' = 'member'
  );

-- Allow insert during signup for new members
create policy "Enable insert for authenticated users only"
  on members for insert
  with check (
    auth.uid() = id 
    and auth.jwt()->>'role' = 'member'
  ); 