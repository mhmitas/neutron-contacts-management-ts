"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Edit2, Star, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import askConfirm from '../shared/confirmModals/askConfirm'
import { deleteContact, toggleFavorite } from '@/lib/actions/contact.actions'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { IContact } from '@/lib/database/models/contact.model'
import { Session } from 'next-auth'
import UpdateModal from './UpdateModal'

const ContactDetailsPageActionSec = ({ contact, session }: { contact: IContact, session: Session | null }) => {
    const router = useRouter()
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    async function handleFavorite() {
        try {
            toast.promise(
                toggleFavorite({
                    contactId: contact?._id,
                    favorite: contact?.favorite,
                    path: `/`
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

            if (res?.success) {
                // target: details page to home
                router.push('/')
            }
        } catch (error: any) {
            // console.error(error)
            toast.error(error?.message || "Something went wrong")
        }
    }

    return (
        <div className='flex justify-between items-center mb-6'>
            <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full"><ArrowLeft className='size-5' /></Button>
            <div>
                {/* favorite */}
                <Button
                    onClick={handleFavorite}
                    size="icon"
                    variant="ghost"
                    className={cn("rounded-full")} >
                    {contact?.favorite
                        ? <Star className='size-5 text-[#06b6d4]' fill='#06b6d4' />
                        : <Star className='size-5' />
                    }
                </Button>
                {/* Edit */}
                <Button
                    onClick={() => setShowUpdateModal(true)}
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                >
                    <Edit2 className='size-5' />
                </Button>
                {/* Delete */}
                <Button
                    onClick={handleDelete}
                    size="icon"
                    variant="ghost"
                    className="rounded-full" >
                    <Trash className='size-5' />
                </Button>
            </div>
            <UpdateModal
                contact={contact}
                open={showUpdateModal}
                setOpen={setShowUpdateModal}
                userId={session?.user?.id}
            />
        </div>
    )
}

export default ContactDetailsPageActionSec