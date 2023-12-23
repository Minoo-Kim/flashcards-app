import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateCardDTO {
  @IsString()
  @IsNotEmpty({ message: "The front of the card cannot be empty!" })
  front: string;

  @IsString()
  @IsNotEmpty({ message: "The back of the card cannot be empty!" })
  back: string;
}
