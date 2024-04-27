import Image from "next/image";
import appLogo from "../assets/logo.png"

export default function AppLogo() {
    return (
        <div className="flex items-center justify-center w-16 h-16">
            <Image
                src={appLogo}
                alt="ESGI Telecom logo"
                style={{ objectFit: 'contain' }}
            // className="h-10" 
            />
        </div>
    )
}