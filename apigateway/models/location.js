'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      country: {
        type: DataTypes.STRING,
        is: ['^[a-zA-Z0-9_ ]+$', 'i'],
      },
      city: {
        type: DataTypes.STRING,
        is: ['^[a-zA-Z0-9_ ]+$', 'i'],
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['country', 'city'],
        },
      ],
    },
  );
  Location.associate = models => {
    Location.hasMany(models.User, {
      foreignKey: 'locationId',
      as: 'users',
    });
  };

  Location.findOneOrCreate = async ({ country, city }) => {
    const [location] = await Location.findOrCreate({
      where: { country, city },
    });
    return location;
  };
  return Location;
};
