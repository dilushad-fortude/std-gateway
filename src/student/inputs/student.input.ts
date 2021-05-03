import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class StudentInput{

    @Field({nullable : false})
    name: string;

    @Field({nullable : false})
    dob: string;

    @Field({nullable : false})
    email: string;
}