import DesktopProject from '@/components/DesktopProject'
import ProjectItem from '@/components/ProjectItem'
import React from 'react'
import { RiHtml5Fill } from "react-icons/ri";
import { RiJavascriptFill } from "react-icons/ri";
import { RiNextjsFill } from "react-icons/ri";
import { RiTailwindCssFill } from "react-icons/ri";
import { RiCss3Fill } from "react-icons/ri";
import { SiStrapi } from "react-icons/si";
import { FaCcStripe } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { SiMongodb } from "react-icons/si";
import { RiWordpressFill } from "react-icons/ri";
import { FaPython } from "react-icons/fa6";
import { SiDaisyui } from "react-icons/si";
import Container from '@/components/Container';
import Image from 'next/image';
import PortfolioSectionTitle from '@/components/PortfolioSectionTitle';
import TechBadge from '@/components/TechBadge';

const projects = [
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

const page = () => {
  return (
    <div className='mb-36 lg:mt-36'>
      <Container>

        <section className='my-16'>
          <PortfolioSectionTitle text={'About'} />
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-10'>
            <div className='p-[4px] rounded-full overflow-hidden bg-gradient-to-r hover:bg-gradient-to-b from-blue-800 to-blue-400'>
              <div className='rounded-[calc(9999px-4px)] w-[250px] h-[250px] overflow-hidden flex flex-row justify-center items-end bg-base-100'>
                <Image alt="Profile Image" src="/professionalPhoto.png" width={480} height={390} className='' />
              </div>
            </div>
            <p className='w-[80%] sm:w-[40%] font-bold lg:text-2xl text-xl leading-relaxed'>{"My journey into building websites started during lockdown with the aim of challenging myself to learn something new. Having thoroughly enjoyed learning frontend website development in my spare time, I'm now looking to turn it into a career."}</p>
          </div>
        </section>

        <section className='my-16'>
          <PortfolioSectionTitle text={'Projects'} />
          <ul className='flex flex-row flex-wrap gap-6 justify-evenly'>
            {projects.map(project => (
              <DesktopProject key={project.id} name={project.name} img={project.img} info={project.info} tech={project.tech} repoLink={project.repoLink} liveSiteLink={project.liveSiteLink} />
            ))}
          </ul>
        </section>

        <section className='my-16'>
          <PortfolioSectionTitle text={'Experience'} />
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            <li>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#3bbbf3"
                  className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd" />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic">2016-2019</time>
                <div className="text-lg font-black text-primary">University of East Anglia</div>
                {"I studied Maths for 3 years at University, graduating with a 2:1. I learned a range of topics from Number Theory to Fluid Dynamics; however, the module I gained the most from was problem-solving. The actual Maths concepts were simpler than other modules, but it required an element of planning and lateral thinking."}
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#3bbbf3"
                  className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd" />
                </svg>
              </div>
              <div className="timeline-end mb-10">
                <time className="font-mono italic">2019-2022</time>
                <div className="text-lg font-black text-primary">Rose Builders</div>
                {"Having finished University, my first job was at Rose Builders, working in the accounts team. Working to strict monthly and yearly deadlines, I also assisted with the introduction of new technology into the company to help speed up a number of processes."}
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#3bbbf3"
                  className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd" />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic">2022-</time>
                <div className="text-lg font-black text-primary">Essex Carers Network</div>
                {"At Essex Carers Network, I've worked on a variety of tasks, from helping to populate and keep their website up to date to building bespoke spreadsheets to increase efficiency and addressing general IT issues."}
              </div>
              <hr />
            </li>
          </ul>
        </section>

        <section className='my-16'>
          <PortfolioSectionTitle text={'Tech'} />

          <div className='bg-white p-10 rounded-md mx-4'>
            <p className='text-2xl font-bold text-base-100 text-center mb-12'>{"Some of the tech I've used!"}</p>
            <ul className='flex flex-row flex-wrap justify-evenly gap-10'>
              {tech.map(item => (
                <TechBadge key={item.id} icon={item.icon} name={item.name} />
              ))}

            </ul>
          </div>

        </section>

      </Container>

    </div>
  )
}

export default page