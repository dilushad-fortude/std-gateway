import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";
import { StudentInput } from "./inputs/student.input";
import { StudentService } from "./student.service";
import { createWriteStream } from 'fs';
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Observable } from "rxjs";
import { Logger } from "@nestjs/common";

@Resolver()
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}
  private readonly logger = new Logger(StudentResolver.name);

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
    console.log("request recieved to find all students");
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
    this.logger.log("req recieved to file upload", filename);
    const chunks = [];
    for await (let chunk of createReadStream()) {
        chunks.push(chunk)
    }
    
    const buffer  = Buffer.concat(chunks);
    return this.studentService.createStudentBatch(filename, buffer);
  }

}