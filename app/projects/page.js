import ProjectsList from '@/components/ProjectsList';
import Container from '@/components/Container';

const page = async () => {
    const res = await fetch(`${process.env.URL}/api/projects`, { cache: 'no-store' });
    const data = await res.json();

    console.log(data)

    return (
        <div className='mb-36 lg:mt-36 min-h-[100vh]'>
            <Container>
                {data.length > 0 ?
                    <ProjectsList data={data} />
                    :
                    <p className='font-bold text-3xl mt-10'>No Projects to Show!</p>


                }
            </Container>

        </div>
    )
}

export default page