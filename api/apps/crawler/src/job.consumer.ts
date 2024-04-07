import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CheerioCrawler } from 'crawlee';

@Processor('crawler_jobs')
export class JobConsumer {
    @Process({ concurrency: 1 })
    async handleJob(job: Job<unknown>) {
        console.log(job.data);

        const crawler = new CheerioCrawler({
            requestHandler({ $ }) {
                console.log($('title').text());
            }
        });

        await Promise.all([
            crawler.run(['https://www.google.com']),
            (async () => {
                while (crawler.running) {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                }
            })()
        ]);
    }
}
