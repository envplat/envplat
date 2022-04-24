import React from 'react';
import { Project } from '@prisma/client';
import { Box, HStack, Stack } from '@chakra-ui/react';
import Header from './header';
import Projects from './projects';
import { ProjectWithEnvs } from 'types';

const Layout: React.FC<{
	children: React.ReactChild;
	projects: ProjectWithEnvs[];
}> = ({ children, projects }) => {
	return (
		<Stack spacing={4}>
			<Header />

			<Box px={{ base: 4, lg: 12 }}>
				<HStack spacing={4} alignItems='flex-start' w='full'>
					<Box w='md'>
						<Projects projects={projects} />
					</Box>
					<Box w='full'>{children}</Box>
				</HStack>
			</Box>
		</Stack>
	);
};

export default Layout;
