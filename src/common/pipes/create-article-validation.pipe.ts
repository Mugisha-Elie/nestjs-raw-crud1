import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { CreateArticleDto } from "../../articles/dto/create-article.dto";

@Injectable()
export class CreateArticleValidationPipe implements PipeTransform{
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Request payload must be a valid JSON object');
    }

    const { title, content, isPublished } = value;
    const errors: string[] = [];

    if (title === undefined || title === null) {
      errors.push('Property "title" is required')
    } else if (typeof title !== 'string') {
      errors.push('Property "title" must be a string');
    } else if (title.trim().length < 3) {
      errors.push('Property "title" must be at least 3 characters long');
    }

    if (content === undefined || content === null) {
      errors.push('Property "content" is required');
    } else if (typeof content !== 'string') {
      errors.push('Property "content" must be a string');
    } else if (content.trim().length === 0) {
      errors.push('Property "content" cannot be empty');
    }

    if (isPublished !== undefined && typeof isPublished !== 'boolean') {
      errors.push('Property "isPublished" must be a boolean');
    }

    const allowedKeys = ['title', 'content', 'isPublished'];
    const extraKeys = Object.keys(value).filter(key => !allowedKeys.includes(key))

    if (extraKeys.length > 0) {
      errors.push(`Unexpected property: ${extraKeys.join(', ')}`);
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return {
      title: title.trim(),
      content: content.trim(),
      isPublished: isPublished ?? false,
    }
  }
}