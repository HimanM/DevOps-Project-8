"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

interface CodeBlockProps {
    code: string;
    language?: string;
}

export default function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative my-4 rounded-lg bg-[#1a1a1a] border border-white/10 overflow-hidden font-mono text-sm group">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <span className="text-xs text-gray-500 lowercase">{language}</span>
                <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                    aria-label="Copy code"
                >
                    {copied ? <FiCheck size={14} className="text-green-500" /> : <FiCopy size={14} />}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-gray-300">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}
