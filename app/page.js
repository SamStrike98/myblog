

import Container from '@/components/Container';
import About from '@/components/portfolio/About';
import Projects from '@/components/portfolio/Projects';
import Experience from '@/components/portfolio/Experience';
import Tech from '@/components/portfolio/Tech';
import Contact from '@/components/portfolio/Contact';


const page = () => {
  return (
    <div className='mb-36 lg:mt-36'>

      <Container>

        <About />

        <Projects />

        <Experience />

        <Tech />

        <Contact />

      </Container>

      <div data-tip="Download a copy" className='tooltip tooltip-left text-white hover:bg-primary transition-colors fixed bottom-5 right-5 text-3xl font-extrabold border-2 border-primary rounded-full p-3'><a href='/cv.docx' download>CV</a></div>
    </div>
  )
}

export default page