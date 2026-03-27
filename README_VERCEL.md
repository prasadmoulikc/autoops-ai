# Deploying to Vercel

This project is configured to work with Vercel's serverless functions.

### 🚀 Deployment Steps

1.  **Export to GitHub**: Use the "Export to GitHub" feature in AI Studio.
2.  **Import to Vercel**:
    *   Go to [vercel.com](https://vercel.com).
    *   Import your new GitHub repository.
    *   Vercel should automatically detect the Vite project.
3.  **Environment Variables**:
    *   In the Vercel project settings, add your `N8N_WEBHOOK_URL` and any other secrets from your `.env` file.
4.  **Deploy**: Click "Deploy".

### 📁 Project Structure for Vercel

*   `api/index.ts`: The entry point for Vercel serverless functions. It exports the Express app.
*   `src/server/api.ts`: Contains the API logic (routes, middleware).
*   `vercel.json`: Configures routing to ensure `/api/*` requests go to the serverless function.
*   `dist/`: Vercel will build the frontend into this directory.

### 🛠️ Local Development

Continue using `npm run dev` to start the local Express + Vite server.
