import React from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '../Link/Link';
import logo from '../../Images/logo.png';
import sadLogo from '../../Images/logo_sad.png';
import searchIcon from '../../Images/svg/search.svg';

class PlayerForm extends React.Component {
    constructor(props) {
        super(props);
        this.searchInputRef = React.createRef();
        this.state = {
            isSearchFocused: false,
        };
    }
    
    componentDidMount() {
        // auto focus search input
        this.focusSearchInput();
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const srch = e.target.srchInp.value.trim().replace(/-/g,'');
        if(srch!=='') {
            window.location.assign(`/players/${srch}`);
            e.target.srchInp.value='';
        }
    }

    focusSearchInput = () => {
        if (this.searchInputRef.current) {
            this.searchInputRef.current.focus();
        }
    }

    handleFocus = () => {
        this.setState({ isSearchFocused: true });
    }

    handleBlur = () => {
        this.setState({ isSearchFocused: false });
    }

    render() {
        const { isSearchFocused } = this.state;
        const { hidden, sad } = this.props;
        
        // hide header when stats loaded
        if (hidden) {
            return null;
        }
        
        return (
            <div id="search-header">
                <div style={{display: 'flex', justifyContent: 'center'}} className="page-header">
                    <img src={sad ? sadLogo : logo} alt="Pit Panda Logo" className="header-logo" /> <h1>P<Link href='/signatures'>i</Link>t Panda</h1>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <h3 className="page-subheader">The Advanced Pit Stats Grabber</h3>
                    <div className="text-holder">
                        <div className="search-input-wrapper">
                            <img 
                                src={searchIcon} 
                                alt="Search" 
                                className={`header-search-icon ${isSearchFocused ? '' : 'icon-blurred'}`}
                                onClick={this.focusSearchInput}
                            />
                            <input 
                                type="text" 
                                id="srchInp" 
                                name="lookup" 
                                placeholder="Enter a Minecraft Username or UUID..." 
                                style={{width:"100%"}} // This needs improvement
                                ref={this.searchInputRef}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                            />
                        </div>
                    </div>
                    <div className="button-holder">
                        <input type="submit" className="srchBtn" value="Search"/>
                    </div>
                </form>
            </div>
        );
    }
}

function HeaderWithRouter(props) {
    const navigate = useNavigate();
    return <PlayerForm {...props} navigate={navigate} />;
}

export default HeaderWithRouter;