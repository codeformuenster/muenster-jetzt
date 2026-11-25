import type { Plugin, UserConfig } from "vite";
import { afterEach, describe, expect, it } from "vitest";
import config from "../vite.config";

const resolveConfig = (mode: string): UserConfig => {
  const resolved =
    typeof config === "function" ? config({ command: "build", mode }) : config;
  return resolved as UserConfig;
};

const pluginNames = (resolved: UserConfig): string[] =>
  ((resolved.plugins as Plugin[]) ?? []).flatMap((plugin) =>
    plugin ? [plugin.name] : []
  );

const cspContent = (resolved: UserConfig): string => {
  const plugin = (resolved.plugins as Plugin[]).find(
    (item) => item && item.name === "csp-meta-tag"
  );
  const transform = plugin?.transformIndexHtml as unknown as () => {
    attrs: Record<string, string>;
  }[];
  return transform()[0].attrs.content;
};

describe("vite config", () => {
  afterEach(() => {
    delete process.env.REACT_APP_BACKEND_BASE_PATH;
  });

  it("keeps CRA-compatible env and build settings", () => {
    const resolved = resolveConfig("production");

    expect(resolved.envPrefix).toBe("REACT_APP_");
    expect(resolved.define).toEqual({ global: "globalThis" });
    expect(resolved.build).toMatchObject({
      outDir: "build",
      assetsInlineLimit: 0,
    });
    expect(pluginNames(resolved)).toContain("csp-meta-tag");
  });

  it("injects a CSP with the configured backend origin", () => {
    process.env.REACT_APP_BACKEND_BASE_PATH = "https://api.example.test";

    const content = cspContent(resolveConfig("production"));

    expect(content).toContain("default-src 'none'");
    expect(content).toContain("script-src 'self'");
    expect(content).toContain("connect-src 'self' https://api.example.test");
    expect(content).not.toContain("http://localhost:8000");
  });

  it("falls back to the local backend origin", () => {
    const content = cspContent(resolveConfig("production"));

    expect(content).toContain("connect-src 'self' http://localhost:8000");
  });
});
