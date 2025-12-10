import HomeClient from "@/components/HomeClient";
export const dynamic = 'force-dynamic';

// This is a Server Component by default in App Router
export default function Home() {
    // Access environment variable at RUNTIME on the server
    const apiUrl = process.env.BACKEND_API_URL || 'http://localhost:3001';

    return <HomeClient initialApiUrl={apiUrl} />;
}
