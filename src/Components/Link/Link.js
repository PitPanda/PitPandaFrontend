import React from 'react';
import {withRouter} from 'react-router-dom';

const Link = withRouter((props) => {
    const onClick = e => {
        if(e.ctrlKey || e.button === 1) window.open(`${props.location.origin}${props.href}`).focus();
        else if((props.href!==props.location.pathname+props.location.search) && (e.button === 0)) {
            if(props.href.startsWith('http')) window.open(`${props.href}`).focus();
            else {
                props.history.push(props.href);
                if(props.scroll) window.scrollTo(0,0);
            }
        }
    }
    return (
        <div onMouseDown={onClick} style={{display:'inline',cursor:'pointer',...props.style}} className={props.className||''}>
            {props.children}
        </div>
    );
});

export default Link;