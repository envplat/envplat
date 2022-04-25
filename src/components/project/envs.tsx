import React from 'react';
import { HStack, Stack, Text } from '@chakra-ui/react';
import { Env } from '@prisma/client';

const Envs: React.FC<{
	envs: Env[];
}> = ({ envs }) => {
	return (
		<Stack>
			{envs.map((env, idx) => {
				return (
					<HStack key={idx}>
						<Text minW='44'>{env.name}</Text>
						<Text color='gray.500'>{env.value}</Text>
					</HStack>
				);
			})}
		</Stack>
	);
};

export default Envs;
