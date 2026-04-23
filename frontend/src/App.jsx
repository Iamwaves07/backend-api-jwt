import { useEffect, useState } from "react";
import { login, getMe } from "./api/client";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const data = await getMe(token);
        setUser(data.user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
      }
    }

    loadSession();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);

      const me = await getMe(data.token);
      setUser(me.user);

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  if (user) {
    return (
      <div className="page">
        <div className="card">
          <h1>Bienvenida 👋</h1>
          <p className="subtitle">Has iniciado sesión correctamente.</p>

          <div className="user-box">
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>

          <button className="btn logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Login</h1>
        <p className="subtitle">Ingresa con tu cuenta para continuar</p>

        <form onSubmit={handleLogin} className="form">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="admin@local.cl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;