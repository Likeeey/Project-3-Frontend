import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { Link } from "react-router-dom";
import { Box, Center, Card, Input, Button, Heading, Text, FormControl, useToast, FormLabel } from "@chakra-ui/react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { saveToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const toast = useToast();

    const { login } = authService;

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const reqBody = { email, password };

        login(reqBody)
            .then((response) => {
                saveToken(response.data.authToken);
                authenticateUser();
                navigate("/profile");
                toast({
                    title: "Login Successful",
                    description: "You have been logged in successfully.",
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
                    <Heading as="h1" mb="10" color={"orange"}>Login</Heading>
                    <form onSubmit={handleLoginSubmit}>
                        <FormControl id="email" mb="4" isRequired>
                            <FormLabel>Email:</FormLabel>
                            <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl id="password" mb="4" isRequired>
                            <FormLabel>Password:</FormLabel>
                            <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <Button type="submit" style={{ backgroundColor: '#FBD38D', color: 'white' }} mb="4">Login</Button>
                        {error && <Text color="red.500">{error}</Text>}
                    </form>
                    <Text>Don't have an account? <Link to="/signup" style={{ color: 'orange' }}>Sign Up</Link></Text>
                </Card>
            </Box>
        </Center>
    );
}

export default Login;