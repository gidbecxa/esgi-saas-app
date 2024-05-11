import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import SignUpComptabSteps from "@/components/tutorial/SignUpComptSteps";
import SignUpAdminSteps from "@/components/tutorial/SignUpAdminSteps";
// import Navbar from "@/components/Navbar";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      {/* <Navbar /> */}

      <div className="animate-in flex-1 flex flex-col gap-12 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-3xl mb-4">Comment utiliser</h2>
          <section className="flex-1 flex flex-col lg:flex-row gap-6">
            <SignUpUserSteps />
            <SignUpComptabSteps />
            <SignUpAdminSteps />
          </section>
          {/* {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            ESGI Telecom
          </a>
        </p>
      </footer>
    </div>
  );
}
