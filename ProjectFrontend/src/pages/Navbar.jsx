import React, { useContext } from "react";
import { Flex, Link, Image, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AuthContext } from "../context/auth.context";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
    const { isLoggedIn, user, logOut } = useContext(AuthContext);

    return (
        <Flex p={3} bgGradient="linear(to-b, #FFA500, #FFF3E0)" justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
                <Link as={RouterLink} to="/">
                    <Image src="./src/assets/weightlifter.png" alt="logo" width={70} height={100} mr={2} />
                </Link>
                <Link as={RouterLink} to="/" color="grey" fontWeight="bold" fontFamily={"sans-serif"} fontSize={"22px"}>Lusitanian Boost</Link>
            </Flex>
            <Flex alignItems="center" gap={340} fontSize={"20px"} fontFamily={"sans-serif"} fontWeight={"bold"}>
                <Link as={RouterLink} to="/challenges" color="white" mr={4}>Challenges</Link>
                <Link as={RouterLink} to="/members-results" color="white" mr={4}>Members Results</Link>
                <Link as={RouterLink} to="/coaches" color="white" mr={4}>Coaches</Link>
                {isLoggedIn ? (
                    <Menu>
                        <MenuButton color="white" mr={-345}>
                            Welcome, {user.username}
                        </MenuButton>
                        <div style={{ backgroundColor: '#FBD38D' }}>
                            <MenuList style={{ backgroundColor: '#FBD38D' }}>
                                <MenuItem as={RouterLink} to="/profile" color="white" style={{ backgroundColor: '#FBD38D' }}>Profile</MenuItem>
                                <MenuItem onClick={logOut} color="white" style={{ backgroundColor: '#FBD38D' }}>Logout</MenuItem>
                            </MenuList>
                        </div>
                    </Menu>
                ) : (
                    <Link as={RouterLink} to="/login" color="white">Login</Link>
                )}
            </Flex>
        </Flex>
    );
}

export default Navbar;