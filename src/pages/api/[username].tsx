import {getCookie} from "cookies-next";

export default async function handler(req, res) {
    const username = req.query.username
    const token = getCookie('token', { req, res })
    // console.log(username + "hi")
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