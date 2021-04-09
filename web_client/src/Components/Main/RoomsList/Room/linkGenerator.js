

const linkGenerator = (name, id) =>{
	return `/room/?name=${encodeURI(name)}&id=${id}`;
}



export default linkGenerator;