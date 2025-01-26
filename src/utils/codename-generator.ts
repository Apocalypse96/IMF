const adjectives = [
    'Shadow', 'Phantom', 'Silent', 'Ghost', 'Dark', 'Midnight', 'Stealth',
    'Hidden', 'Secret', 'Covert', 'Golden', 'Silver', 'Iron', 'Crystal'
  ];
  
  const nouns = [
    'Eagle', 'Wolf', 'Hawk', 'Phoenix', 'Dragon', 'Serpent', 'Tiger',
    'Panther', 'Falcon', 'Raven', 'Cobra', 'Viper', 'Lion', 'Jaguar'
  ];
  
  export const generateCodename = (): string => {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `The ${adjective} ${noun}`;
  };