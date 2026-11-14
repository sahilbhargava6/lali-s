import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Insights & Industry News | Lali's Buildmart",
  description: "Explore construction guides, materials selection tips, interior inspirations, and building updates from the experts at Lali's Buildmart.",
  openGraph: {
    title: "Insights & Industry News | Lali's Buildmart",
    description: "Explore construction guides, materials selection tips, interior inspirations, and building updates from the experts at Lali's Buildmart.",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
