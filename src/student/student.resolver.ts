import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";
import { StudentInput } from "./inputs/student.input";
import { StudentService } from "./student.service";

@Resolver()
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  createStudent(@Args('input') input: StudentInput) {
      return this.studentService.create(input);
  }

  @Query(() => Student)
  findStudent(@Args('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Query(() => [Student])
  findAllStudents() {
    return this.studentService.findAll();
  }

  @Mutation(() => UpdateStudentDto)
  updateStudent(@Args('id') id: string, @Args('input') input: StudentInput) {
      return this.studentService.update(id, input);
  }

}