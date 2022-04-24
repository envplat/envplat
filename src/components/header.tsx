import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Header: React.FC = () => {
	return (
		<Box bg='gray.900' py={12} px={8}>
			<Box maxW='2xl'>
				<Heading>Hello, developer!</Heading>
			</Box>
		</Box>
	);
};

export default Header;
