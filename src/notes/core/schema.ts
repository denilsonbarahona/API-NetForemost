import { IsNotEmpty, IsOptional, IsUUID, IsDate, IsString, IsDefined } from "class-validator";
import { INoteDTO } from "types";

export default class NoteDTO implements INoteDTO {
  @IsOptional()
  @IsUUID()
  id?: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  topic!: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title!: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  body!: string;
  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  date!: Date;

  create(payload: INoteDTO) {
    this.topic = `${payload.topic}`;
    this.title = payload.title;
    this.body = payload.body;
    this.date = new Date(payload.date);
    return this;
  }
}