const {Crusade} = require('../data/schemas.js');

const register_crusade = async (name, guild) => {
  try {
      const newCrusade = new Crusade({
        name,
        guildID: guild,
        alliances: []
      });
      const savedCrusade = await newCrusade.save();
      //console.log(`Created new crusade ${savedCrusade.name} for server "${guild}" with ID "${savedCrusade._id}"`);
      return savedCrusade;
    } catch (err) {
      console.error(`Error creating crusade: ${err}`);
      throw err;
    }
}

const find_crusade = async (guild, name) => {
  var crusade;

  if (name){
    crusade = await Crusade.findOne({name: name, guildID: guild});
  } else {
    crusade = await Crusade.find({guildID: guild});
  }

  console.log('found ' + crusade);

  if (crusade) 
    return crusade;
  else return false;
}

module.exports = {register_crusade, find_crusade};