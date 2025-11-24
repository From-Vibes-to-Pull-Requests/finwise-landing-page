import { FiActivity, FiBarChart2, FiBriefcase, FiCpu, FiDollarSign, FiLock, FiPieChart, FiRefreshCw, FiShield, FiTarget, FiTrendingUp, FiUser } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Smart Budgeting",
        description: "Take the guesswork out of managing your money. Our AI-powered budgeting tool adapts to your lifestyle and helps you stay on track.",
        bullets: [
            {
                title: "Intelligent Categorization",
                description: "Automatically sorts your transactions for crystal-clear insights.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Customizable Goals",
                description: "Set and track financial objectives that matter to you.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Predictive Analysis",
                description: "Get ahead of your finances with spending forecasts and alerts.",
                icon: <FiTrendingUp size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.webp"
    },
    {
        title: "Seamless Investing",
        description: "Start building wealth today, no financial degree required. Finwise makes investing accessible and straightforward.",
        bullets: [
            {
                title: "Micro-Investing",
                description: "Begin with as little as $1 and watch your money grow.",
                icon: <FiDollarSign size={26} />
            },
            {
                title: "Expert Portfolios",
                description: "Choose from investment strategies tailored to your risk tolerance.",
                icon: <FiBriefcase size={26} />
            },
            {
                title: "Real-Time Performance",
                description: "Track your investments with easy-to-understand metrics and visuals.",
                icon: <FiPieChart size={26} />
            }
        ],
        imageSrc: "/images/mockup-2.webp"
    },
    {
        title: "Bank-Grade Security",
        description: "Your financial data deserves the best protection. Rest easy knowing Finwise employs cutting-edge security measures.",
        bullets: [
            {
                title: "Military-Grade Encryption",
                description: "Your information is safeguarded with the highest level of encryption.",
                icon: <FiLock size={26} />
            },
            {
                title: "Biometric Authentication",
                description: "Access your account securely with fingerprint or facial recognition.",
                icon: <FiUser size={26} />
            },
            {
                title: "Real-Time Fraud Detection",
                description: "Our system constantly monitors for suspicious activity to keep your money safe.",
                icon: <FiShield size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.webp"
    },
    {
        title: "Crypto Command Center",
        description: "Stay ahead of the market with live pricing, wallet health insights, and instant trade readiness—all inside a clean mobile dashboard.",
        bullets: [
            {
                title: "Live Market Pulse",
                description: "Track Bitcoin, Ethereum, and trending altcoins with streaming price action.",
                icon: <FiActivity size={26} />
            },
            {
                title: "Wallet Intelligence",
                description: "See allocations, gas fees, and staking rewards in a single secure view.",
                icon: <FiCpu size={26} />
            },
            {
                title: "One-Tap Conversions",
                description: "Swap assets across networks with automated compliance guardrails.",
                icon: <FiRefreshCw size={26} />
            }
        ],
        imageSrc: "/images/mockup-crypto.svg"
    },
]