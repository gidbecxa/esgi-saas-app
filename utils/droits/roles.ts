"use server"

import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

const supabase = createClient();

export const checkAdminRole = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not found!");
        return;
    }

    const { data: userData, error: userError } = await supabase.from('users').select('role').eq('email', user?.email ?? '');
    console.log("User data: ", userData);

    if (userError) {
        console.error('Couldn\'t fetch user\'s data: ', userError);
        return false;
    }

    return userData?.[0]?.role === "admin";
};

export const checkComptableRole = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not found!");
        return;
    }

    const { data: userData, error: userError } = await supabase.from('users').select('role').eq('email', user?.email ?? '');
    console.log("User data: ", userData);

    if (userError) {
        console.error('Couldn\'t fetch user\'s data: ', userError);
        return false;
    }

    return userData?.[0]?.role === "comptable";
};

export const checkCommercialRole = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not found!");
        return;
    }

    const { data: userData, error: userError } = await supabase.from('users').select('role').eq('email', user?.email ?? '');
    console.log("User data: ", userData);

    if (userError) {
        console.error('Couldn\'t fetch user\'s data: ', userError);
        return false;
    }

    return userData?.[0]?.role === "commercial";
};
