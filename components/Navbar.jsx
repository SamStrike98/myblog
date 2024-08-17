import Link from 'next/link'
import React from 'react'
import Container from './Container'
import { IoNewspaperOutline } from "react-icons/io5";
import { MdLocalPostOffice } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { LuFileBarChart } from "react-icons/lu";
import { auth, signOut } from '@/auth';


const navLinks = [
    {
        id: 1,
        title: 'Posts',
        link: `${process.env.URL}/posts`,
        icon: <IoNewspaperOutline />
    },
    {
        id: 2,
        title: 'Categories',
        link: `${process.env.URL}/posts/categories`,
        icon: <TbCategoryFilled />
    },
    {
        id: 3,
        title: 'Portfolio',
        link: `${process.env.URL}/portfolio`,
        icon: <LuFileBarChart />
    },
    {
        id: 4,
        title: 'Contact',
        link: `${process.env.URL}/contact`,
        icon: <MdLocalPostOffice />
    },
]

const Navbar = async () => {
    const session = await auth()


    return (
        <div className='z-50'>
            <Container>
                <div className='w-full max-w-[1000px] flex flex-row my-5 items-center justify-between px-5'><h1 className={`text-5xl font-extrabold bg-gradient-to-r transition-all ${session?.user.role === 'admin' ? 'from-green-800 to-green-100' : 'from-blue-800 to-blue-100'}  text-transparent bg-clip-text text-left`}></h1> {session?.user.role === 'admin' ? <ul className='flex flex-row gap-5'><Link href={'/admin/create-post'}>Create Post</Link> <Link href={'/admin'}>All Posts</Link> <form action={async () => {
                    'use server'
                    await signOut({ redirectTo: "/" })
                }}>
                    <button type='submit'>Logout</button>
                </form> </ul> : ''}</div>
                <div className='bg-base-100 p-[4px] bg-gradient-to-r transition-all from-blue-800 to-blue-400 rounded-3xl fixed max-w-[1000px] w-[90%] bottom-[20px] lg:top-[20px] lg:h-fit z-50'>

                    <ul className='flex flex-row justify-evenly bg-base-100 rounded-[calc(1.5rem-4px)] h-[80px]'>
                        <h4 className='h-full flex flex-row items-center font-extrabold text-3xl text-primary justify-start'>{"Sam Strike"}</h4>
                        {navLinks.map(item => (
                            <li key={item.id} className='cursor-pointer flex flex-row gap-2 items-center font-bold text-md sm:text-xl md:text-2xl hover:text-primary transition-colors'>
                                <Link href={item.link} className='flex flex-row items-center gap-3'>
                                    <span className='hidden md:flex '>{item.title}</span>

                                    <div className="md:hidden tooltip tooltip-top" data-tip={item.title}>
                                        <span className='text-3xl md:text-xl'>{item.icon}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </div>

    )
}

export default Navbar