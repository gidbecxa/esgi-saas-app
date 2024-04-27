import Link from "next/link";
import Step from "./Step";

export default function SignUpAdminSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <Step title="Pour les Admins">
        <p>
          Veuillez naviguer à la page de {" "}
          <Link
            href="/login"
            className="font-bold hover:underline text-foreground/80"
          >
            Connexion
          </Link>{" "}
          et vous connecter à votre compte d'admin. Vous pourriez désormais accéder à votre dashboard d'admin pour la gestion des utilisateurs et du système. Nous vous rendons le processus très optimisé!
        </p>
      </Step>
    </ol>
  );
}
