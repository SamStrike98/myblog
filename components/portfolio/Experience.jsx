'use client'

import PortfolioSectionTitle from "../PortfolioSectionTitle"
import { useRef } from "react"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

const Experience = () => {
    const myRef = useRef()
    const { isVisible } = useIntersectionObserver(myRef)
    return (
        <section ref={myRef} className='my-16 min-h-[25vh]'>
            <PortfolioSectionTitle text={'Experience'} />
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                <li>
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="#3bbbf3"
                            className={`${isVisible ? 'fadeIn-animation' : 'opacity-0'} h-5 w-5`}>
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className={`${isVisible ? 'fadeInLeft-animation md:fadeInRight-animation' : 'opacity-0'} timeline-start mb-10 md:text-end`}>
                        <time className="font-mono italic">2016-2019</time>
                        <div className="text-lg font-black text-primary">University of East Anglia</div>
                        {"I studied Maths for 3 years at University, graduating with a 2:1. I learned a range of topics from Number Theory to Fluid Dynamics; however, the module I gained the most from was problem-solving. The actual Maths concepts were simpler than other modules, but it required an element of planning and lateral thinking."}
                    </div>
                    <hr className={`${isVisible ? 'fadeIn-animation' : 'opacity-0'} bg-white`} />
                </li>
                <li>
                    <hr className={`${isVisible ? 'fadeInDown-animation' : 'opacity-0'} bg-white`} />
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="#3bbbf3"
                            className={`${isVisible ? 'fadeIn-animation' : 'opacity-0'} h-5 w-5`}>
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className={`${isVisible ? 'fadeInLeft-animation' : 'opacity-0'} timeline-end mb-10`}>
                        <time className="font-mono italic">2019-2022</time>
                        <div className="text-lg font-black text-primary">Rose Builders</div>
                        {"Having finished University, my first job was at Rose Builders, working in the accounts team. Working to strict monthly and yearly deadlines, I also assisted with the introduction of new technology into the company to help speed up a number of processes."}
                    </div>
                    <hr className={`${isVisible ? 'fadeIn-animation' : 'opacity-0'} bg-white`} />
                </li>
                <li>
                    <hr className={`${isVisible ? 'fadeIn-animation' : 'opacity-0'} bg-white`} />
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="#3bbbf3"
                            className={`${isVisible ? 'fadeIn-animation' : 'opacity-0'} h-5 w-5`}>
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className={`${isVisible ? 'fadeInLeft-animation md:fadeInRight-animation' : 'opacity-0'} timeline-start mb-10 md:text-end`}>
                        <time className="font-mono italic">2022-</time>
                        <div className="text-lg font-black text-primary">Essex Carers Network</div>
                        {"At Essex Carers Network, I've worked on a variety of tasks, from helping to populate and keep their website up to date to building bespoke spreadsheets to increase efficiency and addressing general IT issues."}
                    </div>
                    <hr className={`bg-white ${isVisible ? 'fadeInLeft-animation md:fadeInRight-animation' : 'opacity-0'}`} />
                </li>
            </ul>
        </section>
    )
}

export default Experience