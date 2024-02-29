import react from "@vitejs/plugin-react-swc";
import { ConfigEnv, defineConfig, loadEnv } from 'vite';

export default defineConfig(({command, mode} : ConfigEnv) => {
    const cwd = process.cwd();
    const env = {...loadEnv(mode, cwd, 'VITE_')};

    // reusable config for both server and preview
    const serverConfig = {
        host: true,
        port: Number(env.VITE_PORT?? 5173),
        strictPort: true,
    };

    return {
        base: '/',
        plugins: [react()],
        preview: serverConfig,
        server: serverConfig,
    };
});