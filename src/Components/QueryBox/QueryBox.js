import React, { useState } from 'react';
import SearchField from '../SearchField/SearchField';
import StaticCard from '../Cards/StaticCard';
import pitMaster from '../../pitMaster.json';
import uuid from 'uuid';

let Mystics = pitMaster.Pit.Mystics;

Object.values(Mystics).forEach(ench=>{
    ench.Classes.forEach(cls=>{
        if(!Mystics[cls]) Mystics[cls] = {Name:`§f${cls.charAt(0).toUpperCase() + cls.slice(1)}`,Type:'any'};
    })
});

Mystics.pants = {Name:'§fPants',Type:'pants',NoNumber:true};
Mystics.sword = {Name:'§fSword',Type:'sword',NoNumber:true};
Mystics.bow = {Name:'§fBow',Type:'bow',NoNumber:true};
Mystics.gemmed = {Name:'§fGemmed',Type:'any',NoNumber:true};
Mystics.lives = {Name:'§fLives',Type:'any'};
Mystics.maxLives = {Name:'§fMax Lives',Type:'any'};
Mystics.tokens = {Name:'§fTokens',Type:'any'};
Mystics.tier = {Name:'§fTier',Type:'any'};
Mystics.artifact = {Name:'§fArtifact',Type:'any',NoNumber:true};
Mystics.rare = {Name:'§fRare',Type:'any',NoNumber:true};
Mystics.legendary = {Name:'§fLegendary',Type:'any',NoNumber:true};
Mystics.bountiful = {Name:'§fBountiful',Type:'any',NoNumber:true};
Mystics.combolicious = {Name:'§fCombolicious',Type:'any',NoNumber:true};
Mystics.extraordinary = {Name:'§fExtraordinary',Type:'any',NoNumber:true};
Mystics.unthinkable = {Name:'§fUnthinkable',Type:'any',NoNumber:true};
Mystics.overpowered = {Name:'§fOverpowered',Type:'any',NoNumber:true};
Mystics.miraculous = {Name:'§fMiraculous',Type:'any',NoNumber:true};
Mystics.million = {Name:'§fOne in a Million',Type:'any',NoNumber:true};
Mystics.nonce = {Name:'§fNonce',Type:'any'};
Mystics.uuid = {Name:'§fCurrent Owner',Type:'any'};
Mystics.past = {Name:'§fPast Owner',Type:'any'};
Mystics.color = {Name:'§fColor',Type:'pants',Colors:{
    red:'0',
    yellow:'1',
    blue:'2',
    orange:'3',
    green:'4'
}};
Mystics['color0'] = {Name:'§fRed',Type:'pants',NoNumber:true};
Mystics['color1'] = {Name:'§fYellow',Type:'pants',NoNumber:true};
Mystics['color2'] = {Name:'§fBlue',Type:'pants',NoNumber:true};
Mystics['color3'] = {Name:'§fOrange',Type:'pants',NoNumber:true};
Mystics['color4'] = {Name:'§fGreen',Type:'pants',NoNumber:true};

const valid = ['pants','sword','bow','any'];
const formatted = Object.entries(Mystics)
    .filter(([,ench])=>valid.includes(ench.Type))
    .sort(([,a],[,b])=>a.Name.substring(a.Name.indexOf('§9')+2)<b.Name.substring(b.Name.indexOf('§9')+2)?-1:1);

function createInputData(){
    return {id:uuid.v4(),ref:React.createRef(),reporting:'',says:''};
}

const QueryBox = props => {
    const [inputs, setInputs] = useState(() => {
        if(props.baseQuery) {
            return [
                ...props.baseQuery.split(',').map(s => {
                    const base = createInputData();
                    base.reporting = base.says = s;
                    return base;
                }),
                createInputData()
            ]
        }
        return [createInputData()]
    })
    const buttonRef = React.createRef();
    const killInput = (index) => {
        if((index !== inputs.length - 1&& index !== 0) || (index !== 0 && inputs[index-1].report === '')){
            let newInputs = [...inputs];
            newInputs[index-1].ref.current.focus();
            newInputs[index-1].says+='_';
            clearTimeout(newInputs[index].timeout)
            newInputs = newInputs.slice(0, index).concat(newInputs.slice(index + 1));
            setInputs(newInputs)
        }
    }
    const timeOutFix = (timeout, index) => {
        let newInputs = [...inputs];
        newInputs[index].timeout = timeout;
        setInputs(newInputs)
    }
    const monitorInputs = (report,raw,index) => {
        let newInputs = [...inputs];
        newInputs[index].reporting=report;
        newInputs[index].says=raw;
        if(index+1===newInputs.length) newInputs.push(createInputData());
        setInputs(newInputs)
    }
    const buildAndSendQuery = () => {
        let newInputs = [...inputs];
        let toClear = newInputs.filter((input,index)=>(input.reporting==='')&&index!==newInputs.length-1);
        toClear.forEach(input=>clearTimeout(input.timeout))
        newInputs = newInputs.filter((input,index)=>(input.reporting!=='')||index===newInputs.length-1);
        let queryString = newInputs.slice(0,-1).map(i=>i.reporting).join();
        props.query(queryString);
        setInputs(newInputs);
    }
    const focus = (index) => {
        if(inputs[index]) inputs[index].ref.current.focus();
        else if(index >= inputs.length) buttonRef.current.focus();
    }
    return (
        <StaticCard title="Query" style={{width:'350px',display:'inline-block',verticalAlign:'top',margin:'20px',textAlign:'left'}}>
            {inputs.map((input,index)=>(
                <SearchField 
                    up={() => focus(index-1)} 
                    down={() => focus(index+1)} 
                    says={input.says} 
                    timeOutFix={timeout => timeOutFix(timeout,index)} 
                    kill={() => killInput(index)} 
                    key={input.id} 
                    mainRef={input.ref} 
                    suggestions={formatted} 
                    report={(a,b) => monitorInputs(a,b,index)}
                />
            ))}
            <button 
                onClick={buildAndSendQuery} 
                onKeyDown={e=>{if(e.keyCode===38) focus(inputs.length - 1);}} 
                ref={buttonRef} 
                className='srchBtn' 
                style={{marginTop:'0px'}}
            >Search</button>
        </StaticCard>
    );
};

export default QueryBox;
