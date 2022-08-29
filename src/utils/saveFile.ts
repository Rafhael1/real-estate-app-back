import * as fs from 'fs';
import getFileExtension from './getFileExtension';

const saveFile = (image: string) => {
	const base64Image = image.split(';base64,').pop();
	const fileExtension = getFileExtension(base64Image);
	const path = '../real-estate-app-uploads/';
	const filename =
		Date.now() + Math.floor(Math.random() * 1000) + fileExtension;

	fs.writeFile(
		`${path}${filename.trim()}`,
		base64Image,
		{ encoding: 'base64' },
		() => {
			console.log('File created');
		},
	);
	return filename;
};

export default saveFile;
