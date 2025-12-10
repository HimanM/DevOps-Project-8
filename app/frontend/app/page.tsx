import HomeClient from "@/components/HomeClient";

// This is a Server Component by default in App Router
export default function Home() {
    // Access environment variable at RUNTIME on the server
    // When running in Docker (standalone mode), process.env is populated from the container environment
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    return <HomeClient initialApiUrl={apiUrl} />;
}
