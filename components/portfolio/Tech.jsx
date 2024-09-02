'use client'

import PortfolioSectionTitle from "../PortfolioSectionTitle"
import TechBadge from "../TechBadge"

import { RiHtml5Fill, RiJavascriptFill, RiNextjsFill, RiTailwindCssFill, RiCss3Fill } from "react-icons/ri";
import { SiStrapi, SiMongodb, SiDaisyui } from "react-icons/si";
import { FaCcStripe } from "react-icons/fa";
import { FaKey, FaPython } from "react-icons/fa6";
import { RiWordpressFill } from "react-icons/ri";

import { useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { Mynerve } from "next/font/google";

const tech = [
    {
        id: 1,
        name: 'HTML',
        icon: <RiHtml5Fill size={50} />
    },
    {
        id: 2,
        name: 'CSS',
        icon: <RiCss3Fill size={50} />
    },
    {
        id: 3,
        name: 'JavaScript',
        icon: <RiJavascriptFill size={50} />
    },
    {
        id: 5,
        name: 'Next JS',
        icon: <RiNextjsFill size={50} />
    },
    {
        id: 6,
        name: 'Tailwind CSS',
        icon: <RiTailwindCssFill size={50} />
    },
    {
        id: 7,
        name: 'Strapi',
        icon: <SiStrapi size={50} />
    },
    {
        id: 8,
        name: 'Stripe',
        icon: <FaCcStripe size={50} />
    },
    {
        id: 9,
        name: 'Auth JS',
        icon: <FaKey size={50} />
    },
    {
        id: 10,
        name: 'MongoDB',
        icon: <SiMongodb size={50} />
    },
    {
        id: 11,
        name: 'WordPress',
        icon: <RiWordpressFill size={50} />
    },
    {
        id: 12,
        name: 'Python',
        icon: <FaPython size={50} />
    },
    {
        id: 13,
        name: 'DaisyUI',
        icon: <SiDaisyui size={50} />
    },
]

const Tech = () => {
    const myRef = useRef()
    const { isVisible } = useIntersectionObserver(myRef)
    return (
        <section ref={myRef} className={` my-16 min-h-[50vh]`}>
            <PortfolioSectionTitle text={'Tech'} />

            <div className={`${isVisible ? 'fadeInUp-animation' : 'opacity-0'} bg-white p-10 rounded-md mx-4`}>
                <p className='text-2xl font-bold text-base-100 text-center mb-12'>{"Some of the tech I've used!"}</p>
                <ul className='flex flex-row flex-wrap justify-evenly gap-10'>
                    {tech.map(item => (
                        <TechBadge key={item.id} icon={item.icon} name={item.name} />
                    ))}

                </ul>
            </div>

        </section>
    )
}

export default Tech