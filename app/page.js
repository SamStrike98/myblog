

import Container from '@/components/Container';
import About from '@/components/portfolio/About';
import Projects from '@/components/portfolio/Projects';
import Experience from '@/components/portfolio/Experience';
import Tech from '@/components/portfolio/Tech';
import Contact from '@/components/portfolio/Contact';


const page = () => {
  return (
    <div className='mb-36 lg:mt-36 '>

      <Container>

        <About />

        <Projects />

        <Experience />

        <Tech />

        <Contact />

      </Container>

    </div>
  )
}

export default page