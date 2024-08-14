import Container from "./Container"


const colours = {
    'Web Development': 'from-blue-800 to-blue-400',
    'Physics': 'from-purple-800 to-purple-400',
    'Maths': 'from-yellow-800 to-yellow-400',
    'Other': 'from-orange-800 to-orange-400'
}

const CategorySection = ({ title, icon }) => {
    return (
        <div className={`rounded-3xl p-[4px] bg-gradient-to-r hover:bg-gradient-to-b transition-all ${colours[title]} group w-[45%] my-10`}>
            <div className=" bg-base-100 rounded-[calc(1.5rem-4px)] w-full min-h-[250px] flex flex-col items-center">
                <h2 className="flex flex-row items-center text-2xl font-extrabold gap-4">{title}<span>{icon}</span></h2>
                <ul className="flex flex-row flex-wrap w-full">

                </ul>

            </div>
        </div>

    )
}

export default CategorySection