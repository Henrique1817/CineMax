import React from "react";

// /c:/CineMax/src/test-results/LearnTawilind.tsx
// Guia prático de utilitários do Tailwind (resumo). É inviável listar “todos”,
// pois são centenas e variam por configuração. Abaixo, os grupos mais usados,
// com exemplos e como combiná-los.

//
// Variantes (prefixos que você combina com qualquer utilitário):
// - Responsivo: sm: md: lg: xl: 2xl:
// - Estado/Interação: hover: focus: active: disabled: visited: focus-visible: focus-within:
// - Estruturais: first: last: only: odd: even: empty:
// - Form/aria/data: checked: indeterminate: required: invalid: placeholder: file: aria-*: data-*:
// - Contexto: dark: rtl: ltr: open: group-hover: group-focus: peer-checked: peer-focus:
// - Importante: ! (ex.: !hidden), Lógico: supports-[...]:, motion-safe:, motion-reduce:
// - Combine: sm:hover:bg-blue-500, dark:md:text-white, etc.
//
// Layout/Display:
// - container, box-border, box-content
// - block, inline-block, inline, flex, inline-flex, grid, inline-grid, contents, hidden
// - visible, invisible, sr-only, not-sr-only
//
// Posicionamento:
// - static, relative, absolute, fixed, sticky
// - inset-0, top-2, right-4, bottom-0, left-1/2, inset-x-0, inset-y-0
// - z-0 z-10 z-50 z-auto
//
// Overflow/Scroll:
// - overflow-auto/hidden/visible/scroll, overflow-x-*, overflow-y-*
// - overscroll-auto/contain/none, scroll-smooth, snap-x/y/both, snap-start/center/end
//
// Tamanho (Width/Height/Min/Max):
// - Largura: w-0 w-px w-1/2 w-1/3 w-1/4 w-full w-screen w-min w-max w-fit w-auto w-[42px]
// - Altura: h-0 h-px h-1/2 h-full h-screen h-min h-max h-fit h-[420px]
// - Min: min-w-0 min-w-full min-h-0 min-h-full min-h-screen
// - Max: max-w-0 max-w-xs/sm/md/lg/xl/2xl/3xl/4xl/5xl/6xl/7xl max-w-full max-w-screen-sm/... max-w-[50ch]
//        max-h-0 max-h-60 max-h-full max-h-screen max-h-[75vh]
// sm: significa small (min-width: 640px), md: medium (min-width: 768px), lg: large (min-width: 1024px), 
// xl: extra-large (min-width: 1280px), 2xl: 2x-large (min-width: 1536px).
//
// Espaçamento:
// - Padding: p-4 px-6 py-2 pt-1 pr-3 pb-5 pl-2
// - Margin: m-4 mx-6 my-2 mt-1 mr-3 mb-5 ml-2 (negativos: -m-2, -mt-4)
// - Espaço entre filhos: space-x-4 space-y-2 (requer display flex; afeta elementos adjacentes)
// - Gap (grid/flex): gap-2 gap-x-4 gap-y-1
//
// Flexbox:
// - flex-row/col, flex-wrap/nowrap, place-content-*, place-items-*, place-self-*
// - justify-start/center/between/around/evenly, items-start/center/stretch, content-start/center
// - order-1 order-last, grow grow-0, shrink shrink-0, basis-1/2 basis-[240px]
//
// Grid:
// - grid-cols-1/2/3/12, grid-rows-*, col-span-*, row-span-*, auto-rows-*, auto-cols-*
// - grid-flow-row/col/dense, place-content-*/items-*/self-*, justify-*/items-*
// - gap-*, divide-* (divide-x divide-y para bordas internas em flex/grid)
//
// Tipografia:
// - text-xs/sm/base/lg/xl/2xl/... text-[13px]
// - font-sans/serif/mono, font-light/normal/medium/semibold/bold/black
// - leading-none/tight/snug/normal/loose, tracking-tight/normal/wide
// - text-left/center/right/justify, text-ellipsis text-clip truncate line-clamp-3
// - break-words break-normal break-all whitespace-normal/nowrap/pre-line
// - text-slate-900 text-white text-red-500/80 [todas as cores do tema]
//
// Cores e Backgrounds:
// - bg-slate-100 bg-white bg-transparent bg-black/50
// - Gradiente: bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
// - Imagem: bg-[url('/img.png')] bg-cover bg-contain bg-center bg-no-repeat
//
// Bordas/Anéis:
// - border border-0/2/4, border-x border-y border-t/r/b/l
// - border-slate-200 border-dashed border-dotted
// - rounded none/sm/md/lg/xl/2xl/3xl/full, rounded-t/r/b/l
// - outline-none outline-2 outline-offset-2 outline-sky-500
// - ring ring-1/2/4 ring-sky-500 ring-offset-2 ring-offset-white
//
// Efeitos:
// - shadow-sm/md/lg/xl/2xl shadow-none shadow-[custom]
// - opacity-0..100, mix-blend-*, backdrop-blur-sm/md/lg, backdrop-brightness-*, backdrop-saturate-*
//
// Transformações/Animações:
// - translate-x-2 translate-y-1, -translate-x-1, rotate-45, scale-95/100/110, skew-x-6, origin-center
// - transition, transition-colors, duration-200, ease-in/out, delay-100
// - animate-spin/ping/pulse/bounce
//
// Interação/A11y:
// - cursor-pointer/not-allowed, select-none/text/all, pointer-events-none/auto
// - accent-*, appearance-none, caret-*, scrollbar-* (se plugin), outline utilities acima
//
// Aspecto/Colunas/Outros:
// - aspect-square aspect-video aspect-[16/9]
// - columns-1/2/3/..., break-inside-avoid
// - isolation-auto/isolate, object-contain/cover/center, object-top/right/...
//
// Valores arbitrários (qualquer utilitário):
// - w-[72px] h-[calc(100vh-64px)] bg-[#0f0] shadow-[0_1px_2px_rgba(0,0,0,.2)]
//
// Como usar em conjunto:
// - Junte utilitários como palavras em className: "min-h-screen flex items-center justify-center p-4"
// - Combine variantes: "sm:p-4 md:p-8 hover:bg-sky-500/10 dark:text-white"
// - Use group/peer para estados de elementos relacionados: "group-hover:", "peer-checked:"
// - Use min/max para limites: "min-h-screen max-w-md w-full" mantém altura mínima da tela e largura fluida com limite máximo.
//
// Dica: ajuste o tema no tailwind.config.js para cores, espaçamentos e breakpoints customizados.


