import React from 'react';

// Force dynamic rendering to ensure data is fetched on every request if needed
export const dynamic = 'force-dynamic';

async function getData() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    try {
        const res = await fetch(`${apiUrl}/api/data`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return { data: 'Error fetching data', env_info: 'N/A' };
    }
}

export default async function Home() {
    const data = await getData();

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>DevOps Project 8 Frontend</h1>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px' }}>
                <h2>Backend Response:</h2>
                <p><strong>Message:</strong> {data.data}</p>
                <p><strong>Env Info:</strong> {data.env_info}</p>
                <p><strong>Time:</strong> {new Date().toLocaleString()}</p>
            </div>
        </main>
    );
}
