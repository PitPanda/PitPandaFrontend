import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import StaticCard from '../Cards/StaticCard';
import Text from '../Minecraft/Text';
import Link from '../Link/Link';
import PageSelector from '../PageSelector/PageSelector';
import boards from '../../scripts/leaderboards';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const defaultCategory = 'xp';

const containerStyle = {
    margin: 'auto',
    maxWidth: '1020px',
    width: '100%',
    padding: '0 10px',
    boxSizing: 'border-box'
};

const columnsContainerStyle = {
    display: 'flex',
    gap: '20px',
    textAlign: 'left'
};

const leftColumnStyle = {
    flex: '1 1 350px',
    maxWidth: '350px',
    minWidth: '300px'
};

const rightColumnStyle = {
    flex: '1 1 650px',
    maxWidth: '650px',
    minWidth: '300px'
};

const mobileMediaQuery = '@media (max-width: 1040px)';

async function getLeaderboard({ category = defaultCategory, page = 0 }) {
    try {
        const pageRequest = await axios.get(`/api/leaderboard/${category}?page=${page}`).catch(r=>r);
        const json = pageRequest.data;
        if (!json.success) return { error: (json.error || 'An error occured') };
        return json.leaderboard;
    } catch (e) {
    }
}

const getIndexerStatus = (() => {
    let lastUpdated = 0;
    return async () => {
        if(lastUpdated + 60e3 > Date.now()) return;
        lastUpdated = Date.now();
        const response = await axios.get('/api/indexer').catch(r=>r);
        const data = response.data;
        return data.data;
    }
})();

function getQuery(search) {
    let query = queryString.parse(search);
    return { category: query.category || defaultCategory, page: query.page || 0 };
}

function Leaderboard(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [target, setTarget] = useState(getQuery(location.search));
    const [data, setData] = useState({ entires: [], loadedType: defaultCategory, loadedPage: 0 });
    const [indexData, setIndexData] = useState({ online: false });

    useEffect(() => {
        setTarget(getQuery(location.search));
    }, [location.search]);

    useEffect(() => {
        let alive = true;
        getLeaderboard(target).then(stats=>{
            if(alive){
                if (stats.error) setData({ entires: [], loadedType: target.category, loadedPage: target.page });
                else setData({ entires: stats, loadedType: target.category, loadedPage: target.page });
            }
        }).catch(console.error);
        getIndexerStatus().then(indexer=>{
            if(alive && indexer) {
                if(indexer.error) console.log(indexer.error);
                else setIndexData(indexer);
            }
        }).catch(console.error);
        return () => alive = false;
    }, [target]);

    function linkBuilder(n){
        return `/leaderboard?category=${target.category}&page=${n-1}`;
    }

    return (
        <div style={containerStyle}>
            <style>{`
                ${mobileMediaQuery} {
                    .lb-columns {
                        flex-direction: column !important;
                    }
                    .lb-left-column,
                    .lb-right-column {
                        max-width: none !important;
                        width: 100% !important;
                        flex-basis: auto !important;
                    }
                }
            `}</style>
            <div className="search-header" style={{textAlign:'center'}}>
                <h1 className="page-header">Pit Panda Leaderboards</h1>
            </div>
            <div className='lb-columns' style={columnsContainerStyle}>
                <div className='lb-left-column' style={leftColumnStyle}>
                    <StaticCard title="Leaderboard Selector">
                        {boards.ownKeys().map(key => {
                            const board = boards[key];
                            return (
                                <div key={key+target.category}>
                                    <Link href={`/leaderboard?category=${key}&page=0`}>
                                        <span className={(key===target.category?'leaderboard-selected':'')}>{board.short}</span>
                                    </Link>
                                </div>
                            );
                        })}
                    </StaticCard>
                </div>

                <StaticCard title={boards[data.loadedType].displayName} className='lb-right-column' style={rightColumnStyle}>
                    {data.entires.map((user, index) => (
                        <div key={user.uuid} style={{ borderTop: (index !== 0 ? '2px solid #444' : 'none'), padding: '5px' }}>
                            <span class="tabular" style={{ width: '10%', textAlign: 'center', display: 'inline-block' }}>{`${data.loadedPage * 100 + index + 1}`}</span>
                            <Link href={`/players/${user.uuid}`}>
                                <Text raw={user.name} style={{ width: '50%' }} />
                            </Link>
                            <span class="tabular" style={{ width: '40%', textAlign: 'right', paddingRight: '8px', display: 'inline-block' }}>{boards[data.loadedType].transform(user.score)}</span>
                        </div>
                    ))}
                    {data.entires.length?<PageSelector start={1} current={Number(target.page)+1} linkBuilder={linkBuilder}/>:''}
                </StaticCard>
            </div>
        </div>
    );
}

export default Leaderboard;