import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { FetcherService } from './fetcher.service';

export interface FetcherOptions {
    concurrency: number;
    reqsPerSecond: number;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<FetcherOptions>().build();

@Module({
    providers: [FetcherService],
    exports: [FetcherService]
})
export class FetcherModule extends ConfigurableModuleClass {}
