const {Crusade, Alliance} = require ('../data/schemas.js');

module.exports = async (crusadeId, allianceName) => {

    var crusade;

    try{
        crusade = await Crusade.findOne({_id: crusadeId});

        if (!crusade){
            //err
            return;
        }
        
        let newAlliance = new Alliance({
            name: allianceName,
            forces: [],
            members: []
        })
        crusade.alliances.push(newAlliance);

        await Crusade.findOneAndUpdate({_id: crusadeId}, {alliances: crusade.alliances});
        crusade = await Crusade.findOne({_id: crusadeId});

        for (alliance of crusade.alliances){
            if (alliance._id = newAlliance._id){
                return true;
            } else {
                return false;
            }
        }

    } catch (err){
        console.log(err);
    }
} 