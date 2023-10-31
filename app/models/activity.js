const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      // Activity.hasMany(models.Todo, {
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      //   foreignKey: {
      //     name: 'id',
      //   },
      // });
    }
  }
  Activity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      activityId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'undefined',
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Activity',
      tableName: 'activities',
      underscored: true,
      paranoid: true,
    },
  );
  return Activity;
};
