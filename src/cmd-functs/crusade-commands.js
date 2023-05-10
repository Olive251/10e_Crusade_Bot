const {Crusade} = require('../data/schemas.js');

const register_crusade = async (name, guild) => {
  //TODO check to make sure the crusade does not already exist before adding
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
  try{
    if (name){
      crusade = await Crusade.findOne({name: name, guildID: guild});
    } else {
      crusade = await Crusade.find({guildID: guild});
    }
  }catch (err){
    console.log(err);
    throw err;
  }  

  if (crusade) 
    return crusade;
  else return false;
}

const remove_crusade = async (name, guild) => {
  var results;
  try{
    results = await Crusade.deleteOne({name: name, guildID: guild});
  } catch (err) {
    console.log(err);
    throw err;
  }
  
  if (!await Crusade.findOne({name: name, guildID: guild})){
    return true;
  } else return false;
}

module.exports = {register_crusade, find_crusade, remove_crusade};