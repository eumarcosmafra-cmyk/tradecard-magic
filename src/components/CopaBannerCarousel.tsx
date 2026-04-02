import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Truck, Shield, Award } from "lucide-react";
import banner1 from "@/assets/banner-copa-1.jpeg";
import banner3 from "@/assets/banner-copa-3.jpeg";

const banners = [
  { src: banner1, alt: "Banner Panini FIFA World Cup 2026 - 7 figurinhas por envelope - Pré-venda disponível" },
  { src: banner3, alt: "Banner Panini FIFA World Cup 2026 - Tudo começa com a Panini - 7 figurinhas por envelope" },
];

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
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="pt-16 bg-[#006B3F]">
      {/* Banner carousel */}
      <div className="max-w-7xl mx-auto overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, i) => (
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
      <div className="flex justify-center gap-2 py-3">
        {banners.map((_, i) => (
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

      {/* Trust strip */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-white/80 text-sm font-body">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-yellow-300" />
              <span>Envio para todo Brasil</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-yellow-300" />
              <span>Produto 100% Original</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={18} className="text-yellow-300" />
              <span>Distribuidor Oficial Panini</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};