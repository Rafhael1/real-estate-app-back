import path = require('path');
import { diskStorage } from 'multer';

export const storage = {
	storage: diskStorage({
		destination: `${__dirname}../../../../real-estate-app-uploads`,
		filename: (req, file, cb) => {
			const timestamp: number = new Date().getTime();
			const filename: string = file.originalname.replace(' ', '') + timestamp;
			const extension = path.parse(file.originalname).ext;

			cb(null, `${filename}${extension}`);
		},
	}),
};
