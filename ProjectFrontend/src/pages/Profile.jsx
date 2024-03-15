import { Box, VStack, Image, Text, Select, Icon } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

function Profile() {
    const userData = {
        username: "User Name",
        email: "sample@example.com",
        image: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        goals: [
            "Lose Weight",
            "Build Muscle",
            "Improve Cardiovascular Health",
            "Increase Flexibility",
            "Improve Overall Fitness"
        ],
        frequency: [
            "2 times a week",
            "3 times a week",
            "4 times a week",
            "5 times a week",
            "6 times a week"
        ],
        time: [
            "30 minutes",
            "45 minutes",
            "60 minutes",
            "90 minutes",
            "120 minutes"
        ],
        weight: "70 kg",
        height: "1,80 cm",
    };

    return (
        <Box display="flex" justifyContent="space-between">
            <VStack spacing={10} mt={20} align="stretch">
                <ChakraLink as={RouterLink} to="/profile" color="orange" fontSize="2xl" fontWeight="bold" fontFamily={"sans-serif"} _hover={{ textDecoration: 'none', color: 'blue.600' }}>
                    My Profile
                </ChakraLink>
                <ChakraLink as={RouterLink} to="/myplan" color="orange" fontSize="2xl" fontWeight="bold" fontFamily={"sans-serif"} _hover={{ textDecoration: 'none', color: 'blue.600' }}>
                    My Plan
                </ChakraLink>
                <ChakraLink as={RouterLink} to="/tracking" color="orange" fontSize="2xl" fontWeight="bold" fontFamily={"sans-serif"} _hover={{ textDecoration: 'none', color: 'blue.600' }}>
                    Tracking
                </ChakraLink>
            </VStack>
            <Box>
                <Box
                    borderWidth="2px"
                    borderRadius="lg"
                    p={4}
                    mt={8}
                    mr={30}
                    align="center"
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    borderColor="orange"
                    shadow="md"
                    bg="white"
                    minHeight="auto" // Adjusted to auto
                    width={"1500px"}
                >
                    <Image src={userData.image} alt="User Image" borderRadius="full" boxSize="200px" mt={1} mb={4} display={"block"} mx="auto" />
                    <Text fontSize="30" fontWeight="bold" mt={0} mb={2} align="start">
                        {userData.username}
                    </Text>
                    <Text fontSize="md" mt={0} align="start">
                        {userData.email}
                    </Text>
                    <Text fontSize="md" mt={5} align="start">
                        Weight: {userData.weight}
                    </Text>
                    <Text fontSize="md" mt={5} align="start">
                        Height: {userData.height}
                    </Text>
                    <Select mt={5} placeholder="Select a Goal" align="start" background={"orange"} color={"black"}>
                        {userData.goals.map((goal, index) => (
                            <option key={index} value={goal}>
                                {goal}
                            </option>
                        ))}
                    </Select>
                    <Select mt={5} placeholder="Frequency to Train" align="start" background={"orange"} color={"black"}>
                        {userData.frequency.map((frequency, index) => (
                            <option key={index} value={frequency}>
                                {frequency}
                            </option>
                        ))}
                    </Select>
                    <Select mt={5} placeholder="Available Time to Train" align="start" background={"orange"} color={"black"}>
                        {userData.time.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </Select>
                    <Box mt={5} gap={7} display="flex" justifyContent="center">
                        <Icon as={FaInstagram} boxSize={8} mr={4} />
                        <Icon as={FaTwitter} boxSize={8} mr={4} />
                        <Icon as={FaFacebook} boxSize={8} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Profile;