import { useState } from "react";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { toast } from 'tailwind-toast'
import { useRouter } from 'next/navigation'


function SignIn() {
    const router = useRouter()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                }),
            });
            const data = await result.json();
            if (data.token != undefined) {
                setCookie("token", data.token, {
                    path: "/",
                    sameSite: true,
                })
                setCookie("username", username, {
                    path: "/",
                    sameSite: true,
                })
                router.push("/")
            }
            else {
                toast()
                    .warning("Can't sign in", data.message)
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'bottom',
                        color: 'bg-yellow-100'
                    }).show()
            }

        } catch (error) {
            toast()
                .danger("Error!", error.message)
                .with({
                    duration: 4000,
                    speed: 1000,
                    positionX: 'end',
                    positionY: 'bottom',
                    color: 'bg-red-300'
                }).show()
        }
        finally {
            setUsername("")
            setPassword("")
        }
    };

    return (
        <div className="container mx-auto">
            <title>Sign In</title>
            <div className="prose lg:prose-xl py-2 mb-5 text-center mx-auto">
                <h1>Sign In</h1>

                <p className="text-gray-500 dark:text-gray-400">or <Link href="/signup"
                           className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">Sign Up</Link> instead.</p>
            </div>
            <div className="container flex flex-col items-center">
                <form onSubmit={handleSubmit}>
                    <div className="container py-5 mx-auto flex flex-col items-center">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required className="rounded"/>
                    </div>
                    <div className="container mx-auto flex flex-col items-center">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required className="rounded"/>
                    </div>
                    <div className="container py-5 flex flex-col items-center">
                        <button className="links-button rounded" type="submit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn;