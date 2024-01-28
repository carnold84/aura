import { createClient } from "@supabase/supabase-js";

import { Database } from "./database.types";

const apiURL = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_ANON_KEY;

export const client = createClient<Database>(apiURL, apiKey);
