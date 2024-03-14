~'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_projects.init({
    project_name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    description: DataTypes.TEXT,
    duration:DataTypes.STRING,
    js: DataTypes.STRING,
    react: DataTypes.STRING,
    next: DataTypes.STRING,
    node: DataTypes.STRING,
    technologies: DataTypes.ARRAY(sequelize.STRING),
    image: DataTypes.STRING,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_projects',
  });
  return tb_projects;
};