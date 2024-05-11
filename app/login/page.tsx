import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import GeometricBackground from "@/components/geometric";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    // console.log(formData);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    // const origin = process.env.NEXT_PUBLIC_BASE_URL;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log("Could not authenticate user", error);
      return redirect("/login?message=Impossible de valider cet utilisateur");
    }

    return redirect("/login?message=Nous vous avons envoyé un email pour continuer");
  };

  const handleForgotPassword = () => {
    console.log('Password forgotten!');
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <GeometricBackground />

      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Retour
      </Link>

      <form className="animate-in p-12 flex flex-col w-full justify-center gap-2 text-foreground rounded-lg bg-white filter drop-shadow-xl">
        <h1 className="text-2xl text-dark-background mb-4">Connectez-vous</h1>

        <label className="text-md text-dark-background" htmlFor="email">
          Identifiant ou Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
          name="email"
          placeholder="jane.doe@esgitelco.com"
          required
        />
        <label className="text-md text-dark-background" htmlFor="password">
          Mot de passe
        </label>
        {/* <Link
          href="/"
          className="text-sm absolute right-12 h-11 z-10 text-secondary font-light"
        >
          Mot de passe oublié?
        </Link> */}
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-primary rounded-md px-4 py-2 text-background font-semibold mb-2"
          pendingText="Connexion en cours..."
        >
          Se Connecter
        </SubmitButton>
        <Link
          href="/"
          className="border border-transparent rounded-md px-4 py-2 text-dark-background font-light text-center"
        >
          Mot de passe oublié ?
        </Link>
        {/* <SubmitButton
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-sm text-dark-background mb-2"
          pendingText="Signing Up..."
        >
          S'inscrire (Admin)
        </SubmitButton> */}
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
