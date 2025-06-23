import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import "./Blog.css";
import layeredWavesHero from "../../Assets/wallpapers/layered-waves-haikei-hero.svg";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  excerpt: string;
  image?: string;
}

export const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/mert.xml");
        const xmlText = await response.text();
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        const parserError = xmlDoc.querySelector("parsererror");
        if (parserError) {
          throw new Error("XML ayrıştırma hatası");
        }

        const items = xmlDoc.getElementsByTagName("item");
        const parsedPosts: BlogPost[] = Array.from(items).map((item) => {
          const title = item.getElementsByTagName("title")[0]?.textContent || "";
          const link = item.getElementsByTagName("link")[0]?.textContent || "";
          const pubDate = item.getElementsByTagName("pubDate")[0]?.textContent || "";
          const description = item.getElementsByTagName("description")[0]?.textContent || "";
          const content = item.getElementsByTagName("content:encoded")[0]?.textContent || "";

          // İçerikten ilk resmi çıkar (önce content:encoded, yoksa description)
          let image;
          const imgMatch = content.match(/<img[^>]+src=["']([^"'>]+)["']/);
          if (imgMatch) {
            image = imgMatch[1];
          } else {
            const descImgMatch = description.match(/<img[^>]+src=["']([^"'>]+)["']/);
            image = descImgMatch ? descImgMatch[1] : undefined;
          }

          // Temiz metin (önce content:encoded, yoksa description)
          const rawText = content
            ? content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
            : description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

          return {
            title: title.replace(/<[^>]*>/g, ""),
            link,
            pubDate: new Date(pubDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            description: rawText.substring(0, 150) + (rawText.length > 150 ? "..." : ""),
            excerpt: rawText.substring(0, 40) + (rawText.length > 40 ? "..." : ""),
            image
          };
        });

        setPosts(parsedPosts);
        setLoading(false);
      } catch (err) {
        setError("Blog yazıları yüklenirken bir hata oluştu: " + (err instanceof Error ? err.message : String(err)));
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-[#23234a] via-[#18181b] to-[#23234a] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              y: [0, Math.random() * window.innerHeight],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center mb-10 tracking-wide"
        >
          My Blog Posts
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
        >
          Here you can find my blog posts where I share my experiences and thoughts in the software world.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-20">
              <div className="text-red-500 text-xl max-w-2xl mx-auto p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                {error}
              </div>
            </div>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-[#23234a]/80 rounded-2xl overflow-hidden shadow-2xl border border-[#5A5EE6]/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300"
              >
                {post.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <FaCalendarAlt className="text-blue-400" />
                    <span>{post.pubDate}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-6 line-clamp-3 relative">
                    {post.description}
                    <span className="absolute bottom-0 right-0 bg-gradient-to-l from-[#23234a]/80 to-transparent w-12 h-full"></span>
                  </p>
                  <div className="mt-2">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group font-medium"
                    >
                      <span>Read More</span>
                      <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div className='border-t border-white/10 w-full my-0' />
      <img
        src={layeredWavesHero}
        alt="blog waves background"
        className="absolute bottom-8 left-0 w-full pointer-events-none select-none z-0 opacity-20"
        style={{ objectFit: 'cover', filter: 'blur(8px)', mixBlendMode: 'lighten' }}
      />
    </section>
  );
}; 