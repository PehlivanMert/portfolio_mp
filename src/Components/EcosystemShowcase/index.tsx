import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaCloudSun, FaRoute, FaMusic, FaExternalLinkAlt } from "react-icons/fa";
import { SiCloudflare } from "react-icons/si";

interface CompanionService {
  id: string;
  name: string;
  version?: string;
  domain: string;
  url: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  description: string;
  techTags: string[];
  protocol: string;
}

const services: CompanionService[] = [
  {
    id: "okur",
    name: "Okur",
    version: "v9.3.4",
    domain: "okur.mertpehlivan.co.uk",
    url: "https://okur.mertpehlivan.co.uk",
    badge: "7/24 Canlı",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    icon: FaBookOpen,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    description: "Kişisel kitap takip ve edebiyat ekosistemi. Jetpack Glance Android widget'ları, Cloudflare Workers AI edebi analiz ve offline PWA.",
    techTags: ["PWA", "Android", "Workers AI", "Edge"],
    protocol: "HTTP/3 • TLS 1.3"
  },
  {
    id: "weather",
    name: "Dinamik Hava Durumu",
    domain: "weather.mertpehlivan.co.uk",
    url: "https://weather.mertpehlivan.co.uk",
    badge: "7/24 Canlı",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    icon: FaCloudSun,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    description: "4 Büyük Model (ECMWF IFS, DWD ICON, NOAA GFS, CMC GEM) ağırlıklı konsensüs tahmin motoru ve anlık saatlik hava radarı.",
    techTags: ["Multi-Model", "ECMWF & ICON", "Edge Worker", "PWA"],
    protocol: "Cloudflare Edge"
  },
  {
    id: "gezi",
    name: "Orta Avrupa Canlı Seyahat Paneli",
    domain: "gezi.mertpehlivan.co.uk",
    url: "https://gezi.mertpehlivan.co.uk",
    badge: "7/24 Canlı",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    icon: FaRoute,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    description: "Viyana, Prag ve Budapeşte için 10 Altın Boyut Denetimli, OSRM yaya GPS rotaları ve doğrulanmış menü fiyatlı interaktif gezi paneli.",
    techTags: ["Leaflet GPS", "Fact-Checker", "OSRM", "Zero Drift"],
    protocol: "Custom Domain Edge"
  },
  {
    id: "clementine",
    name: "Clementine Web Remote",
    domain: "clementine.mertpehlivan.co.uk",
    url: "https://clementine.mertpehlivan.co.uk",
    badge: "Hibrit Tünel",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/40",
    icon: FaMusic,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    description: "Linux Clementine müzik çalar için Cloudflare Argo Tüneli, gerçek zamanlı WebSocket köprüsü ve PC kapalıyken otomatik Standby geçidi.",
    techTags: ["WebSocket", "Argo Tunnel", "Standby UI", "Hi-Res"],
    protocol: "Zero Trust Tünel"
  }
];

export const EcosystemShowcase: React.FC = () => {
  return (
    <section id="ecosystem" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
            <SiCloudflare className="text-orange-400 text-sm" />
            <span>Cloudflare Edge & Serverless Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
            Bulut & Uç Bilişim Ekosistemi
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Mert Pehlivan alan adı altında küresel edge ağında 7/24 kesintisiz çalışan canlı mikro servisler ve companion sistemler.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.a
                key={service.id}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#23234a]/80 backdrop-blur-md border border-[#5A5EE6]/30 hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1.5"
              >
                {/* Header: Icon + Status Badge */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className={`text-2xl ${service.iconColor}`} />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${service.badgeColor}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Domain */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {service.name}
                      </h3>
                      {service.version && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {service.version}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-blue-400/90 font-mono block mt-0.5">
                      {service.domain}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Footer: Tech Tags + Protocol + Action Link */}
                <div className="pt-4 border-t border-white/5 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {service.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                    <span className="text-[11px] font-mono text-gray-400">{service.protocol}</span>
                    <span className="inline-flex items-center gap-1 text-purple-400 font-medium group-hover:translate-x-1 transition-transform">
                      <span>Aç</span>
                      <FaExternalLinkAlt className="text-[10px]" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EcosystemShowcase;
