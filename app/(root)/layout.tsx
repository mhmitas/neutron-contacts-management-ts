import Navbar from '@/components/shared/navigation/Navbar'
import React from 'react'

const RootLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
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