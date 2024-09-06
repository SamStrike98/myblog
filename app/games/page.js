
import Container from '@/components/Container';

import PortfolioSectionTitle from '@/components/PortfolioSectionTitle';
import Canvas from '@/components/Canvas';
import Game from '@/components/Game';
import RPGGame from '@/components/RPGGame';



const page = () => {
    return (
        <div className='mb-36 lg:mt-36 '>
            {/* <a href="https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/">Free SVG Backgrounds and Patterns by SVGBackgrounds.com</a> */}
            <Container>

                <PortfolioSectionTitle text="Games" />

                <section className='my-16 flex flex-col items-center'>
                    <p className='w-[80%] text-2xl text-white'>{"I've recently been playing around with little browser based games built using the HTML5 Canvas. Nothing amazing but I'm enjoying the process of game development (if you can call it that). Here are the 'games' I've made so far - hopefully they'll get better over time!"}</p>
                </section>

                <section className='rounded-md my-16'>
                    <div className="badge badge-secondary text-white text-lg p-4">{'04/09/2024'}</div>
                    <Canvas />
                </section>

                {/* <section className='rounded-md my-16'>
                    <Game />
                </section> */}


                <section className='rounded-md my-16'>
                    <RPGGame />
                </section>

            </Container>

        </div>
    )
}

export default page