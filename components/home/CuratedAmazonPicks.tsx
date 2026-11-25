import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

type Pick = {
  name: string;
  badge: string;
  image: string;
  url: string;
};

const PICKS: Pick[] = [
  {
    name: "Logitech C920 HD Pro Webcam — 1080p",
    badge: "WORK FROM HOME",
    image: "public/stores/amazon-in/logitech-c920.webp",
    url: "https://link.amazon/B07JIGYtz",
  },
  {
    name: "NutriPro Juicer Mixer Grinder — 500 W, 3 Jars",
    badge: "KITCHEN",
    image: "public/stores/amazon-in/nutripro-jmg.webp",
    url: "https://link.amazon/B04HvT3G7",
  },
  {
    name: "Dr Trust Signature Series 201 Pulse Oximeter",
    badge: "HEALTH DEVICE",
    image: "public/stores/amazon-in/drtrust-oximeter.webp",
    url: "https://link.amazon/B0ceYJazW",
  },
  {
    name: "BigMuscles Premium Gold Whey [2 kg]",
    badge: "PROTEIN",
    image: "public/stores/amazon-in/bigmuscles-premium-gold-whey.webp",
    url: "https://link.amazon/B02k8S0KF",
  },
  {
    name: "Presto! Garbage Bags — Medium, 180 Count",
    badge: "HOUSEHOLD",
    image: "public/stores/amazon-in/presto-garbage-bags.webp",
    url: "https://link.amazon/B012CLFpv",
  },
  {
    name: "Green Soul Vienna Office Chair (Black & Tan)",
    badge: "HOME OFFICE",
    image: "public/stores/amazon-in/green-soul-vienna-chair.webp",
    url: "https://link.amazon/B07beeAUB",
  },
  {
    name: "Yoga Bar High Protein Oats 1 kg (Pack of 2)",
    badge: "NUTRITION",
    image: "public/stores/amazon-in/yogabar-high-protein-oats-dark-chocolate.webp",
    url: "https://link.amazon/B05uwpEeL",
  },
  {
    name: "Pigeon Instamami Cordless Noodle Maker",
    badge: "KITCHEN",
    image: "public/stores/amazon-in/pigeon-instamami-noodle-maker.webp",
    url: "https://link.amazon/B0b5B8P4l",
  },
];

export default function CuratedAmazonPicks() {
  return (
    <section className="mt-12" aria-labelledby="curated-amazon-heading">
      <SectionTitle
        hint="Amazon.in"
        action={{ href: "/stores/amazon-in", label: "See all curated picks" }}
      >
        <span id="curated-amazon-heading">Curated Amazon finds</span>
      </SectionTitle>
      <p className="mb-5 max-w-2xl text-sm leading-6 text-ink-soft">
        Hand-picked choices from our Amazon store page — practical picks across home office, kitchen, health and everyday essentials.
      </p>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {PICKS.map((item) => (
          <li key={item.url} className="min-h-0">
            <a
              href={item.url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ledger-line bg-white shadow-2xs transition-all hover:-translate-y-0.5 hover:border-accent-soft hover:shadow-md"
            >
              <span className="relative block aspect-square w-full overflow-hidden bg-paper-alt">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="flex flex-1 flex-col p-3">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-inkblue">
                  {item.badge}
                </span>
                <span className="mt-1 line-clamp-2 text-[12px] font-medium leading-5 text-ink">
                  {item.name}
                </span>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[11px] font-semibold text-inkblue transition-colors group-hover:underline">
                  View on Amazon
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link
          href="/stores/amazon-in"
          className="group inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-durza-deep transition-colors hover:text-accent"
        >
          Explore the full Amazon picks
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
      </div>
    </section>
  );
}
