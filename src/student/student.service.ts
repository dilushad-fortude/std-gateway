import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {

  constructor(
    @Inject('STUDENT_SERVICE') private client: ClientProxy,
    @Inject('STUDENT_UPDATE_SERVICE') private updateClient: ClientProxy
    ) {
    
  }

  createMultiple(data:Express.Multer.File) {
    return this.updateClient.send({cmd: 'upload-multiple-students'}, {stdExeclFile: data});
  }

  findAll() {
    return this.client.send({ cmd: 'get-all-students' }, '');
  }

  findOne(id: string) {
    return this.client.send({ cmd: 'get-one-student-by-id' },  id);
  }

  update(id: string, reqBody: CreateStudentDto) {
    return this.client.send({cmd: 'update-student'}, {id: id, studentObj: reqBody})
  }

  remove(id: string) {
    return this.client.send({cmd: 'delete-student'}, {id: id})
  }

  create(reqBody: CreateStudentDto) {
    return this.client.send({ cmd: 'create-student' }, reqBody);
  }
    
}

