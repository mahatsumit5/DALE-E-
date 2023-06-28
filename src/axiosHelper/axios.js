import React from "react";
import axios from "axios";

export const getImageUrl = async (prompt, number) => {
  const api = "http://localhost:8000/";

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
    return {
      status: "error",
      message: error.message,
    };
  }
};
