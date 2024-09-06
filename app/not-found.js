import Container from "@/components/Container"
import Link from "next/link"

const page = () => {
    return (
        <div className='mb-36 lg:mt-36 h-[100vh]'>
            <Container>
                <h2 className="font-bold text-2xl mb-10">{"Unfortunately the page you are looking for doesn't exist"}</h2>
                <Link className="text-primary text-2xl" href={'/'}>Portfolio</Link>
            </Container>


        </div>
    )
}

export default page