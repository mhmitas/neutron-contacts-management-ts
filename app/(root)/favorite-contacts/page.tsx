import { auth } from '@/auth';
import ContactsSection from '@/components/shared/ContactsSection';
import { getFavoriteContactsByUser } from '@/lib/actions/contact.actions';
import React from 'react'

const FavoriteContacts = async () => {

    const session = await auth()

    const { data: contacts } = await getFavoriteContactsByUser({ userId: session?.user?.id as string });

    return (
        <main className='mb-10'>
            <section className='my-container'>
                <h1 className='text-xl sm:text-2xl font-medium mb-3 mt-6'>Favorite Contacts {'('}{contacts?.length}{')'}</h1>
                <ContactsSection contacts={contacts} session={session} />
                {contacts?.length === 0 && <p className='text-center py-6 px-2 text-muted-foreground'>No favorites yet. Add contacts to your favorites for quick access.</p>}
            </section>
        </main>
    )
}

export default FavoriteContacts