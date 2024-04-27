import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-6 text-base rounded-xl no-underline bg-btn-background hover:bg-btn-background-hover">
          Déconnexion
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-6 text-base flex rounded-xl no-underline bg-btn-background hover:bg-btn-background-hover font-medium"
    >
      Connexion
    </Link>
  );
}
