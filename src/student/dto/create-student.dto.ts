import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreateStudentDto {

    @Field({nullable : false})
    name: string;

    @Field({nullable : false})
    dob: string;

    @Field({nullable : false})
    email: string;
}
