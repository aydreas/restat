import { Module } from '@nestjs/common';
import { DefaultCommand } from './default.command';
import { BullModule } from '@nestjs/bull';
import { JobConsumer } from './job.consumer';

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: 'redis',
                port: 6379
            }
        }),
        BullModule.registerQueue({
            name: 'crawler_jobs'
        })
    ],
    controllers: [],
    providers: [DefaultCommand, JobConsumer]
})
export class CrawlerModule {}
