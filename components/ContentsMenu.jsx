import Link from "next/link"


const ContentsMenu = ({ contents }) => {
    return (
        <ul className="menu bg-base-200 rounded-box  left-0 top-4 sticky max-h-[50vh] w-[250px]">
            <h3 className="text-lg font-bold text-white underline">Contents</h3>

            {contents.filter(item => item.type === 'heading' && item.content !== undefined).map((heading, index) => (
                <li key={index} className="text-white">
                    <Link href={`#${heading.content[0].text}`}>{heading.content[0].text}</Link>
                </li>
            ))}
        </ul>
    )
}

export default ContentsMenu