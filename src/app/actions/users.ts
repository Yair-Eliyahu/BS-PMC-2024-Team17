"use server";

import { createSupabaseClient, protectRoute } from "@/auth/server";
import { getErrorMessage } from "@/lib/utils";
import { db } from "@/db";
import { users } from "@/db/schema";

export const createAccountAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { auth } = createSupabaseClient();

    // Sign up the user using Supabase
    const { data, error } = await auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Check if user data exists
    if (!data.user) {
      throw new Error("User data is not available.");
    }

    // Extract user information
    const { id, email: userEmail } = data.user;

    if (typeof id !== "string") {
      throw new Error("Invalid user ID type.");
    }

    // Insert the new user into your custom 'user' table
    await db.insert(users).values({
      id: id as string, 
      email: userEmail as string,
    });

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const loginAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { auth } = createSupabaseClient();

    const { error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const signOutAction = async () => {
  try {
    await protectRoute();

    const { auth } = createSupabaseClient();

    const { error } = await auth.signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};
