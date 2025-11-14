
import { GoogleGenAI } from "@google/genai";

const generatePitch = async (keywords: string): Promise<string> => {
    // This check is for the local environment where the API key might not be set.
    // In a deployed environment, this would be handled by server-side configurations.
    if (!process.env.API_KEY) {
        console.warn("API_KEY environment variable not set. Using mock response.");
        return new Promise(resolve => setTimeout(() => resolve(`
**Introducing 'Campus Cravings': Your Ultimate On-Campus Food Companion!**

Tired of long lines, expensive meals, and the endless trek across campus for decent food? Say goodbye to hanger and hello to convenience with Campus Cravings – the only food delivery app built by students, for students.

**Why You'll Love Us:**

We're all about **fast delivery**, getting your favorite campus eats to you in minutes, whether you're in the library, a dorm, or between classes. Our mission is to offer **cheap prices** that fit a student budget, with exclusive deals you won't find anywhere else. Pulling an all-nighter? We've got you covered with the perfect **late-night study fuel** to keep you going.

Campus Cravings isn't just an app; it's your lifeline to delicious, affordable food, right when you need it. Download now and revolutionize your campus dining experience!
`), 1500));
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const model = 'gemini-2.5-flash';
        
        const prompt = `
            Act as a world-class marketing expert and copywriter.
            Your task is to write a compelling, energetic, and persuasive pitch for a new mobile app offering fast and affordable on-campus food delivery exclusively for university students.

            **Target Audience:** Busy, budget-conscious university students. They value speed, affordability, and convenience.
            **Tone:** Exciting, modern, slightly informal, and highly persuasive. Use short paragraphs and bold headings for key sections.
            **Format:**
            1.  Start with a catchy headline or tagline.
            2.  Write a short introductory paragraph that identifies the student's pain points (e.g., long lines, expensive food).
            3.  Create a "Why You'll Love Us" section, highlighting the key benefits.
            4.  Conclude with a strong call to action.

            **Incorporate the following themes and keywords seamlessly into the pitch:** ${keywords}

            Make sure the output is well-structured and easy to read.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating pitch with Gemini API:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};

export { generatePitch };
