import {getCookie} from "cookies-next";

export default async function handler(req, res) {
    const requestMethod = req.method
    const articleId = req.query.id
    const token = getCookie('token', { req, res })
    const url = 'https://sistech-finpro.vercel.app/api/v1/articles/' + articleId

    switch (requestMethod) {
        case 'PATCH':
            if (token == undefined) {
                res.status(401).json({message: "You can't update this article"})
            }
            else {
                const { title, content } = req.body;
                try {
                    const response = await fetch(url, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token
                        },
                        body: JSON.stringify({ title, content })
                    });
                    const data = await response.json();
                    res.status(response.status).json(data);
                } catch (error) {
                    console.log(error.message);
                }
            }
            break;

        case 'DELETE':
            if (token == undefined) {
                res.status(401).json({message: "You can't delete this article"})
            }
            else {
                try {
                    const response = await fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' +  token
                        }
                    });
                    const data = await response.json();
                    res.status(response.status).json(data);
                } catch (error) {
                    console.log(error.message);
                }
            }
            break;
    }
}