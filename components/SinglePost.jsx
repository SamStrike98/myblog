import PrismLoader from "./PrismLoader"

const SinglePost = ({ title, content, createdAt }) => {
    return (
        <div className='bg-[#f2f2f2] text-black min-h-[250px] p-3 rounded-md mt-5'>
            <h2 className='font-extrabold text-3xl text-center'>{title}</h2>

            <div className='mt-5'>
                {content !== '' && content.content.map((item, index) => {
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
    )
}

export default SinglePost