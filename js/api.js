// ---- API CONNECTOR ----

const API_URL = "http://localhost:5000/api/sessions";
const USE_API = true;

async function logSession(sessionData) {
  console.log("Session data ready to send:", sessionData);

  if (!USE_API) {
    const local = JSON.parse(localStorage.getItem("sessions") || "[]");
    local.push(sessionData);
    localStorage.setItem("sessions", JSON.stringify(local));
    return { ok: true, mode: "local-fallback" };
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sessionData)
    });

    if (!res.ok) {
      throw new Error(`Server responded ${res.status}`);
    }

    const result = await res.json();

    console.log("Session saved to backend:", result);

    return {
      ok: true,
      mode: "api",
      data: result
    };

  } catch (err) {
    console.error("Failed to send session to server:", err);

    return {
      ok: false,
      error: err.message
    };
  }
}