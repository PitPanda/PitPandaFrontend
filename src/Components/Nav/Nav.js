import React, {useState, useEffect, useRef} from 'react';
import {withRouter} from 'react-router-dom';
import Link from '../Link/Link';
import './Nav.css';
import logo from '../../Images/logo.png';
import searchIcon from '../../Images/svg/search.svg';
import mysticsIcon from '../../Images/svg/mystics.svg';
import leaderboardIcon from '../../Images/svg/leaderboards.svg';

function Nav(props){
    const buttons = [
        {name:'Pit Panda', path:'/', hasLogo: true},
        {name:'Mystics',path:'/itemsearch', isButton: true, icon: mysticsIcon},
        {name:'Leaderboards',path:'/leaderboard', isButton: true, icon: leaderboardIcon},
    ];
    const findBest = (path) => {
        let best = 0;
        for(let i = 0; i < buttons.length; i++){
            if(path.startsWith(buttons[i].path)) best = i;
        }
        return best;
    }
    let [selected, setSelected] = useState(findBest(window.location.pathname));
    let [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    
    useEffect(()=>{
        return props.history.listen((location)=>setSelected(findBest(location.pathname)));
    });
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery && searchQuery.trim() !== '') {
            props.history.push(`/players/${searchQuery}`);
            setSearchQuery('');
        }
    };
    
    const focusSearchInput = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };
    
    return (
        <div className='nav'>
            <div className='nav-links'>
                {buttons.map((info,index)=>(
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Link key={info.path} href={info.path} className={index===selected?'active':''} isNavLink={info.isButton}>
                            {info.hasLogo ? (
                                <React.Fragment>
                                    <img src={logo} alt="Pit Panda Logo" className="nav-logo" />
                                    <span className="nav-icon-text">{info.name}</span>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <img src={info.icon} alt={info.name} className="nav-icon" />
                                    <span className="nav-icon-text">{info.name}</span>
                                </React.Fragment>
                            )}
                        </Link>
                    </div>
                ))}
            </div>
            <div className='nav-search'>
                <form onSubmit={handleSearch} className="search-form">
                    <img 
                        src={searchIcon} 
                        alt="Search" 
                        className={`search-icon ${isSearchFocused ? '' : 'icon-blurred'}`}
                        onClick={focusSearchInput}
                    />
                    <input
                        type="text"
                        className="nav-search-input"
                        placeholder="Search for a player..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        ref={searchInputRef}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                </form>
            </div>
        </div>
    );
} export default withRouter(Nav);