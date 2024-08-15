import LoginForm from '@/components/LoginForm'
import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await auth();

    if (session.user) {
        redirect('/admin')
    }
    return (
        <div>
            <h1>Admin Login</h1>
            <LoginForm />
        </div>
    )
}

export default page