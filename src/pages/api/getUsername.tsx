import { getCookie } from "cookies-next";

export default async function handler(req, res) {
    const token = getCookie('token', { req, res })
    const username = getCookie('username', { req, res })

    if (token == undefined) {
        res.status(401)
    }

    res.json(username)
}