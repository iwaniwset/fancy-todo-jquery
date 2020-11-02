'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Todos', [{
      title: 'Makan Nasi',
      description: "Makan Nasi Bareng Edsheeran",
      status: "todo",
      due_date: "05-05-2020",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Minum Air',
      description: "Minum Air Bareng Dedy",
      status: "todo",
      due_date: "05-05-2020",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Todos', null, {});
  }
};