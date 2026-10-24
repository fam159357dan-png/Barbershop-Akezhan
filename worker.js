// Пробная админка: контент сайта (window.SITE) хранится в Cloudflare KV.
// Пароль задаётся секретом: npx wrangler secret put ADMIN_PASSWORD (логин всегда "admin").

const authorized = (request, env) =>
  !!env.ADMIN_PASSWORD && request.headers.get("Authorization") === "Basic " + btoa("admin:" + env.ADMIN_PASSWORD);

const challenge = () =>
  new Response("Нужен пароль", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="admin", charset="UTF-8"' } });

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    // Публичный контент: если в KV есть правки — отдаём их вместо файла data.js.
    if (pathname === "/data.js") {
      const saved = await env.SITE_KV.get("site");
      if (!saved) return env.ASSETS.fetch(request);
      return new Response(`window.SITE = ${saved};\n`, {
        headers: { "Content-Type": "text/javascript; charset=utf-8", "Cache-Control": "no-cache" },
      });
    }

    if (!pathname.startsWith("/api/") && pathname !== "/admin") return env.ASSETS.fetch(request);
    if (!authorized(request, env)) return challenge();

    if (pathname === "/api/site" && request.method === "PUT") {
      const body = await request.text();
      try {
        const s = JSON.parse(body);
        if (!Array.isArray(s.services) || !s.phone || !s.hours) throw 0; // иначе сайт сломается
      } catch {
        return new Response("Неверные данные", { status: 400 });
      }
      await env.SITE_KV.put("site", body);
      return Response.json({ ok: true });
    }

    return env.ASSETS.fetch(request); // /admin -> admin.html
  },
};
