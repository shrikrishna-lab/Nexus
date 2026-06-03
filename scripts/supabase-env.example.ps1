# Copy this to scripts/supabase-env.ps1 and put your real password there.
# Do not commit the copied file.
$env:SUPABASE_DB_PASSWORD = "replace-with-your-database-password"

# Then run:
# node node_modules\supabase\dist\supabase.js link --project-ref iwnclxsebjaxuiamdltv
# node node_modules\supabase\dist\supabase.js db push
