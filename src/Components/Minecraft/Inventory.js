import React from 'react';
import MinecraftItemSlot from './ItemSlot';
import './minecraftStyles.css';

class Inventory extends React.Component {
    constructor(props){
        super(props);
        const width = props.width || 9;
        const rows = props.rows || 1;
        let len = (props.inventory || []).length;
        const toFill = Math.max(
            rows*width-len,
            width*Math.ceil(len/width)-len
        );
        let filler = new Array(toFill).fill({});
        let style = {...(props.style || {})};
        style.maxWidth=`${55.4*width}px`;
        this.state = {
            inventory: props.inventory,
            width,
            style,
            filler,
            showTitle: props.showTitle || false,
            title: props.title || '',
            hideIfEmpty: props.hideIfEmpty || false
        };
    }

    static getDerivedStateFromProps(props,state){
        if(props.inventory===state.inventory && 
           props.showTitle===state.showTitle && 
           props.title===state.title &&
           props.hideIfEmpty===state.hideIfEmpty)return state;
        const width = props.width || 9;
        const rows = props.rows || 1;
        let len = (props.inventory || []).length;
        const toFill = Math.max(
            rows*width-len,
            width*Math.ceil(len/width)-len
        );
        let filler;
        if(toFill===state.filler.length) filler = state.filler;
        else filler = new Array(toFill).fill({});
        let style = {...(props.style || {})};
        style.maxWidth=`${55.4*width}px`;
        return {
            inventory: props.inventory,
            width,
            style,
            filler,
            showTitle: props.showTitle || false,
            title: props.title || '',
            hideIfEmpty: props.hideIfEmpty || false
        };
    }

    isInventoryEmpty() {
        const inventory = this.state.inventory || [];
        return inventory.length === 0 || inventory.every(item => !item || !item.id);
    }

    render() {
        // If hideIfEmpty is true and inventory is empty, return null
        if (this.state.hideIfEmpty && this.isInventoryEmpty()) {
            return null;
        }

        return (
            <>
                {this.state.showTitle && this.state.title && (
                    <div className="inventory-title">{this.state.title}</div>
                )}
                <div style={this.state.style} className="MinecraftInventory">
                    {(this.state.inventory||[]).map((item,index)=>(
                        <MinecraftItemSlot 
                            key={(item.uuid||'')+index} item={item} colors={this.props.colors}
                            onClick={this.props.onClick?e=>this.props.onClick(index,e):()=>{}}
                            onContextMenu={this.props.onContextMenu?e=>this.props.onContextMenu(index,e):()=>{}}
                            unlockable={this.props.unlockable}
                        />
                    ))}
                    {this.state.filler.map((blank,index)=>(
                        <MinecraftItemSlot 
                            key={'filler'+index} item={blank} 
                            onClick={this.props.onClick?e=>this.props.onClick(index,e):()=>{}} 
                            onContextMenu={this.props.onContextMenu?e=>this.props.onContextMenu(index,e):()=>{}}
                            unlockable={this.props.unlockable}
                        />
                    ))}
                </div>
            </>
        );
    }
}

export default Inventory;