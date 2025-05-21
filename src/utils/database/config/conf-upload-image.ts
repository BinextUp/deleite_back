import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";

export const confUploadImage = ()=>{
    return {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new BadRequestException('Solo se permiten archivos de imagen'), false);
            }
            cb(null, true);
        },
        limits: {
            fileSize: 1024 * 1024 * 5, // Límite de tamaño de 5MB
        },
    }
}