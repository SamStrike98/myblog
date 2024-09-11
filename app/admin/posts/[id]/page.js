import Container from '@/components/Container';
import SinglePost from '@/components/SinglePost';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const page = async ({ params }) => {
    const session = await auth();

    if (session?.user.role !== 'admin') {
        return redirect('/')
    }


    const id = params.id;

    const res = await fetch(`${process.env.URL}/api/posts/${id}`, { cache: 'no-store' });
    const data = await res.json();
    return (
        <div className='flex flex-col items-center mb-36 lg:mt-36'>
            <p>Admin Edit Posts</p>
            <Link href={`/admin/posts/${id}/edit`}>Edit</Link>
            <Container>
                <SinglePost title={data.title} content={data.content} createdAt={data.createdAt} category={data.category} />
            </Container>
        </div>
    )
}

export default page