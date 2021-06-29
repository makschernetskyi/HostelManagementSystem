

const linkGenerator = (name, id) =>{
	return `/tenant/?name=${encodeURI(name)}&id=${id}`;
}



export default linkGenerator;