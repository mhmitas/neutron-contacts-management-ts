import { auth } from '@/auth';
import ContactsSection from '@/components/shared/ContactsSection';
import { getContactsByUser } from '@/lib/actions/contact.actions';
import React from 'react'

const Home = async () => {

    const session = await auth()

    const { data: contacts } = await getContactsByUser({ userId: session?.user?.id as string });

    return (
        <main className='mb-10'>
            <section className='my-container'>
                <h1 className='text-xl sm:text-2xl font-medium mb-3 mt-6'>Contacts {'('}{contacts?.length}{')'}</h1>
                <ContactsSection contacts={contacts} session={session} />
                {contacts?.length === 0 && <p className='text-center py-6 px-2 text-muted-foreground'>You have no contacts.</p>}
            </section>
        </main>
    )
}

export default Home