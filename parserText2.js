import fs from 'fs';

import fieldSearch from './src/utils/fieldSearch.js';
import addressSearch from './src/utils/addressSearch.js';

let text = fs.readFileSync('./src/tests/test5.txt', 'utf-8');

text = text.replace(/([:\r])/g, '');
text = text.split(/[-|\n]/g);
text = text.filter((item)=> item !== '');

const linesOfText = [];
const wordsOfText = [];
const founds = {};

text.forEach(line => {
    linesOfText.push(line);
});

linesOfText.forEach(word => {
    word = word.split(' ');
    wordsOfText.push(word);
    word.forEach(e => {
        if(e.includes('www') || e.includes('https')){
            founds.webPage = e;
        }
        if(e.includes('@')){
            founds.email = e;
        }
    });
});

const tagsDesktopPhone = ['tel.', 'tel', 't'];
const tagsMobilePhone = ['m', 'cel', 'cel.', 'cell', 'cell.'];
const tagsFax = ['fax', 'fax.'];
const tagsLinkedIn = ['ln', 'ln.', 'linkedin'];
const tagsFacebook = ['facebook'];
const tagsInstagram = ['instagram'];
const tagsCompany = ['s.r.l.', 'srl'];

const address = await addressSearch(linesOfText);
if(address.length !== 0){
    const city = [];
    founds.cap = address[0];
    founds.province = address[address.length - 1].replace(/[()]/g, '');
    for(let i = 1; i < address.length - 1 ;i++){
        city.push(address[i]);
    }
    founds.city = city.join(' ');
}

founds.companyName = await fieldSearch(tagsCompany, wordsOfText);
founds.desktopPhone = await fieldSearch(tagsDesktopPhone, wordsOfText);
founds.mobilePhone = await fieldSearch(tagsMobilePhone, wordsOfText);
founds.fax = await fieldSearch(tagsFax, wordsOfText);
founds.linkedin = await fieldSearch(tagsLinkedIn, wordsOfText);
founds.facebook = await fieldSearch(tagsFacebook, wordsOfText);
founds.instagram = await fieldSearch(tagsInstagram, wordsOfText);

console.log(founds);