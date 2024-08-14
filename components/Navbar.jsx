import Link from 'next/link'
import React from 'react'
import Container from './Container'
import { IoNewspaperOutline } from "react-icons/io5";
import { MdLocalPostOffice } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { LuFileBarChart } from "react-icons/lu";


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

const Navbar = () => {
    return (
        <div>
            <Container>
                <h1 className='text-5xl font-extrabold my-5 ml-5 bg-gradient-to-r transition-all from-blue-800 to-blue-100 text-transparent bg-clip-text'>Sam Strike</h1>
                <div className='bg-base-100 p-[4px] bg-gradient-to-r transition-all from-blue-800 to-blue-400 rounded-3xl fixed w-full right-0 bottom-5 lg:top-5 lg:sticky'>

                    <ul className='flex flex-row justify-evenly bg-base-100 rounded-[calc(1.5rem-4px)] h-[80px]'>
                        {navLinks.map(item => (
                            <li key={item.id} className='cursor-pointer flex flex-row gap-2 items-center font-bold text-lg sm:text-2xl hover:text-primary transition-colors'><Link href={item.link}>{item.title}</Link><span>{item.icon}</span></li>
                        ))}
                    </ul>
                </div>
            </Container>
        </div>

    )
}

export default Navbar