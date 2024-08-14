import React from 'react'
import PrismLoader from './PrismLoader'
import Badge from './Badge'

const PreviewModal = ({ data }) => {
    return (
        <div className=''>
            {/* PREVIEW MODAL */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Preview Post</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box min-w-[70%] min-h-[80%]">
                    <h3 className='font-bold text-2xl text-center'>Post Preview</h3>

                    {/* PREVIEW OF POST */}
                    <div className='bg-[#f2f2f2] text-black min-h-[250px] p-3 rounded-md mt-5'>
                        <h2 className='font-extrabold text-3xl text-center'>{data.title}</h2>
                        <Badge text={data.category} />
                        <div className='mt-5'>
                            {data.content !== '' && data.content.content.map((item, index) => {
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
                                        return (item.content ? <PrismLoader key={index} language={item.attrs.language} content={item.content[0].text} /> : '')
                                    }
                                }
                            })}
                        </div>
                    </div>



                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close Preview</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default PreviewModal