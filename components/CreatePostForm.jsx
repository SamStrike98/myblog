'use client'

import Tiptap from "./Tiptap"
import { useState } from "react"
import { useRouter } from "next/navigation"
import PreviewModal from "./PreviewModal"

const CreatePostForm = () => {
    const router = useRouter()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isDraft, setIsDraft] = useState(true);

    const updateContent = (newContent) => {
        setContent(newContent)
    }

    const handleSubmit = async () => {
        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                content: content,
                draft: isDraft
            })
        });

        if (res.status === 201) {
            console.log(res)
            // setIsLoading(false)

            router.push(`/admin`)
        } else {
            // alert('Not added to cart')
        }
    }
    return (
        <div>
            <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" value={title} className="input input-bordered w-full max-w-xs" />
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Draft</span>
                    <input type="checkbox" onChange={(e) => setIsDraft(e.target.checked)} defaultChecked className="checkbox" />
                </label>
            </div>
            <Tiptap updateContent={updateContent} />
            <button className="btn btn-primary" onClick={handleSubmit}>Create Post</button>

            <PreviewModal data={{ title, content }} />




        </div>
    )
}

export default CreatePostForm