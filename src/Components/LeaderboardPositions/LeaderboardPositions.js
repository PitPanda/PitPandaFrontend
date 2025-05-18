import React, { useState, useEffect } from 'react';
import boards from '../../scripts/leaderboards';
import Link from '../Link/Link';
import axios from 'axios';

const formatPosition = (n)=>{
    if(typeof n === 'undefined') return 'Loading';
    if(n===null) return 'N/A';
    if(n<=1) return <span className="tier-gold">{`#${n.toLocaleString()}`}</span>;
    if(n<=2) return <span className="tier-silver">{`#${n.toLocaleString()}`}</span>;
    if(n<=3) return <span className="tier-bronze">{`#${n.toLocaleString()}`}</span>;
    if(n<=10) return <span className="tier-6">{`#${n.toLocaleString()}`}</span>;
    if(n<=20) return <span className="tier-5">{`#${n.toLocaleString()}`}</span>;
    if(n<=50) return <span className="tier-4">{`#${n.toLocaleString()}`}</span>;
    if(n<=100) return <span className="tier-3">{`#${n.toLocaleString()}`}</span>;
    if(n<=250) return <span className="tier-2">{`#${n.toLocaleString()}`}</span>;
    if(n<=500) return <span className="tier-1">{`#${n.toLocaleString()}`}</span>;
    else return <span className="tier-default">{`#${n.toLocaleString()}`}</span>;
}

export default (props) => {
    const [positions, setPositions] = useState({});
    useEffect(()=>{
        let alive = true;
        (async()=>{
            const request = await axios.get(`/api/position/${props.uuid}`).catch(r=>r);
            const json = request.data;
            if(alive){
                if(!json.success) setPositions({error:(json.error||'An error has occured')});
                else setPositions(json.rankings);
            }
        })();
        return () => alive = false;
    }, [props.uuid]);
    
    return boards.ownKeys()
        .sort((a, b) => (positions[a] || Infinity) - (positions[b] || Infinity))
        .map(key => (
            <Link href={`/leaderboard?category=${key}&page=${Math.floor(((positions[key]||1)-1)/100)}`} key={key} scroll={true}>
                <div><span className="ranking tabular">{formatPosition(positions[key])}</span> • {boards[key].short}</div>
            </Link>
        ));
}