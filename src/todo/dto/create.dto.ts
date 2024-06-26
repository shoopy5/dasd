import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  text: string;

  @IsBoolean()
  isCompleted: boolean = false;
}
