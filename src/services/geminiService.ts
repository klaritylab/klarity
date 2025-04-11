// Gemini API service for PDF chat functionality
import { toast } from "sonner";

// Use environment variable or localStorage for the API key
let GEMINI_API_KEY = localStorage.getItem("gemini_api_key") || "";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export type GeminiMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export type GeminiRequest = {
  contents: GeminiMessage[];
};

export type GeminiResponse = {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
};

export const setGeminiApiKey = (apiKey: string) => {
  GEMINI_API_KEY = apiKey;
  localStorage.setItem("gemini_api_key", apiKey);
  return GEMINI_API_KEY;
};

export const getGeminiApiKey = () => {
  return GEMINI_API_KEY;
};

export const generateGeminiResponse = async (messages: GeminiMessage[]): Promise<string> => {
  if (!GEMINI_API_KEY) {
    toast.error("Please set your Gemini API key in settings");
    return "Please set your Gemini API key to chat with your PDF content.";
  }

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json() as GeminiResponse;
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    return "I'm sorry, I couldn't process your request at the moment.";
  }
};

// Function to extract text content from a PDF
export const extractPdfContent = async (pdfUrl: string): Promise<string> => {
  try {
    // For demo purposes, we'll just return a placeholder
    // In a real implementation, you'd use a PDF parsing library like pdf.js
    return "This is extracted content from the PDF. In a real implementation, you would see the actual content from your PDF.";
  } catch (error) {
    console.error("Error extracting PDF content:", error);
    return "";
  }
};

// Function specifically for asking questions about a PDF
export const askQuestionAboutPdf = async (
  pdfName: string, 
  pdfContent: string,
  question: string,
  previousMessages: GeminiMessage[] = []
): Promise<string> => {
  const messages: GeminiMessage[] = [
    {
      role: 'user',
      parts: [{ 
        text: `I have a PDF named "${pdfName}". Here's its content: "${pdfContent}". 
        I want you to answer questions based solely on this content.` 
      }],
    },
    {
      role: 'model',
      parts: [{ 
        text: `I'll help answer questions based on the content of your PDF "${pdfName}".` 
      }],
    },
    ...previousMessages,
    {
      role: 'user',
      parts: [{ text: question }],
    }
  ];

  return generateGeminiResponse(messages);
};
