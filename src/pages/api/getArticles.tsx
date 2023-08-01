import { getCookie } from "cookies-next";

export default async function handler(req, res) {
    const token = getCookie('token', { req, res })
    const username = getCookie('username', { req, res })

    console.log(token + "token")

    if (token == undefined) {
        res.status(401).json([])
    }

    else {
        try {
            const result = await fetch('https://sistech-finpro.vercel.app/api/v1/articles/' + username, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' +  token
                }
            });
            const data = await result.json();
            res.status(result.status).json(data);
        } catch (error) {
            console.log(error.message);
        }
    }
}