'use client'

import { useState } from "react";


const ContactForm = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (name === '' || email === '' || message === '') {
            setError('Please fill in all fields')
            return;
        }

        setIsLoading(true)
        const res = await fetch('/api/email', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        });

        if (res.status === 201) {
            setName('')
            setEmail('')
            setMessage('')

            setIsLoading(false)
            setSuccess(true)

            setTimeout(() => setSuccess(false), 2000);

            // router.push(`/admin`)
        } else {
            alert('Error, message not send.')
            setIsLoading(false)
        }
    }
    return (
        <form className="w-[80%] max-w-[500px] flex flex-col gap-5">
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input type="text" className="grow" placeholder="Name" value={name || ''} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" className="grow" placeholder="Email" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="form-control">
                <textarea className="textarea textarea-bordered resize-none min-h-[150px]" placeholder="Message" value={message || ''} onChange={(e) => setMessage(e.target.value)} ></textarea>
            </label>
            {isLoading ?
                <button className="btn btn-primary self-center w-[200px]">
                    <span className="loading loading-spinner loading-sm"></span>
                </button>
                :
                success ? <button className="btn btn-success w-[200px] self-center">Sent</button>
                    :
                    <button onClick={handleSubmit} className="btn btn-primary text-white w-[200px] self-center" type="submit">Submit</button>
            }

            {error !== '' ?
                <div role="alert" className="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
                :
                ''
            }
        </form>
    )
}

export default ContactForm