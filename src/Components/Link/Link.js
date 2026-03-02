import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

const Link = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isNavLink, ...restProps } = props;
    
    const onClick = e => {
        if(e.ctrlKey || e.button === 1) window.open(`${location.origin || window.location.origin}${restProps.href}`).focus();
        else if((restProps.href!==location.pathname+location.search) && (e.button === 0)) {
            if(restProps.href.startsWith('http')) window.open(`${restProps.href}`).focus();
            else if(restProps.href.startsWith('/players/')) window.location.assign(restProps.href);
            else {
                navigate(restProps.href);
                if(restProps.scroll) window.scrollTo(0,0);
            }
        }
    }

    const baseStyle = isNavLink ? {}: {display:'inline',cursor:'pointer'};

    return (    
        <div onMouseDown={onClick} style={{...baseStyle,...restProps.style}} className={(restProps.className + (isNavLink ? ' nav-button' : ''))||''}>
            {restProps.children}
        </div>
    );
};

export default Link;