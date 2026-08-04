import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Input, Field, VStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { supabase } from "@/utils/supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toaster.create({
        title: "Login failed",
        description: error.message,
        status: "error",
      });
      setLoading(false);
      return;
    }

    toaster.create({
      title: "Logged in!",
      status: "success",
    });

    setLoading(false);
    navigate("/");
  };

  return (
    <Box maxW="400px" mx="auto" mt="100px">
      <Heading mb={6} color="fg">
        Login
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input
              placeholder="Email"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email",
                },
              })}
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <Input
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password required",
              })}
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Button
            colorScheme="teal"
            width="full"
            type="submit"
            loading={loading}
          >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
