import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService,],
      imports: [
        ClientsModule.register([
          { name: 'STUDENT_SERVICE', transport: Transport.TCP, options: {
            host: process.env.STUDENT_CRUD_SERVICE_HOST,
            port: parseInt(process.env.STUDENT_CRUD_SERVICE_PORT)
          }},
          { name: 'STUDENT_UPDATE_SERVICE', transport: Transport.TCP, options: {
            host: process.env.STUDENT_UPDATE_SERVICE_HOST,
            port: parseInt(process.env.STUDENT_UPDATE_SERVICE_PORT)
          }},]
        )
      ]
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    //expect(service).toBeDefined();
  });
});