export default function LearnTawilind() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
            {/* Container responsivo com padding variável por breakpoint */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Exemplo: combinando min/max/w para layout fluido com limite */}
                <section className="mx-auto max-w-3xl w-full">
                    <h1 className="text-2xl font-semibold mb-4">Tailwind: exemplos rápidos</h1>

                    {/* Card básico: rounded, shadow, ring em foco */}
                    <div className="rounded-lg bg-white dark:bg-slate-800 shadow-md ring-1 ring-slate-200/60 dark:ring-slate-700/60 focus-within:ring-sky-500">
                        <div className="p-6 space-y-4">
                            {/* Tipografia e overflow */}
                            <p className="text-slate-600 dark:text-slate-300">
                                Combine utilitários para compor estilos. Use valores arbitrários quando precisar de algo fora da escala.
                            </p>

                            {/* Grid responsiva com gap */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Box com aspect ratio e object-cover */}
                                <div className="rounded-md overflow-hidden bg-slate-100 dark:bg-slate-700">
                                    <div className="aspect-[16/9]">
                                        <img
                                            alt="thumb"
                                            className="h-full w-full object-cover"
                                            src="https://images.unsplash.com/photo-1529336953121-ad5a0d43d0bf?q=80&w=1200&auto=format&fit=crop"
                                        />
                                    </div>
                                </div>

                                {/* Flexbox: alinhamento e espaçamento */}
                                <div className="flex flex-col justify-between p-2">
                                    <div>
                                        <h2 className="text-lg font-medium">Layout fluido</h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            max-w-md limita a largura, w-full preenche o espaço, min-h-screen garante altura mínima.
                                        </p>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs">
                                            bg/cores
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-700 px-2 py-0.5 text-xs">
                                            flex/gap
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-violet-100 text-violet-700 px-2 py-0.5 text-xs">
                                            aspect/object
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Espaço entre filhos com space-y */}
                            <div className="space-y-3">
                                <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-700/60 border border-slate-200/60 dark:border-slate-700/60">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Overflow e truncate</span>
                                        <span className="text-xs text-slate-500">exemplo</span>
                                    </div>
                                    <p className="text-sm truncate">
                                        Este texto irá truncar quando não couber no contêiner, utilizando utilitário truncate.
                                    </p>
                                </div>

                                {/* Exemplo de group + group-hover */}
                                <div className="group p-3 rounded-md border border-slate-200/60 dark:border-slate-700/60">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">group-hover</span>
                                        <span className="text-xs text-slate-500">passe o mouse</span>
                                    </div>
                                    <button
                                        className="mt-2 inline-flex items-center rounded-md bg-sky-600 text-white px-3 py-1.5 text-sm transition
                                                             hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
                                                             ring-offset-white dark:ring-offset-slate-800"
                                    >
                                        Botão
                                    </button>
                                    <p className="mt-2 text-sm text-slate-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                        Este texto muda com group-hover aplicado no contêiner.
                                    </p>
                                </div>

                                {/* Exemplo de peer + peer-checked */}
                                <label className="flex items-start gap-3 p-3 rounded-md border border-slate-200/60 dark:border-slate-700/60">
                                    <input type="checkbox" className="peer mt-1 accent-sky-600" />
                                    <div className="flex-1">
                                        <div className="font-medium text-sm">peer-checked</div>
                                        <p className="text-sm text-slate-500 peer-checked:text-emerald-600">
                                            Quando o checkbox é marcado, este texto fica verde.
                                        </p>
                                    </div>
                                </label>

                                {/* Transforms e transitions */}
                                <div className="p-3 rounded-md border border-slate-200/60 dark:border-slate-700/60">
                                    <button
                                        className="inline-flex items-center rounded-md bg-emerald-600 text-white px-3 py-1.5 text-sm
                                                             transition-transform duration-200 ease-out hover:scale-105 active:scale-95"
                                    >
                                        Scale on hover/active
                                    </button>
                                </div>
                            </div>

                            {/* Barra inferior demonstrando min/max/overflow-x */}
                            <div className="mt-4 rounded-md bg-slate-50 dark:bg-slate-700/60 p-2 overflow-x-auto">
                                <div className="min-w-[600px] flex items-center gap-2">
                                    <div className="w-32 h-8 rounded bg-slate-200 dark:bg-slate-600" />
                                    <div className="w-32 h-8 rounded bg-slate-200 dark:bg-slate-600" />
                                    <div className="w-32 h-8 rounded bg-slate-200 dark:bg-slate-600" />
                                    <div className="w-32 h-8 rounded bg-slate-200 dark:bg-slate-600" />
                                    <div className="w-32 h-8 rounded bg-slate-200 dark:bg-slate-600" />
                                </div>
                                <p className="mt-2 text-xs text-slate-500">
                                    overflow-x-auto permite scroll horizontal quando min-w excede o contêiner.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Barra de exemplos “rápidos” de classes citadas */}
                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <li className="rounded-md border border-slate-200/60 dark:border-slate-700/60 p-3">
                            min-h-screen: altura mínima igual à altura da viewport.
                            <div className="mt-2 rounded bg-slate-100 dark:bg-slate-700 p-2">
                                <code className="text-xs">className="min-h-screen"</code>
                            </div>
                        </li>
                        <li className="rounded-md border border-slate-200/60 dark:border-slate-700/60 p-3">
                            max-w-md: limita a largura máxima a md.
                            <div className="mt-2 rounded bg-slate-100 dark:bg-slate-700 p-2">
                                <code className="text-xs">className="w-full max-w-md"</code>
                            </div>
                        </li>
                        <li className="rounded-md border border-slate-200/60 dark:border-slate-700/60 p-3">
                            space-y-*: adiciona espaço vertical entre filhos.
                            <div className="mt-2 rounded bg-slate-100 dark:bg-slate-700 p-2">
                                <code className="text-xs">className="space-y-4"</code>
                            </div>
                        </li>
                        <li className="rounded-md border border-slate-200/60 dark:border-slate-700/60 p-3">
                            responsive + state: combinações.
                            <div className="mt-2 rounded bg-slate-100 dark:bg-slate-700 p-2">
                                <code className="text-xs">className="sm:p-4 md:p-8 hover:bg-sky-50 dark:hover:bg-slate-800"</code>
                            </div>
                        </li>
                    </ul>

                    {/* Footer pequeno */}
                    <div className="mt-8 text-xs text-slate-500">
                        Dica: use valores arbitrários para casos específicos, ex.: w-[420px], bg-[#0f172a], h-[calc(100vh-64px)].
                    </div>
                </section>
            </div>
        </div>
    );
}