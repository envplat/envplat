import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from 'components/layout';
import prisma from 'providers/prisma';
import { Box, Heading, HStack, Spacer, Text } from '@chakra-ui/react';
import { ProjectWithEnvs } from 'types';

export const getServerSideProps = async () => {
	const projects = await prisma.project.findMany({
		include: {
			envs: true,
		},
	});
	return {
		props: {
			projects,
		},
	};
};

const Home: NextPage<{
	projects: ProjectWithEnvs[];
}> = ({ projects }) => {
	return (
		<div>
			<Head>
				<title>envplat</title>
				<meta name='description' content='Environment variable platform' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout projects={projects}>
				<Box bg='gray.900' p={4}>
					<HStack>
						<Heading size='md'>Quract</Heading>
						<Spacer />
						<Text color='gray.500'>4 variables • 2 modes</Text>
					</HStack>
				</Box>
			</Layout>
		</div>
	);
};

export default Home;
