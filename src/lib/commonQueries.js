export const create = async(table, data) => {
    try {
        let result = await table.create(data);
        return { status: true, data: result };
    } catch (error) {
        return { status: false, error };
    }
};

export const getAll = async(
    table,
    limit = 2,
    offset = 5,
    attributes = [],
    condition = {},
    include = []
) => {
    return await table.findAndCountAll({
        limit,
        offset,
        ...(Object.keys(condition).length && { where: condition }),
        ...(!!attributes.length && { attributes }),
        ...(Object.keys(include).length && include),
    });
};

export const getById = async(table, id) => {
    return await table.findByPk(id);
};

export const findOne = async(table, condition) => {
    return await table.findOne(condition);
};

export const update = async(table, data, condition) => {
    console.log('condition=>>', condition);

    return await table.update(data, { where: condition });
};

export const updateCount = async(
    table,
    column,
    op = "increment",
    value = 0,
    condition
) => {
    return await table[op](column, {
        by: value, // Amount to increment
        where: condition, // Condition
    });
};