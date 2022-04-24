import React, { useRef } from 'react';
import {
	Box,
	Button,
	Divider,
	Heading,
	HStack,
	Input,
	Spacer,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import useFetch from 'use-http';
import { ProjectWithEnvs } from 'types';
import Link from 'next/link';

const NewProjectEntry: React.FC<{
	onClose: () => void;
}> = ({ onClose }) => {
	const api = useFetch('/api/projects');
	const inputRef = useRef<HTMLInputElement>(null);

	const createProjectApi = () => {
		const projectName = inputRef.current?.value;
		api
			.post({
				name: projectName,
			})
			.then((res) => {
				if (res.ok) {
					onClose();
				}
			});
	};

	return (
		<Box>
			<Input
				ref={inputRef}
				isDisabled={api.loading}
				placeholder='Enter project name'
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						createProjectApi();
					}
				}}
			/>
		</Box>
	);
};

const Projects: React.FC<{
	projects: ProjectWithEnvs[];
	activeProjectId: number;
}> = ({ projects, activeProjectId }) => {
	const newProjectEntry = useDisclosure();

	return (
		<Box p={4} bg='gray.900'>
			<HStack>
				<Heading size='md'>Projects</Heading>
				<Spacer />
				<Button size='sm' onClick={newProjectEntry.onToggle}>
					New project
				</Button>
			</HStack>

			<Divider my={4} />

			{newProjectEntry.isOpen && (
				<>
					<NewProjectEntry onClose={newProjectEntry.onClose} />
					<Divider my={4} />
				</>
			)}

			<Stack spacing={0}>
				{projects.map((proj, idx) => {
					const varCount = proj.envs.length;
					const isActive = activeProjectId === proj.id;

					return (
						<Link key={idx} href={`/${proj.id}`} passHref>
							<HStack
								p={2}
								opacity={isActive ? 1 : 0.7}
								bg={isActive ? 'gray.800' : 'transparent'}
								_hover={{ opacity: 1, bg: 'gray.800' }}
								cursor='pointer'
								userSelect={'none'}
							>
								<Heading size='sm'>{proj.name}</Heading>
								<Spacer />
								<Text mt={1} color='gray.600'>
									{varCount} variable{varCount > 1 && 's'}
								</Text>
							</HStack>
						</Link>
					);
				})}
			</Stack>
		</Box>
	);
};

export default Projects;
