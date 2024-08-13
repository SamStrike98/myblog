'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import CodeBlock from '@tiptap/extension-code-block'


import { convertJsonToJsx } from '@/utils/convertJsonToJsx'
import PrismLoader from './PrismLoader'
import { useRouter } from 'next/navigation'

const MenuBar = ({ editor }) => {

    if (!editor) {
        return null
    }

    return (
        <div className="control-group">
            <div className="button-group">
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`btn ${editor.isActive('heading', { level: 1 }) ? 'btn-primary' : 'btn-neutral'}`}>
                    Heading
                </button>
                {/* <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`btn ${editor.isActive('heading', { level: 2 }) ? 'btn-primary' : 'btn-neutral'}`}>
                    H2
                </button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`btn ${editor.isActive('heading', { level: 3 }) ? 'btn-primary' : 'btn-neutral'}`}>
                    H3
                </button> */}
                <button onClick={() => editor.chain().focus().setParagraph().run()} className={`btn ${editor.isActive('paragraph') ? 'btn-primary' : 'btn-neutral'}`}>
                    Paragraph
                </button>
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={`btn ${editor.isActive('bold') ? 'btn-primary' : 'btn-neutral'}`}>
                    Bold
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`btn ${editor.isActive('italic') ? 'btn-primary' : 'btn-neutral'}`}>
                    Italic
                </button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`btn ${editor.isActive('strike') ? 'btn-primary' : 'btn-neutral'}`}>
                    Strike
                </button>
                <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`btn ${editor.isActive('highlight') ? 'btn-primary' : 'btn-neutral'}`}>
                    Highlight
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`btn ${editor.isActive({ textAlign: 'left' }) ? 'btn-primary' : 'btn-neutral'}`}>
                    Left
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`btn ${editor.isActive({ textAlign: 'center' }) ? 'btn-primary' : 'btn-neutral'}`}>
                    Center
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`btn ${editor.isActive({ textAlign: 'right' }) ? 'btn-primary' : 'btn-neutral'}`}>
                    Right
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`btn ${editor.isActive({ textAlign: 'justify' }) ? 'btn-primary' : 'btn-neutral'}`}>
                    Justify
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    Toggle code block
                </button>
                <button
                    onClick={() => editor.chain().focus().setCodeBlock().run()}
                    disabled={editor.isActive('codeBlock')}
                >
                    Set code block
                </button>

                <button onClick={() => editor.chain().focus()}>JS</button>
            </div>
        </div>
    )
}

const Tiptap = () => {
    const [content, setContent] = useState('');
    const [displayContent, setDisplayContent] = useState('')
    const [title, setTitle] = useState('')
    const router = useRouter();

    const handleSave = async () => {
        setDisplayContent(content);

        const res = await fetch('/api/item', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        });

        if (res.status === 201) {
            console.log(res)
            // setIsLoading(false)
            const data = await res.json();
            const id = data._id
            router.push(`/item/${id}`)
        } else {
            // alert('Not added to cart')
        }
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Highlight,
            Paragraph.configure({
                HTMLAttributes: {
                    class: 'text-yellow-500',
                },
            }),
            Heading.configure({
                levels: [1],
                HTMLAttributes: {
                    class: 'font-extrabold text-xl',
                },
            }),
            CodeBlock.configure({
                HTMLAttributes: {
                    class: 'bg-black text-white p-2 rounded-md',
                },
            })
        ],
        content: '<p>Hello World! 🌎️</p>',
        editorProps: {
            attributes: {
                class: 'mt-5 border border-black rounded-md shadow-xl bg-white w-[200px] sm:w-[500px] min-h-[500px] p-5 text-black'
            }
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON()

            setContent(json);
            console.log(content)


            // send the content to an API here
        },

    })

    if (!editor) {
        return null;
    }

    return (
        <div className='flex flex-row'>
            <div className='flex flex-col items-center'>
                <MenuBar editor={editor} />
                <EditorContent editor={editor} className='' />
                <button className='btn btn-primary' onClick={handleSave}>Save</button>
            </div>
            <input type="text" placeholder="Title" className="input input-bordered w-full max-w-xs" onChange={(e) => setTitle(e.target.value)} value={title} />
            <div className='bg-gray-400 text-black w-[400px] min-h-[250px] p-3 rounded-md'>
                {displayContent !== '' && displayContent.content.map((item, index) => {
                    if (item.content === undefined) {
                        return (<p key={index} className='my-5'></p>)
                    } else {
                        if (item.type === "heading") {
                            {/* return (item.content ? <h1 className={`text-xl ${item.content[0].marks?.find(e => e.type === 'bold') != undefined ? 'font-bold' : ''} ${item.content[0].marks?.find(e => e.type === 'italic') != undefined ? 'italic' : ''} ${item.content[0].marks?.find(e => e.type === 'strike') != undefined ? 'line-through' : ''}`} key={index}>{item.content[0].text}</h1> : '') */ }
                            return (item.content ? <h1 key={index} className={`text-wrap ${item.attrs.textAlign === 'left' ? 'text-left' : ''} ${item.attrs.textAlign === 'center' ? 'text-center' : ''} ${item.attrs.textAlign === 'right' ? 'text-right' : ''} ${item.attrs.textAlign === 'justify' ? 'text-justify' : ''}`}>{item.content.map((subItem, index) => (<span key={index} className={`text-xl ${subItem.marks?.find(e => e.type === 'bold') != undefined ? 'font-bold' : ''} ${subItem.marks?.find(e => e.type === 'italic') != undefined ? 'italic' : ''} ${subItem.marks?.find(e => e.type === 'strike') != undefined ? 'line-through' : ''} ${subItem.marks?.find(e => e.type === 'highlight') != undefined ? 'bg-yellow-300' : ''}`}>{subItem.text}</span>))}</h1> : '')
                        }
                        else if (item.type === "paragraph") {
                            return (item.content ? <p key={index} className={`text-wrap ${item.attrs.textAlign === ' left' ? 'text-left' : ''} ${item.attrs.textAlign === 'center' ? 'text-center' : ''} ${item.attrs.textAlign === 'right' ? 'text-right' : ''} ${item.attrs.textAlign === 'justify' ? 'text-justify' : ''}`} > {item.content.map((subItem, index) => (<span key={index} className={`text-md ${subItem.marks?.find(e => e.type === 'bold') != undefined ? 'font-bold' : ''} ${subItem.marks?.find(e => e.type === 'italic') != undefined ? 'italic' : ''} ${subItem.marks?.find(e => e.type === 'strike') != undefined ? 'line-through' : ''} ${subItem.marks?.find(e => e.type === 'highlight') != undefined ? 'bg-yellow-300' : ''}`}>{subItem.text}</span>))}</p> : '')
                        } else {
                            return (item.content ? <PrismLoader language={item.attrs.language} content={item.content[0].text} /> : '')
                        }
                    }
                })}
            </div>
        </div>

    )
}

export default Tiptap