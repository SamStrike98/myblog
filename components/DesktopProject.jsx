'use client'

import Image from "next/image"
import { useState, useRef } from "react"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import TechBadge from "./TechBadge"
import Link from "next/link"

import { FaGithub } from "react-icons/fa";
import { CgBrowser } from "react-icons/cg";



const DesktopProject = ({ name, img, info, tech, repoLink, liveSiteLink }) => {
    const [isProject, setIsProject] = useState(true)
    const myRef = useRef()
    const { isVisible } = useIntersectionObserver(myRef)
    return (
        <div ref={myRef} className={`${isVisible ? 'fadeInUp-animation' : 'opacity-0'} w-[300px] h-[225px] mb-44 mt-16`}>
            <div className="mockup-browser bg-base-300 border-4 border-primary">
                <div className="mockup-browser-toolbar ">
                    <div className="input">{name}</div>
                </div>
                <div className="bg-[#f2f2f2] overflow-y-scroll overflow-x-hidden h-[300px] no-scrollbar">
                    {isProject ? <Image width={1000} height={1000} alt={''} src={img} className="w-full rounded-b-md" />
                        :
                        <div>
                            <ul className="flex flex-row justify-evenly px-2 pt-4">
                                {tech.map((item, index) => (
                                    <TechBadge key={index} name={item} />
                                ))}
                            </ul>

                            <p className="text-neutral p-3 font-bold text-lg leading-relaxed">{info}</p>

                            <ul className="flex flex-row justify-evenly my-6">
                                {repoLink && <div className="tooltip" data-tip="Github Repo"><a href={repoLink} target="_blank" rel="noopener noreferrer" className="text-primary"><FaGithub size={40} /></a></div>}
                                {liveSiteLink && <div className="tooltip" data-tip="Live Site"><a href={liveSiteLink} target="_blank" rel="noopener noreferrer" className="text-primary"><CgBrowser size={40} /></a></div>}
                            </ul>

                        </div>

                    }
                </div>
            </div>

            <div className="flex flex-row justify-center"><button className="btn  w-[150px] my-5" onClick={() => setIsProject(!isProject)}>{isProject ? 'View Info' : 'View Project'}</button></div>
        </div>
    )
}

export default DesktopProject