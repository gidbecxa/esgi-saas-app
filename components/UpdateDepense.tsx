"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const updateDepenseCommentaire = async (id: number, commentaire: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('depenses')
        .update({ comment: commentaire })
        .eq('id', id);

    if (error) {
        console.error('Error updating depense:', error);
        return redirect("/depenses?message=L'insertion du commentaire n'a pas abouti!");
    }

    console.log('Data from update:', data);
    return redirect("/depenses?message=L'insertion du commentaire est accomplie !");
}
