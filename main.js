"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use('/', (req, res) => {
        return res.status(200).json('OK');
    });
    app.use('/assets/:filePath', (req, res) => {
        return res.sendFile((0, path_1.join)(__dirname, `./assets/${req.params.filePath}`));
    });
    app.setGlobalPrefix('/api/v1/');
    await app.listen(3000).then(() => {
        console.log('Application running on http://localhost:3000');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map