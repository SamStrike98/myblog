'use client'

import Image from "next/image"
import { useState } from "react"
import TechBadge from "./TechBadge"

const DesktopProject = ({ name, img, info, tech }) => {
    const [isProject, setIsProject] = useState(true)
    return (
        <div className='w-[400px] h-[300px] mb-36 mt-10'>
            <div className="mockup-browser bg-base-300 border ">
                <div className="mockup-browser-toolbar ">
                    <div className="input">{name}</div>
                </div>
                <div className="bg-[#f2f2f2] overflow-y-scroll h-[300px] no-scrollbar">
                    {isProject ? <Image width={1000} height={1000} alt={''} src={img} className="w-full rounded-b-md" />
                        :
                        <div>
                            <ul className="flex flex-row justify-evenly px-2 pt-4">
                                {tech.map(item => (
                                    <TechBadge key={item.id} icon={item.icon} name={item.name} />
                                ))}
                            </ul>

                            <p className="text-neutral p-3 font-bold text-lg leading-relaxed">{info}</p>
                        </div>

                    }
                </div>
            </div>

            <div className="flex flex-row justify-center"><button className="btn btn-neutral w-[150px] my-5" onClick={() => setIsProject(!isProject)}>{isProject ? 'View Info' : 'View Project'}</button></div>
        </div>
    )
}

export default DesktopProject