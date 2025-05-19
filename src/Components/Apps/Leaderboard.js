import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import StaticCard from '../Cards/StaticCard';
import Text from '../Minecraft/Text';
import Link from '../Link/Link';
import PageSelector from '../PageSelector/PageSelector';
import boards from '../../scripts/leaderboards';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const defaultCategory = 'xp';

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
    const [target, setTarget] = useState(getQuery(props.location.search));
    const [data, setData] = useState({ entires: [], loadedType: defaultCategory, loadedPage: 0 });
    const [indexData, setIndexData] = useState({ online: false });

    useEffect(() => {
        return props.history.listen(
            async location => setTarget(getQuery(location.search))
        );
    });

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
        <div className="search-header" style={{textAlign:'center'}}>
            <h1 className="page-header">Pit Panda Leaderboards</h1>
            <div style={{ textAlign: 'left', width: '1020px', margin: 'auto' }}>
                <div style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '20px' }}>
                    <StaticCard title="Leaderboard Selector" style={{ width: '350px' }}>
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

                <StaticCard title={boards[data.loadedType].displayName} style={{ width: '650px', display: 'inline-block' }}>
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

export default withRouter(Leaderboard);