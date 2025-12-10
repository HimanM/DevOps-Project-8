"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiX, FiZoomIn, FiZoomOut } from "react-icons/fi";

interface ZoomableImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scale, setScale] = useState(1);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        setScale(1); // Reset scale on close
    };

    const handleZoom = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(scale === 1 ? 2 : 1);
    };

    return (
        <>
            <motion.div
                layoutId={`image-${src}`}
                onClick={toggleOpen}
                className={`cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10 ${className}`}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={450}
                    className="h-full w-full object-cover"
                    unoptimized
                />
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                        onClick={toggleOpen}
                    >
                        <motion.div
                            layoutId={`image-${src}`}
                            className="relative max-h-screen w-full max-w-5xl overflow-hidden rounded-xl bg-black"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                        >
                            <div className="absolute right-4 top-4 z-50 flex gap-2">
                                <button
                                    onClick={handleZoom}
                                    className="rounded-full bg-black/50 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                                >
                                    {scale === 1 ? <FiZoomIn size={20} /> : <FiZoomOut size={20} />}
                                </button>
                                <button
                                    onClick={toggleOpen}
                                    className="rounded-full bg-black/50 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            <div className="overflow-auto" style={{ maxHeight: "90vh" }}>
                                <motion.div
                                    animate={{ scale }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="origin-top-left"
                                    style={{ cursor: scale === 1 ? 'zoom-in' : 'zoom-out' }}
                                    onClick={handleZoom}
                                >
                                    <Image
                                        src={src}
                                        alt={alt}
                                        width={1600}
                                        height={900}
                                        className="h-auto w-full"
                                        priority
                                        unoptimized
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
