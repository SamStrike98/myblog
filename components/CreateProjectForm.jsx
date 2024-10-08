'use client'


import { useState } from "react"
import { useRouter } from "next/navigation"
import PreviewModal from "./PreviewModal"
import Container from "./Container"
import PortfolioSectionTitle from "./PortfolioSectionTitle"
import { CldUploadWidget } from 'next-cloudinary';

const CreateProjectForm = () => {
    const router = useRouter()

    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    // const [imgUrl, setImgUrl] = useState();
    const [tech, setTech] = useState([]);
    const [description, setDescription] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [liveSiteLink, setLiveSiteLink] = useState('');
    const [draft, setDraft] = useState(true);
    const [featured, setFeatured] = useState(false);


    const handleTech = (checked, item) => {
        console.log('tech before', tech)
        console.log(checked, item)

        if (tech.includes(item)) {
            const newArr = tech.filter(i => i !== item)
            setTech(newArr)
        } else {
            const newArr = [...tech, item]
            setTech(newArr)
        }

        console.log('tech after', tech)
    }



    const handleSubmit = async () => {


        const formData = new FormData();
        formData.append('name', name);
        formData.append('img', img);
        formData.append('tech', tech);
        formData.append('description', description);
        formData.append('githubLink', githubLink);
        formData.append('liveSiteLink', liveSiteLink);
        formData.append('draft', draft);
        formData.append('featured', featured);



        const res = await fetch('/api/projects', {
            method: 'POST',
            body: formData
            // headers: {
            //     "content-type": "application/json",
            // },
            // body: JSON.stringify({
            //     name,
            //     img: imgUrl,
            //     tech,
            //     description,
            //     githubLink,
            //     liveSiteLink,
            //     draft,
            //     featured
            // })
        });

        if (res.status === 201) {
            console.log(res)
            // setIsLoading(false)

            router.push(`/projects`)
        } else {
            // alert('Not added to cart')
        }
    }
    return (
        <div className="mt-36">
            <PortfolioSectionTitle text={"Create Project"} />

            {/* PROJECT NAME INPUT */}
            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" value={name} className="input input-bordered w-full max-w-xs" />

            {/* PROJECT IMAGE FILE INPUT */}
            {/* <input type="file" className="file-input w-full max-w-xs" onChange={handleImageUpload} /> */}

            <CldUploadWidget
                signatureEndpoint="/api/admin/cloudinary"
                onSuccess={(result, { widget }) => { setImg(result?.info.secure_url) }}
            >
                {({ open }) => {
                    return (
                        <button onClick={() => open()}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>

            {/* PROJECT DESCRIPTION INPUT */}
            <label className="form-control">
                <div className="label">
                    <span className="label-text">Project Description</span>
                </div>
                <textarea onChange={(e) => setDescription(e.target.value)} className="textarea textarea-bordered h-24 resize-none" placeholder="Project Description"></textarea>
            </label>

            {/* GITHUB LINK INPUT */}
            <input onChange={(e) => setGithubLink(e.target.value)} type="text" placeholder="GitHub Link" value={githubLink} className="input input-bordered w-full max-w-xs" />

            {/* LIVE SITE LINK INPUT */}
            <input onChange={(e) => setLiveSiteLink(e.target.value)} type="text" placeholder="Live Site Link" value={liveSiteLink} className="input input-bordered w-full max-w-xs" />

            {/* TECH INPUT */}
            <div className="form-control">

                {/* HTML INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">HTML</span>
                    <input type="checkbox" className="checkbox" value={"HTML"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>

                {/* CSS INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">CSS</span>
                    <input type="checkbox" className="checkbox" value={"CSS"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>

                {/* JAVASCRIPT INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">JavaScript</span>
                    <input type="checkbox" className="checkbox" value={"JavaScript"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>

                {/* TAILWIND CSS INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">Tailwind CSS</span>
                    <input type="checkbox" className="checkbox" value={"Tailwind CSS"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>

                {/* NEXT JS INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">Next JS</span>
                    <input type="checkbox" className="checkbox" value={"Next JS"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>

                {/* WORDPRESS INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">WordPress</span>
                    <input type="checkbox" className="checkbox" value={"WordPress"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>

                {/* MONGODB INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">MongoDB</span>
                    <input type="checkbox" className="checkbox" value={"MongoDB"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>

                {/* DAISYUI INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">DaisyUI</span>
                    <input type="checkbox" className="checkbox" value={"DaisyUI"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>

                {/* AUTH JS INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">Auth JS</span>
                    <input type="checkbox" className="checkbox" value={"Auth JS"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>

                {/* STRAPI INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">Strapi</span>
                    <input type="checkbox" className="checkbox" value={"Strapi"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>

                {/* STRIPE INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">Stripe</span>
                    <input type="checkbox" className="checkbox" value={"Stripe"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>

                {/* PYTHON INPUT */}
                <label className="label cursor-pointer">
                    <span className="label-text">Python</span>
                    <input type="checkbox" className="checkbox" value={"Python"} onChange={(e) => handleTech(e.target.checked, e.target.value)} />
                </label>
            </div>

            {/* DRAFT CHECKBOX */}
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Draft</span>
                    <input type="checkbox" onChange={(e) => setDraft(e.target.checked)} defaultChecked className="checkbox" />
                </label>
            </div>

            {/* FEATURED CHECKBOX */}
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Featured</span>
                    <input type="checkbox" onChange={(e) => setFeatured(e.target.checked)} className="checkbox" />
                </label>
            </div>



            <button className="btn btn-primary" onClick={handleSubmit}>Create Project</button>
        </div>
    )
}

export default CreateProjectForm