'use client'

import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useRef, useState } from "react";

import { RiHtml5Fill, RiJavascriptFill, RiNextjsFill, RiTailwindCssFill, RiCss3Fill } from "react-icons/ri";
import { SiStrapi, SiMongodb, SiDaisyui } from "react-icons/si";
import { FaCcStripe } from "react-icons/fa";
import { FaKey, FaPython } from "react-icons/fa6";
import { RiWordpressFill } from "react-icons/ri";

import PortfolioSectionTitle from "../PortfolioSectionTitle";
import DesktopProject from "../DesktopProject";
import Svg from "../Svg";
import football from '@/public/football.svg'
import car from '@/public/car.svg'
import Image from "next/image";

const projectsArr = [
    {
        id: 1,
        name: 'Gifts By Breed',
        img: '/gifts_by_breed.png',
        info: 'Incorporating NextJS and TailwindCSS on the front-end, connecting via an API to a MongoDB database, and also making use of the Stripe API to collect payments and AuthJS for authentication and authorisation.',
        tech: [
            {
                id: 1,
                name: 'Next JS',
                icon: <RiNextjsFill size={50} />
            },
            {
                id: 2,
                name: 'Tailwind CSS',
                icon: <RiTailwindCssFill size={50} />
            },
            {
                id: 3,
                name: 'Stripe',
                icon: <FaCcStripe size={50} />
            },
            {
                id: 4,
                name: 'Auth JS',
                icon: <FaKey size={50} />
            },
            {
                id: 5,
                name: 'MongoDB',
                icon: <SiMongodb size={50} />
            },
        ],
        repoLink: 'https://github.com/SamStrike98/gifts-by-breed',
        liveSiteLink: 'https://gifts-by-breed.vercel.app/'
    },
    {
        id: 2,
        name: 'Harmonford Estates',
        img: '/harmonford_estates.png',
        info: 'Using Strapi as a headless CMS, this project allowed me to practise key skills such as fetching data, filtering data and pagination, and error handling.',
        tech: [
            {
                id: 1,
                name: 'Next JS',
                icon: <RiNextjsFill size={50} />
            },
            {
                id: 2,
                name: 'Tailwind CSS',
                icon: <RiTailwindCssFill size={50} />
            },
            {
                id: 3,
                name: 'Strapi',
                icon: <SiStrapi size={50} />
            },
        ],
        repoLink: 'https://github.com/SamStrike98/harmonford_estates',
        liveSiteLink: 'https://harmonford-estates.vercel.app/'
    },
    {
        id: 3,
        name: 'LFC Website',
        img: '/lfc_clone.png',
        info: 'This was the first website I built whilst learning NextJS - the official LFC website has a fairly simple design but with some interesting features to recreate.',
        tech: [
            {
                id: 1,
                name: 'Next JS',
                icon: <RiNextjsFill size={50} />
            },
            {
                id: 2,
                name: 'Tailwind CSS',
                icon: <RiTailwindCssFill size={50} />
            },
        ],
        repoLink: '',
        liveSiteLink: ''
    },
    {
        id: 4,
        name: 'The Trainer Experts',
        img: '/the_trainer_experts.png',
        info: 'The main aim of this project was to plan out the design and structure before building it. Additionally, I thought it would be interesting to develop an e-commerce-style project.',
        tech: [
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
            }
        ],
        repoLink: 'https://github.com/SamStrike98/Trainer-Experts',
        liveSiteLink: ''
    },
]

const Projects = () => {
    const myRef = useRef()
    const { isVisible } = useIntersectionObserver(myRef)
    const [isBouncing, setIsBouncing] = useState(false)
    return (
        <section className='my-16 min-h-[50vh]'>

            <div ref={myRef} className={`${isVisible ? 'fadeInDown-animation' : 'opacity-0'}`}>
                <PortfolioSectionTitle text={'Projects'} />
            </div>

            <ul className={`flex flex-row flex-wrap gap-6 justify-evenly`}>
                {projectsArr.map(project => (
                    <DesktopProject key={project.id} name={project.name} img={project.img} info={project.info} tech={project.tech} repoLink={project.repoLink} liveSiteLink={project.liveSiteLink} />
                ))}
            </ul>


        </section>
    )
}

export default Projects