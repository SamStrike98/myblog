import Link from 'next/link'
import React from 'react'
import Container from './Container'
import { IoNewspaperOutline } from "react-icons/io5";
import { MdLocalPostOffice } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { LuFileBarChart } from "react-icons/lu";
import { IoIosCreate } from "react-icons/io";
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
        link: `${process.env.URL}/`,
        icon: <LuFileBarChart />
    },
    {
        id: 4,
        title: 'Contact',
        link: `${process.env.URL}/contact`,
        icon: <MdLocalPostOffice />
    },
]

const adminLinks = [
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
    {
        id: 5,
        title: 'Admin Posts',
        link: `${process.env.URL}/admin`,
        icon: <IoNewspaperOutline color='green' />
    },
    {
        id: 6,
        title: 'Create Post',
        link: `${process.env.URL}/admin/create-post`,
        icon: <IoIosCreate color='green' />
    },
]

const Navbar = async () => {
    const session = await auth()


    return (
        <div className='z-50'>
            <Container>
                <div className='bg-base-100 p-[4px] bg-gradient-to-r transition-all from-blue-800 to-blue-400 rounded-3xl fixed max-w-[1000px] w-[90%] bottom-[20px] lg:top-[20px] lg:h-fit z-50'>

                    <ul className='flex flex-row justify-evenly bg-base-100 rounded-[calc(1.5rem-4px)] h-[80px]'>
                        <h4 className={`h-full flex flex-row items-center font-extrabold text-3xl ${session?.user.role === 'admin' ? 'text-green-500' : 'text-primary'} justify-start`}>{"Sam Strike"}</h4>

                        {session?.user.role === 'admin' ?
                            <>
                                {adminLinks.map(item => (
                                    <li key={item.id} className='cursor-pointer flex flex-row gap-2 items-center font-bold text-md sm:text-xl md:text-2xl hover:text-primary transition-colors'>
                                        <Link href={item.link} className='flex flex-row items-center gap-3'>
                                            <span className='hidden lg:flex '>{item.title}</span>

                                            <div className="lg:hidden tooltip tooltip-top" data-tip={item.title}>
                                                <span className='text-3xl lg:text-lg'>{item.icon}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                                <form action={async () => {
                                    'use server'
                                    await signOut({ redirectTo: "/" })
                                }}>
                                    <button className='h-full cursor-pointer flex flex-row gap-2 items-center font-bold text-md sm:text-xl md:text-2xl hover:text-primary transition-colors' type='submit'>Logout</button>
                                </form>
                            </>
                            :
                            <>{navLinks.map(item => (
                                <li key={item.id} className='cursor-pointer flex flex-row gap-2 items-center font-bold text-md sm:text-xl md:text-2xl hover:text-primary transition-colors'>
                                    <Link href={item.link} className='flex flex-row items-center gap-3'>
                                        <span className='hidden md:flex '>{item.title}</span>

                                        <div className="md:hidden tooltip tooltip-top" data-tip={item.title}>
                                            <span className='text-3xl md:text-xl'>{item.icon}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                            </>
                        }
                    </ul>
                </div>
            </Container>
        </div>

    )
}

export default Navbar