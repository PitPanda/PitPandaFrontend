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

const containerStyle = {
    margin: 'auto',
    maxWidth: '1020px',
    width: '100%',
    padding: '0 20px',
    boxSizing: 'border-box'
};

const columnsContainerStyle = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
};

const leftColumnStyle = {
    flex: '1',
    minWidth: '300px',
    maxWidth: '350px'
};

const rightColumnStyle = {
    flex: '1',
    minWidth: '300px'
};

const mobileMediaQuery = '@media (max-width: 768px)';

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
        <>
            <style>{`
                ${mobileMediaQuery} {
                    .keyinfo-container {
                        padding: 0 10px !important;
                    }
                    .keyinfo-columns {
                        flex-direction: column !important;
                    }
                    .keyinfo-left-column,
                    .keyinfo-right-column {
                        max-width: none !important;
                        width: 100% !important;
                    }
                }
            `}</style>
            <div className="keyinfo-container" style={containerStyle}>
                <div id="search-header" style={{ textAlign:'center' }}>
                    <h1 className="page-header">Pit Panda API Keys</h1>
                </div>
                <div className="keyinfo-columns" style={columnsContainerStyle}>
                    <div className="keyinfo-left-column" style={leftColumnStyle}>
                        <StaticCard title='Input Key'>
                            <input
                                type="text"
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                value={fieldKey}
                                style={{
                                    width:'75%',
                                    fontFamily: 'Gabarito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                                    fontSize: '16px',
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
                        <StaticCard title="About"> 
                            This page is used to verify a Pit Panda API key and save it in your browser so future requests will use it.
                        </StaticCard>
                        <StaticCard title="How">
                        You can generate your own API key by downloading <a href="https://chattriggers.com/modules/v/PitPandaApiKeyManager">this ChatTriggers module</a> and running <code style={codeStyle}>/pitpandapi new</code>.
                        </StaticCard>
                        <StaticCard title="Why"> 
                            I created API keys for Pit Panda so they can be used as a form of authentication as they are linked to your Minecraft UUID. <br />
                            If you're a <a href="https://patreon.com/PitPanda" target="_blank">Patreon supporter</a>, get 2× more requests and access to searching nonces in the Mystic Search.
                        </StaticCard>
                    </div>
                    <div className="keyinfo-right-column" style={rightColumnStyle}>
                        {keyInfo ? (
                            <>
                                <StaticCard title='Key Info'>
                                    <strong>Owner UUID</strong>: {keyInfo.owner} <br />
                                    <strong>Request Limit</strong>: {keyInfo.limit.toLocaleString()} <br />
                                    <strong>Lifetime Used</strong>: {keyInfo.uses.toLocaleString()} <br />
                                </StaticCard>
                                <StaticCard title='Key Owner'>
                                    <img src={`https://pitpanda.rocks/api/images/profile/${keyInfo.owner}`} alt={keyInfo.owner} style={{width:'100%', maxWidth: '478px'}} />
                                </StaticCard>
                            </>
                        ): (
                            <StaticCard title='Key Info'>
                                Enter a key to see information about it.
                            </StaticCard>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default KeyInfo;