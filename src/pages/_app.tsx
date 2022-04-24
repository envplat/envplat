import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme';
import Footer from 'components/footer';

function envplat({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
			<Footer />
		</ChakraProvider>
	);
}

export default envplat;
