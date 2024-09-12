'use client'

import { useCallback, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import CodeBlock from '@tiptap/extension-code-block'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Image from '@tiptap/extension-image'
import { Mathematics } from '@tiptap-pro/extension-mathematics'
import CustomImage from './CustomImage'

import PrismLoader from './PrismLoader'
import { useRouter } from 'next/navigation'

import 'katex/dist/katex.min.css'

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

                {/* <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    Toggle code block
                </button> */}
                {/* <button
                    onClick={() => editor.chain().focus().setCodeBlock().run()}
                    disabled={editor.isActive('codeBlock')}
                >
                    Set code block
                </button> */}
            </div>
        </div>
    )
}

const Tiptap = ({ updateContent, prevContent }) => {
    const [content, setContent] = useState(prevContent);
    const [displayContent, setDisplayContent] = useState(prevContent)
    const [title, setTitle] = useState('')
    const [saved, setSaved] = useState(false)
    const router = useRouter();

    const handleSave = async () => {



        updateContent(displayContent)

        setSaved(true)
    }

    const addAlt = () => {

    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Mathematics.configure({
                HTMLAttributes: {
                    class: 'bg-[#272822] text-white p-2 rounded-md',
                },
            }), ,
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
                    class: 'bg-[#272822] text-white p-2 rounded-md',
                },
            }),
            CustomImage,
            // Image.configure({
            //     HTMLAttributes: {
            //         onClick: addAlt()
            //     },
            // }),
            FileHandler.configure({
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
                onDrop: (currentEditor, files, pos) => {
                    files.forEach(file => {
                        const fileReader = new FileReader()

                        fileReader.readAsDataURL(file)
                        fileReader.onload = () => {
                            currentEditor.chain().insertContentAt(pos, {
                                type: 'image',
                                attrs: {
                                    src: fileReader.result,
                                },
                            }).focus().run()
                        }
                    })
                },
                onPaste: (currentEditor, files, htmlContent) => {
                    files.forEach(file => {
                        if (htmlContent) {
                            // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
                            // you could extract the pasted file from this url string and upload it to a server for example
                            console.log(htmlContent) // eslint-disable-line no-console
                            return false
                        }

                        const fileReader = new FileReader()

                        fileReader.readAsDataURL(file)
                        fileReader.onload = () => {
                            currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                                type: 'image',
                                attrs: {
                                    src: fileReader.result,
                                },
                            }).focus().run()
                        }
                    })
                },
            }),
        ],
        content: prevContent,
        editorProps: {
            attributes: {
                class: `mt-5 border-4 rounded-md shadow-xl bg-white w-[200px] sm:w-[500px] min-h-[500px] p-5 text-black ${saved ? 'border-green-500' : 'border-red-500'}`,
            }
        },
        onUpdate: ({ editor }) => {
            // const json = editor.getJSON()
            setDisplayContent(editor.getJSON());
            // updateContent(json)
            // setContent(json);
            setSaved(false)
            // console.log(content)


            // send the content to an API here
        },

    })

    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    if (!editor) {
        return null;
    }

    return (
        <div className='flex flex-col items-center'>
            <MenuBar editor={editor} />

            {saved ?
                <div className="badge badge-success gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-4 w-4 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Saved
                </div>
                :

                <div className="badge badge-error gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-4 w-4 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Not saved
                </div>
            }

            <EditorContent editor={editor} className='' />
            <button onClick={addImage}>Add Image</button>



            <button className='btn btn-primary' onClick={handleSave}>Save Content</button>
        </div>

    )
}

export default Tiptap