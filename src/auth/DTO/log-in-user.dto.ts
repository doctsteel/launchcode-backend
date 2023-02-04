import { IsNotEmpty } from 'class-validator';

export class LogInUserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
