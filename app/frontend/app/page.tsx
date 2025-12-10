"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiAmazon, SiTerraform, SiAnsible, SiGithubactions, SiDocker, SiNextdotjs, SiNodedotjs, SiPrometheus, SiGrafana, SiGnubash } from "react-icons/si";
import { FiServer, FiActivity, FiDatabase, FiShield, FiGithub, FiExternalLink } from "react-icons/fi";
import ZoomableImage from "@/components/ZoomableImage";
import CodeBlock from "@/components/CodeBlock";

// --- Components ---

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="py-16 md:py-24 border-b border-white/5 last:border-0 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500"
                >
                    {title}
                </motion.h2>
                <div className="space-y-12">
                    {children}
                </div>
            </div>
        </section>
    );
}

function TechCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
        >
            <div className={`mb-4 p-4 rounded-full bg-opacity-10`} style={{ backgroundColor: `${color}1A` }}>
                <Icon size={40} style={{ color: color }} />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
        </motion.div>
    );
}

// --- Main Page ---

const TECH_STACK = [
    { icon: SiTerraform, title: "Terraform", description: "IaC & State Management", color: "#7B42BC" },
    { icon: SiAnsible, title: "Ansible", description: "Configuration Management", color: "#EE0000" },
    { icon: SiGithubactions, title: "GitHub Actions", description: "CI/CD Pipelines", color: "#2088FF" },
    { icon: SiAmazon, title: "AWS", description: "Cloud Infrastructure", color: "#FF9900" },
    { icon: SiDocker, title: "Docker", description: "Containerization", color: "#2496ED" },
    { icon: SiPrometheus, title: "Prometheus", description: "Metrics Collection", color: "#E6522C" },
    { icon: SiGrafana, title: "Grafana", description: "Visualization", color: "#F46800" },
    { icon: SiNextdotjs, title: "Next.js", description: "Frontend Framework", color: "#FFFFFF" },
];

