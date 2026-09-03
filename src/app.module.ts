import { Module } from "@nestjs/common";
import { ArticlesModule } from "./articles/articles.module";
import { DatabaseModule } from "./database/database.module";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionFilter } from "./common/filters/all-exception.filter";

@Module({
  imports: [ArticlesModule, DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ]
})
export class AppModule {}