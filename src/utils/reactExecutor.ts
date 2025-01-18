import * as esbuild from "esbuild-wasm";

let esbuildInitialized: Promise<void> | null = null;

/**
 * Initializes esbuild if it hasn't been initialized already.
 */
export const initializeEsbuild = async () => {
    if (!esbuildInitialized) {
        esbuildInitialized = esbuild
            .initialize({
                worker: true,
                wasmURL: "/esbuild.wasm", // Path to your esbuild WASM file
            })
            .then(() => {
                console.log("Esbuild initialized successfully.");
            })
            .catch((error) => {
                console.error("Failed to initialize esbuild:", error);
                esbuildInitialized = null; // Reset if initialization fails
            });
    }

    return esbuildInitialized;
};

/**
 * Transforms React code (JSX/TSX) into plain JavaScript using esbuild.
 * @param code - The React code to transform.
 * @returns The transformed JavaScript code.
 */
export const executeReactCode = async (code: string): Promise<string> => {
    if (!code.includes("const App")) {
        throw new Error("Your React code must define an App component.");
    }

    try {
        // Ensure esbuild is initialized
        await initializeEsbuild();

        const sanitizedCode = code.replace(/import\s+React.*?;/g, ""); // Remove React imports
        const result = await esbuild.transform(sanitizedCode, {
            loader: "jsx", // Transform JSX
            target: "es2015", // Ensure compatibility
        });

        return result.code; // Return the transformed code
    } catch (error) {
        console.error("Error transforming React code:", error);
        throw new Error("Failed to transform React code.");
    }
};
