import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

var dir = "./photos/upload/";
var folderWithFileName = "upload/";
const mkdirp = require("mkdirp");
var URL = 'http://localhost:3000'
var folderWithFileName = "upload/";

@Controller('fileupload')

export class FileuploadController {

   @Post('/uploadImage')
   @UseInterceptors(FileInterceptor('image', {
      storage: diskStorage({
         destination: (req, file, cb) => {
            URL = "http://" + req.headers.host + "/";
            var fileName = file.originalname.split("###");
            dir = dir + fileName[1];
            folderWithFileName = folderWithFileName + fileName[1];
            mkdirp(dir, (err) => cb(err, dir));
         },
         filename: (req, file, callback) => {
            var fileName = file.originalname.split("###");
            callback(null, Date.now() + "-" + fileName[0]);
         }
      })
   }))
   uploadImage(@UploadedFile() file: Express.Multer.File) {
      var fileUploadPath = `${URL + folderWithFileName}/${file.filename}`;
      dir = "./photos/upload/";
      folderWithFileName = "upload/";
      console.log("uploaded successfully==", fileUploadPath);
      if (file.filename) {
         return {
            status: 200,
            message: 'file upload successfully.',
            imgPath: fileUploadPath,
         }
      } else {
         return {
            status: 500,
            message: 'There are some error in uploading file.',
            data: 'uploading failed... please check api'
         }
      }

   }
}
