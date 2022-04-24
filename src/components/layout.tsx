import React from 'react';
import { Box, HStack, Stack } from '@chakra-ui/react';
import Header from './header';
import Projects from './projects';

const Layout: React.FC<{
	children: React.ReactChild;
}> = ({ children }) => {
	return (
		<Stack spacing={4}>
			<Header />

			<Box px={{ base: 4, lg: 12 }}>
				<HStack spacing={4} alignItems='flex-start' w='full'>
					<Box w='md'>
						<Projects />
					</Box>
					<Box w='full'>{children}</Box>
				</HStack>
			</Box>
		</Stack>
	);
};

export default Layout;
