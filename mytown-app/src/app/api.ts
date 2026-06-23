// api.ts — central place for the backend base URL and a small fetch helper.
//
// IMPORTANT (XAMPP setup):
// This points at the PHP API folder you copy into XAMPP's htdocs.
// If you place the "api" folder at:  C:/xampp/htdocs/mytown-api/api
// then API_BASE_URL should be:       http://localhost/mytown-api/api
//
// See README-XAMPP-SETUP.md for the full setup walkthrough.
export const API_BASE_URL = "http://localhost/mytown-api/api";

export async function apiPost<T = any>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function apiGet<T = any>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  const res = await fetch(`${API_BASE_URL}/${endpoint}${query}`);
  return res.json();
}
