import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: '0.0.0.0',           // 綁定所有網卡
        port: 4200,
        strictPort: true,
        allowedHosts: ['sumou.ddns.net', 'localhost', '127.0.0.1', '*']
    }
});
