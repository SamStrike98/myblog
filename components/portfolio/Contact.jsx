'use client'

import PortfolioSectionTitle from "../PortfolioSectionTitle"
import { useRef } from "react"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import ContactForm from "../ContactForm"

const Contact = () => {
    const myRef = useRef()
    const { isVisible } = useIntersectionObserver(myRef)
    return (
        <section ref={myRef} className='my-16 min-h-[25vh] w-full' id="contact">

            <PortfolioSectionTitle text={'Contact'} />

            <div className={`${isVisible ? 'fadeInUp-animation' : 'opacity-0'} flex flex-col items-center w-full`}>
                <ContactForm />
            </div>


        </section>
    )
}

export default Contact