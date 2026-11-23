"use client";

import { track } from "@/lib/analytics";
import type { SocialChannel } from "@/lib/social-config";

const LABELS: Record<SocialChannel, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  whatsapp: "WhatsApp channel",
};

export default function SocialFollowLinks({
  links,
  placement,
}: {
  links: Partial<Record<SocialChannel, string>>;
  placement: string;
}) {
  const channels = Object.keys(links) as SocialChannel[];
  if (channels.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-3 text-sm">
      {channels.map((channel) => (
        <li key={channel}>
          <a
            href={links[channel]}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            onClick={() => track("outbound_click", { channel, placement })}
            className="underline underline-offset-2"
          >
            Follow Durza on {LABELS[channel]}
          </a>
        </li>
      ))}
    </ul>
  );
}
