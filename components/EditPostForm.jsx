'use client'

import Tiptap from "./Tiptap"
import { useState } from "react"
import { useRouter } from "next/navigation"
import PreviewModal from "./PreviewModal"


const EditPostForm = ({ id, prevTitle, prevContent, prevIsDraft, prevCategory }) => {
    const router = useRouter()

    const [title, setTitle] = useState(prevTitle);
    const [content, setContent] = useState(prevContent);
    const [isDraft, setIsDraft] = useState(prevIsDraft);
    const [category, setCategory] = useState(prevCategory);

    const updateContent = (newContent) => {
        setContent(newContent)
    }

    const handleSubmit = async () => {
        const res = await fetch(`/api/admin/posts/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                content: content,
                draft: isDraft,
                category: category
            })
        });

        if (res.status === 201) {
            console.log(res)
            // setIsLoading(false)

            router.push(`/admin/posts/${id}`)
            router.refresh();
        } else {
            // alert('Not added to cart')
        }
    }
    return (
        <div className="mt-36">
            <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" value={title} className="input input-bordered w-full max-w-xs" />
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Draft</span>
                    <input type="checkbox" onChange={(e) => setIsDraft(e.target.checked)} checked={isDraft} className="checkbox" />
                </label>
            </div>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Category</span>
                </div>
                <select className="select select-bordered" onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value={'Other'} defaultValue>Other</option>
                    <option value={'Maths'}>Maths</option>
                    <option value={'Web Development'}>Web Development</option>
                    <option value={'Physics'}>Physics</option>
                    <option value={'Game Development'}>Game Development</option>
                </select>
            </label>

            <Tiptap updateContent={updateContent} prevContent={prevContent} />
            <button className="btn btn-primary" onClick={handleSubmit}>Update Post</button>

            <PreviewModal data={{ title, content, category }} />

        </div>
    )
}

export default EditPostForm