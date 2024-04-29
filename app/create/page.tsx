import GeometricBackground from "@/components/geometric";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SubmitButton } from "../login/submit-button";
import Image from "next/image";
import Link from "next/link";

import serverBro from "../../assets/Server-bro.svg"
import endpoint from "../../assets/Endpoint-cuate.svg"

export default function CreateUserAccount({
    searchParams,
}: {
    searchParams: { message: string };
}) {

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
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
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/login?message=Check email to continue sign in process");
    };

    return (
        <div className="flex flex-1 flex-col lg:flex-row w-full justify-center gap-2">
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

            {/* Left column - Form */}
            <form
                // onSubmit={}
                className="lg:w-3/5 px-8 py-10 lg:py-12 lg:px-48 lg flex flex-col flex-1 justify-center gap-6"
            >
                <h1 className="text-2xl text-dark-background mb-4">Créer un compte</h1>

                {/* Insert form inputs here */}
                <div className="flex flex-col">
                    <div className="flex flex-col lg:flex-row lg:gap-8">
                        <label htmlFor="firstName" className="sr-only text-md text-dark-background">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            // className="outlined-input"
                            className="lg:w-1/2 rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        />

                        <label htmlFor="lastName" className="sr-only text-md text-dark-background">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            // className="outlined-input"
                            className="lg:w-1/2 rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <label htmlFor="email" className="sr-only text-md text-dark-background">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        // className="outlined-input"
                        className="rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                    />

                    <label htmlFor="numeroID" className="sr-only text-md text-dark-background">
                        Numéro de l'employé
                    </label>
                    <input
                        type="text"
                        id="numeroID"
                        placeholder="Numéro de l'employé"
                        // className="outlined-input"
                        className="rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                    />

                    <div className="flex flex-col lg:flex-row lg:gap-8">
                        <label htmlFor="pays" className="sr-only text-md text-dark-background">
                            Pays
                        </label>
                        <input
                            type="text"
                            id="pays"
                            placeholder="Pays"
                            // className="outlined-input"
                            className="lg:w-1/2 rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        />

                        <label htmlFor="phone" className="sr-only text-md text-dark-background">
                            Numéro de Téléphone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Numéro de Téléphone"
                            // className="outlined-input"
                            className="lg:w-1/2 rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <label htmlFor="role" className="sr-only text-md text-dark-background">
                        Rôle
                    </label>
                    <input
                        type="email"
                        id="role"
                        placeholder="Rôle"
                        // className="outlined-input"
                        className="rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                    />
                </div>
                {/* Repeat for other form inputs */}

                <SubmitButton
                    // formAction={signIn}
                    className="bg-primary rounded-md px-4 py-2 text-background font-semibold mb-2"
                    pendingText="Connexion en cours..."
                >
                    Se Connecter
                </SubmitButton>
            </form>

            {/* Right column - Image */}
            <div className="hidden lg:block lg:w-2/5 relative">
                <Image
                    // src="https://images.unsplash.com/photo-1646628426948-f51a702a493a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    src={endpoint}
                    alt="Technology"
                    style={{ objectFit: 'contain' }}
                    className="absolute inset-0 object-cover w-full h-full"
                    width={1920}
                    height={1280}
                />
            </div>
        </div>
    );
}

/** border-2 border-gray-500 */
