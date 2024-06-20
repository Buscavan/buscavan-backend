import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  id: number;
  @IsString()
  content: string;
  @IsString()
  author: string;
  @IsDate()
  @Type(() => Date)
  createdAt: Date;
  @IsNumber()
  @IsOptional()
  parentCommentId?: number;
}
