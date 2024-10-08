import { RiHtml5Fill, RiJavascriptFill, RiNextjsFill, RiTailwindCssFill, RiCss3Fill } from "react-icons/ri";
import { SiStrapi, SiMongodb, SiDaisyui } from "react-icons/si";
import { FaCcStripe } from "react-icons/fa";
import { FaKey, FaPython } from "react-icons/fa6";
import { RiWordpressFill } from "react-icons/ri";

const techIcon = {
    "HTML": <RiHtml5Fill size={50} />,
    "CSS": <RiCss3Fill size={50} />,
    "JavaScript": <RiJavascriptFill size={50} />,
    "Next JS": <RiNextjsFill size={50} />,
    "Tailwind CSS": <RiTailwindCssFill size={50} />,
    "Strapi": <SiStrapi size={50} />,
    "MongoDB": <SiMongodb size={50} />,
    "DaisyUI": <SiDaisyui size={50} />,
    "Stripe": <FaCcStripe size={50} />,
    "Auth JS": <FaKey size={50} />,
    "Python": <FaPython size={50} />,
    "WordPress": <RiWordpressFill size={50} />,
}

const TechBadge = ({ name }) => {
    return (
        <div className="tooltip tooltip-bottom" data-tip={name}>
            <span className='text-base-100'>{techIcon[name]}</span>
        </div>
    )
}

export default TechBadge