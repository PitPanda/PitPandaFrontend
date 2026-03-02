import React, { useState } from 'react';
import './StatsDisplay.css';

// Import icons
import ironSword from '../../Images/iron_sword.png';
import ironChestplate from '../../Images/iron_chestplate.png';
import diamond from '../../Images/diamond.png';
import enchantmentTable from '../../Images/enchantment_table.png';
import wheat from '../../Images/wheat.png';
import obsidian from '../../Images/obsidian.png';
import stoneHoe from '../../Images/stone_hoe.png';

// Removes Minecraft color codes (e.g. §a, §6, etc.) from any string
const stripColorCodes = (str = '') => str.replace(/§[0-9A-FK-OR]/gi, '');

const MinecraftColorText = ({ text }) => {
  const colorMap = {
    '0': 'm0', '1': 'm1', '2': 'm2', '3': 'm3', '4': 'm4', '5': 'm5', '6': 'm6', '7': 'm7',
    '8': 'm8', '9': 'm9', 'a': '', 'b': 'mb', 'c': 'mc', 'd': 'md', 'e': 'me', 'f': 'mf',
  };

  const parts = text.split(/(§[0-9a-fr])/gi);
  const spans = [];
  let currentColorClass = '';

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('§')) {
      const code = part[1].toLowerCase();
      if (code === 'r') {
        currentColorClass = '';
      } else {
        currentColorClass = colorMap[code] || currentColorClass;
      }
    } else if (part.length > 0) {
      spans.push(
        <span key={i} className={currentColorClass}>
          {part}
        </span>
      );
    }
  }

  return <>{spans}</>;
};

// Icon mapping for stats categories
const getIconForCategory = (categoryName) => {
  const cleanName = stripColorCodes(categoryName).toLowerCase();
  
  if (cleanName.includes('offensive')) return ironSword;
  if (cleanName.includes('defensive')) return ironChestplate;
  if (cleanName.includes('performance')) return wheat;
  if (cleanName.includes('perks') || cleanName.includes('mystics')) return enchantmentTable;
  if (cleanName.includes('farming')) return stoneHoe;
  if (cleanName.includes('prestige')) return diamond;
  if (cleanName.includes('misc')) return obsidian;
  
  // Default fallback
  return diamond;
};

// Props:
// - items: array of Item objects (as provided by the backend) where each
//   object contains a `name` and `desc` array.
// The component renders a row of selectable tabs (one per item). Clicking a tab
// will display that item's description lines in a simple, mobile-friendly list.
const StatsDisplay = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) {
    return <div className="stats-display">No statistics available.</div>;
  }

  const activeItem = items[activeIndex] || {};

  return (
    <div className="stats-display">
      <div className="stats-tabs">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`stats-tab${idx === activeIndex ? ' active' : ''}`}
            onClick={() => setActiveIndex(idx)}
          >
            <img 
              src={getIconForCategory(item.name)} 
              alt="" 
              className="stats-tab-icon"
            />
            {stripColorCodes(item.name)}
          </div>
        ))}
      </div>
      <div className="stats-content">
        {(activeItem.desc || []).map((rawLine, idx) => {
          const colonIdx = rawLine.indexOf(':');
          if (colonIdx !== -1) {
            const label = stripColorCodes(rawLine.slice(0, colonIdx + 1));
            const value = rawLine.slice(colonIdx + 1);
            return (
              <div key={idx} className="stat-line">
                {label}
                <span className="value">
                  <MinecraftColorText text={value} />
                </span>
              </div>
            );
          }
          // Fallback if no colon present
          return (
            <div key={idx} className="stat-line">
              <MinecraftColorText text={rawLine} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsDisplay; 