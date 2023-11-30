const transformerUser = (data) => {
  delete data.password;
  return {
    id: data._id,
    name: data.name,
    email: data.email,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

module.exports = transformerUser;
