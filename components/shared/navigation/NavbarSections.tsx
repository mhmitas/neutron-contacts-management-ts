"use client"

import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { LogOut, Menu, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { FaStar, FaUsers } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import Image from 'next/image';
import { signOut } from "next-auth/react"
import { Session } from 'next-auth';

const navItems = [
    { name: "Contacts", href: "/", Icon: FaUsers },
    { name: "Favorites ", href: "/favorite-contacts", Icon: FaStar },
]


export const SmNavbarSheet = () => {
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger>
                <Menu />
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>
                        <Link href="/" className="">
                            <div className="w-max flex items-center gap-2 mb-3">
                                <img className="w-6 md:w-8" src="/logo.png" alt="logo" width={10} height={10} />
                                <span className="text-xl md:text-2xl font-medium">Contacts</span>
                            </div>
                        </Link>
                    </SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <ul className='w-full flex flex-col gap-2'>
                    <li className='text-start mb-2'>
                        <Button asChild variant="secondary" className="rounded-full space-x-2">
                            <Link href="/contacts/create">
                                <Plus />
                                <span>Create Contact</span>
                            </Link>
                        </Button>
                    </li>
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href}>
                            <li className={
                                cn(
                                    'w-full hover:bg-muted text-left px-4 py-2 rounded-md flex items-center gap-4 transition-colors',
                                    pathname === item.href ?
                                        'bg-muted'
                                        : 'bg-background'
                                )}>
                                <item.Icon className='text-xl' />
                                <span>{item.name}</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </SheetContent>
        </Sheet>

    )
}


export const LgNavItems = () => {
    const pathname = usePathname()

    return (
        <>
            {navItems.map(item => (
                <Link
                    className={cn('font-semibold hover:text-secondary px-2 transition-colors', pathname === item.href ? 'text-secondary' : 'text-foreground')}
                    key={item.href}
                    href={item.href}
                >
                    {item.name}
                </Link>
            ))}
        </>
    )
}


export const NavAvatar = ({ session }: { session: Session | null }) => {
    return (
        <>
            {session ?
                <DropdownMenu>
                    <DropdownMenuTrigger className='rounded-full'>
                        <Avatar>
                            <AvatarImage src={session?.user?.image || ""} />
                            <AvatarFallback className="bg-gradient-to-b from-cyan-500 to-violet-600 text-white">{session?.user?.name?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end" className="rounded-xl border-none dark:shadow-muted">
                        <div className='p-4 min-w-64 w-max'>
                            <figure className='flex items-center justify-center size-24 rounded-full m-auto mb-2 bg-gradient-to-b from-cyan-500 to-violet-600 text-white'>
                                {session?.user?.image ?
                                    <Image width={100} height={100} className='w-full rounded-full border-secondary' src={session?.user?.image || "/default-avatar.png"} alt="user profile image" />
                                    :
                                    <p className='text-3xl'>{session?.user?.name?.slice(0, 2)}</p>
                                }
                            </figure>
                            <div className=''>
                                <h3 className='text-lg font-medium text-center'>{session?.user?.name}</h3>
                                <p className='text-sm text-center'>{session?.user?.email}</p>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="py-2 px-4 space-x-2" onClick={() => signOut()}>
                            <LogOut className='size-5' />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                :
                <Button size="sm" asChild>
                    <Link href="/sign-in">Sign In</Link>
                </Button>
            }
        </>

    )
}