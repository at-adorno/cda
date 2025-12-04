// Shims para permitir imports que terminam em .js (usados no runtime ESM)
// Declara módulos .js como any para evitar erros TS2307 quando não há declarações.

declare module '*.js' {
  const value: any;
  export default value;
}

// Também cobre imports com caminho explícito terminando em .js
declare module '*/*.js' {
  const value: any;
  export default value;
}
