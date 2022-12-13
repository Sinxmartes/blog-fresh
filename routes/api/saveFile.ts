import { HandlerContext } from "$fresh/server.ts";

export const handler = async (_req: Request): Promise<Response> => {
  const data = new Date().toISOString();
  const body = JSON.parse(await _req.text());
  await Deno.writeTextFile(`./posts/${data}.md`, `---
title: ${body.title}
published_at: ${data}
snippet: ${body.snippet}
---
${body.text}`);
  return new Response();
};