import { BRAND_ROWS, type Brand } from "@/lib/brands";

function MarqueeRow({ brands, reverse }: { brands: Brand[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul
        className={`animate-marquee ${reverse ? "animate-marquee-reverse" : ""} py-2`}
        style={{ "--marquee-duration": "70s" } as React.CSSProperties}
      >
        {/* Rendered twice so the loop is seamless; the copy is hidden from screen readers */}
        {[0, 1].map((copy) =>
          brands.map((brand) => (
            <li key={`${copy}-${brand.slug}`} className="shrink-0 px-2 sm:px-3" aria-hidden={copy === 1 || undefined}>
              <img
                src={`/brands/${brand.slug}.webp`}
                alt={copy === 0 ? brand.name : ""}
                width={400}
                height={155}
                // Not lazy: logos clipped by the overflow container would only load as they slide in and pop
                fetchPriority="low"
                decoding="async"
                draggable={false}
                className="h-12 sm:h-14 md:h-16 w-auto select-none"
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <MarqueeRow brands={BRAND_ROWS[0]} />
      <MarqueeRow brands={BRAND_ROWS[1]} reverse />
    </div>
  );
}
