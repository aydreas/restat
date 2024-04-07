import { CrawlerModule } from './crawler.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
    await CommandFactory.run(CrawlerModule, ['log', 'warn', 'error', 'fatal']);
}

bootstrap().catch((err) => {
    console.error(err);
    process.exit(1);
});
