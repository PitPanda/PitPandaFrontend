import React from 'react';
import { withRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { itemOwnerDataSelector, itemSelector } from '../../Store/ItemSearchStore';
import ItemSlot from './ItemSlot';
import getName, { cache } from '../../scripts/playerName';

export const ItemSearchSlot = withRouter(props => {
  const index = props.index;
  const [item] = useRecoilState(itemSelector(index));
  const [ownerData, setOwnerData] = useRecoilState(itemOwnerDataSelector(index));

  const onClick = async e => {
    if(item.fake || item.checked) return;
    let nameData = cache[item.owner]
    if(!nameData){
      setOwnerData(c => ({...c, checked: true, string: 'Loading'}))
      nameData = await getName(item.owner).promise;
    }else{
      nameData = await nameData.promise;
    }
    if(nameData.error) setOwnerData(c => ({...c, checked: false, string: '§4ERROR'}))
    else setOwnerData(c => ({...c, checked: true, string: nameData}))
  }

  const onContextMenu = e => {
    e.preventDefault();
    if(item.fake) return;
    if(!e.ctrlKey){
        props.history.push(`/players/${ownerData.uuid}`);
    }else{
        let path = `${window.location.origin}/players/${ownerData.uuid}`;
        let win = window.open(path);
        win.focus();
    }
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{display:'inline-block'}}
    >
      <ItemSlot
        item={{
          ...item,
          desc: [
            `§7Owner: ${ownerData.string}`,
            `§7Last Seen: ${new Date(item.lastseen*1000).toLocaleString()}`,
            ...item.desc
          ]
        }}
        colors={true}
      />
    </div>
  )
})

