import { getCookie } from "cookies-next";

export default async function handler(req, res) {
    const { title, content, tags } = req.body;
    const token = getCookie('token', { req, res })

    try {
        const result = await fetch('https://sistech-finpro.vercel.app/api/v1/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +  token
            },
            body: JSON.stringify({ title, content, tags  })
        });
        const data = await result.json();
        res.status(result.status).json(data);
    } catch (error) {
        console.log(error.message);
    }
}