import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (signInError) {
      setError("E-mail ou senha inválidos.");
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-arena text-white flex items-center justify-center px-4">
      <SEOHead title="Painel da campanha | Bella Figurinha" description="Acesso restrito ao painel da campanha." noindex />
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl bg-ink-soft/90 p-8 holo-border space-y-4">
        <h1 className="font-display text-3xl tracking-wider uppercase">Painel da campanha</h1>
        <div>
          <label htmlFor="email" className="font-body text-sm text-white/70">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl bg-ink border border-white/15 px-4 py-3 text-white outline-none focus:border-electric"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-body text-sm text-white/70">Senha</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl bg-ink border border-white/15 px-4 py-3 text-white outline-none focus:border-electric"
          />
        </div>
        {error && <p className="text-spark text-sm font-body">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-electric text-ink font-display text-lg tracking-widest uppercase py-3 rounded-xl disabled:opacity-60"
        >
          {loading && <Loader2 className="animate-spin" size={18} />} Entrar
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
