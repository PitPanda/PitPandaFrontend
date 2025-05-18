import React from 'react';
import './itemStyles.css';
import './minecraftStyles.css';

const mapped = [
    'FFAA00',
    '55FF55',
    '5555FF',
    'FFFF55',
    'FF5555',
    '55FFFF',
    '7DC383',
    '000000'
];

function MinecraftItemImg(props){
    const {id = 0, meta = 0, count = 1} = props;
    const inner = (count>1)?<span className='textshadow count'>{count}</span>:'';
    let style = JSON.parse(JSON.stringify((props.style || {})));
    if(id>=298&&id<=301&&!(id===300&&mapped.includes(meta))){//leather items
            // if (count === 0) {
            //     return (
            //         <div className={`item_ item_${id}_darken darken item_${id}_${meta}`} style={style} children={inner}/>
            //     );
            // } else {
            //     style.backgroundColor = `#${meta}`;
            //     return (
            //         <div className={`item_ item_${id} item_${id}_${meta}`} style={style} children={inner}/>
            //     );
            // }
        return (
            <div className={`item_ ${count===0?'darken':''}`}>
                <div className={`masked_color_${id} masked_color`} style={{backgroundColor: `#${meta}`}}></div>
                <div className={`masked_overlay_${id} masked_overlay`}></div>
            </div>
        );
    }else{
        return (
            <div className={`item_ item_${id} item_${id}_${meta} ${count===0?'darken':''}`} style={style} children={inner}/>
        );
    }
}

export default MinecraftItemImg;
