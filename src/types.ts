import { Prisma } from '@prisma/client';

const projectWithEnvs = Prisma.validator<Prisma.ProjectArgs>()({
	include: { envs: true },
});

export type ProjectWithEnvs = Prisma.ProjectGetPayload<typeof projectWithEnvs>;
