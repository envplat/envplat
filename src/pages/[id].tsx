import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import Layout from 'components/layout';
import prisma from 'providers/prisma';
import { ProjectWithEnvs } from 'types';
import { useMemo } from 'react';
import ProjectOverview from 'components/project/overview';

export const getServerSideProps = async (ctx: NextPageContext) => {
	const { id: activeProjectId } = ctx.query;

	const projects = await prisma.project.findMany({
		include: {
			envs: true,
		},
	});
	return {
		props: {
			projects,
			activeProjectId: Number(activeProjectId),
		},
	};
};

const ProjectView: NextPage<{
	projects: ProjectWithEnvs[];
	activeProjectId: number;
}> = ({ projects, activeProjectId }) => {
	const activeProject = useMemo(
		() => projects.find((p) => p.id === activeProjectId),
		[activeProjectId, projects]
	);

	return (
		<div>
			<Head>
				<title>envplat</title>
				<meta name='description' content='Environment variable platform' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout projects={projects} activeProjectId={activeProjectId}>
				<ProjectOverview project={activeProject} />
			</Layout>
		</div>
	);
};

export default ProjectView;
