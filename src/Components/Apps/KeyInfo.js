import axios from 'axios';
import React, { useState } from 'react';
import StaticCard from '../Cards/StaticCard';

const codeStyle = {
    backgroundColor:'#444', 
    padding:'3px', 
    borderRadius:'3px',
    color: '#fff',
    fontSize: '12px',
}

function KeyInfo(props){
    const [fieldKey, setFieldKey] = useState(localStorage.getItem('apikey') || '');
    const [keyInfo, setKeyInfo] = useState(undefined);

    const onChange = e => setFieldKey(e.target.value);
    const onKeyDown = e => {
        if(e.keyCode === 13) checkKey(fieldKey);
    };
    const onClick = () => checkKey(fieldKey);

    const checkKey = async key => {
        const response = await axios.get(`/api/keyinfo?key=${key}`).catch(e=>e);
        if(response.data?.success){
            window.localStorage.setItem('apikey', key);
            setKeyInfo(response.data);
        }
    }

    return (
        <div style={{ margin:'auto', width:'1020px' }}>
            <div id="search-header" style={{ textAlign:'center' }}>
                <h1 className="page-header">Pit Panda API Keys</h1>
            </div>
            <div style={{ display:'inline-block', marginRight:'20px', width:'350px' }}>
                <StaticCard title='Input Key'>
                    <input
                        type="text"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={fieldKey}
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
                        value='GO'
                        style={{
                            marginLeft: '3%',
                            width:'22%',
                            fontSize: '16px',
                            padding:'5px',
                            color: 'white',
                            border: 'none',
                            backgroundColor: 'rgb(221,159,78)',
                            WebkitAppearance: 'none',
                        }}
                    />
                </StaticCard>
                <StaticCard title="About"> 
                    This page is used to verify Pit Panda API Keys and save it in your browser so future requests will use it.
                </StaticCard>
                <StaticCard title="How">
                You can generate your own API key by downloading <a href="https://chattriggers.com/modules/v/PitPandaApiKeyManager">this ChatTriggers module</a> and running <code style={codeStyle}>/pitpandapi new</code>.
                </StaticCard>
                <StaticCard title="Why"> 
                    I created API Keys for Pit Panda so they can be used as a form of authentication as they are linked to your Minecraft UUID. <br />
                    For users that use a key, I allow +33% more requests per minute, and 2× that for Patreon supporters.
                </StaticCard>
            </div>
            <div style={{ display:'inline-block', verticalAlign:'top', width:'650px' }}>
                {keyInfo ? (
                    <>
                        <StaticCard title='Key Info'>
                            <strong>Owner UUID</strong>: {keyInfo.owner} <br />
                            <strong>Request Limit</strong>: {keyInfo.limit.toLocaleString()} <br />
                            <strong>Lifetime Used</strong>: {keyInfo.uses.toLocaleString()} <br />
                        </StaticCard>
                        <StaticCard title='Key Owner'>
                            <img src={`https://pitpanda.rocks/api/images/profile/${keyInfo.owner}`} alt={keyInfo.owner} />
                        </StaticCard>
                    </>
                ): (
                    <StaticCard title='Key Info'>
                        Waitng for you to put in a key
                    </StaticCard>
                )}
            </div>
        </div>
    );
}

export default KeyInfo;