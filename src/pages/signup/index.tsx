import { useState } from "react";
import { setCookie } from 'cookies-next';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from 'tailwind-toast'

function SignUp() {
    const router = useRouter()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        console.log("signing up")
        e.preventDefault();
        try {
            const result = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    "username": username,
                    "firstName": firstName,
                    "lastName": lastName
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
                    .warning("Can't sign up", data.message)
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'bottom',
                        color: 'bg-yellow-100'
                    }).show()
            }
        }
        catch (error) {
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
            setFirstName("")
            setLastName("")
            setEmail("")
            setUsername("")
            setPassword("")
        }
    }

    return (
        <div className="container mx-auto">
            <title>Sign Up</title>
            <div className="prose lg:prose-xl py-1 mb-5 text-center">
                <h1>Sign Up</h1>
                <p className="text-gray-500 dark:text-gray-400">or <Link href="/signin"
                                                                         className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">Sign In</Link> instead.</p>
            </div>
            <div className="container flex flex-col items-center">
                <form id="signup" onSubmit={handleSubmit}>
                    <div className="container py-1 mx-auto flex flex-col items-center">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required className="rounded"/>
                    </div>
                    <div className="container py-1 mx-auto flex flex-col items-center">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required className="rounded"/>
                    </div>
                    <div className="container py-1 mx-auto flex flex-col items-center">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required className="rounded"/>
                    </div>
                    <div className="container py-1 mx-auto flex flex-col items-center">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required className="rounded"/>
                    </div>
                    <div className="container py-1 mx-auto flex flex-col items-center">
                        <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required className="rounded"/>
                    </div>
                    <div className="container py-3 mx-auto flex flex-col items-center">
                        <button className="links-button rounded" type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;