'use strict';
const {
  Model,
  STRING
} = require('sequelize');

const moment = require('moment')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "title is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "description is required"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "status is required"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      // get: function () {
      //   return moment(this.getDataValue('birth_date')).format('YYYY-MM-DD')
      // },
      validate: {
        notEmpty: {
          args: true,
          msg: "due_date is required"
        },
        isAfter: {
          args: `${new Date(new Date().setDate(new Date().getDate()-1))}`,
          msg: "can't fill the past day"
        }
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "UserId required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};