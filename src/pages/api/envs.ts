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
		const { env, projectId } = body;
		const project = await prisma.project.findFirst({
			where: {
				id: projectId,
			},
			include: {
				envs: true,
			},
		});

		if (!project) {
			return res.status(404).json({
				ok: false,
			});
		}

		// check if env exists in the project
		const envExists = project.envs.find((e) => e.name === env.name);
		if (envExists) {
			return res.status(400).json({
				ok: false,
			});
		}

		// create new env in the project
		await prisma.env.create({
			data: {
				name: env.name,
				value: env.value,
				project: {
					connect: {
						id: projectId,
					},
				},
			},
		});

		return res.status(200).json({ ok: true });
	}

	res.status(200).json({ ok: false });
}
