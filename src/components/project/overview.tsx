import React from 'react';
import { Box, Heading, HStack, Spacer, Text } from '@chakra-ui/react';
import { ProjectWithEnvs } from 'types';
import NotFound from './not-found';

const ProjectOverview: React.FC<{
	project: ProjectWithEnvs | undefined;
}> = ({ project }) => {
	if (!project) {
		return <NotFound />;
	}

	const { name, envs } = project;

	return (
		<Box bg='gray.900' p={4}>
			<HStack>
				<Heading size='md'>{name}</Heading>
				<Spacer />
				<Text color='gray.500'>
					{envs.length} variable{envs.length > 1 && 's'} • 1 mode
				</Text>
			</HStack>
		</Box>
	);
};

export default ProjectOverview;
