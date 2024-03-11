'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tb_projects',
      [
        {
          project_name: 'Dumbways APP 2022',
          start_date: '2023-01-01',
          end_date: '2023-05-31',
          description: 'This APP can download now.',
          duration: '5 Months',
          js: 'on',
          react: 'undefined',
          next: 'undefined',
          node: 'undefined',
          technologies: '{js.svg}',
          image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
          createdAt: 'now()',
          updatedAt: 'now()'
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_projects', null, {});
  }
};
