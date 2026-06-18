import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Only VITE_*-prefixed vars are exposed to client code (Vite default).
  // GEMINI_KEY is intentionally NOT exposed: the chatbot calls Gemini through the
  // backend (POST /api/chat), so the key must never ship in the browser bundle.
})
