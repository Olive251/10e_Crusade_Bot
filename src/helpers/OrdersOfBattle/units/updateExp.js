const { Unit, OOB} = require ('../../../data/schemas.js');
// const Mongoose = require('mongoose');

module.exports = async (oobId, unitId, xpDif) => {
    try{
        let oob = await OOB.findById(oobId);
        var unit;
        for (u of oob.units) {
            if (u._id == unitId) {
                unit = u;
            }
        }

        unit.xp += xpDif;

        //check rank
        //if xp < 5, set to 'Battle-Ready'
        //if xp < 15, set to 'Blooded'
        //if xp < 30, set to 'Battle-Hardened'
        //if xp < 50, set to 'Heroic'
        //if xp 51 or greater, set to 'Legendary'
        
        switch (true){
            case (unit.xp >= 51):
                unit.rank = 'Legendary';
                break;
            case (unit.xp >= 31):
                unit.rank = 'Heroic';
                break;
            case (unit.xp >= 16):
                unit.rank = 'Battle-Hardened';
                break;
            case (unit.xp >= 6):
                unit.rank = 'Blooded'
                break;
            case (unit.xp >= 0):
                unit.rank = 'Battle-Ready';
                break;
            case (unit.xp < 0):
                unit.rank = 'Battle-Ready';
                unit.xp = 0;
                break;
        }

        //remove old unit from oob and put updated unit
        oob.units = oob.units.filter(u => u._id != unitId);
        oob.units.push(unit);

        //update oob
        await OOB.findOneAndUpdate(
            { _id: oobId },
            { $set: { units: oob.units} },
            {new: true}
        )

        return {r: true, unit: unit};
    }
    catch {
        return {r: false, unit: null};
    }
}