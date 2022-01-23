import { Request } from 'express';
import multer from 'multer';

export const storage = multer.diskStorage({
	destination: (req: Request, file, cb) => {
		// If it goes wrong just change it back to ../upload/
		cb(null, `${__dirname}../../../../real-estate-app-uploads`);
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname);
	}
});

export const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 10
	}
});