export default function Home() {
    const [backendData, setBackendData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        fetch(`${apiUrl}/api/hello`)
            .then((res) => res.json())
            .then((data) => {
                setBackendData(data.message);
                setLoading(false);
            })
            .catch((err) => {
                if (process.env.NEXT_PUBLIC_DEPLOY_SOURCE === 'github-pages') {
                    setBackendData("Clone this repo and follow the instruction to deploy with Terraform and Ansible");
                } else {
                    setBackendData("Error connecting to backend");
                }
                setLoading(false);
            });
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-accent/20 overflow-x-hidden">

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-4xl mx-auto space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
                        <SiAmazon size={16} />
                        <span>DevOps Project 8</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
                        Enterprise <br />
                        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                            Automation
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        A comprehensive portfolio demonstrating scalable Infrastructure as Code, automated pipelines, and full-stack observability.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <a
                            href="https://github.com/HimanM/DevOps-Project-8"
                            target="_blank"
                            className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                        >
                            <FiGithub size={20} />
                            View Repository
                        </a>
                        <div className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 border border-white/10">
                            <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : backendData?.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`} />
                            <span className="text-sm font-mono text-gray-300">
                                {loading ? "Connecting..." : backendData || "Backend Offline"}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Tech Stack */}
            <Section title="Technology Stack" id="stack">
                {/* Mobile Marquee */}
                <div className="md:hidden overflow-hidden -mx-6">
                    <motion.div
                        className="flex gap-8 w-max px-6"
                        animate={{ x: "-50%" }}
                        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                    >
                        {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                                    <tech.icon size={28} style={{ color: tech.color }} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-4 gap-4">
                    {TECH_STACK.map((tech) => (
                        <TechCard key={tech.title} {...tech} />
                    ))}
                </div>
            </Section>

            {/* Architecture */}
            <Section title="Infrastructure" id="architecture">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h3 className="text-2xl font-semibold flex items-center gap-2">
                            <FiShield className="text-accent" /> Secure VPC Architecture
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            We create a custom Virtual Private Cloud (VPC) from scratch. This ensures total isolation and control over the network environment.
                        </p>
                        <ul className="space-y-4 w-full">
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-3 text-gray-300">
                                <FiServer className="mt-1 text-green-500 shrink-0" />
                                <div>
                                    <strong className="block text-white">Three Dedicated EC2 Instances</strong>
                                    <span className="text-sm text-gray-400">Frontend, Backend, and Monitoring servers are isolated.</span>
                                </div>
                            </li>
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-3 text-gray-300">
                                <FiDatabase className="mt-1 text-blue-500 shrink-0" />
                                <div>
                                    <strong className="block text-white">Remote State Locking</strong>
                                    <span className="text-sm text-gray-400">S3 + DynamoDB prevents race conditions during deployment.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ZoomableImage
                        src="/docs/ec2_instances.png"
                        alt="EC2 Instances Architecture"
                        className="rounded-xl shadow-2xl border border-white/10"
                    />
                </div>
            </Section>

            {/* Detailed Setup Instructions */}
            <Section title="Deployment Process" id="setup">
                <div className="space-y-24">

                    {/* Step 1 */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-0">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xl shrink-0">1</div>
                                <h3 className="text-2xl font-bold">Key Pair Generation</h3>
                            </div>
                            <p className="text-gray-400 mb-6">First, we generate a secure SSH key pair to access our EC2 instances.</p>
                            <div className="w-full text-left min-w-0 max-w-full">
                                <CodeBlock code={`aws ec2 create-key-pair \\
  --key-name devops-project-8-keypair \\
  --region us-west-2 \\
  --query 'KeyMaterial' \\
  --output text > devops-project-8-keypair.pem`} />
                            </div>
                        </div>
                        <ZoomableImage src="/docs/aws_onetime_keypair.png" alt="Key Pair" />
                    </div>

                    {/* Step 2 */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <ZoomableImage src="/docs/create_s3_bucket_for_tfstate.png" alt="S3 Bucket" className="order-2 lg:order-1" />
                        <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left min-w-0">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xl shrink-0">2</div>
                                <h3 className="text-2xl font-bold">Remote Backend Storage</h3>
                            </div>
                            <p className="text-gray-400 mb-6">We create an AWS S3 bucket to store the sensitive <code>terraform.tfstate</code> file remotely.</p>
                            <div className="w-full text-left min-w-0 max-w-full">
                                <CodeBlock code={`aws s3api create-bucket \\
  --bucket my-terraform-state-himan-001 \\
  --region us-west-2 \\
  --create-bucket-configuration LocationConstraint=us-west-2`} />
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-0">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-xl shrink-0">3</div>
                                <h3 className="text-2xl font-bold">State Locking</h3>
                            </div>
                            <p className="text-gray-400 mb-6">DynamoDB is used to lock the state file, preventing multiple pipelines from modifying infrastructure simultaneously.</p>
                            <div className="w-full text-left min-w-0 max-w-full">
                                <CodeBlock code={`aws dynamodb create-table \\
  --table-name terraform-lock-table \\
  --attribute-definitions AttributeName=LockID,AttributeType=S \\
  --key-schema AttributeName=LockID,KeyType=HASH \\
  --billing-mode PAY_PER_REQUEST \\
  --region us-west-2`} />
                            </div>
                        </div>
                        <ZoomableImage src="/docs/dynamodb_locking_table.png" alt="DynamoDB" />
                    </div>

                </div>
            </Section>

            {/* Automated Pipelines */}
            <Section title="CI/CD Pipelines" id="cicd">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 min-w-0">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><SiTerraform /> Terraform Workflow</h3>
                        <p className="text-sm text-gray-400 mb-4">Automatically provisions or updates infrastructure on every commit to `main`.</p>
                        <ZoomableImage src="/docs/github_workflow_terraform_infra_success.png" alt="Terraform Pipeline" />
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 min-w-0">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><SiAnsible /> Deployment Workflow</h3>
                        <p className="text-sm text-gray-400 mb-4">Configures servers, pulls Docker images, and deploys containers using Ansatz playbook.</p>
                        <ZoomableImage src="/docs/github_workflow_deploy_images_via_ansible_and_configure_services_and_monitoring_success.png" alt="Deploy Pipeline" />
                    </div>
                </div>

                <div className="bg-[#0d0d0d] border border-white/10 rounded-lg p-6 min-w-0 max-w-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-mono text-green-400 flex items-center gap-2"><FiActivity /> Build Processor</h3>
                        <span className="text-xs text-gray-500">Github Actions Runner</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Builds Docker images for Frontend & Backend</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Pushes artifacts to GitHub Container Registry (GHCR)</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Updates `latest` tag for immediate deployment</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <ZoomableImage src="/docs/github_workflow_build_and_push_images_success.png" alt="Build Pipeline" />
                    </div>
                </div>
            </Section>

            {/* Monitoring */}
            <Section title="Observability" id="monitoring">
                <div className="space-y-24">
                    {/* Wrapper for alternate layouts */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <SiPrometheus size={48} className="text-orange-600" />
                            <h3 className="text-3xl font-bold">System Metrics</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Node Exporter runs on every instance, scraping vital kernel-level metrics. We visualize CPU saturation, memory leaks, and disk I/O bottlenecks.
                            </p>
                            <div className="flex gap-2 text-sm text-orange-400 bg-orange-500/10 px-4 py-2 rounded-lg w-fit">
                                <FiActivity /> Real-time Alerting Enabled
                            </div>
                        </div>
                        <ZoomableImage src="/docs/grafana_node_exporter_dashboard.png" alt="Node Exporter" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <ZoomableImage src="/docs/grafana_docker_containers_dashboard.png" alt="Docker Stats" className="order-2 lg:order-1" />
                        <div className="space-y-6 order-1 lg:order-2">
                            <SiDocker size={48} className="text-blue-500" />
                            <h3 className="text-3xl font-bold">Container Insights</h3>
                            <p className="text-gray-400 leading-relaxed">
                                With cAdvisor, we get granular visibility into every container's footprint. We can instantly identify which microservice is consuming excessive resources.
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <SiGrafana size={48} className="text-[#F46800]" />
                                <span className="text-2xl text-gray-500">+</span>
                                <span className="text-2xl font-bold text-white">Loki</span>
                            </div>
                            <h3 className="text-3xl font-bold">Centralized Logging</h3>
                            <p className="text-gray-400 leading-relaxed">
                                No more SSH-ing into servers to `tail -f`. Promtail ships logs to Loki, allowing us to query logs across the entire fleet seamlessly.
                            </p>
                        </div>
                        <ZoomableImage src="/docs/grafana_loki_logs_dashboard.png" alt="Loki Logs" />
                    </div>
                </div>
            </Section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 text-center text-gray-500">
                <div className="flex justify-center gap-6 mb-8 text-2xl">
                    <SiGithubactions className="hover:text-white transition-colors cursor-pointer" />
                    <SiTerraform className="hover:text-purple-400 transition-colors cursor-pointer" />
                    <SiDocker className="hover:text-blue-400 transition-colors cursor-pointer" />
                </div>
                <p>© 2025 HimanM. Enterprise DevOps Automation.</p>
            </footer>
        </main>
    );
}
