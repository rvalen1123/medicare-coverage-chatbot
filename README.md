# Medicare Coverage Assistant

A simple, user-friendly chatbot designed to help healthcare providers and administrative staff quickly access information about Medicare coverage policies.

## Features

- **Simple Interface**: Clean design that's easy for medical staff to use
- **Medicare Coverage Focus**: Answers questions about Local Coverage Determinations (LCDs) and coverage status
- **No Login Required**: Instant access without authentication
- **Healthcare-Friendly Design**: Medical blue color scheme

## Railway Deployment Guide

To deploy this Medicare Coverage Chatbot to Railway:

1. **Fork this repository** to your GitHub account

2. **Create a new Railway project**
   - Go to [Railway.app](https://railway.app) and log in
   - Click "New Project" > "Deploy from GitHub repo"
   - Select your forked repository

3. **Configure environment variables**
   - Add the following variables in Railway's "Variables" tab:
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `AUTH_SECRET`: A random string (32+ characters)
     - `DATABASE_URL`: (Will be auto-created by Railway if you add PostgreSQL)
     - `NEXT_PUBLIC_GUEST_KEY`: Set to `true` to enable guest access

4. **Add a PostgreSQL database** (Optional)
   - Click "New" > "Database" > "PostgreSQL"
   - Railway will automatically connect it to your app

5. **Deploy the application**
   - Railway will automatically deploy your app
   - If you encounter build errors, check the logs and adjust environment variables

6. **Access your chatbot**
   - Once deployed, click "Generate Domain" in the "Settings" tab
   - Your Medicare Coverage Chatbot will be available at the generated URL

## Troubleshooting Common Deployment Issues

If you encounter deployment issues:

1. **Build failures**: Check that your environment variables are properly set
2. **Database connection errors**: Ensure DATABASE_URL is correctly configured
3. **API errors**: Verify your OPENAI_API_KEY is valid
4. **Blank screen**: Check deployment logs for runtime errors

## Example Questions

- "What is an LCD and how does it work?"
- "Is physical therapy covered for Medicare patients with osteoarthritis?"
- "What documentation is required for wheelchair coverage?"
- "Are genetic tests for cancer risk covered by Medicare?"
- "What's the difference between Medicare Part A and Part B coverage?"

## Local Development

```bash
git clone https://github.com/yourusername/medicare-coverage-chatbot.git
cd medicare-coverage-chatbot
npm install
npm run dev
```

Create a `.env.local` file with the required environment variables before running locally.

## Built With

- Next.js
- Vercel AI SDK
- OpenAI API
- Tailwind CSS
