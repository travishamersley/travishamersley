-- Create a function to call the edge function
create or replace function public.call_member_setup_webhook()
returns trigger as $$
begin
  -- Call the edge function
  perform net.http_post(
    url := 'https://your-project-ref.functions.supabase.co/setup-new-member',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"}',
    body := json_build_object('user', row_to_json(new))::text
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger to call the webhook
create trigger on_member_created
  after insert on public.members
  for each row
  execute procedure public.call_member_setup_webhook(); 