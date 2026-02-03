
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
    console.error('Error: Missing Env Vars');
    process.exit(1);
}

// SIMULATE CLIENT / MIDDLEWARE
// We use the ANON key, not service role.
const supabase = createClient(supabaseUrl, anonKey);

async function testLoginFlow() {
    const email = 'admin@codeofdigital.com';
    const password = 'admin123';

    console.log(`1. Attempting login as ${email}...`);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (authError) {
        console.error('❌ Login Failed:', authError.message);
        return;
    }

    const user = authData.user;
    console.log('✅ Login Successful. User ID:', user.id);
    console.log('   Access Token:', authData.session.access_token.substring(0, 15) + '...');

    // 2. Try to fetch profile using this user's context
    // The client automatically attaches the session after sign in.

    console.log('2. Fetching Profile (RLS Check)...');

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profileError) {
        console.error('❌ Profile Fetch Failed (RLS Blocking?):', profileError);
        console.error('   Details:', profileError.message, profileError.hint);
    } else {
        console.log('✅ Profile Fetched:', profile);
        if (profile.role === 'admin') {
            console.log('🎉 SUCCESS: Role is admin.');
        } else {
            console.error('❌ FAILURE: Role is NOT admin. It is:', profile.role);
        }
    }
}

testLoginFlow();
