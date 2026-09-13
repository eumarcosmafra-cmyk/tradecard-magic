import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useCartSync } from "@/hooks/useCartSync";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { DropBar } from "@/components/DropBar";
import { CookieBanner } from "@/components/CookieBanner";
import { captureAttribution } from "@/lib/analytics";
import AcessoAntecipado from "./pages/AcessoAntecipado";
import LojaFisica from "./pages/LojaFisica";
import RegulamentoAcessoAntecipado from "./pages/RegulamentoAcessoAntecipado";
import Pokemon from "./pages/Pokemon";
import CardsColecionaveis from "./pages/CardsColecionaveis";
import Copag from "./pages/Copag";
import Copa2026 from "./pages/Copa2026";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
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
import Revenda from "./pages/Revenda";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  useEffect(() => {
    captureAttribution();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/produto/:handle" element={<ProductDetail />} />
      <Route path="/acesso-antecipado" element={<AcessoAntecipado />} />
      <Route path="/primeiro-drop" element={<Navigate to="/acesso-antecipado" replace />} />
      <Route path="/regulamento-acesso-antecipado" element={<RegulamentoAcessoAntecipado />} />
      <Route path="/loja-fisica" element={<LojaFisica />} />
      <Route path="/pokemon" element={<Pokemon />} />
      <Route path="/cards-e-colecionaveis" element={<CardsColecionaveis />} />
      <Route path="/copag" element={<Copag />} />
      <Route path="/copa-2026" element={<Copa2026 />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/lojas" element={<Navigate to="/loja-fisica" replace />} />
      <Route path="/quiosques" element={<Navigate to="/loja-fisica" replace />} />
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
      <Route path="/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026" element={<GuiaAdrenalynXL />} />
      <Route path="/revenda" element={<Revenda />} />
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
        <DropBar />
        <CookieBanner />
        <WhatsAppButton />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
