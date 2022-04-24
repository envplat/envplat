import {
	Box,
	Button,
	Divider,
	Heading,
	HStack,
	Spacer,
} from '@chakra-ui/react';
import React from 'react';

const Projects: React.FC = () => {
	return (
		<Box p={4} bg='gray.900'>
			<HStack>
				<Heading size='md'>Projects</Heading>
				<Spacer />
				<Button size='sm'>New project</Button>
			</HStack>
			<Divider my={4} />
		</Box>
	);
};

export default Projects;
