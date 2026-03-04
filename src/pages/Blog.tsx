import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    slug: "historia-dos-albuns-de-figurinhas-da-copa-do-mundo",
    title: "A História dos Álbuns de Figurinhas da Copa do Mundo: De 1970 até Hoje",
    excerpt:
      "Descubra como os álbuns Panini se tornaram uma tradição mundial, acompanhando cada edição da Copa do Mundo FIFA desde a primeira publicação até os dias atuais.",
    date: "2025-03-01",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80",
    category: "História",
  },
  {
    slug: "como-completar-album-figurinhas-dicas",
    title: "Como Completar Seu Álbum de Figurinhas: 10 Dicas Infalíveis para Colecionadores",
    excerpt:
      "Guia definitivo com estratégias testadas para completar seu álbum de figurinhas mais rápido, economizar dinheiro e trocar figurinhas repetidas de forma inteligente.",
    date: "2025-02-15",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
    category: "Dicas",
  },
  {
    slug: "cards-colecionaveis-investimento-hobby",
    title: "Cards Colecionáveis: Como um Hobby Pode se Tornar um Investimento Valioso",
    excerpt:
      "Entenda o mercado de cards colecionáveis, quais são os mais valorizados e por que colecionadores estão tratando figurinhas raras como verdadeiros ativos financeiros.",
    date: "2025-01-28",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    category: "Mercado",
  },
];

const Blog = () => {
  return (
    <>
      <SEOHead
        title="Blog Bella Figurinha | Notícias sobre Figurinhas, Copa e Cards"
        description="Fique por dentro do universo dos álbuns de figurinhas, cards colecionáveis, Copa do Mundo e muito mais. Dicas, novidades e curiosidades para colecionadores."
        canonical="https://bellafigurinha.com.br/blog"
      />
      <Header />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-foreground mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
              Novidades, dicas e curiosidades sobre o mundo dos álbuns de figurinhas e cards colecionáveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-display uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="font-display text-lg tracking-wide uppercase text-foreground mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString("pt-BR")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-secondary group-hover:gap-2 transition-all">
                      Ler <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
