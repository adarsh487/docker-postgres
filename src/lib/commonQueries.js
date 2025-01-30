export const create = async (table, data) => {
  try {
    let result = await table.create(data);
    return { status: true, data: result };
  } catch (error) {
    return { status: false, error };
  }
};

export const getAll = async (
  table,
  limit = 2,
  offset = 5,
  attributes = [],
  condition = {}
) => {
  return await table.findAndCountAll({
    limit,
    offset,
    ...(Object.keys(condition).length && { where: condition }),
    ...(!!attributes.length && { attributes }),
  });
};

export const getById = async (table, id) => {
  return await table.findByPk(id);
};
