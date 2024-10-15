import { auth } from '@/auth';
import ContactDetailsPageActionSec from '@/components/shared/ContactDetailsPageActionSec';
import ErrorCard from '@/components/shared/ErrorCard';
import { getContactById } from '@/lib/actions/contact.actions'
import Image from 'next/image'
import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";


const ContactDetails = async ({ params: { id } }: { params: { id: string } }) => {
    const session = await auth()

    const { data: contact, error } = await getContactById({ contactId: id })

    if (error) {
        return <ErrorCard error={error} />
    }

    const { firstName, lastName, avatar, email, phone, address } = contact || {};

    return (
        <main className='my-container'>
            <section className='max-w-3xl mx-auto mb-8 mt-4'>
                <ContactDetailsPageActionSec contact={contact} session={session} />
                <figure className='size-36 sm:size-48 md:size-60 rounded-full bg-gradient-to-b from-cyan-500/20 to-violet-500/20 m-auto border flex items-center justify-center overflow-hidden'>
                    {avatar ?
                        <Image src={avatar} width={250} height={250} alt={firstName || "user profile image"} /> :
                        <p className='text-7xl sm:text-8xl md:text-9xl'>{firstName?.slice(0, 1)}</p>
                    }
                </figure>
                <div className='text-center text-2xl sm:text-3xl md:text-4xl font-medium mt-2'>
                    <h3>{firstName + " " + lastName}</h3>
                </div>
                <div className='bg-muted dark:bg-muted/70 p-4 rounded-lg mt-6'>
                    <h3 className='text-lg font-semibold mb-2'>Contact Details</h3>
                    <div className='space-y-2'>
                        {email && <p className='flex gap-2 items-center'><IoMailOutline className='text-xl' /><span>{email}</span></p>}
                        {phone && <p className='flex gap-2 items-center'><IoCallOutline className='text-xl' /><span>{phone}</span></p>}
                        {address && <p className='flex gap-2 items-center'><IoLocationOutline className='text-xl' /><span>{address}</span></p>}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ContactDetails