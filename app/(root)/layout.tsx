import { auth } from '@/auth'
import Navbar from '@/components/shared/navigation/Navbar'
import { redirect } from 'next/navigation'
import React from 'react'

const RootLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {

    const session = await auth()

    if (!session) {
        redirect("/sign-in")
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-grow'>
                {children}
            </div>
        </div>
    )
}

export default RootLayout