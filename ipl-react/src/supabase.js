import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rditiehgksekvuxhkbhf.supabase.co'
const supabaseKey = 'sb_publishable_VkyJLEOsjDeb8AMDSH-Odg_UzSYCVmB'

export const supabase = createClient(supabaseUrl, supabaseKey)