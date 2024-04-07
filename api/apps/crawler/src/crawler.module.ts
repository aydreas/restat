import { Module } from '@nestjs/common';
import { DefaultCommand } from './default.command';
import { FetcherModule } from '@app/fetcher';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        FetcherModule.registerAsync({
            inject: [DefaultCommand],
            useFactory: (defaultCommand: DefaultCommand) => ({
                concurrency: defaultCommand.options.parallelReq,
                reqsPerSecond: defaultCommand.options.throttle
            })
        }),
        BullModule.forRoot({
            redis: {
                host: 'redis',
                port: 6379
            }
        }),
        BullModule.registerQueue({
            name: 'crawler-queue'
        })
    ],
    controllers: [],
    providers: [DefaultCommand]
})
export class CrawlerModule {}
