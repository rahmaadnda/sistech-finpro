export default async function handler(req, res) {
    const { username, password } = req.body;

    try {
        const response = await fetch('https://sistech-finpro.vercel.app/api/v1/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        console.log(error  + "hdeh");
    }
}