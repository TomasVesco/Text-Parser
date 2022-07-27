async function fieldSearch(tags, words){
    let match = '';
    let tag = '';
    for(let i = 0; i < words.length ;i++){
        for(let j = 0; j < words[i].length ;j++){
            for(let k = 0; k < tags.length ;k++){
                if(tags[k] == words[i][j].toLowerCase()){
                    match = words[i];
                    tag = words[i][j];
                    break;
                }
            }
        }
    }
    if(match !== ''){
        match = match.filter(word => word !== tag);
        return match.join(' ');
    }
}

export default fieldSearch;