import * as fs from 'fs';

const deleteFile = (file: string) => {
	const path = '../real-estate-app-uploads/';

	fs.unlink(`${path}${file}`, error => {
		if (error) console.log(error);
	});
	return `${path}${file}`;
};

export default deleteFile;
