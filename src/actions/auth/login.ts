"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function login(email: string, password: string) {
  try {
    // await signIn("credentials", { email, password, redirect: false });
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!result || result.error) {
      return { ok: false, message: result?.error || "Invalid credentials." };
    }
    return { ok: true };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      return { ok: false, message: "Invalid credentials." };
    }
    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
}
