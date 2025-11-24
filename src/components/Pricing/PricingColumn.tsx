'use client';

import clsx from "clsx";
import { GiCroissant } from "react-icons/gi";

import { IPricing } from "@/types";

interface Props {
    tier: IPricing;
    highlight?: boolean;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight }: Props) => {
    const { name, price, features } = tier;

    return (
        <div className={clsx("w-full max-w-sm mx-auto bg-white rounded-xl border lg:max-w-full transition-all relative", { 
            "shadow-2xl border-secondary scale-105": highlight,
            "border-gray-200": !highlight
        })}>
            {highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
            )}
            <div className={clsx("p-6 border-b rounded-t-xl", { "border-secondary": highlight, "border-gray-200": !highlight })}>
                <h3 className="text-2xl font-semibold mb-4">{name}</h3>
                <p className="text-3xl md:text-5xl font-bold mb-6">
                    <span className={clsx({ "text-secondary": highlight })}>
                        {typeof price === 'number' ? (price === 0 ? 'Free' : `$${price}`) : price}
                    </span>
                    {typeof price === 'number' && price !== 0 && <span className="text-lg font-normal text-gray-600">/mo</span>}
                </p>
                <button className={clsx("w-full py-3 px-4 rounded-full transition-colors", { "bg-secondary hover:opacity-90 text-white": highlight, "bg-hero-background hover:bg-gray-200": !highlight })}>
                    Get Started
                </button>
            </div>
            <div className="p-6 mt-1">
                <p className="font-bold mb-0">FEATURES</p>
                <p className="text-foreground-accent mb-5">Everything in basic, plus...</p>
                <ul className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <GiCroissant
                                className="h-5 w-5 text-primary mr-2"
                                style={{ transform: "rotate(120deg)" }}
                            />
                            <span className="text-foreground-accent">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PricingColumn