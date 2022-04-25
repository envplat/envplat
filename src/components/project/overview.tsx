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
	IconButton,
	SimpleGrid,
	GridItem,
	Input,
	useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useFetch from 'use-http';
import { FiSettings, FiSearch, FiEye, FiEyeOff } from 'react-icons/fi';
import { ProjectWithEnvs } from 'types';
import NotFound from './not-found';
import Envs from './envs';

const ProjectOverview: React.FC<{
	project: ProjectWithEnvs | undefined;
}> = ({ project }) => {
	const form = useForm();
	const api = useFetch('/api/envs');
	const envEntry = useDisclosure();
	const valueVisibility = useDisclosure();

	if (!project) {
		return <NotFound />;
	}

	const { name, envs } = project;

	const saveEnv = () => {
		const { name, value } = form.getValues();
		api
			.post({
				projectId: project.id,
				env: { name, value },
			})
			.then((res) => {
				if (res.ok) {
					form.reset();
					envEntry.onClose();
				}
			});
	};

	return (
		<Stack>
			<Box bg='gray.900' p={4}>
				<HStack>
					<Box>
						<Heading size='md'>{name}</Heading>
						<Text fontSize={'sm'} mt={1} color='gray.500'>
							{envs.length} variable{envs.length > 1 && 's'} • 1 mode •{' '}
							{project.access}
						</Text>
					</Box>
					<Spacer />
					<ButtonGroup size='sm'>
						<IconButton
							icon={valueVisibility.isOpen ? <FiEyeOff /> : <FiEye />}
							aria-label={'view'}
							onClick={valueVisibility.onToggle}
						/>
						<IconButton icon={<FiSettings />} aria-label={'settings'} />
						<IconButton icon={<FiSearch />} aria-label={'search'} />
					</ButtonGroup>
				</HStack>

				<HStack my={4}>
					<Text fontSize='sm' color='gray.500' textTransform={'uppercase'}>
						Environment Variables
					</Text>

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
					<Box my={4}>
						<SimpleGrid columns={10} spacing={4}>
							<GridItem colSpan={3}>
								<Input placeholder='Name' {...form.register('name')} />
							</GridItem>
							<GridItem colSpan={7}>
								<Input placeholder='Value' {...form.register('value')} />
							</GridItem>
						</SimpleGrid>
					</Box>
				)}

				<Envs valueVisibility={valueVisibility.isOpen} envs={project.envs} />
			</Box>
		</Stack>
	);
};

export default ProjectOverview;
