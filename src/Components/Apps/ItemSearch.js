import React, { useEffect, useState } from 'react';
import StaticCard from '../Cards/StaticCard';
import QueryBox from '../QueryBox/QueryBox';
import { withRouter } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { itemsAtom, queryStringAtom, fetchItems } from '../../Store/ItemSearchStore';
import { ItemSearchInventory } from '../Minecraft/ItemSearchInventory';

const pageSize = 72;

const ItemSearch = props => {
    const setItems = useSetRecoilState(itemsAtom);
    const [loading, setLoading] = useState(false);
    const [lastSize, setLastSize] = useState(0);
    const [page, setPage] = useState(0);
    const [querystring, setQuerystring] = useRecoilState(queryStringAtom);
    
    useEffect(() => {
        if(props.match.params.query) setQuerystring(props.match.params.query)
    }, [props.match.params.query, setQuerystring]);

    useEffect(() => {
        props.history.push(`/itemsearch/${querystring}`);
        setLoading(true);
        setPage(0);
        fetchItems(querystring).then(items => {
            setItems(items);
            setLastSize(items.length);
            setLoading(false);
        });
    }, [querystring, props.history, setItems, setLoading]);

    useEffect(() => {
        if(!page) return;
        setLoading(true);
        fetchItems(querystring, page).then(items => {
            setItems(old => [...old, ...items]);
            setLastSize(items.length);
            setLoading(false);
        });
    }, [page, querystring, setItems])

    return (
        <div className="search-header" style={{textAlign:'center'}}>
            <h1 className="page-header">Pit Panda Mystic Search</h1>

            <div className="mystic-search-container">

            <QueryBox className="mystic-query-card" query={setQuerystring} baseQuery={props.match.params.query} />

                <StaticCard title="Results" className="mystic-results-card">
                    <ItemSearchInventory />
                    {lastSize===pageSize&&!loading?
                    <div style={{margin:'auto',textAlign:'center'}}>
                        <button onClick={() => setPage(p => p + 1)} className='srchBtn'>Load More</button>
                    </div>:''}
                </StaticCard>

            </div>
        </div>
    )
}

export default withRouter(ItemSearch);