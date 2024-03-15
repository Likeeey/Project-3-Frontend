import { Center, Box, Text, Link, Icon, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export default function ErrorPage() {
  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Text fontSize="60" fontWeight="bold" color="orange" mb={20} mt={-200} fontFamily={"sans-serif"}>Page Not Found</Text>
        <Text fontSize="30" style={{color: "black"}} mb={-10} fontWeight={"bold"} fontFamily={"sans-serif"}>Move Your Body to</Text>
        <Box mt="50px">
          <Link as={RouterLink} to="/" textDecoration="none">
            <Flex alignItems="center" justifyContent="center" flexDirection="column">
              <Icon as={FaHome} fontSize="2em" mb="2" color="orange" />
              <Text fontSize="20" fontWeight="bold" color="orange" fontFamily={"sans-serif"}>Home</Text>
            </Flex>
          </Link>
        </Box>
      </Box>
    </Center>
  );
}