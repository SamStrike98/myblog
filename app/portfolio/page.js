

import Container from '@/components/Container';


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

                {/* <section className='border-primary border-4 rounded-md'>
                    <Canvas />
                </section> */}

            </Container>

        </div>
    )
}

export default page