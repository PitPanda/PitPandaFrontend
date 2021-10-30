import React from 'react';
import { useRecoilState } from "recoil"
import { itemsCountSelector } from "../../Store/ItemSearchStore"
import { ItemSearchSlot } from "./ItemSearchSlot";
import ItemSlot from './ItemSlot';

export const ItemSearchInventory = () => {
  const [itemCount] = useRecoilState(itemsCountSelector);
  const rows = Math.ceil(itemCount / 9) || 1;
  const toFill = rows * 9 - itemCount;

  return (
    <div style={{width:`${55.5*9}px`}} className="MinecraftInventory">
      {Array.from({length: itemCount}, (_, index)=>(
        <ItemSearchSlot 
          key={index} 
          index={index}
        />
      ))}
      {Array.from({length:toFill}, (_, index) => (
        <ItemSlot 
          key={'filler'+index} item={{}} 
        />
      ))}
    </div>
  )
}