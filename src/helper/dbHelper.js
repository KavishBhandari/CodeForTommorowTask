class DbHelper {

    getData = async (Model, attributes, conditions, findOne = true) => {
        const response = findOne ?
            Model.findOne({ attributes: attributes, ...conditions }) :
            Model.findAll({ attributes: attributes, ...conditions })
        return response;
    };

    updateData = async (Model, body, conditions, transaction) => {
        return await Model.update(body, { where: conditions }, { transaction });
    };

    deleteData = async (Model, conditions, transaction) => {
        return await Model.destroy({ where: conditions }, { transaction });
    };

    createData = async (Model, body, transaction, bulkcreate = false) => {
        const dataValues = bulkcreate ?
            await Model.bulkCreate(body, { transaction }) :
            await Model.create(body, { transaction })

        return bulkcreate ? dataValues : dataValues.dataValues;
    };

}
module.exports = new DbHelper();