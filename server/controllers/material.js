const Material = require('../db/models/Material');

const fetchAllMaterials = async () => {
    count = await Material.getMaterialsCount();
    return await Material.getMaterials(0, count);
}

module.exports = {
    fetchAllMaterials: fetchAllMaterials,
}