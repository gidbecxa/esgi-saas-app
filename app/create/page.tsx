import { redirect } from "next/navigation";
import { SubmitButton } from "../login/submit-button";
import Image from "next/image";
import Link from "next/link";

import endpoint from "../../assets/Endpoint-cuate.svg"
import AccessDeniedModal from "@/components/AccessDenied";
// import { checkAdminRole } from "@/utils/droits/roles";
import { createClient } from "@/utils/supabase/server";

export default async function CreateUserAccount(
    // { searchParams, }: { searchParams: { message: string }; }
) {
    /* const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    } */

    const checkAdminRole = async () => {
        "use server";

        const supabase = createClient();

        const { data: { user }, error } = await supabase.auth.getUser();

        if (!user) {
            console.log("User not found!");
            return redirect("/login");
        }

        const { data: userData, error: userError } = await supabase.from('users').select('role').eq('email', user?.email ?? '');
        console.log("User data: ", userData);

        if (userError) {
            console.error('Couldn\'t fetch user\'s data: ', userError);
            return false;
        }

        return userData?.[0]?.role === "admin";
    };

    const isAdmin = await checkAdminRole();
    // console.log("User is admin?", isAdmin);

    if (!isAdmin) {
        return <AccessDeniedModal />
    }

    const signUp = async (formData: FormData) => {
        "use server";

        const firstname = formData.get("firstName") as string;
        const lastname = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const numeroemployee = formData.get("employeeID") as string;
        const pays = formData.get("pays") as string;
        const telephone = formData.get("phone") as string;
        const role = formData.get("role") as string;

        const supabase = createClient();

        console.log("Form data: ", telephone);

        const { error } = await supabase.from('users').insert([
            {
                firstname,
                lastname,
                email,
                numeroemployee,
                pays,
                telephone,
                role: role.toLowerCase(),
            }
        ]);

        if (error) {
            console.error('Error inserting data:', error);
            return redirect("/create?message=L'ajout de cet utilisateur n'a pas abouti");
        }

        return redirect("/create?message=L'action d'ajout du nouvel utilisateur est accomplie !");
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

            {/* La colonne à gauche - Formulaire */}
            <form
                className="lg:w-3/5 p-8 mt-16 lg:py-12 lg:px-48 lg flex flex-col flex-1 justify-center gap-6"
            >
                <h1 className="text-2xl text-dark-background mb-4">Ajouter un utilisateur</h1>

                {/* Insert form inputs here */}
                <div className="flex flex-col">
                    <div className="flex flex-col lg:flex-row lg:gap-8">
                        <label htmlFor="firstName" className="sr-only text-md text-dark-background">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            // className="outlined-input"
                            className="lg:w-1/2 rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        />

                        <label htmlFor="lastName" className="sr-only text-md text-dark-background">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
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
                        name="email"
                        placeholder="Email"
                        // className="outlined-input"
                        className="rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                    />

                    <label htmlFor="numeroID" className="sr-only text-md text-dark-background">
                        Numéro de l'employé
                    </label>
                    <input
                        type="text"
                        name="employeeID"
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
                            name="pays"
                            placeholder="Pays"
                            // className="outlined-input"
                            className="lg:w-1/2 rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        />

                        <label htmlFor="phone" className="sr-only text-md text-dark-background">
                            Numéro de Téléphone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Numéro de Téléphone"
                            // className="outlined-input"
                            className="lg:w-1/2 rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <label htmlFor="role" className="sr-only text-md text-dark-background">
                        Rôle
                    </label>
                    <input
                        type="text"
                        name="role"
                        placeholder="Rôle"
                        // className="outlined-input"
                        className="rounded-md px-4 py-2 bg-inherit border mb-6 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                    />
                </div>

                <SubmitButton
                    formAction={signUp}
                    className="bg-primary rounded-md px-4 py-2 text-background font-semibold mb-2"
                    pendingText="Connexion en cours..."
                >
                    Ajouter
                </SubmitButton>
            </form>

            {/* La colonne à droite - Image */}
            <div className="hidden lg:block lg:w-2/5 relative">
                <Image
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
