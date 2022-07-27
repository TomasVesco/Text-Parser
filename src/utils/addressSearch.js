async function addressSearch(lines){
    let address = '';
    for(let i = 0; i < lines.length ;i++){
        if(lines[i].match(/\b\d{5}\b/g)){
            address = lines[i];
            break;
        }
    }
    return address = address.split(' ').filter(e => e !== '');
}

export default addressSearch;