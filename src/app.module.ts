import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { RootController } from 'src/root.controller';
import { StudentService } from './student/student.service';
import { CsvModule } from 'nest-csv-parser';
import { StudentResolver } from './student/student.resolver';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
    { name: 'STUDENT_SERVICE', transport: Transport.TCP, options: {
      host: process.env.STUDENT_CRUD_SERVICE_HOST,
      port: parseInt(process.env.STUDENT_CRUD_SERVICE_PORT)
    }},
    { name: 'STUDENT_UPDATE_SERVICE', transport: Transport.TCP, options: {
      host: process.env.STUDENT_UPDATE_SERVICE_HOST,
      port: parseInt(process.env.STUDENT_UPDATE_SERVICE_PORT)
    }},
  ]),
  CsvModule,
  GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    uploads: false,
  }),
],
  controllers: [RootController, AppController],
  providers: [StudentService, StudentResolver],
})
export class AppModule {}
