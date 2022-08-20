const decompressString = (str: string) => {
	let res = '';
	for (let i = 0; i < str.length; i++) {
		const cur = str[i];
		const next = str[i + 1];
		if (cur.match(/[a-zA-Z]/)) {
			res += cur;
		} else {
			const count = Number(cur);
			for (let j = 0; j < count; j++) {
				res += next;
			}
		}
	}
	return res;
};

export default decompressString;
