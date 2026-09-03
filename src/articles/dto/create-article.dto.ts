import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateArticleDto{
  @ApiProperty({
    description: 'The headline or title of the article',
    example: 'Deep Dive into NestJS Lifecycle',
    minLength: 3,
    type: String
  })
  title!: string;

  @ApiProperty({
    description: 'The comprehensive body content of the article',
    example: 'In this article, we explore how pipes and filters intercept HTTP packets...',
    type: String
  })
  content!: string;

  @ApiProperty({
    description: 'Publication status flag indicating if the article is public',
    example: false,
    default: false,
    type: Boolean,
  })
  isPublished!: boolean;
}
