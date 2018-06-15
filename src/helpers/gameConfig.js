export default function getGameType(type) {
  console.log('type: ', type);
  const gameType = {
    1: 'Men/Boys',
    2: 'Women/Girls',
    3: 'Doubles(Men/Boys)',
    4: 'Doubles(Women/Girls)',
    5: 'Mixed Doubles'
  };
  return gameType[type];
}
