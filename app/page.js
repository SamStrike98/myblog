

import DesktopProject from '@/components/DesktopProject'
import ProjectItem from '@/components/ProjectItem'
import React from 'react'
import { RiHtml5Fill, RiJavascriptFill, RiNextjsFill, RiTailwindCssFill, RiCss3Fill } from "react-icons/ri";
import { SiStrapi, SiMongodb, SiDaisyui } from "react-icons/si";
import { FaCcStripe } from "react-icons/fa";
import { FaKey, FaPython } from "react-icons/fa6";
import { RiWordpressFill } from "react-icons/ri";
import Container from '@/components/Container';
import Image from 'next/image';
import PortfolioSectionTitle from '@/components/PortfolioSectionTitle';
import TechBadge from '@/components/TechBadge';

import planet from '@/public/planet.svg'

import car from '@/public/car.svg'

import Svg from '@/components/Svg';
import Canvas from '@/components/Canvas';
import Test from '@/components/Test';
import AnotherTest from '@/components/AnotherTest';

import About from '@/components/portfolio/About';
import Projects from '@/components/portfolio/Projects';
import Experience from '@/components/portfolio/Experience';
import Tech from '@/components/portfolio/Tech';


const page = () => {
  return (
    <div className='mb-36 lg:mt-36 '>
      {/* <a href="https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/">Free SVG Backgrounds and Patterns by SVGBackgrounds.com</a> */}
      <Container>

        <About />

        <Projects />

        <Experience />

        <Tech />

        <section className='flex flex-row justify-center'>
          <Canvas />
        </section>

      </Container>

    </div>
  )
}

export default page