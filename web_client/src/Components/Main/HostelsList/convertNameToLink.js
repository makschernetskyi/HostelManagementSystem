function convertNameToLink(name, id){
    return `hostel/?name=${encodeURI(name)}&id=${id}`
}

export default convertNameToLink