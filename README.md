# Présentation du Projet Appli ESGI avec Next.js

### Introduction

Bienvenue dans la présentation de notre projet Next.js que nous avons développé jusqu'à présent. Dans ce guide, nous explorerons les différentes étapes de la création de ce projet, en commençant par son initialisation et en examinant sa structure de fichiers. Commençons !

---

### 1. Initialisation du Projet

Pour commencer, nous avons initialisé notre projet en utilisant Next.js, un framework populaire pour le développement d'applications React. Voici un aperçu du fichier `package.json` qui contient les dépendances du projet :

```tsx
{
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@nextui-org/react": "^2.3.6",
    "@supabase/ssr": "latest",
    "@supabase/supabase-js": "latest",
    // Autres dépendances...
  },
  "devDependencies": {
    "@types/node": "20.11.5",
    "@types/react": "18.2.48",
    "@types/react-dom": "18.2.18",
    // Autres dépendances de développement...
  }
}
```

Ce fichier contient les scripts pour démarrer, construire et lancer l'application Next.js, ainsi que les dépendances nécessaires à notre projet, telles que Supabase pour la gestion de la base de données et Tailwind CSS pour le stylage.

### 2. Structure du Projet

La structure de notre projet est organisée de manière à faciliter le développement et la maintenance. Voici un aperçu des principaux dossiers et fichiers :

  - `components`: Ce dossier contient les composants React réutilisables utilisés dans tout le projet.
  - `pages`: Ce dossier contient les différentes pages de notre application, où chaque fichier représente une page unique.
  - `utils`: Ce dossier contient les fonctions utilitaires utilisées dans tout le projet.

Voici une prévue du fichier `page.tsx` dans le dossier `app`, qui représente la page d'accueil de notre application :

```tsx

import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
// Importations d'autres composants...

export default function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        {/* Contenu de la barre de navigation */}
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-12 opacity-0 max-w-4xl px-3">
        {/* Contenu principal de la page */}
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        {/* Pied de page */}
      </footer>
    </div>
  );
}
```

### 3. Dépendances du Projet

Les dépendances de notre projet sont des bibliothèques externes nécessaires au bon fonctionnement de l'application. Nous utilisons des dépendances pour des fonctionnalités telles que la gestion de l'état, le stylage et l'authentification. Voici quelques-unes des dépendances importantes utilisées dans notre projet :

  - `@nextui-org/react`: Une bibliothèque de composants React pour une interface utilisateur moderne.
  - `@supabase/ssr` et `@supabase/supabase-js`: Bibliothèques pour l'interaction avec la base de données Supabase.
  - `tailwindcss`: Un framework CSS utilitaire pour styliser nos composants de manière rapide et efficace.

Bien sûr ! Voici la suite de votre tutoriel :

### 4. Connexion et Authentification

Dans cette étape, nous avons mis en place la fonctionnalité de connexion et d'authentification dans notre application. Cela nous permet d'authentifier les utilisateurs et de gérer leur accès à certaines fonctionnalités. Voici une prévue de la page de connexion `login/page.tsx` :

```tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
// Importations d'autres composants et fonctions...

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    // Fonction de connexion utilisateur
  };

  const signUp = async (formData: FormData) => {
    // Fonction d'inscription utilisateur
  };

  const handleForgotPassword = () => {
    // Fonction de réinitialisation du mot de passe
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      {/* Contenu de la page de connexion */}
    </div>
  );
}
```

Dans cette page, les utilisateurs peuvent saisir leurs informations de connexion et se connecter à l'application. Nous avons également inclus des fonctionnalités telles que l'inscription d'un nouvel administrateur et la réinitialisation du mot de passe.

### 5. Création d'un Compte Utilisateur

Une autre fonctionnalité importante de notre application est la création d'un compte utilisateur. Cela permet aux utilisateurs de s'inscrire et d'accéder à des fonctionnalités supplémentaires de l'application. Voici une prévue de la page de création de compte `/create/page.tsx` :

```tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../login/submit-button";
// Importations d'autres composants et fonctions...

export default function CreateUserAccount({ searchParams }: { searchParams: { message: string } }) {
  const signUp = async (formData: FormData) => {
    // Fonction d'inscription utilisateur
  };

  return (
    <div className="flex flex-1 flex-col lg:flex-row w-full justify-center gap-2">
      {/* Contenu de la page de création de compte utilisateur */}
    </div>
  );
}
```

