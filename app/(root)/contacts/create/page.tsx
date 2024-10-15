import { auth } from '@/auth'
import ContactForm from '@/components/shared/ContactForm'
import React from 'react'

const CreateContactPage = async () => {
    const session = await auth()

    const userId = session?.user?.id as string

    return (
        <main className='my-container mb-10'>
            <h1 className='text-xl sm:text-2xl text-center font-semibold my-6'>Add a new contact</h1>
            <div className='max-w-2xl mx-auto shadow-md dark:shadow-muted/50 rounded-lg p-4 sm:p-6 md:p-8 border'>
                <ContactForm formType="Create" userId={userId} />
            </div>
        </main>
    )
}

export default CreateContactPage