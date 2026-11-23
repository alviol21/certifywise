import { T, TT, LangSwitch } from "./i18n";
import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AuthPage() {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setInfo(""); setLoading(true);
    try {
      if (mode === "signup") {
        if (!fullName.trim()) { setError(T("Введите имя и фамилию.")); setLoading(false); return; }
        const { error: err } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { full_name: fullName.trim() } },
        });
        if (err) throw err;
        setInfo(T("Регистрация прошла. Если включено подтверждение email — проверьте почту, затем войдите."));
        setMode("signin");
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (err) throw err;
      }
    } catch (err) {
      setError(err.message === "Invalid login credentials" ? T("Неверный email или пароль.") : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrap" style={{ maxWidth: 420, paddingTop: 60 }}>
      <div className="hdr" style={{ justifyContent: "space-between", border: "none" }}>
        <div className="logo">Certify<span>Wise</span></div>
        <LangSwitch />
      </div>
      <div className="card">
        <h3 style={{ marginBottom: 4 }}>{mode === "signup" ? T("Регистрация") : T("Вход")}</h3>
        <p style={{ fontSize: 13, color: "#8a7d6d", marginBottom: 18 }}>
          {mode === "signup" ? T("Создайте аккаунт, чтобы сохранять прогресс") : T("Войдите, чтобы продолжить с того же места")}
        </p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {mode === "signup" && (
            <input type="text" placeholder={T("Имя и фамилия")} value={fullName} onChange={e => setFullName(e.target.value)} required />
          )}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder={T("Пароль (мин. 6 символов)")} value={password} onChange={e => setPassword(e.target.value)} minLength={6} required />
          {error && <div style={{ color: "#e74c3c", fontSize: 13 }}>{error}</div>}
          {info && <div style={{ color: "#4caf88", fontSize: 13 }}>{info}</div>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? T("Подождите...") : mode === "signup" ? T("Зарегистрироваться") : T("Войти")}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#8a7d6d" }}>
          {mode === "signup" ? (
            <>{T("Уже есть аккаунт?")}{" "}<a href="#" onClick={e => { e.preventDefault(); setMode("signin"); setError(""); setInfo(""); }} style={{ color: "#c59b44" }}>{T("Войти")}</a></>
          ) : (
            <>{T("Нет аккаунта?")}{" "}<a href="#" onClick={e => { e.preventDefault(); setMode("signup"); setError(""); setInfo(""); }} style={{ color: "#c59b44" }}>{T("Зарегистрироваться")}</a></>
          )}
        </div>
      </div>
    </div>
  );
}
