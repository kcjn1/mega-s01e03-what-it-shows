import { createServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { resolve } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
const server = await createServer({
  configFile: false,
  resolve: { alias: { '#lib': resolve('src/lib') }, conditions: ['svelte'] },
  plugins: [svelte({ extensions: ['.svelte', '.svx'], emitCss: false, compilerOptions: { css: 'injected' }, preprocess: [mdsvex({ extensions: ['.svx'], layout: { runbook: resolve('src/lib/layouts/runbook.svelte') } })] })],
  server: { middlewareMode: true },
  appType: 'custom',
});
try {
  const { render } = await server.ssrLoadModule('svelte/server');
  for (const path of ['incidents/4471','triage/dedupe','decisions/0001-dedupe-by-subject','incidents/4471-review']) {
    const mod = await server.ssrLoadModule(`/src/routes/kb/${path}/+page.svx`);
    const result = render(mod.default);
    const dir = `rendered/kb/${path}`;
    await mkdir(dir, { recursive: true });
    await writeFile(`${dir}/index.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${result.head}</head><body>${result.body}</body></html>`);
    console.log(`Rendered ${path}: ${result.body.length} characters`);
  }
} finally { await server.close(); }
