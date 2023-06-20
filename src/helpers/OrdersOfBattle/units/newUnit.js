const {OOB, Unit} = require('../../../data/schemas')

module.exports = async (uName, uType, uPoints, oobId) => {

    console.log(`new unit`);

    try{
        let nUnit = new Unit({
            name: uName,
            type: uType,
            pointsValue: uPoints,
            crusadePoints: uPoints,
            xp: 0,
            killCount: 0,
            rank: 'Battle-Ready',

        })

        let oob = await OOB.findOneAndUpdate(
            {_id: oobId}, 
            {$push: {units: nUnit}},
            {new: true}
        );
        
        

    }
    catch (err){
        console.log(`Error in newUnit\n${err}`);
    }

}