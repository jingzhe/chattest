import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8080/",
});

interface AskConfluenceResponse {
  answer: string;
}

export async function askConfluence(
  question: string
): Promise<AskConfluenceResponse | undefined> {
  try {
    const response = await httpClient.post<AskConfluenceResponse>(
      "http://localhost:8088/ask/confluence",
      {
        question,
      }
    );

    if (response.data && typeof response.data.answer === "string") {
      return {
        answer: response.data.answer,
      };
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error(
      "Error while fetching answer:",
      error instanceof Error ? error.message : error
    );
    if (error instanceof Error) {
      return { answer: error.message };
    }
  }
}
