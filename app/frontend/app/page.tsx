import HomeClient from "@/components/HomeClient";
// Force dynamic rendering just for Docker/EC2 to read runtime env vars.
// For GitHub Pages (static export), we use 'auto' (or 'error'/'force-static') to allow static generation.
export const dynamic = process.env.NEXT_PUBLIC_DEPLOY_SOURCE === 'github-pages' ? 'auto' : 'force-dynamic';

// This is a Server Component by default in App Router
export default function Home() {
    // Access environment variable at RUNTIME on the server
    const apiUrl = process.env.BACKEND_API_URL || 'http://localhost:3001';

    return <HomeClient initialApiUrl={apiUrl} />;
}
