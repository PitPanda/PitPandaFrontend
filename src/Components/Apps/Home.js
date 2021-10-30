import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Link from '../Link/Link';
import TitlelessCard from '../Cards/TitlelessCard';
import frontendTools from '../../scripts/frontendTools';
import Text from '../Minecraft/Text';
import axios from 'axios';

const adIndex = Math.floor(Math.random() * 6);

const Home = (props) => {
  const [players, setPlayers] = useState();

  useEffect(() => {
    (async()=>{
      const response = await axios.get(`/api/randomplayers`).catch(r=>r);
      const data = response.data;
      if(!data.success) return;
      setPlayers(data.players);
    })();
  }, [props]);

  const imgStyle = {
    width:'100px',
    height:'100px',
    display: 'inline-block',
    borderRadius: '5%',
  }
  const textContainerStyle = {
    verticalAlign:'top',
    display:'inline-block',
    marginTop:'7px',
    marginLeft:'10px',
    fontSize:'17px',
    width: '70%',
  }

  return (
    <React.Fragment>
      <Header/>
      <div style={{
        width: '80%',
        maxWidth: '880px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 'auto',
      }}>
        {players?players.map((player, index) => {
          if(index === adIndex) return (
            <TitlelessCard key={player.uuid} style={{width:'410px',margin:'10px',display:'inline-block'}}>
              <Link href="https://discord.gg/wVGdGWcVdh">
                <img 
                  src={`/harry.gif`} 
                  style = {imgStyle}
                  alt = ''
                />
                <div key={player.uuid} style={textContainerStyle}>
                  <Text style={{fontSize:'110%'}} raw={`§eJoin mc.pitsandbox.io!`}/><br/>
                  <Text raw="Fast paced gamplay to test mystics, have fun 1v1s, and meet a new community." />
                </div>
              </Link>
            </TitlelessCard>
          );
          return (
            <TitlelessCard key={player.uuid}style={{width:'410px',margin:'10px',display:'inline-block'}}>
              <Link href={`/players/${player.uuid}`}>
                <img 
                  src={`https://crafatar.com/avatars/${player.uuid}?overlay=true`} 
                  style = {imgStyle}
                  alt = ''
                />
                <div key={player.uuid} style={textContainerStyle}>
                  <Text style={{fontSize:'110%'}} raw={player.name}/><br/>
                  <Text raw={`LVL: ${player.level}`}/><br/>
                  <Text raw={`Gold: §6${player.gold.toLocaleString()}g`}/><br/>
                  <Text raw={`Played: §f${frontendTools.minutesToString(player.playtime)}`}/>
                </div>
              </Link>
            </TitlelessCard>
          )
        }):''}
      </div>
    </React.Fragment>
  );
};

export default Home;
