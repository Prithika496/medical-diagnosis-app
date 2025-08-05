import axios from "axios";

const API_URL = "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2";

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
};

export const getDiagnosis = async (symptomInput) => {
  const question = `What disease causes ${symptomInput}?`;

  const context = `
    Common illnesses that cause symptoms such as fever, sore throat, body aches, and cough include:
    - Influenza (flu)
    - COVID-19
    - Strep throat
    - Common cold
    - Pneumonia
    - Tonsillitis
  `;

  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: {
          question,
          context,
        },
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "API failed" };
  }
};

