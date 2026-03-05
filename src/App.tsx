import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Quiosques from "./pages/Quiosques";
import QuemSomos from "./pages/QuemSomos";
import Contato from "./pages/Contato";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosDeUso from "./pages/TermosDeUso";
import FAQ from "./pages/FAQ";
import PoliticaTrocas from "./pages/PoliticaTrocas";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Collection from "./pages/Collection";
import Collections from "./pages/Collections";
import GuiaAdrenalynXL from "./pages/GuiaAdrenalynXL";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/produto/:handle" element={<ProductDetail />} />
      <Route path="/lojas" element={<Quiosques />} />
      <Route path="/quem-somos" element={<QuemSomos />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
      <Route path="/termos-de-uso" element={<TermosDeUso />} />
      <Route path="/perguntas-frequentes" element={<FAQ />} />
      <Route path="/politica-de-trocas-e-devolucoes" element={<PoliticaTrocas />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/colecao" element={<Collections />} />
      <Route path="/colecao/:handle" element={<Collection />} />
      <Route path="/guia-adrenalyn-xl" element={<GuiaAdrenalynXL />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <WhatsAppButton />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
