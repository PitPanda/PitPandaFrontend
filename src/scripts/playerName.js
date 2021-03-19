import axios from 'axios';

export let cache = {};

function getDoc(tag){
    if(cache[tag]) return cache[tag];
const promise = new Promise(async resolve => {
        const request = await axios.get(`/api/username/${tag}`).catch(r=>r);
        const json = request.data;
        if(!json.success) resolve({error:(json.error||'An error has occured')});
        else {
            cache[tag].result = json.name;
            resolve(json.name);
        } 
    });
    cache[tag]={promise};
    return cache[tag];
}

export default getDoc;