import { Link as ChakraLink, Center } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {Box, Text, Link} from '@chakra-ui/react';
export default function ErrorPage() {
  return (
    <Center h="100vh">
      <div>
        <h1>Page Not Found</h1>
        <Box mt="50px" display="flex" justifyContent="center">
          <ChakraLink as={RouterLink} to='/'>
            <Link to='/' href='/'><Text display="right">Home</Text></Link>
          </ChakraLink>
        </Box>
      </div>
    </Center>
  );
}