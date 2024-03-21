"use server";
import client from "@/db";

export const Create = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const user = await client.user.create({
      data: {
        username: username,
        password: password,
        email: email,
      },
    });
    console.log(user);
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  } catch (error) {
    console.error(error);
    return { error: "unable to create" };
  }
};
