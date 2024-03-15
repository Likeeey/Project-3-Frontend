import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { Link } from "react-router-dom";
import { Box, Center, Card, Input, Button, Heading, Text, FormControl, useToast, FormLabel } from "@chakra-ui/react";

function Signup () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const toast = useToast();

    const { signup } = authService;

    const handleSignUpSubmit = (e) => {
        e.preventDefault();

        const reqBody = { email, password, username };

        signup(reqBody)
            .then(() => {
                navigate("/login");
                toast({
                    title: "Signup Successful",
                    description: "You have successfully signed up. Please login to continue.",
                    status: "success",
                    position: "bottom",
                    duration: 1500,
                    isClosable: true,
                    variant: "solid",
                    bg: "orange",
                });
            })
            .catch((error) => {
                const errorDescription = error.data.message;
                setError(errorDescription);
            });
    };

    return (
        <Center h="100vh" mt={"-100px"}>
            <Box>
                <Card p="10" maxW="500px" border={"2px solid orange"} borderRadius="lg" boxShadow="lg">
                    <Heading as="h1" mb="10" color={"orange"}>Sign Up</Heading>
                    <form onSubmit={handleSignUpSubmit}>
                        <FormControl id="email" mb="4" isRequired>
                            <FormLabel>Email:</FormLabel>
                            <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl id="password" mb="4" isRequired>
                            <FormLabel>Password:</FormLabel>
                            <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <FormControl id="username" mb="4" isRequired>
                            <FormLabel>Username:</FormLabel>
                            <Input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </FormControl>
                        <Button type="submit" style={{ backgroundColor: '#FBD38D', color: 'white' }} mb="4">Sign Up</Button>
                        {error && <Text color="red.500">{error}</Text>}
                    </form>
                    <Text>Already have an account? <Link to="/login" style={{ color: 'orange' }}>Login</Link></Text>
                </Card>
            </Box>
        </Center>
    );
}

export default Signup;