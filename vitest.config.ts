import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.join(__dirname, "./src"),
            "@adapters": path.resolve(__dirname, "./src/types/adapters/"),
            "@test": path.resolve(__dirname, "./src/test"),
            "@notes": path.resolve(__dirname, "./src/notes"),
            "@config": path.resolve(__dirname, "./src/config"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "types/*": path.resolve(__dirname, "./src/types"),
        },
    },
});