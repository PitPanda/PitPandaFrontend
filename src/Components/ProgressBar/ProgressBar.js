import React from 'react';
import './ProgressBar.css';
import Text from './../Minecraft/Text';
import ItemImg from './../Minecraft/ItemImg';

class ProgressBar extends React.Component {
    render() {
        const {info, item} = this.props;
        const hover = info.message || Math.round(info.percent*1000)/10 + '%';
        return (
            <div title={hover} className="ProgressBar" style={this.props.style}>
                <div className={`progress-icon ${this.props.type}bg`}>
                    <ItemImg {...item}/>
                </div>
                <div style={{display:'inline-block',minWidth:'270px',verticalAlign:'top',height:'40px',paddingTop:'3px'}}>
                    <div className="progress-name-container">
                        {this.props.title}
                    </div>
                    <div className="progress-bar">
                        <div className={`progress-bar-progress ${this.props.type}bg`} style={{width:(Math.min(info.percent,1)*100)+'%'}}/>
                        <div className="progress-bar-text">
                            {info.description}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgressBar;
