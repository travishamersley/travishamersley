import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iksigdksurnemmcojkix.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlrc2lnZGtzdXJuZW1tY29qa2l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3ODQ4NjksImV4cCI6MjA1MzM2MDg2OX0.GHHv3JZUL_Qoq54NbeIK_EKv5_CDLtmu628WIJXm0Yc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 