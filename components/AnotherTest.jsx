'use client'

import { useRef } from "react"
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { FaArrowDownLong } from "react-icons/fa6";

const AnotherTest = () => {
    const myRef = useRef()
    const { isVisible } = useIntersectionObserver(myRef)

    return (
        <div ref={myRef} className={`${isVisible ? 'fadeInUp-animation' : 'opacity-0'} h-[500px] bg-blue-500 `}>
            <h2>This is the Test Section</h2>
            <span>🚀</span>
            <span><FaArrowDownLong /></span>
        </div>
    )
}

export default AnotherTest