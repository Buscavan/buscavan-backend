import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  id: number;
  @IsString()
  content: string;
  @IsString()
  author: string;
  @IsDate()
  createdAt: Date;
  @IsNumber()
  @IsOptional()
  parentCommentId?: number;
}
