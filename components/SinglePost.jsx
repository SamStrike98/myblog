'use client'

import Badge from "./Badge"
import ContentsMenu from "./ContentsMenu"
import KatexSpan from "./KatexSpan"
import PrismLoader from "./PrismLoader"
import Image from "next/image"

const SinglePost = ({ title, content, createdAt, category }) => {


    return (
        <div className="flex flex-row py-10 justify-evenly">
            <div className=" hidden md:flex "><ContentsMenu contents={content.content} /></div>
            <div className='bg-[#f2f2f2] text-black min-h-[250px] p-6 rounded-md max-w-[900px] w-[95%] md:w-[70%] shadow-lg'>
                <h2 className='font-extrabold text-3xl text-center'>{title}</h2>
                <Badge text={category} />
                <div className="flex flex-row">

                    <div className='mt-5'>
                        {content !== '' && content.content.map((item, index) => {
                            if (item.content === undefined && item.type !== "image") {
                                return (<p key={index} className='my-5'></p>)
                            } else {
                                if (item.type === "heading") {
                                    {/* return (item.content ? <h1 className={`text-xl ${item.content[0].marks?.find(e => e.type === 'bold') != undefined ? 'font-bold' : ''} ${item.content[0].marks?.find(e => e.type === 'italic') != undefined ? 'italic' : ''} ${item.content[0].marks?.find(e => e.type === 'strike') != undefined ? 'line-through' : ''}`} key={index}>{item.content[0].text}</h1> : '') */ }
                                    return (item.content ? <h1 key={index} className={`text-wrap ${item.attrs.textAlign === 'left' ? 'text-left' : ''} ${item.attrs.textAlign === 'center' ? 'text-center' : ''} ${item.attrs.textAlign === 'right' ? 'text-right' : ''} ${item.attrs.textAlign === 'justify' ? 'text-justify' : ''}`}>{item.content.map((subItem, index) => (<span id={subItem.text} key={index} className={`text-xl ${subItem.marks?.find(e => e.type === 'bold') != undefined ? 'font-bold' : ''} ${subItem.marks?.find(e => e.type === 'italic') != undefined ? 'italic' : ''} ${subItem.marks?.find(e => e.type === 'strike') != undefined ? 'line-through' : ''} ${subItem.marks?.find(e => e.type === 'highlight') != undefined ? 'bg-yellow-300' : ''}`}>{subItem.text}</span>))}</h1> : '')
                                }
                                else if (item.type === "paragraph") {
                                    return (item.content ? <div key={index} className={`text-wrap ${item.attrs.textAlign === ' left' ? 'text-left' : ''} ${item.attrs.textAlign === 'center' ? 'text-center' : ''} ${item.attrs.textAlign === 'right' ? 'text-right' : ''} ${item.attrs.textAlign === 'justify' ? 'text-justify' : ''}`} > {item.content.map((subItem, index) => (<span key={index} className={`text-md ${subItem.marks?.find(e => e.type === 'bold') != undefined ? 'font-bold' : ''} ${subItem.marks?.find(e => e.type === 'italic') != undefined ? 'italic' : ''} ${subItem.marks?.find(e => e.type === 'strike') != undefined ? 'line-through' : ''} ${subItem.marks?.find(e => e.type === 'highlight') != undefined ? 'bg-yellow-300' : ''}`}><KatexSpan text={subItem.text} /></span>))}</div> : '')
                                }

                                else if (item.type === "codeBlock") {
                                    return (item.content ? <PrismLoader key={index} language={item.attrs.language} content={item?.content[0].text} /> : '')
                                } else {
                                    {/* return (item.src ? <Image src={item.attrs.src} /> : <p>Image</p>) */ }
                                    return (<div key={index} className="w-full relative"><Image src={item.attrs.src} alt={item.attrs.alt} width={500} height={500} className="w-full" /></div>)
                                }
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost