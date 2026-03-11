import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  splitting: true,
  external: ["react", "react-dom", "@iwg/atoms", "@iwg/molecules", "@iwg/organisms"],
});
