import React from 'react'
import ContactCard from './ContactCard'
import { Session } from 'next-auth'
import { IContact } from '@/lib/database/models/contact.model'

type ContactsSectionProps = {
    session: Session | null,
    contacts: IContact[]
}

const ContactsSection = async ({ session, contacts }: ContactsSectionProps) => {

    return (
        <section className=''>
            <div className='grid grid-cols-1 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 py-3 px-6 gap-4 border-b mb-4 sticky top-16 bg-background/70 z-10 backdrop-blur-sm'>
                <p className='col-span-3'>Name</p>
                <p className='col-span-2 hidden sm:flex items-center'>Email</p>
                <p className='col-span-2 hidden md:flex items-center justify-center'>Phone</p>
                <p className='col-span-2 hidden xl:flex items-center'>Address</p>
                <p className='hidden lg:flex justify-center items-center'>Actions</p>
            </div>
            <div className=''>
                {contacts.map((contact, index) => <ContactCard
                    key={index}
                    contact={contact}
                    userId={session?.user?.id as string}
                />)}
            </div>
        </section>
    )
}

export default ContactsSection

