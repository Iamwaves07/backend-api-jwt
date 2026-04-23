const API_URL = "http://localhost:3000";

async function handleResponse(res) {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Ocurrió un error");
  }

  return data;
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(res);
}

export async function getMe(token) {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
}