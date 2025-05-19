import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Link from '../Link/Link';
import TitlelessCard from '../Cards/TitlelessCard';
import frontendTools from '../../scripts/frontendTools';
import Text from '../Minecraft/Text';
import axios from 'axios';

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
          return (
            <TitlelessCard key={player.uuid}style={{width:'410px',margin:'10px',display:'inline-block'}}>
              <Link href={`/players/${player.uuid}`}>
                <img 
                  src={`https://h.matdoes.dev/2d/${player.uuid}`} 
                  className = "home-player-avatar"
                  alt = ''
                />
                <div key={player.uuid} style={textContainerStyle}>
                  <Text style={{fontSize:'110%'}} raw={player.name}/><br/>
                  Level: <Text raw={`${player.level}`}/><br/>
                  Gold: <Text raw={`§6${player.gold.toLocaleString()}g`}/><br/>
                  Played: <Text raw={`§f${frontendTools.minutesToString(player.playtime)}`}/>
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
