do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'workspaces',
    'prompts',
    'prompt_versions',
    'stash_items',
    'tasks',
    'progress_logs',
    'links',
    'ideas',
    'armin_messages',
    'integrations',
    'settings'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('drop policy if exists "own rows" on public.%I', table_name);
    execute format('create policy "own rows" on public.%I for all using (auth.uid() = user_id) with check (auth.uid() = user_id)', table_name);
  end loop;
end $$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'workspaces',
    'prompts',
    'prompt_versions',
    'stash_items',
    'tasks',
    'progress_logs',
    'links',
    'ideas',
    'armin_messages',
    'integrations',
    'settings'
  ]
  loop
    execute format('alter publication supabase_realtime add table public.%I', table_name);
  exception
    when duplicate_object then null;
  end loop;
end $$;

insert into storage.buckets (id, name, public)
values ('nexus-media', 'nexus-media', false)
on conflict (id) do nothing;

drop policy if exists "own media objects" on storage.objects;
create policy "own media objects"
  on storage.objects for all
  using (bucket_id = 'nexus-media' and auth.uid()::text = (storage.foldername(name))[1])
  with check (bucket_id = 'nexus-media' and auth.uid()::text = (storage.foldername(name))[1]);
