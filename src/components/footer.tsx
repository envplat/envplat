import React from 'react';
import { chakra, Box, Center, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
	return (
		<Center py={4}>
			<Box>
				<Text color='gray.500'>
					made with{' '}
					<chakra.span color='pink.300' fontSize={'xl'}>
						♥
					</chakra.span>{' '}
					by xencodes
				</Text>
			</Box>
		</Center>
	);
};

export default Footer;
