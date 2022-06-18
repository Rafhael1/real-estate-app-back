import * as fs from 'fs';
import getFileExtension from './getFileExtension';

const saveFile = (image: string) => {
  const base64Image = image.split(';base64,').pop();
  const fileExtension = getFileExtension(base64Image);
  const path = '../real-estate-app-uploads/';
  const filename = Date.now() + fileExtension;

  fs.writeFile(
    `${path}${filename}`,
    base64Image,
    { encoding: 'base64' },
    () => {
      console.log('File created');
    },
  );
  return `${path}${filename}`;
};

export default saveFile;
