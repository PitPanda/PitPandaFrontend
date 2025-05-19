import React, { useState } from 'react';
import StaticCard from '../Cards/StaticCard';

function Signatures(props){
    const sigs = [
        {
            path: '/api/images/level/',
            name: 'Level',
        },
        {
            path: '/api/images/profile/',
            name: 'Profile',
        },
    ];
    const [fieldPlayer, setFieldPlayer] = useState('BrookeAFK');
    const [targetPlayer, setTargetPlayer] = useState('BrookeAFK');

    const onChange = e => setFieldPlayer(e.target.value);
    const onKeyDown = e => {
        if(e.keyCode === 13) setTargetPlayer(fieldPlayer);
    };
    const onClick = () => setTargetPlayer(fieldPlayer);

    return (
        <div style={{ margin:'auto', width:'1020px' }}>
            <div id="search-header" style={{ textAlign:'center' }}>
                <h1 className="page-header">Signature Generator</h1>
            </div>
            <div style={{ display:'inline-block', marginRight:'20px', width:'350px' }}>
                <StaticCard title='Player'>
                    <input
                        type="text"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={fieldPlayer}
                        style={{
                            width:'75%',
                            fontSize: '16px',
                            fontFamily: 'minecraftia',
                            padding:'5px',
                            color: '#aaa',
                            border: 'none',
                            backgroundColor: '#333333',
                        }}
                    />
                    <input
                        type='button'
                        onClick={onClick}
                        value='Go'
                        className='srchBtn'
                        style={{
                            marginLeft: '3%',
                        }}
                    />
                </StaticCard>
                <StaticCard title="Forum Signatures">
                <div className="instructions-content">
                    <div>Follow these steps to create a signature for the Hypixel Forums:</div>
                    <div data-t="header.cards.tutorial.step_0"><b>①</b> Log into the Hypixel Forums and visit <a target="_blank" href="https://hypixel.net/account/signature">https://hypixel.net/account/signature</a>.</div>
                    <div data-t="header.cards.tutorial.step_1"><b>②</b> Click the three dots (<img alt="" className="tinyicon" src="/img/svg/hypixel_forums/three_dots.svg" style={{display: 'initial'}} /> More options) and then "<img alt="" className="tinyicon" src="https://nadeshiko.io/img/svg/hypixel_forums/brackets.svg" style={{display: 'initial'}} /> Toggle BB code".</div>
                    <div data-t="header.cards.tutorial.step_2"><b>③</b> Paste the BBCode below into the text box and click "<img alt="" className="tinyicon" src="https://nadeshiko.io/img/svg/hypixel_forums/save.svg" style={{display: 'initial'}} /> Save".</div>
                    <img 
                        src="https://nadeshiko.io/img/cards/card_tutorial.gif" 
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            display: 'initial'
                        }}
                        alt="Visiting the Hypixel Forums and following the listed instructions above"
                        width="330"
                        height="172.4"
                        loading="lazy"
                    />
                    <i data-t="header.cards.tutorial.additional">You can include other text or images in your signature too!</i>
                </div>
                </StaticCard>
            </div>
            <div style={{ display:'inline-block', verticalAlign:'top', width:'650px' }}>
                {sigs.map(sig=>(
                    <StaticCard title={sig.name} key={sig.name+targetPlayer}>
                        <code style={{
                            display:'block', 
                            backgroundColor:'#444', 
                            padding:'3px', 
                            borderRadius:'3px',
                            color: '#fff',
                            marginBottom: '16px',
                            fontSize: '12px',
                            userSelect: 'all',
                        }}>[URL='https://pitpanda.rocks/players/{targetPlayer}'][IMG]https://pitpanda.rocks{sig.path}{targetPlayer}[/IMG][/URL]</code>
                        <img src={sig.path+targetPlayer} alt={sig.name} />
                    </StaticCard>
                ))}
            </div>
        </div>
    );
}

export default Signatures;