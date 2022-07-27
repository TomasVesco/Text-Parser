async function magicNumberSearch(propertySearch, elements){
    for(let i = 0; i <= elements.length ;i++){
        if(elements[i] !== undefined){
            for(let j = 0; j <= propertySearch.length ;j++){
                if(elements[i][0].toLowerCase() === propertySearch[j]){
                    return elements[i].join('').toLowerCase().replace(`${propertySearch[j]}`, '');
                }
            }
        }
    }
}

export default magicNumberSearch;