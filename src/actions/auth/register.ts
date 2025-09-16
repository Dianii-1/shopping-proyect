"use server";
import bcryptjs from "bcryptjs";

export const RegisterUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma?.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });

    return {
      ok: true,
      user: user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      messaje: "No se pudo crear el usuario",
    };
  }
};
