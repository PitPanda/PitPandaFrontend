import React from 'react';
import './cardStyles.css'

class TabbedCard extends React.Component {

    state = {selected:0};

    onClick = (id,e) => {
        e.preventDefault();
        const tab = this.props.tabs[id];
        if(typeof tab === 'object' && tab.disabled) return;
        this.setState({selected:id});
    }

    render() {
        return (
            <div className="Card">
                <div className="Card-Head">
                    <ul style={{display: this.props.scrollable ? 'flex' : 'inherit', flexWrap: this.props.scrollable ? 'wrap' : undefined}}>
                        {this.props.tabs.map((tab,i)=>{
                            const name = typeof tab === 'string' ? tab : tab.name;
                            const disabled = typeof tab === 'object' && tab.disabled;
                            return (
                                <li style={{
                                        borderBottom: (i===this.state.selected)?'2px solid #999999':'none',
                                        opacity: disabled ? '0.5' : '1',
                                        cursor: disabled ? 'not-allowed' : 'pointer'
                                    }} 
                                    key={i} 
                                    onClick={e => this.onClick(i,e)}
                                >
                                    {name}
                                </li>
                            );
                        })}
                    </ul>
                    
                    <label className="expander-container show-on-mobile">
                        <input type="checkbox" className="expander-checkbox"/>
                        <span className="expander-icon"></span>
                    </label>
                </div>
                <div className={`Card-Body ${this.props.scrollable ? 'card-body-scroll' : ''}`}>
                    {this.props.content[this.state.selected]}
                </div>
            </div>
        );
    }
}

export default TabbedCard;
