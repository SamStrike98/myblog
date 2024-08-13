'use client'

import { useEffect } from "react"
import Prism from 'prismjs'
import "prismjs/themes/prism-okaidia.css";

export default function PrismLoader({ content, language }) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div>
            <pre className={`language-${language === 'html' ? 'markup' : language}`}><code className={`language-${language === 'html' ? 'markup' : language}`}>{content}</code></pre>
        </div>
    )
}