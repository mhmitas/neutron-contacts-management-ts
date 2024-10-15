"use client"

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Edit2, EllipsisVertical, Star, Trash } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation'
import UpdateModal from './UpdateModal'
import askConfirm from './confirmModals/askConfirm'
import { deleteContact, toggleFavorite } from '@/lib/actions/contact.actions'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { IContact } from '@/lib/database/models/contact.model'

type ContactCardProps = {
    contact: IContact
    userId: string
}

const ContactCard = ({ contact, userId }: ContactCardProps) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const router = useRouter()
    const { firstName, lastName, email, phone, address, avatar } = contact;
    const pathname = usePathname()

    function handleRedirect() {
        router.push(`/contacts/${contact?._id}/details`)
    }
    function handleRedirectFromParent(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (e.target !== e.currentTarget) return;
        router.push(`/contacts/${contact?._id}/details`)
    }

    function handleUpdate() {
        setShowUpdateModal(true);
    }

    async function handleFavorite() {
        try {
            toast.promise(
                toggleFavorite({
                    contactId: contact?._id,
                    favorite: contact?.favorite,
                    path: pathname
                }),
                {
                    loading: 'Working...',
                    success: (data) => data?.message,
                    error: (err) => err?.message,
                },
            )
        } catch (error: any) {
            toast.error(error?.message)
        }
    }

    async function handleDelete() {
        try {
            const ask = await askConfirm("Are you sure you want to delete this contact?")
            if (!ask) return;

            const res = await deleteContact({ contactId: contact?._id })
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong")
        }
    }

    return (
        <div
            className='grid grid-cols-1 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 py-2 pl-3 pr-5 sm:pl-6 sm:pr-8 lg:pl-6 lg:pr-6 hover:bg-secondary/10 rounded gap-2 relative group transition-colors mb-2 cursor-pointer active:bg-secondary/25'
            onClick={handleRedirectFromParent}
        >
            {/* name and avatar | always display */}
            <div
                className='flex items-center gap-4 col-span-3'
                onClick={handleRedirect}
                title='Click to see details'
            >
                <Avatar>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{firstName?.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <h3 className='line-clamp-2'>{firstName + " " + lastName}</h3>
            </div>
            {/* email | visible from sm device */}
            <div
                className='overflow-hidden col-span-2 hidden sm:flex items-center'
                onClick={handleRedirect}
                title='Click to see details'
            >
                <h3 className='line-clamp-1'>{email}</h3>
            </div>
            {/* phone | visible from sm device */}
            <div
                className='overflow-hidden col-span-2 hidden md:flex items-center justify-center'
                onClick={handleRedirect}
                title='Click to see details'
            >
                <h3 className='line-clamp-1 '>{phone}</h3>
            </div>
            {/* address | visible from xl device */}
            <div
                className='overflow-hidden col-span-2 hidden xl:flex items-center text-sm'
                onClick={handleRedirect}
                title='Click to see details'
            >
                <h3 className='line-clamp-1'>{address}</h3>
            </div>
            {/* action | display form lg device */}
            <div className='hidden lg:flex justify-center items-center'>
                {/* add to favorite */}
                <Button
                    onClick={handleFavorite}
                    size="icon"
                    variant="ghost"
                    className={cn("rounded-full")}
                >
                    {contact?.favorite
                        ? <Star className='size-4 text-[#06b6d4]' fill='#06b6d4' />
                        : <Star className='size-4' />
                    }
                </Button>
                {/* update */}
                <Button onClick={handleUpdate} size="icon" variant="ghost" className="rounded-full" ><Edit2 className='size-4' /></Button>
                {/* delete */}
                <Button onClick={handleDelete} size="icon" variant="ghost" className="rounded-full" ><Trash className='size-4' /></Button>
            </div>
            <EllipseMenu
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleFavorite={handleFavorite}
                favorite={contact?.favorite}
            />
            <UpdateModal
                open={showUpdateModal}
                setOpen={setShowUpdateModal}
                contact={contact}
                userId={userId}
            />
        </div>
    )
}

export default ContactCard


function EllipseMenu({ handleUpdate, handleDelete, handleFavorite, favorite }: any) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='absolute lg:hidden flex right-2 top-1/4'>
                <Button size="icon" variant="ghost" className="rounded-full group-hover:bg-background/50 size-7" ><EllipsisVertical className='size-4' /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="*:px-4 *:py-2 px-0 shadow-lg min-w-64">
                <DropdownMenuItem onClick={handleFavorite} className="space-x-2">
                    <Star className='size-4' />
                    <span>{favorite ? "Remove from favorites" : "Add to favorites"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleUpdate} className="space-x-2">
                    <Edit2 className='size-4' />
                    <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="space-x-2">
                    <Trash className='size-4' />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}