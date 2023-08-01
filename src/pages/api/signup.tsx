export default async function handler(req, res) {
    const { email, password, username, firstName, lastName } = req.body;

    try {
        const response = await fetch("https://sistech-finpro.vercel.app/api/v1/users/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username, firstName, lastName  })
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
    }
}