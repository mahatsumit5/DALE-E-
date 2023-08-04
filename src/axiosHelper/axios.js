import axios from "axios";

export const getImageUrl = async (prompt, number) => {
  const api =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8000/generations"
      : "/generations";

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify({
    prompt: prompt,
    number: number,
    size: "512x512",
  });

  try {
    const { data } = await axios.post(api, body, options);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
