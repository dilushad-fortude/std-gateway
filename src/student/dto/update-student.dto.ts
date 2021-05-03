import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UpdateStudentDto extends PartialType(CreateStudentDto) {
    @Field(type => Int)
    id: number;
}
