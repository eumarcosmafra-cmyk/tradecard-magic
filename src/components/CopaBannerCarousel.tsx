import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import banner1 from "@/assets/banner-copa-1.jpeg";
import banner2 from "@/assets/banner-copa-2.jpeg";
import banner3 from "@/assets/banner-copa-3.jpeg";
import banner4 from "@/assets/banner-copa-4.jpeg";
import banner5 from "@/assets/banner-copa-5.jpeg";

const banners = [
  { src: banner1, alt: "Banner Panini FIFA World Cup 2026 - 7 figurinhas por envelope - Pré-venda disponível" },
  { src: banner3, alt: "Banner Panini FIFA World Cup 2026 - Tudo começa com a Panini - 7 figurinhas por envelope" },
  { src: banner2, alt: "Banner Panini FIFA World Cup 2026 - Official Sticker Collection - Pré-venda disponível", portrait: true },
  { src: banner4, alt: "Banner Panini FIFA World Cup 2026 - Tudo começa com a Panini - Pré-venda disponível", portrait: true },
  { src: banner5, alt: "Banner Panini FIFA World Cup 2026 - Official Sticker Collection", portrait: true },
];

// Only wide banners for the auto-carousel
const wideBanners = banners.filter((b) => !b.portrait);

export const CopaBannerCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();

    // Auto-play
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-[#006B3F]">
      {/* Wide banners carousel */}
      <div className="max-w-7xl mx-auto overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {wideBanners.map((banner, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <img
                src={banner.src}
                alt={banner.alt}
                className="w-full h-auto block"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      {wideBanners.length > 1 && (
        <div className="flex justify-center gap-2 py-3">
          {wideBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === selectedIndex ? "bg-white scale-125" : "bg-white/40"
              }`}
              aria-label={`Ir para banner ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Portrait banners grid */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {banners
            .filter((b) => b.portrait)
            .map((banner, i) => (
              <img
                key={i}
                src={banner.src}
                alt={banner.alt}
                className="w-full h-auto rounded-lg block"
                loading="lazy"
              />
            ))}
        </div>
      </div>
    </section>
  );
};
