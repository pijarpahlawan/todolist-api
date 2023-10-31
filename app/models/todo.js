const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // Todo.belongsTo(models.Activity, {
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      //   foreignKey: {
      //     name: 'id',
      //   },
      // });
    }
  }

  Todo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      todoId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'undefined',
      },
      // activityGroupId: {
      //   type: DataTypes.INTEGER,
      // allowNull: false,
      // },
      activityGroupId: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      priority: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'very-high',
      },
    },
    {
      sequelize,
      modelName: 'Todo',
      tableName: 'todos',
      underscored: true,
      paranoid: true,
    },
  );
  return Todo;
};
