import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { LuChevronDown } from "react-icons/lu";

import Home from "@/pages/Home";
import BookDetails from "@/pages/BookDetails";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Profile from "@/pages/Profile";
import { useAuth } from "@/context/AuthContext";

const App = () => {
  const { user, profile, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Box minH="100vh" bg="bg" color="fg">
        <Box
          as="nav"
          bg="bg.panel"
          backdropFilter="blur(10px)"
          p={2}
          position="sticky"
          top="0"
          zIndex="1000"
          boxShadow="sm"
        >
          <HStack
            maxW="1200px"
            mx="auto"
            justify="space-between"
            align="center"
            color="fg"
          >
            <Heading size="md" color="fg">
              📚 Book Review
            </Heading>
            <HStack gap={4}>
              <Button
                as={Link}
                to="/"
                variant="ghost"
                _hover={{ bg: "bg.muted" }}
              >
                Home
              </Button>
              {user ? (
                <>
                  <Menu.Root positioning={{ placement: "bottom-end" }}>
                    <Menu.Trigger asChild>
                      <Button
                        variant="ghost"
                        _hover={{ bg: "bg.muted" }}
                        _active={{ bg: "bg.emphasized" }}
                        _expanded={{ bg: "bg.emphasized" }}
                        _focusVisible={{
                          boxShadow: "none",
                          bg: "bg.emphasized",
                        }}
                      >
                        <HStack gap={2}>
                          <Avatar.Root size="sm">
                            <Avatar.Fallback name={profile?.username} />
                            <Avatar.Image src={profile?.avatar_url} />
                          </Avatar.Root>

                          <Text>{profile?.username}</Text>

                          <LuChevronDown />
                        </HStack>
                      </Button>
                    </Menu.Trigger>

                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item value="profile" asChild>
                            <Link to="/profile">Profile</Link>
                          </Menu.Item>

                          <Menu.Item value="settings" asChild>
                            <Link to="/my-reviews">My reviews</Link>
                          </Menu.Item>

                          <Menu.Separator />

                          <Menu.Item
                            value="logout"
                            color="red.500"
                            onClick={logout}
                          >
                            Logout
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/login"
                    variant="ghost"
                    _hover={{ bg: "bg.muted" }}
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    variant="ghost"
                    _hover={{ bg: "bg.muted" }}
                  >
                    Signup
                  </Button>
                </>
              )}

              <ColorModeButton />
            </HStack>
          </HStack>
        </Box>
        <Box minH="100vh" bg="bg" color="fg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
