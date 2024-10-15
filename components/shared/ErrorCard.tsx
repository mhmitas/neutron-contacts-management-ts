import React from 'react'

const ErrorCard = ({ error }: { error: string }) => {
    console.log({ error })

    return (
        <div className='p-6 bg-secondary/10 w-full my-4 text-lg font-semibold'>
            <p className='text-center'>{error}</p>
        </div>
    )
}

export default ErrorCard