const Material = require('../db/models/Material');

const fetchAllMaterials = async () => {
    count = await Material.getMaterialsCount();
    return await Material.getMaterials(0, count);
}

const addMaterial = async (material) => {
    if (material.Alternative) {
        material.Alternative = await Material.findByCode(material.Alternative);
    }
    newMaterial = new Material(material);
    await newMaterial.save();
    return newMaterial;
}

module.exports = {
    fetchAllMaterials: fetchAllMaterials,
    addMaterial: addMaterial,
}