/*firebase.js     # Firebase Config
    │   └── aiService.js    # Stable Diffusion/Midjourney API calls*/

    /**
 * AI Service for ThumbFace
 * Handles communication with Stability AI (or compatible) APIs for Image-to-Image generation.
 * * Logic:
 * 1. Takes a source image (User's selfie).
 * 2. Takes a text prompt (The mood: "Shocked", "Angry").
 * 3. Sends both to the AI to modify the expression while keeping face geometry.
 */

// --- 1. CONFIGURATION ---

// Helper to safe-read env vars (prevents crashes in some build envs)
const getEnv = (key, fallback) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || fallback;
    }
  } catch (e) { }
  return fallback;
};

const API_KEY = getEnv("VITE_AI_API_KEY", ""); // Must be set in .env
const ENGINE_ID = "stable-diffusion-v1-6"; // Fast & good for img2img
const API_URL = `https://api.stability.ai/v1/generation/${ENGINE_ID}/image-to-image`;

// --- 2. PROMPT ENGINEERING ---

// Optimized prompts for YouTube Thumbnail expressions
const MOOD_PROMPTS = {
  'shock': "extreme shock, wide eyes, open mouth, youtube thumbnail style, hyper-expressive, 4k, detailed skin texture, studio lighting, highly detailed",
  'anger': "furious rage, angry shouting face, glowing red eyes, veins popping, intense emotion, youtube thumbnail style, 4k",
  'laugh': "hysterical laughter, crying with joy, extreme happiness, tears of joy, youtube thumbnail style, 4k",
  'fear': "terrified, horror movie scream, pale face, sweating, extreme fear, youtube thumbnail style, 4k",
  'default': "expressive face, high quality, youtube thumbnail style"
};

const NEGATIVE_PROMPT = "blurry, low quality, distorted, bad anatomy, extra fingers, cartoon, illustration, painting, drawing, bad eyes, deformation";

// --- 3. CORE SERVICE ---

/**
 * Generates an expression based on an input image.
 * * @param {File} imageFile - The image file uploaded by the user.
 * @param {string} moodId - The ID of the mood (e.g., 'shock', 'anger').
 * @returns {Promise<string>} - A URL representing the generated image (or null on failure).
 */
export const generateExpression = async (imageFile, moodId) => {
  // 1. Safety Check: If no key is present, return a Mock image (Demo Mode)
  if (!API_KEY || API_KEY === "sk-your-ai-key-here") {
    console.warn("⚠️ No AI API Key found. Using Mock Response.");
    return simulateApiCall(moodId);
  }

  // 2. Prepare Form Data for Stability AI
  const formData = new FormData();
  formData.append('init_image', imageFile);
  formData.append('init_image_mode', 'IMAGE_STRENGTH');
  formData.append('image_strength', '0.35'); // 0.35 = Keep structure, change expression heavily
  formData.append('text_prompts[0][text]', MOOD_PROMPTS[moodId] || MOOD_PROMPTS['default']);
  formData.append('text_prompts[0][weight]', '1');
  formData.append('text_prompts[1][text]', NEGATIVE_PROMPT);
  formData.append('text_prompts[1][weight]', '-1');
  formData.append('cfg_scale', '7');
  formData.append('samples', '1');
  formData.append('steps', '30');

  try {
    // 3. Make the API Call
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`AI API Error: ${errorData.message || response.statusText}`);
    }

    // 4. Process Response (Base64)
    const result = await response.json();
    
    // Stability AI returns an array of artifacts. We take the first one.
    const base64Image = result.artifacts[0].base64;
    return `data:image/png;base64,${base64Image}`;

  } catch (error) {
    console.error("❌ Generation Failed:", error);
    // Fallback to simulation on error so the app doesn't crash for the user
    return simulateApiCall(moodId);
  }
};

/**
 * MOCK FUNCTION: Simulates AI generation for Demo/Dev mode
 * This ensures the UI works even if you don't want to pay for API credits during testing.
 */
const simulateApiCall = (moodId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Returns a placeholder image with the text of the mood
      resolve(`https://placehold.co/1024x1024/1a1a1a/FFF?text=${moodId.toUpperCase()}+Generated`);
    }, 2000);
  });
};