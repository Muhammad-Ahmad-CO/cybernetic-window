import { createFileRoute } from "@tanstack/react-router";
import CyberHero from "@/components/CyberHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Augment — A Window of Coming Enhancements" },
      {
        name: "description",
        content:
          "A cyberpunk gateway to your augmented self: carbon fiber, titanium, and human instinct aligned. Reserve your enhancement now.",
      },
      { property: "og:title", content: "Augment — A Window of Coming Enhancements" },
      {
        property: "og:description",
        content:
          "A cyberpunk gateway to your augmented self: carbon fiber, titanium, and human instinct aligned.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CyberHero,
});
