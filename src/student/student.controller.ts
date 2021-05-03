import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import readXlsxFile from 'read-excel-file';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';
import { diskStorage } from 'multer';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService,
        private readonly csvParser: CsvParser) { }

    // @Get()
    // getStudents() {
    //     return this.studentService.findAll();
    // }

    // @Get(':id')
    // getOneStudent(@Param('id') id: string) {
    //     return this.studentService.findOne(id);
    // }

    // @Patch(':id')
    // updateStudnet(@Param('id') id: string, @Body() reqBody: Student) {
    //     return this.studentService.update(id, reqBody);
    // }

    @Post('upload')
    @UseInterceptors(FileInterceptor("files"))
    async uploadFile(@UploadedFile() excelFile: Express.Multer.File) {
        return this.studentService.createMultiple(excelFile);
    }
}
