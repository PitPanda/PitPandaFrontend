import React from 'react';
import StaticCard from '../Cards/StaticCard';
import TabbedCard from '../Cards/TabbedCard';
import NumberedCard from '../Cards/NumberedCard';
import Text from '../Minecraft/Text';
import Inventory from '../Minecraft/Inventory';
import ProgressBar from '../ProgressBar/ProgressBar';
import Header from '../Header/Header';
import PlayerList from '../PlayerList/PlayerList';
import LeaderboardPositions from '../LeaderboardPositions/LeaderboardPositions';
import frontendTools from '../../scripts/frontendTools';
import { withRouter } from 'react-router-dom';
import external from '../../Images/svg/external.svg';
import nadeshiko from '../../Images/nadeshiko_logo.png';

import axios from 'axios';

const upperFirst = str => str.charAt(0).toUpperCase() + str.substring(1);

class Player extends React.Component {
  state = {user:null,alive:true};

  componentDidMount(){
    this.loadUser(`/players/${(this.props.match.params.id||'').trim()}`);
    this.unlisten = this.props.history.listen((location)=>{
      this.loadUser(location.pathname);
    });
  }

  componentWillUnmount(){
    this.setState({alive:false});
    this.unlisten();
  }

  loadUser = async (path) => {
    if(!path.startsWith('/players/'))return;
    const response = await axios.get(`/api${path}`).catch(r=>r);
    const json = response.data;
    if(json.success && this.state.alive) {
      this.setState({user:json.data,error:undefined});
    } else this.setState({error:json.error,user:undefined});
  }

