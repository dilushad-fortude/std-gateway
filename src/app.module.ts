import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { RootController } from 'src/root.controller';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [
    ClientsModule.register([
    { name: 'STUDENT_SERVICE', transport: Transport.TCP, options: {
      host: '0.0.0.0',
      port: 8080
    }},
    { name: 'STUDENT_UPDATE_SERVICE', transport: Transport.TCP, options: {
      host: '0.0.0.0',
      port: 8081
    }},
  ]),
  CsvModule
],
  controllers: [RootController, AppController, StudentController],
  providers: [StudentService],
})
export class AppModule {}
