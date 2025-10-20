"use server";

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPaypalBearerToken();

  console.log({ authToken });

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token de verificación",
    };
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const authUrl = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64Token}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  };

  try {
    const response = await fetch(authUrl, options).then((r) => r.json());

    return response.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
