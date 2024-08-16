import CategorySection from "@/components/CategorySection";
import { FaCode } from "react-icons/fa";
import { GiAtom } from "react-icons/gi";
import { MdQuestionMark } from "react-icons/md";
import { TbMathIntegral } from "react-icons/tb";
import Container from "@/components/Container";


const categories = [
    {
        id: 1,
        title: 'Web Development',
        icon: <FaCode />
    },
    {
        id: 2,
        title: 'Maths',
        icon: <TbMathIntegral />
    },
    {
        id: 3,
        title: 'Physics',
        icon: <GiAtom />
    },
    {
        id: 4,
        title: 'Other',
        icon: <MdQuestionMark />
    },
]

const page = () => {
    return (
        <div className="mb-36 lg:mt-36">
            <Container>
                <ul className="flex flex-row justify-between items-center flex-wrap w-full">{categories.map(category => (
                    <CategorySection key={category.id} title={category.title} icon={category.icon} />
                ))}</ul>
            </Container>

        </div>
    )
}

export default page