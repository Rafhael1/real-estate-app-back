import * as fs from 'fs';

const deleteFile = (file: string) => {
  const path = '../real-estate-app-uploads/';

  fs.unlink(`${path}${file}`, error => {
    if (error) throw error;
  });
  return `${path}${file}`;
};

export default deleteFile;
