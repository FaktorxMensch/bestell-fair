// dotenv
import {config} from 'dotenv'
import {createClient} from "@supabase/supabase-js";

config()

export const supabaseServiceRole = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)
