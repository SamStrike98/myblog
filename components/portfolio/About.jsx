'use client'

import PortfolioSectionTitle from "../PortfolioSectionTitle"
import Image from "next/image"
import Svg from "../Svg"

import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useRef } from "react"

import football from '@/public/football.svg'
import planet from '@/public/planet.svg'

const About = () => {
    const myRef = useRef()
    const { isVisible } = useIntersectionObserver(myRef)
    return (
        <section ref={myRef} className='my-16 h-[50vh]'>
            <PortfolioSectionTitle text={'About'} />
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-10'>

                <div className={`${isVisible ? ' fadeInDown-animation' : 'opacity-0'} p-[4px] rounded-full overflow-hidden bg-gradient-to-r hover:bg-gradient-to-b from-blue-800 to-blue-400`}>
                    <div className={`rounded-[calc(9999px-4px)] w-[250px] h-[250px] overflow-hidden flex flex-row justify-center items-end bg-base-100`}>
                        <Image alt="Profile Image" src="/professionalPhoto.png" width={480} height={390} />
                    </div>
                </div>
                {/* <Svg img={planet} name={'planet'} /> */}
                <div className={`w-[90%] sm:w-[50%] relative ${isVisible ? 'border-primary' : 'border-transparent'} transition-colors border-2 rounded-md`}>
                    <div className={`${isVisible ? 'rotate-45 md:scale-150 animate-pulse' : '-rotate-45 scale-0'} absolute delay-1000 duration-500 right-[-75px] top-[-75px]`}>
                        <Image src={planet} width={150} height={150} alt={'planet'} className="" />
                    </div>
                    <p className={`${isVisible ? 'fadeInDown-animation' : 'opacity-0'} font-bold rounded-md lg:text-2xl text-xl leading-relaxed p-5 text-center`}>{"My journey into building websites started during lockdown with the aim of challenging myself to learn something new. Having thoroughly enjoyed learning frontend website development in my spare time, I'm now looking to turn it into a career."}</p>
                </div>

            </div>
        </section>
    )
}

export default About