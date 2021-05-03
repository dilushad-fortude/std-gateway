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

    @Get()
    getStudents() {
        return this.studentService.findAll();
    }

    @Get(':id')
    getOneStudent(@Param('id') id: string) {
        return this.studentService.findOne(id);
    }

    @Patch(':id')
    updateStudnet(@Param('id') id: string, @Body() reqBody: Student) {
        return this.studentService.update(id, reqBody);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor("files", {storage: diskStorage({
        destination: './uploads',
        filename: (req,file, cb) => {
            return cb(null, file.originalname)
        }
    })}))
    async uploadFile(@UploadedFile() files: Express.Multer.File) {
        const stream = fs.createReadStream( './uploads/'+files.originalname);
        const stdList = await this.csvParser.parse(stream, Student);
        console.log(stdList.list.length);
        var stdMap = [];
        for(let x =0; x< stdList.list.length; x++) {
            var stdArr = stdList.list[x]['name,dob,email'].split(",");
            var stdObj:Student = new Student();
            stdObj.name = stdArr[0];
            stdObj.email = stdArr[2];
            stdObj.dob = stdArr[1];
            stdMap.push(stdObj);
        }
        console.log(stdMap);
        // return stdMap;
        return this.studentService.createMultiple(stdMap);
    }
}
