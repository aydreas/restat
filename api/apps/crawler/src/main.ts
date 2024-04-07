import { CrawlerModule } from './crawler.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
    await CommandFactory.run(CrawlerModule);
}
bootstrap().catch((err) => {
    console.error(err);
    process.exit(1);
});
