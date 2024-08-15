import CreatePostForm from '@/components/CreatePostForm'
import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await auth();

    if (session?.user.role !== 'admin') {
        return redirect('/')
    }

    return (
        <div>
            <CreatePostForm />
        </div>
    )
}

export default page