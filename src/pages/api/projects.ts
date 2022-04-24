// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'providers/prisma';

type Data = {
	ok: boolean;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === 'POST') {
		const body = req.body;
		const { name } = body;
		await prisma.project.create({
			data: {
				name,
			},
		});

		res.status(200).json({ ok: true });
		return;
	}

	res.status(200).json({ ok: false });
}
