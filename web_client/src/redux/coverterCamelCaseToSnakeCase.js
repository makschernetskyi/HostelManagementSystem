const convertObjectCamelCaseFieldNamesToSnakeCase = (obj) =>{

	const snakeCaseObj = new Object();
	for(let prop in obj){
		const newPropName = convertStringFromCamelCaseToSnakeCase(prop);
		snakeCaseObj[newPropName] = obj[prop];
	}

	function convertStringFromCamelCaseToSnakeCase(str){
		if(typeof str !== 'string')
			throw new TypeError('argument is not type of string');
		const firstCharAsciiCode = str.charCodeAt(0);
		if(firstCharAsciiCode>= 65 && firstCharAsciiCode<=90)
			throw new TypeError('string is not written in camelCase');
		str = str.split('');
		for(let i = 1, len = str.length; i<len; i++){
			const charAsciiCode = str[i].charCodeAt();
			const isCharUpperCaseLetter = charAsciiCode >= 65 && charAsciiCode <=90;
			//code below is branchless and makes changes only when isCharUpperCaseLetter is true
			str[i] = String.fromCharCode(charAsciiCode+(32*isCharUpperCaseLetter));
			isCharUpperCaseLetter && str.splice(i,0,'_');
			len+=isCharUpperCaseLetter;
			i+=isCharUpperCaseLetter;
		}
		return str.join('')
	}
	return snakeCaseObj
}

export default convertObjectCamelCaseFieldNamesToSnakeCase;