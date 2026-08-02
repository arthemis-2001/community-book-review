import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user, profile, loading, logout } = useAuth();

  if (loading) {
    return <Box p={8}>Loading profile...</Box>;
  }

  if (!user) {
    return (
      <Box maxW="640px" mx="auto" mt={16} p={8} bg="bg.panel" borderRadius="lg">
        <Heading mb={4}>Profile</Heading>
        <Text mb={4}>You need to be logged in to view this page.</Text>
        <Link as={RouterLink} to="/login" color="teal.400">
          Go to Login
        </Link>
      </Box>
    );
  }

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : "Unknown";

  return (
    <Box maxW="800px" mx="auto" mt={16} p={8} bg="bg.panel" borderRadius="lg">
      <Stack
        direction={{ base: "column", md: "row" }}
        align="flex-start"
        gap={8}
      >
        <VStack align="center" spacing={4} minW="220px">
          <Avatar.Root size="xl">
            <Avatar.Fallback name={profile?.username || user.email} />
            <Avatar.Image src={profile?.avatar_url} />
          </Avatar.Root>
          <Text color="fg.muted">Logged in as</Text>
          <Text fontWeight="bold">{profile?.username ?? user.email}</Text>
        </VStack>
        <Box flex="1">
          <Heading size="lg" mb={4} color="fg">
            My Profile
          </Heading>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontSize="sm" color="fg.muted" mb={1}>
                Email
              </Text>
              <Text>{user.email}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="fg.muted" mb={1}>
                Username
              </Text>
              <Text>{profile?.username ?? "Not set"}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="fg.muted" mb={1}>
                Member since
              </Text>
              <Text>{memberSince}</Text>
            </Box>
          </VStack>
          <HStack mt={8} spacing={3} flexWrap="wrap">
            <Button colorScheme="teal" onClick={logout}>
              Sign Out
            </Button>
            <Button as={RouterLink} to="/" variant="outline">
              Back to Home
            </Button>
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
}
