import { Controller, Get, Inject, Param, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';
import { Student } from './student/entities/student.entity';


@Controller('hello')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    @Inject('STUDENT_SERVICE') private client: ClientProxy, private readonly csvParser: CsvParser
  ) {}

  @Get()
  getHello() {
    console.log("invoked");
    return this.client.send({ cmd: 'hello' }, '');
  }

  // @Get(':name')
  // getHelloByName(@Param('name') name = 'there') {
  //   // Forwards the name to our hello service, and returns the results
  //   return this.client.send({ cmd: 'hello' }, name);
  // }

  @Get('add')
  getAddition() {
    // Forwards the name to our hello service, and returns the results
    return this.client.send({ cmd: 'add' }, [1,2,2]);
  }

  @Get('read')
  async readfile() {
      const stream = fs.createReadStream(__dirname + '/uploads/students-details.csv');
      const stdList = await this.csvParser.parse(stream, Student);
      return stdList.list;
  }
}
