import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Input, Field, VStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { supabase } from "@/utils/supabaseClient";

export default function Signup() {
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

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toaster.create({
        title: "Signup failed",
        description: error.message,
        status: "error",
      });
      setLoading(false);
      return;
    }

    const user = authData.user;

    if (user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        username: data.username,
        birthdate: data.birthdate || null,
      });

      if (profileError) {
        toaster.create({
          title: "Profile creation failed",
          description: profileError.message,
          status: "error",
        });
        setLoading(false);
        return;
      }
    }

    toaster.create({
      title: "Account created!",
      description: "Check your email if confirmation is required.",
      status: "success",
    });

    setLoading(false);
    navigate("/");
  };

  return (
    <Box maxW="400px" mx="auto" mt="100px">
      <Heading mb={6}>Sign Up</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <Field.Root invalid={!!errors.username}>
            <Field.Label>Username</Field.Label>
            <Input
              placeholder="Username"
              {...register("username", {
                required: "Username required",
                minLength: {
                  value: 3,
                  message: "Too short",
                },
              })}
            />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>

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
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Min 6 characters",
                },
              })}
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.confirmPassword}>
            <Field.Label>Confirm Password</Field.Label>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match",
              })}
            />
            <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.birthdate}>
            <Field.Label>Birthdate</Field.Label>
            <Input
              type="date"
              placeholder="Birthdate"
              {...register("birthdate", {
                validate: (value) => {
                  if (!value) return true;

                  const selected = new Date(value);
                  const today = new Date();

                  if (selected > today) {
                    return "Birthdate cannot be in the future";
                  }

                  return true;
                },
              })}
            />
            <Field.ErrorText>{errors.birthdate?.message}</Field.ErrorText>
          </Field.Root>

          <Button
            colorScheme="teal"
            width="full"
            type="submit"
            loading={loading}
          >
            Sign Up
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
