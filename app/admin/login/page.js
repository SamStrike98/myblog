import LoginForm from '@/components/LoginForm'
import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Container from '@/components/Container'

const page = async () => {
    const session = await auth();

    if (session?.user) {
        redirect('/admin')
    }
    return (
        <div className='mt-36'>
            <Container>
                <h1>Admin Login</h1>
                <LoginForm />
            </Container>
        </div>
    )
}

export default page