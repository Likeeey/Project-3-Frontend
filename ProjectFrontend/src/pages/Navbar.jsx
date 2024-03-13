import React, { useContext } from "react";
import { Flex, Link, Box } from "@chakra-ui/react";
import { Image } from '@chakra-ui/react'
import { AuthContext } from "../context/auth.context";

function Navbar () {

    const { isLoggedIn, user, logOut } = useContext(AuthContext);
    return (
        <Flex p={3} bg="blue.200" justifyContent="space-between" alignItems="center">
            <Box >
            <Link to = {"/"} color="white" mr={2} href="/" >App name<Image src="../public/weightlifter.png" alt="logo" width={150} height={150}></Image></Link>
            </Box>
          <Link to = {"/challenges"} color="white" mr={100} href="challenges">Challenges</Link>
          <Link to = {"/members-results"} color="white" mr={100} href="members-results">Members Results</Link>
          <Link to = {"/coaches"} color="white" mr={100} href="coaches">Coaches</Link>
          <Box>
            {isLoggedIn && (
              <>
                  <Link to = {"/profile"} color="white" mr={100} href="profile"><span>{user && `Welcome, ${user.username}`}</span></Link>
                  <button style={{color: "white"}}onClick={logOut}>Logout</button>
              </>
            )}
            {!isLoggedIn && (
              <Link to = {"/login"} color="white" mr={2} href="login">Login</Link>
            )}
            
          </Box>
        </Flex>
      );
    };
export default Navbar;