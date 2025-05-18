import React from 'react';
import {withRouter} from 'react-router-dom';

const Link = withRouter((props) => {
    const { isNavLink, ...restProps } = props;
    const onClick = e => {
        if(e.ctrlKey || e.button === 1) window.open(`${restProps.location.origin}${restProps.href}`).focus();
        else if((restProps.href!==restProps.location.pathname+restProps.location.search) && (e.button === 0)) {
            if(restProps.href.startsWith('http')) window.open(`${restProps.href}`).focus();
            else {
                restProps.history.push(restProps.href);
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
});

export default Link;