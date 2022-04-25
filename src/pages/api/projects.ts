// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import shortid from 'shortid';
import prisma from 'providers/prisma';
import { Project } from '@prisma/client';

type Data = {
	ok: boolean;
	project?: Project | null;
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
				access: shortid.generate(),
			},
		});

		res.status(200).json({ ok: true });
		return;
	}

	if (req.method === 'GET') {
		const { access } = req.query;
		if (!access) {
			return res.status(400).json({ ok: false });
		}

		const project = await prisma.project.findFirst({
			where: {
				access: access as string,
			},
			include: {
				envs: true,
			},
		});

		return res.status(200).json({ ok: true, project });
	}

	res.status(200).json({ ok: false });
}
