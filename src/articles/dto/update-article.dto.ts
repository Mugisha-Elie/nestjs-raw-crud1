import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateArticleDto{
  @ApiPropertyOptional({
    description: 'Updated title of the article',
    example: 'Updated: Deep Dive into Nestjs Lifecycle',
    type: String,
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Updated body content of the article',
    example: 'Updated content body with revised technical steps',
    type: String
  })
  content?: string;

  @ApiPropertyOptional({
    description: 'Updated publication state',
    example: true,
    type: Boolean
  })
  isPublished?: boolean;
}
