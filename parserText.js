import fs from 'fs';

import magicNumberSearch from './src/utils/magicNumberSearch.js';

let text = fs.readFileSync('./src/tests/test5.txt', 'utf-8');

text = text.replaceAll(/([:\r])/g, '');
text = text.split(/[|\n]/g);
text = text.filter((item)=>item !== '');

const founds = {
    contactName : text[0],
    city : ''
};

const desktopPhoneSearch = ['tel.', 'tel', 't'];
const mobilePhoneSearch = ['m', 'cel', 'cel.', 'cell', 'cell.'];
const faxSearch = ['fax', 'fax.'];
const linkedinSearch = ['ln', 'ln.', 'linkedin'];
const facebookSearch = ['facebook'];
const instagramSearch = ['instagram'];

const elements = [];

text.forEach(e=> {
    e = e.split(' ');
    e = e.filter((item)=>item !== '');

    elements.push(e);
    
    e.forEach(item => {
        if(item.match(/\b\d{5}\b/g)){
            for(let i = 0; i <= text.length ;i++){
                if(text[i] != undefined){
                    if(text[i][0] === ' '){
                        text[i] = text[i].slice(1);
                    }
                    if(text[i].match(/\b\d{5}\b/g) != null){
                        let city = '';
                        let address = text[i];
                        address = address.split(' ');
                        founds.CAP = address[2];
                        for(let i = 3; i < address.length - 1 ;i++){
                            city+= ' ' + address[i]
                            if(city[0] === ' '){
                                city = city.slice(1);
                            }
                        }
                        founds.city = city;
                        founds.province = address[address.length - 1].replaceAll(/[()]/g, '');
                    }
                }
            }
        }
        if(item.includes('www.') || item.includes('https')){
            founds.webPage = item;
        }
        if(item.includes('@')){
            founds.email = item;
        }
    });
});

founds.dektopPhone = await magicNumberSearch(desktopPhoneSearch, elements);
founds.mobilePhone = await magicNumberSearch(mobilePhoneSearch, elements);
founds.fax = await magicNumberSearch(faxSearch, elements);
founds.linkedin = await magicNumberSearch(linkedinSearch, elements);
founds.instagram = await magicNumberSearch(instagramSearch, elements);
founds.facebook = await magicNumberSearch(facebookSearch, elements);

console.log(founds);