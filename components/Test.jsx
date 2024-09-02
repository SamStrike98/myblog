'use client'

import { useRef, useEffect, useState } from "react"
import { FaArrowDownLong } from "react-icons/fa6";

const Test = () => {
    const myRef = useRef()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            console.log(entry)
            setIsVisible(entry.isIntersecting)
            if (entry.isIntersecting) {
                observer.unobserve(entry.target)
            }
        }, {
            threshold: 0.5
        })

        observer.observe(myRef.current)

    }, [])
    return (
        <div ref={myRef} className={`${isVisible ? 'fadeInUp-animation' : 'opacity-0'} h-[500px] bg-blue-500 `}>
            <h2>This is the Test Section</h2>
            <span>🚀</span>
            <span><FaArrowDownLong /></span>
        </div>
    )
}

export default Test