  render() {
    return (
      <React.Fragment>
        <Header history={this.props.history}/>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {this.state.user?(
            <React.Fragment>
              <div id="side" style={{
                display: 'inline-block',
                margin: '20px',
                minWidth: '350px'
              }}>
                <StaticCard title="Profile">
                  <div>
                    <img 
                      src={`https://crafatar.com/avatars/${this.state.user.uuid}?overlay=true`} 
                      style = {{width:'100px', height:'100px', display:'inline-block'}}
                      alt = ''
                    />
                    <div key={this.state.user.uuid} style={{verticalAlign:'top', display:'inline-block', marginTop:'7px',marginLeft:'10px', fontSize:'17px'}}>
                      <Text style={{fontSize:'110%'}} raw={this.state.user.formattedName}/><br/>
                      Level: <Text raw={`${this.state.user.formattedLevel}`}/><br/>
                      Gold: <Text raw={`§6${this.state.user.currentGold.toLocaleString()}g`}/><br/>
                      Played: <Text raw={`§f${frontendTools.minutesToString(this.state.user.playtime)}`}/>
                    </div>

                  </div>

                  <a className="hypixel-stats-link" href={`https://nadeshiko.io/player/${this.state.user.uuid}`} target="_blank" rel="noopener noreferrer"><img className="hypixel-stats-logo" src={nadeshiko} alt="nadeshiko logo" ></img> Hypixel Stats <img className="hypixel-stats-logo" src={external} alt="External link"></img></a>

                </StaticCard>
                {this.state.user.displays.map((display,i,a) => {
                  const key = `${this.state.user.uuid}-${display.display_type}-${i}`;
                  switch(display.display_type){
                    case 'flag': {
                      return (
                        <StaticCard title={upperFirst(display.type)} key={key} >
                          <div style={{maxWidth:'300px'}}>
                            This player has been marked as a {display.type} by the <a href="https://discord.gg/CdTmYrG">Trade Center Discord</a> staff.
                            {display.notes?<><br/><br/>Trade Center Staff notes:<br/> {display.notes}</>:''}
                            {display.discordid?<><br/><br/>Discord ID: <br/>{display.discordid}</>:''}
                            {display.main?<><br/><br/>Main:<br/><PlayerList players={[{tag:display.main}]} instant={true} /></>:''}
                          </div>
                        </StaticCard>
                      );
                    }
                    case 'plaque': {
                      return (
                        <StaticCard title={display.title} key={key}>
                          <div style={{maxWidth:'300px'}}>
                            {(display.description||[]).map((seg,i) => {
                              switch (seg.type){
                                case 'text':
                                  return (
                                    <div style={{paddingBottom:'5px'}} key={`${key}-${i}`}>
                                      {seg.content.split('\\n').map((str, i2) => <p style={{marginBottom:'5px'}} key={`${key}-${i}-${i2}`}>{str}</p>)}
                                    </div>
                                  )
                                case 'link':
                                  return <React.Fragment key={`${key}-${i}`}><a href={seg.url} style={{marginBottom:'10px',display:'block'}}>{seg.title || seg.url}</a></React.Fragment>
                                default:
                                  return '';
                              }
                            })}
                            {(display.alts&&display.alts.length)?<><br/><br/>Alts:<br/><PlayerList players={display.alts.map(alt=>({tag:alt}))} instant={true} /></>:''}
                            {display.main?<><br/><br/>Main:<br/><PlayerList players={[{tag:display.main}]} instant={true} /></>:''}
                          </div>
                        </StaticCard>
                      );
                    }
                    default:
                      return '';
                  }
                })}
                <StaticCard title="Status" content={
                  <div style={{fontSize:'16px'}}>
                    <div className='text-title' style={{color:this.state.user.online?'green':'red'}}>
                      {this.state.user.online ? 'Online' : 'Offline'}
                    </div>
                    <div>Last seen in The Pit {frontendTools.timeSince(this.state.user.lastSave)} ago</div>
                    {this.state.user.online ? '' : <>
                      <div>Last seen on Hypixel {frontendTools.timeSince(this.state.user.lastLogout)} ago</div>
                    </>}
                    {this.state.user.bounty ? <div>Bounty: <span className={`text-bounty ${this.state.user.bounty >= 5000 ? 'bounty-big' : ''}`}>{this.state.user.bounty.toLocaleString()}g</span></div> : ''}
                  </div>
                }/>
                <StaticCard title="Progress" content={
                  <div>
                    <ProgressBar 
                      info={this.state.user.xpProgress} 
                      item={{id:384}} type="xp" title="Prestige XP"
                    />
                    <ProgressBar 
                      info={this.state.user.goldProgress} 
                      item={{id:266}} type="gold" title="Prestige Gold"
                    />
                    <ProgressBar 
                      info={this.state.user.renownProgress} 
                      item={{id:138}} type="renown" title="Renown Shop" style={{marginBottom:'0px'}}
                    />
                  </div>
                }/>
                <StaticCard title={<>Rankings</>} key={'positions'+this.state.user.uuid}>
                  <LeaderboardPositions uuid={this.state.user.uuid} />
                </StaticCard>
              </div>
              <div id="main" style={{
                display: 'inline-block',
                margin: '20px',
                minWidth: '600px'
              }}>
                <TabbedCard tabs={["Inventory","Ender Chest","Stashes"]} content={[
                  (
                    <div key={`Inventory-${this.state.user.uuid}`}>
                      <Inventory key='main' inventory={this.state.user.inventories.main} rows={4} colors={true} style={{marginRight:'3px'}}/>
                      <Inventory key='armor' inventory={this.state.user.inventories.armor} width={1} rows={4} colors={true}/>
                    </div>
                  ),(
                    <div key={`Enderchest-${this.state.user.uuid}`}>
                      <Inventory key='enderchest' inventory={this.state.user.inventories.enderchest} rows={3} colors={true}/>
                    </div>
                  ),(
                    <div key={`Stash/Well-${this.state.user.uuid}`}>
                      <Inventory key='well' style={{verticalAlign:'top'}} inventory={this.state.user.inventories.well} width={2} rows={1} colors={true} hideIfEmpty={true} showTitle={true} title='Well'/>
                      <Inventory key='spireStash' inventory={this.state.user.inventories.spireStash} width={2} rows={1} colors={true} hideIfEmpty={true} showTitle={true} title='Spire Stash'/>
                      <Inventory key='stash' inventory={this.state.user.inventories.stash} rows={2} colors={true} style={{marginRight:'3px'}} hideIfEmpty={true} showTitle={true} title='Stash'/>
                    </div>
                  )
                ]}/>
                <StaticCard title="Statistics" content={
                  <div key={`General-${this.state.user.uuid}`}>
                    <Inventory key='genstats' inventory={this.state.user.inventories.generalStats} width={this.state.user.inventories.generalStats.length} style={{margin:'0 auto', display:'block'}}/>
                  </div>
                }/>
                <TabbedCard tabs={["Perks & Passives","Renown"]} content={[
                  (
                    <div key={`Perk-${this.state.user.uuid}`}>
                      <Inventory key='perks' inventory={this.state.user.inventories.perks} width={this.state.user.inventories.perks.length} style={{margin:'0 auto', display:'block'}}/>
                      <hr/>
                      <Inventory key='killstreaks' inventory={this.state.user.inventories.killstreaks} width={this.state.user.inventories.killstreaks.length} style={{margin:'0 auto', display:'block'}}/>
                      <hr/>
                      <Inventory key='upgrades' inventory={this.state.user.inventories.upgrades} width={7} style={{margin:'0 auto', display:'block'}} unlockable={true}/>
                    </div>
                  ),(
                    <div key={`Renown-${this.state.user.uuid}`}>
                      <Inventory key='renownshop' inventory={this.state.user.inventories.renownShop} width={7} style={{margin:'0 auto', display:'block'}} unlockable={true}/>
                    </div>
                  )
                ]}/>
                <NumberedCard key={this.state.user.uuid} content={this.state.user.prestiges.map((prestige,index)=>(
                  <div>
                    {prestige.timestamp?<h3 style={{marginBottom:'10px'}}>Unlocked on {(new Date(prestige.timestamp)).toLocaleString()}</h3>:''}
                    {prestige.gold&&this.state.user.prestiges.length-1!==index?<h3 style={{marginBottom:'10px'}}>Completed with {frontendTools.abbrNum(prestige.gold,2)}g earned</h3>:''}
                    <table style={{width:'100%'}}>
                      <tbody>
                        <tr>
                        <td><strong>Type</strong></td><td><strong>Upgrade</strong></td><td><strong>Unlocked</strong></td>
                        </tr>
                        {prestige.unlocks.length>0?prestige.unlocks.slice().reverse().map((item,i)=>
                          <tr key={i}>
                            <td>{item.type}</td><td>{item.displayName} {(typeof item.tier === 'number')?item.tier+1:''}</td><td className='tabular'>{(new Date(item.timestamp)).toLocaleString()}</td>
                          </tr>
                        ):(
                          <tr>
                            <td>No unlocks this prestige</td><td></td><td></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                ))}/>
              </div>
            </React.Fragment>
          ):(
            <div style={{color:"white"}}>
              {this.state.error||"Loading..."}
            </div>
          )
          }
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Player);
