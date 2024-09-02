import { useState, useEffect } from 'react'

const useIntersectionObserver = (myRef) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsVisible(entry.isIntersecting)
            if (entry.isIntersecting) {
                observer.unobserve(entry.target)
            }
        }, {
            threshold: 0.5
        })
        observer.observe(myRef.current)
    }, [])

    return { isVisible }
}

export default useIntersectionObserver