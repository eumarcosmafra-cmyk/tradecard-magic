import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { ArrowLeft } from "lucide-react";
import { blogPostJsonLd, breadcrumbSchema, organizationSchema, injectJsonLd } from "@/lib/jsonld";

interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

const posts: Record<string, BlogPostData> = {
  "historia-dos-albuns-de-figurinhas-da-copa-do-mundo": {
    slug: "historia-dos-albuns-de-figurinhas-da-copa-do-mundo",
    title: "A História dos Álbuns de Figurinhas da Copa do Mundo: De 1970 até Hoje",
    description:
      "Descubra como os álbuns Panini se tornaram uma tradição mundial, acompanhando cada edição da Copa do Mundo FIFA.",
    date: "2025-03-01",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80",
    content: `
## O Início de uma Tradição Global

A história dos álbuns de figurinhas da Copa do Mundo começa em **1970**, quando a editora italiana **Panini** lançou seu primeiro álbum oficial para a Copa do México. Desde então, colecionar figurinhas se tornou um ritual que une gerações de apaixonados por futebol ao redor do mundo.

## A Era de Ouro: Décadas de 1980 e 1990

As Copas de **1986 (México)** e **1990 (Itália)** marcaram a consolidação dos álbuns Panini como objetos de desejo. As figurinhas brilhantes dos grandes craques — como Maradona, Pelé e Romário — tornaram-se itens raríssimos e extremamente valorizados entre colecionadores.

### Curiosidades dessa época:
- O álbum da Copa de 1990 vendeu mais de **1 bilhão de figurinhas** apenas na Itália
- Figurinhas do Maradona na Copa de 86 hoje valem centenas de reais
- A cultura de troca nas escolas e bancas de jornal se popularizou no Brasil

## A Revolução Digital: Copa de 2014 e 2018

Com a Copa no Brasil em **2014**, a Panini inovou com figurinhas que podiam ser escaneadas por aplicativos, criando uma experiência digital complementar. Em 2018, na Rússia, o álbum bateu recordes de vendas com mais de **12 bilhões de figurinhas** produzidas globalmente.

## Copa 2022: O Fenômeno do Qatar

O álbum da **Copa do Qatar 2022** tornou-se um verdadeiro fenômeno cultural. Com a inclusão de figurinhas especiais como as **Legends**, **Extra Stickers** e versões **bordô** exclusivas, o álbum atraiu tanto colecionadores veteranos quanto novos entusiastas.

### Números impressionantes:
- Mais de **100 milhões de álbuns** vendidos mundialmente
- Figurinhas especiais do Messi e Cristiano Ronaldo atingiram valores superiores a R$ 5.000
- O álbum contou com **670 figurinhas** na versão completa

## O Futuro: Copa 2026

Com a **Copa do Mundo 2026** se aproximando — que será realizada nos Estados Unidos, México e Canadá — a expectativa é de que a Panini lance o álbum mais ambicioso de todos os tempos. Rumores indicam figurinhas com **realidade aumentada**, edições **NFT** e tiragens especiais comemorativas.

## Por Que Colecionar?

Álbuns de figurinhas da Copa do Mundo não são apenas um hobby — são **patrimônio cultural**. Cada edição registra um momento único do futebol mundial, preservando a memória de jogadores lendários e momentos históricos. Além do valor sentimental, álbuns completos e figurinhas raras podem se tornar **investimentos valiosos** ao longo do tempo.

---

*Na Bella Figurinha, somos distribuidores oficiais Panini e oferecemos os melhores produtos para completar sua coleção. Visite nossas lojas ou confira nosso catálogo online!*
    `,
  },
  "como-completar-album-figurinhas-dicas": {
    slug: "como-completar-album-figurinhas-dicas",
    title: "Como Completar Seu Álbum de Figurinhas: 10 Dicas Infalíveis para Colecionadores",
    description:
      "Guia definitivo com estratégias testadas para completar seu álbum de figurinhas mais rápido e economizar dinheiro.",
    date: "2025-02-15",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
    content: `
## A Arte de Completar um Álbum

Completar um álbum de figurinhas é uma jornada emocionante, mas pode ser desafiadora. Com as estratégias certas, você pode economizar tempo e dinheiro enquanto se diverte. Confira nossas **10 dicas infalíveis**!

## 1. Compre em Caixas Fechadas

Comprar **caixas fechadas (boxes)** é significativamente mais econômico do que comprar pacotes individuais. Além do melhor custo-benefício, caixas fechadas geralmente garantem uma **menor taxa de repetição** nas primeiras centenas de figurinhas.

## 2. Organize Suas Repetidas Desde o Início

Crie um sistema de organização para suas figurinhas repetidas. Use **envelopes numerados** ou uma planilha para controlar quais figurinhas você tem e quais precisa. Isso facilitará enormemente as trocas.

## 3. Participe de Grupos de Troca

Existem diversos **grupos no WhatsApp, Facebook e Telegram** dedicados à troca de figurinhas. Participar ativamente desses grupos é uma das formas mais eficientes de completar o álbum sem gastar mais dinheiro.

### Dicas para trocas eficientes:
- Mantenha sua lista de repetidas sempre atualizada
- Seja justo nas trocas — figurinhas comuns por comuns, especiais por especiais
- Priorize trocas presenciais para evitar problemas com envio

## 4. Aproveite Eventos de Troca

Muitas cidades organizam **eventos de troca** em shoppings, escolas e praças. Esses encontros são excelentes oportunidades para trocar dezenas de figurinhas de uma só vez.

## 5. Compre as Últimas Figurinhas no Momento Certo

Evite comprar as figurinhas faltantes logo no início. Espere até ter **90% do álbum completo** e depois compre as restantes individualmente ou através de serviços especializados.

## 6. Use Aplicativos de Controle

Existem **aplicativos gratuitos** que ajudam a gerenciar sua coleção. Eles permitem marcar as figurinhas que você já tem, gerar listas de faltantes e até encontrar pessoas para troca.

## 7. Compre de Distribuidores Oficiais

Sempre compre de **distribuidores autorizados Panini** para garantir a autenticidade e qualidade das figurinhas. Produtos falsificados não aderem corretamente ao álbum e podem ter impressão de baixa qualidade.

## 8. Cuide do Seu Álbum

Armazene seu álbum em local **seco e fresco**, longe da luz solar direta. Use as mãos limpas ao manuseá-lo e cole as figurinhas com cuidado para evitar bolhas e desalinhamento.

## 9. Estabeleça um Orçamento

Defina um **orçamento mensal** para a compra de figurinhas. Isso evita gastos excessivos e torna a experiência mais sustentável e prazerosa.

## 10. Divirta-se no Processo

A parte mais importante: **aproveite a jornada**! Colecionar figurinhas é sobre diversão, nostalgia e conexão com outros colecionadores. Não transforme em uma obrigação — curta cada figurinha colada.

---

*Precisa de figurinhas para completar seu álbum? A Bella Figurinha oferece pacotes, caixas e figurinhas avulsas com os melhores preços. Confira nosso catálogo!*
    `,
  },
  "cards-colecionaveis-investimento-hobby": {
    slug: "cards-colecionaveis-investimento-hobby",
    title: "Cards Colecionáveis: Como um Hobby Pode se Tornar um Investimento Valioso",
    description:
      "Entenda o mercado de cards colecionáveis e por que colecionadores estão tratando figurinhas raras como verdadeiros ativos financeiros.",
    date: "2025-01-28",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    content: `
## O Mercado Bilionário dos Cards Colecionáveis

O mercado global de **cards e figurinhas colecionáveis** movimenta bilhões de dólares anualmente. O que começou como um simples hobby infantil se transformou em um mercado sofisticado, com leilões milionários, empresas de certificação e investidores profissionais.

## Por Que Cards Colecionáveis Valorizam?

Existem diversos fatores que influenciam a valorização de um card:

### Raridade
Cards com **tiragens limitadas** ou erros de impressão tendem a se valorizar exponencialmente. Quanto menor a quantidade disponível no mercado, maior o preço.

### Condição
A condição do card é fundamental. Cards classificados como **PSA 10 (Gem Mint)** — a nota máxima de conservação — podem valer **10 a 100 vezes mais** que o mesmo card em condição inferior.

### Relevância do Atleta
Cards de jogadores que se tornam **lendas do esporte** valorizam significativamente. Um card rookie (primeiro card) de um jogador que se torna MVP ou campeão mundial pode multiplicar seu valor por centenas de vezes.

## Casos de Valorização Impressionantes

### Figurinhas da Copa do Mundo
- Figurinha do **Pelé** no álbum de 1970: avaliada em mais de **US$ 10.000**
- Sticker especial do **Messi** na Copa 2022: vendido por mais de **R$ 8.000**
- Álbum completo da Copa de 1970 em bom estado: avaliado em mais de **US$ 3.000**

### Cards de Futebol
- Cards **Topps Chrome** de jovens promessas como Mbappé e Haaland tiveram valorização superior a **500%** em poucos anos
- Cards **autografados e numerados** de edições limitadas são os mais procurados

## Como Começar a Investir em Cards

### 1. Estude o Mercado
Antes de investir, dedique tempo para entender as **dinâmicas de mercado**. Acompanhe sites especializados, fóruns de colecionadores e resultados de leilões.

### 2. Foque em Qualidade
É melhor ter **poucos cards de alta qualidade** do que muitos cards medianos. Priorize cards em excelente condição e de jogadores com potencial de crescimento.

### 3. Diversifique
Não coloque todo seu investimento em um único jogador ou tipo de card. **Diversifique entre esportes, ligas e tipos de cards** para reduzir riscos.

### 4. Proteja Seus Cards
Utilize **toploaders, sleeves e cases apropriados** para proteger seus cards. A conservação é crucial para manter o valor ao longo do tempo.

### 5. Considere a Certificação
Para cards de alto valor, considere enviá-los para empresas de **certificação profissional** como PSA ou BGS. A certificação autentica o card e atribui uma nota de condição reconhecida mundialmente.

## O Futuro do Mercado

O mercado de cards colecionáveis continua em expansão. Com a **Copa do Mundo 2026** se aproximando, espera-se um novo boom de interesse em figurinhas e cards de futebol. Além disso, a integração com tecnologias como **blockchain** e **NFTs** está criando novas possibilidades para colecionadores digitais.

## Hobby e Investimento Podem Caminhar Juntos

A melhor abordagem é combinar **paixão com estratégia**. Colecione o que você ama, mas faça isso com inteligência. Cards colecionáveis oferecem uma oportunidade única de unir diversão e potencial de retorno financeiro.

---

*Na Bella Figurinha, oferecemos cards e figurinhas colecionáveis oficiais Panini. Visite nossas lojas e comece ou expanda sua coleção com produtos autênticos e de qualidade!*
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? posts[slug] : null;

  useEffect(() => {
    if (!post) return;
    const cleanup1 = injectJsonLd("blogpost", blogPostJsonLd({
      title: post.title,
      description: post.description,
      image: post.image,
      datePublished: post.date,
      slug: post.slug,
    }));
    const cleanup2 = injectJsonLd("breadcrumb-blog", breadcrumbSchema([
      { name: "Início", url: "https://bellafigurinha.com.br/" },
      { name: "Blog", url: "https://bellafigurinha.com.br/blog" },
      { name: post.title, url: `https://bellafigurinha.com.br/blog/${post.slug}` },
    ]));
    const cleanup3 = injectJsonLd("org-blogpost", { "@context": "https://schema.org", ...organizationSchema });
    return () => { cleanup1(); cleanup2(); cleanup3(); };
  }, [post]);

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl text-foreground mb-4">Post não encontrado</h1>
            <Link to="/blog" className="text-secondary hover:underline font-body">
              ← Voltar ao Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | Blog Bella Figurinha`}
        description={post.description}
        canonical={`https://bellafigurinha.com.br/blog/${post.slug}`}
        ogImage={post.image}
      />
      <Header />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors font-body text-sm mb-8"
          >
            <ArrowLeft size={16} />
            Voltar ao Blog
          </Link>

          <header className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl tracking-wide uppercase text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
              <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
              <span>•</span>
              <span>{post.readTime} de leitura</span>
            </div>
          </header>

          <div className="aspect-video rounded-xl overflow-hidden mb-10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="prose prose-lg max-w-none font-body
              prose-headings:font-display prose-headings:tracking-wide prose-headings:uppercase prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-strong:text-foreground
              prose-li:text-muted-foreground
              prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
              prose-hr:border-border
            "
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
                .replace(/^- (.+)$/gm, '<li>$1</li>')
                .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
                .replace(/^---$/gm, '<hr />')
                .replace(/\n\n/g, '</p><p>')
                .replace(/^(?!<[hulo])/gm, '<p>')
                .replace(/(?<![>])$/gm, '</p>')
                .replace(/<p><\/p>/g, '')
                .replace(/<p>(<[hulo])/g, '$1')
                .replace(/(<\/[hulo][^>]*>)<\/p>/g, '$1')
            }}
          />
        </article>
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;
