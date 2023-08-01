import {deleteCookie, getCookie, hasCookie} from "cookies-next";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {toast} from "tailwind-toast";

function Profile(articles, username) {
    const router = useRouter()
    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [articleId,setArticleId] = useState(0)
    const [loggedIn,setLoggedIn] = useState(false)
    // const username = fetch("/api/getUsername")
    // username.then(res => {
    //     console.log(res)
    // })
    // console.log(username + " inx")

    try {
        const result = fetch("/api/getArticles");
        // console.log(result)
        // const data = result.json();
        result.then(resp => console.log(resp))
        // console.log(data + " func")
    }
    catch (error) {
        alert(error.message)
    }

    useEffect(() => {
        setLoggedIn(hasCookie("token"));
    }, [loggedIn])

    async function createArticle(e) {
        e.preventDefault();
        try {
            const result = await fetch("/api/createArticle", {
                body: JSON.stringify({
                    "title": title,
                    "content": content,
                    "tags": tags,
                }),
            });
            const data = await result.json();
            if (data.message == 'Article Created Succesfully') {
                toast()
                    .default("Success!", data.message)
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'bottom',
                        color: 'bg-blue-300'
                    }).show()
                router.refresh()
            }
            else {
                toast()
                    .default("Error!", data.message)
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'bottom',
                        color: 'bg-red-300'
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
    }

    async function updateArticle(id: Number) {
        try {
            const result = await fetch('/api/articles/'+id, {
                body: JSON.stringify({
                    "title": newTitle,
                    "content": newContent
                }),
            });
            const data = await result.json();
            if (data.message == 'Article updated successfully') {
                toast()
                    .default("Success!", data.message)
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'bottom',
                        color: 'bg-blue-300'
                    }).show()
                router.refresh()
            }
            else {
                toast()
                    .default("Error!", data.message)
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'bottom',
                        color: 'bg-red-300'
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
    }

    async function deleteArticle(id: Number) {
        try {
            const result = await fetch('/api/articles/'+id);
            const data = await result.json();
            if (data.message == 'Article deleted successfully') {
                toast()
                    .default("Success!", data.message)
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'bottom',
                        color: 'bg-blue-300'
                    }).show()
                router.refresh()
            }
            else {
                toast()
                    .default("Error!", data.message)
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'bottom',
                        color: 'bg-red-300'
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
    }

    if (loggedIn) {
        return (
            <div className="md:container mx-auto">
                <title>Profile</title>
                <div className="prose lg:prose-xl py-2 mb-5 text-center">
                    <h1>Usernames Articles</h1>
                </div>
                <div className="container text-center">
                    <button
                        className="links-button rounded"
                        type="button"
                        onClick={() => setCreateModal(true)}
                    >
                        Create New Article
                    </button>
                    <button className="links-button rounded" onClick={() => {
                        deleteCookie("token")
                        deleteCookie("username")
                        router.refresh()
                    }}>
                        Logout
                    </button>
                </div>

                {createModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Create New Article
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setCreateModal(false)}
                                        >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                        </button>
                                    </div>
                                    <form onSubmit={createArticle}>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            <div>
                                                <label htmlFor="title">Title</label>
                                                <input
                                                    id="title"
                                                    type="text"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    required className="rounded"/>
                                            </div>
                                            <div>
                                                <label htmlFor="content">Content</label>
                                                <input
                                                    id="content"
                                                    type="text"
                                                    value={content}
                                                    onChange={(e) => setContent(e.target.value)}
                                                    required className="rounded"/>
                                            </div>
                                            <div>
                                                <label htmlFor="tags">Tags</label>
                                                <input
                                                    id="tags"
                                                    type="text"
                                                    value={tags}
                                                    onChange={(e) => setTags(e.target.value.split(" "))}
                                                    required className="rounded"
                                                    placeholder={"e.g. music, film"}/>
                                            </div>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setCreateModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button className="links-button rounded" type="submit"
                                            >Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                <div className="container mx-auto my-10">
                    {/*{data.map(article => (*/}
                    {/*    <div className="card mx-auto my-5 rounded justify-center items-center" key={article.id}>*/}
                    {/*        <div className="card-body">*/}
                    {/*            <h2 className="card-title mx-3">*/}
                    {/*                {article.title}*/}
                    {/*            </h2>*/}
                    {/*            <p className="line-clamp-4 mx-3 mt-2">{article.content}</p>*/}
                    {/*            <div className="px-2 pt-2">*/}
                    {/*                {article.tag.map(index =>(*/}
                    {/*                    <span*/}
                    {/*                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1" key={index}>{index}</span>*/}
                    {/*                ))}*/}
                    {/*            </div>*/}
                    {/*            <div className="card-actions justify-between my-2">*/}
                    {/*                <h5 className="text-xs text-center opacity-50">Last Modified: {new Date(article.updatedAt).toString()} by {article.creator.username}</h5>*/}
                    {/*                <div className="text-center">*/}
                    {/*                    <button*/}
                    {/*                        className="links-button rounded"*/}
                    {/*                        type="button"*/}
                    {/*                        onClick={() => {setUpdateModal(true); setArticleId(article.id)}}*/}
                    {/*                    >*/}
                    {/*                        Update Article*/}
                    {/*                    </button>*/}
                    {/*                    <button*/}
                    {/*                        type="button"*/}
                    {/*                        onClick={()=>deleteArticle(article.id)}*/}
                    {/*                        className="links-button rounded">*/}
                    {/*                        Delete*/}
                    {/*                    </button>*/}
                    {/*                </div>*/}

                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    {updateModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                                Update Article
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setUpdateModal(false)}
                                            >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                            </button>
                                        </div>
                                        <form onSubmit={() => updateArticle(articleId)}>
                                            {/*body*/}
                                            <div className="relative p-6 flex-auto">
                                                <div>
                                                    <label htmlFor="newTitle">New Title</label>
                                                    <input
                                                        id="newTitle"
                                                        type="text"
                                                        value={newTitle}
                                                        onChange={(e) => setNewTitle(e.target.value)}
                                                        required className="rounded"/>
                                                </div>
                                                <div>
                                                    <label htmlFor="newContent">New Content</label>
                                                    <input
                                                        id="newContent"
                                                        type="text"
                                                        value={newContent}
                                                        onChange={(e) => setNewContent(e.target.value)}
                                                        required className="rounded"/>
                                                </div>

                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-pink-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setUpdateModal(false)}
                                                >
                                                    Close
                                                </button>
                                                <button className="links-button rounded" type="submit">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                </div>
            </div>
        )
    }

    else {
        return (
            <div className="md:container mx-auto">
                <title>Profile</title>
                <div className="prose lg:prose-xl py-2 mb-5 text-center">
                    <h1>My Articles</h1>
                    <p className="text-gray-500 dark:text-gray-400">Join us to post your articles.</p>
                </div>
                <div className="container text-center">
                    <Link className="links-button rounded" href="/signin"> Sign In </Link>
                    <Link className="links-button rounded" href="/signup"> Sign Up </Link>
                </div>
            </div>
        )
    }
}

export async function getServerSideProps() {
    const result = await fetch('/api/getArticles')
    const data = await result.json()
    const res = await fetch('/api/getUsername')
    const username = await res.json()
    console.log(data, username)
    return {
        props: { articles: data,
        username: username},
    }
}

export default Profile;