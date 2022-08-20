const getFileExtension = (fileBase64: string): string => {
	if (fileBase64[0] === '/') {
		return '.jpg';
	} else if (fileBase64[0] === 'i') {
		return '.png';
	}
};

export default getFileExtension;
