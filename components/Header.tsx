import Image from "next/image";
import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import appMockup from "../assets/mockup.png"

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex w-1/2 h-auto justify-center items-center">
        {/* <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a> */}
        <Image
          src={appMockup}
          alt="App Preview"
          style={{objectFit: 'cover'}}
        />
      </div>
      <h1 className="sr-only">ESGI Telecom SaaS App</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
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
