import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const Input = {
	defaultProps: {
		focusBorderColor: 'gray.700',
	},
};

const theme = extendTheme({
	config,
	components: {
		Input,
	},
});

export default theme;
