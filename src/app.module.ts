import { Module } from "@nestjs/common";
import { ArticlesModule } from "./articles/articles.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [ArticlesModule, DatabaseModule],
  controllers: [],
  providers: []
})
export class AppModule {}