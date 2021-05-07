import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";
import { StudentInput } from "./inputs/student.input";
import { StudentService } from "./student.service";
import { createWriteStream } from 'fs';
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Observable } from "rxjs";

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

  @Mutation(() => Student)
  deleteStudent(@Args('id') id: string) {
      return this.studentService.remove(id);
  }

  @Mutation(() => Boolean)
  async uploadFile(@Args({name: 'file', type: () => GraphQLUpload})
  {
      createReadStream,
      filename
  }: FileUpload) {
    const chunks = [];
    for await (let chunk of createReadStream()) {
        chunks.push(chunk)
    }
    
    const buffer  = Buffer.concat(chunks);
    return this.studentService.createStudentBatch(filename, buffer);
  }

}