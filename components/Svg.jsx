import Image from "next/image"

const Svg = ({ img, name }) => {
    return (
        <Image src={img} alt={name} width={100} height={100} className="animation-football" />
    )
}

export default Svg