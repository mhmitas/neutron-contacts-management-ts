import Link from "next/link"
import { Button } from "../../ui/button"
import Image from "next/image"
import { Plus } from "lucide-react"

export default async function Navbar() {

    return (
        <nav className="sticky top-0 z-50 w-full bg-background shadow-sm shadow-accent">
            <div className="flex items-center justify-between h-16 my-container">
                <div className="flex-shrink-0 flex items-center gap-4">
                    <div className="md:hidden flex">
                        {/* <SmNavbarSheet /> */}
                    </div>
                    <Link href="/" className="">
                        <div className="w-max flex items-center gap-2">
                            <Image className="w-6 md:w-8" src="/logo.png" alt="logo" width={50} height={50} />
                            <span className="text-xl md:text-2xl font-medium">Contacts</span>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        {/* <LgNavItems /> */}
                        <Button asChild variant="secondary" className="rounded-full space-x-2">
                            <Link href="/contacts/create">
                                <Plus />
                                <span>Create Contact</span>
                            </Link>
                        </Button>
                    </div>
                    {/* <ModeToggle />
                    <NavAvatar session={session} /> */}
                </div>
            </div>
        </nav >
    )
}