import Link from "next/link";
import Step from "./Step";

export default function SignUpUserSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <Step title="Pour les commerciaux">
        <p>
          Veuillez naviguer à la page de {" "}
          <Link
            href="/login"
            className="font-bold hover:underline text-foreground/80"
          >
            Connexion
          </Link>{" "}
          et vous connecter à votre compte de commercial. Vous pouvez désormais accéder à votre espace de commercial pour gérer des dépenses. Nous vous rendons le processus très optimisé!
        </p>
      </Step>
    </ol>
  );
}