Sur cette page, les utilisateurs peuvent saisir les informations nécessaires pour créer leur compte, telles que leur nom, leur adresse e-mail et leur mot de passe.

### 6. Gestion des Dépenses

Enfin, une autre fonctionnalité clé de notre application est la gestion des dépenses. Cela permet aux utilisateurs de saisir et de suivre leurs dépenses, ce qui est essentiel pour la gestion financière. Voici une prévue du formulaire de saisie des dépenses `ExpenseForm.tsx` :

```tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { createClient } from '@/utils/supabase/client';
import { SubmitButton } from '../login/submit-button';
import DeployButton from '@/components/DeployButton';
// Importations d'autres composants et fonctions...

export default function ExpenseForm() {
  const [formData, setFormData] = useState<ExpenseFormData>({
    // Initialisation des données du formulaire
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // Gestion des changements dans les champs du formulaire
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Gestion du changement de fichier pour les documents joints
  };

  const handleSubmit = async (e: FormEvent) => {
    // Soumission du formulaire et envoi des données à la base de données
  };

  return (
    <div className="flex-1 w-full flex flex-col px-4">
      {/* Contenu du formulaire de saisie des dépenses */}
    </div>
  );
}
```

Ce formulaire permet aux utilisateurs de saisir les détails de leurs dépenses, tels que le nom de la dépense, la catégorie, le coût, la description, et de télécharger des documents joints si nécessaire.

D'accord, continuons avec les sections suivantes :

### 7. Couche de Présentation

Dans cette section, nous allons explorer la manière dont nous présentons notre application aux utilisateurs. Nous utilisons plusieurs composants pour cela, notamment le composant `Header` qui affiche un en-tête attrayant avec un aperçu de l'application et une description de son objectif. Voici un exemple du composant `Header` :

```tsx
import Image from "next/image";
import appMockup from "../assets/mockup.png";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex w-1/2 h-auto justify-center items-center">
        <Image
          src={appMockup}
          alt="App Preview"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <h1 className="sr-only">ESGI Telecom SaaS App</h1>
      <p className="text-2xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        La solution optimale pour gérer{" "}
        <a
          href="#"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          les dépenses
        </a>{" "}
        des{" "}
        <a
          href="#"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          commerciaux
        </a>
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
```

Ce composant `Header` offre une première impression visuelle de notre application et fournit des informations essentielles sur son objectif.

### 8. Stylisme et Design

Maintenant, abordons la manière dont nous stylisons et concevons notre application pour offrir une expérience utilisateur agréable et intuitive. Nous utilisons des bibliothèques telles que Tailwind CSS pour le stylisme et Geist UI pour les composants d'interface utilisateur. Voici un exemple d'utilisation de la bibliothèque Geist UI dans notre application :

```tsx
import { Button } from '@geist-ui/react';

export default function SignUpUserSteps() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold">Étape 1</h3>
      <p className="text-sm">Remplissez le formulaire d'inscription.</p>
      <Button type="secondary">S'inscrire</Button>
    </div>
  );
}
```

Nous utilisons également des composants personnalisés et des animations pour rendre notre application plus attrayante et conviviale pour l'utilisateur.

### 9. Déploiement

Enfin, discutons du processus de déploiement de notre application. Nous avons choisi d'utiliser la plateforme Vercel pour le déploiement en raison de sa simplicité, de son intégration transparente avec Next.js et de ses performances élevées. Voici un aperçu de notre utilisation de Vercel :

- Création d'un compte sur Vercel et de liens avec notre référentiel GitHub.
- Configuration des paramètres de déploiement, y compris les variables d'environnement et les autorisations d'accès.
- Déploiement automatique à chaque nouvelle mise à jour du code source sur la branche principale du référentiel GitHub.

Vercel facilite grandement le processus de déploiement de notre application et nous permet de fournir rapidement des mises à jour et des améliorations à nos utilisateurs.

---

Conclusion :

Dans ce tutoriel, nous avons parcouru les principales fonctionnalités de notre application, depuis l'initialisation du projet Next.js jusqu'au déploiement sur Vercel. Nous avons également examiné la manière dont nous présentons notre application aux utilisateurs, le stylisme et le design que nous utilisons, ainsi que le processus de déploiement. Nous espérons que cela vous a donné un aperçu complet de notre travail jusqu'à présent et que vous êtes prêt à explorer davantage notre application !