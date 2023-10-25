const {OOB, Unit} = require('../../../data/schemas')

module.exports = async (uName, uType, uPoints, uWargearOptions, oobId) => {
    try{
        let nUnit = new Unit({
            name: uName,
            type: uType,
            pointsValue: uPoints,
            crusadePoints: uPoints,
            xp: 0,
            killCount: 0,
            rank: 'Battle-Ready',
            enhancement: {
                name: 'none',
                pointsValue: 0,
            },
            wargearOptions: uWargearOptions
        })

        let oob = await OOB.findOneAndUpdate(
            {_id: oobId}, 
            {$push: {units: nUnit}},
            {new: true}
        );
        
        if (oob){
            return {result: true, oobName: oob.name};
        } else return {result: false};
        

    }
    catch (err){
        console.log(`Error in newUnit\n${err}`);
    }

}