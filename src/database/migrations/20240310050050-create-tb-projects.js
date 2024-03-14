'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_name: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      duration: {
        type: Sequelize.STRING
      },
      js: {
        type: Sequelize.STRING
      },
      react: {
        type: Sequelize.STRING
      },
      next: {
        type: Sequelize.STRING
      },
      node: {
        type: Sequelize.STRING
      },
      technologies: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      image: {
        type: Sequelize.STRING
      },
      author_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tb_users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_projects');
  }
};