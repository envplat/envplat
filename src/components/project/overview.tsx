import React from 'react';
import {
	Box,
	Heading,
	HStack,
	Spacer,
	Text,
	Stack,
	Button,
	ButtonGroup,
	SimpleGrid,
	GridItem,
	Input,
	useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useFetch from 'use-http';
import { ProjectWithEnvs } from 'types';
import NotFound from './not-found';

const ProjectOverview: React.FC<{
	project: ProjectWithEnvs | undefined;
}> = ({ project }) => {
	const form = useForm();
	const api = useFetch('/api/envs');
	const envEntry = useDisclosure();

	if (!project) {
		return <NotFound />;
	}

	const { name, envs } = project;

	const saveEnv = () => {
		const { name, value } = form.getValues();
		api.post({
			projectId: project.id,
			env: { name, value },
		});
	};

	return (
		<Stack>
			<Box bg='gray.900' p={4}>
				<HStack>
					<Heading size='md'>{name}</Heading>
					<Spacer />
					<Text color='gray.500'>
						{envs.length} variable{envs.length > 1 && 's'} • 1 mode
					</Text>
				</HStack>
			</Box>

			<Box bg='gray.900' p={4}>
				<HStack mb={4}>
					<Heading size='sm'>Variables</Heading>
					<Spacer />
					{envEntry.isOpen ? (
						<ButtonGroup size='sm'>
							<Button variant='ghost' onClick={envEntry.onClose}>
								Cancel
							</Button>
							<Button onClick={saveEnv} colorScheme='blue'>
								Save
							</Button>
						</ButtonGroup>
					) : (
						<Button size='sm' onClick={envEntry.onOpen}>
							create
						</Button>
					)}
				</HStack>

				{envEntry.isOpen && (
					<>
						<SimpleGrid columns={10} spacing={4}>
							<GridItem colSpan={3}>
								<Input placeholder='Name' {...form.register('name')} />
							</GridItem>
							<GridItem colSpan={7}>
								<Input placeholder='Value' {...form.register('value')} />
							</GridItem>
						</SimpleGrid>
					</>
				)}
			</Box>
		</Stack>
	);
};

export default ProjectOverview;
