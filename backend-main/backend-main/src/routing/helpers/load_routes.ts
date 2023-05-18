import * as fs from 'fs';
import { Application, Router } from 'express';

export default async function loadRoutes(app: Application): Promise<void> {
    const routerFiles: string[] = fs.readdirSync('./src/routing/routes');

    for (const routerFile of routerFiles) {
        const routes: Record<string, Router> = await import(`../routes/${routerFile}`);

        app.use('/', routes.default);
    }
}
