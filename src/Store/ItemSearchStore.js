import { atom, selector, selectorFamily } from 'recoil';
import { cache } from '../scripts/playerName';
import axios from 'axios';

export const queryStringAtom = atom({
  key: 'QueryString',
  default: '',
})

export const fetchItems = async (queryString, page = 0) => {
  if(!queryString) return [];
  const response = await axios.get(`/api/itemsearch/${queryString}`, { params: { page } }).catch(r => r);
  const json = response.data;
  if(!json.success) return [];
  for(const item of json.items){
    item.item.lastseen = item.lastseen
    if(cache[item.owner]?.result) {
      item.item.ownerString = cache[item.owner].result;
      item.item.checked = true;
    }
    else {
      item.item.ownerString = 'Click to request';
      item.item.checked = false;
    }
    item.item.uuid = item.id;
    item.item.owner = item.owner;
  }
  return json.items.map(item => item.item);
}

export const itemsAtom = atom({
  key: 'Items',
  default: [],
})

export const itemsCountSelector = selector({
  key: 'ItemsCount',
  get: ({get}) => get(itemsAtom).length,
})

export const itemSelector = selectorFamily({
  key: 'Item',
  get: index => ({get}) => {
    const items = get(itemsAtom);
    const item = items[index];
    return item;
  },
  set: index => ({set}, newValue) => {
    set(itemsAtom, prev => {
      const copy = [...prev];
      copy[index] = newValue;
      return copy;
    })
  }
})

/**
 * @type {(param: import('recoil').SerializableParam) => import('recoil').RecoilState<{uuid:string,string:string,checked:boolean}>}
 */
export const itemOwnerDataSelector = selectorFamily({
  key: 'ItemOwnerData',
  get: index => ({get}) => {
    const item = get(itemSelector(index));
    return {
      uuid: item.owner,
      string: item.ownerString,
      checked: item.checked,
    };
  },
  set: index => ({get, set}, newValue) => {
    const items = get(itemsAtom);
    const current = items[index].owner;
    set(itemsAtom, prev => {
      return prev.map(item => {
        if(item.owner !== current) return item;
        return{
          ...item,
          ownerString: newValue.string,
          checked: newValue.checked,
        }
      })
    });
  }
})
