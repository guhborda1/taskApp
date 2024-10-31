import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {

    if (req.method === 'POST') {
        // Process a POST request
        try {
            const { email, password } = await req.body
            console.log({ email, password })
        } catch (err) {
            return res.status(400).json({ message: err })
        }
    } else {
        res.status(400).json({ message: 'Método invalido!' })

    }
    res.status(200).json({ message: 'Hello from Next.js!' })
}