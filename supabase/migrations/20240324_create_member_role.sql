-- Create a member role if it doesn't exist
create role if not exists member;

-- Create function to handle new user setup
create or replace function public.handle_new_user_setup()
returns trigger as $$
begin
  -- Add 'member' role to the new user
  execute format(
    'grant member to %I',
    new.email
  );
  
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger to automatically setup new users
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user_setup(); 