import Image from '@tiptap/extension-image'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
// import './Image.css'

function ImageNode(props) {
    const { src, alt } = props.node.attrs

    let className
    if (props.selected) { className = ' ProseMirror-selectednode' }

    const { updateAttributes } = props

    const onEditAlt = () => {
        const newAlt = prompt('Set alt text:', alt || '')
        updateAttributes({ alt: newAlt })
    }

    return (
        <NodeViewWrapper className={className} data-drag-handle>
            <img src={src} alt={alt} />
            <span className="alt-text-indicator">
                <div>Alt: {alt ? alt : "No alt"}
                    <button className="edit" type="button" onClick={onEditAlt}>
                        Edit
                    </button>
                </div>
            </span>
        </NodeViewWrapper>
    )
}

export default Image.extend({
    addNodeView() {
        return ReactNodeViewRenderer(ImageNode)
    }
})