"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const system_1 = require("./utils/system/system");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use('/assets/:filePath', (req, res) => {
        return res.sendFile((0, system_1.joinpath)(`../../assets/${req.params.filePath}`));
    });
    app.setGlobalPrefix('/api/v1');
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map