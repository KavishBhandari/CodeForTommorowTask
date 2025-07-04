'use strict';

const commonHelper = require('../../helper/commonHelper');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
   await queryInterface.bulkInsert('users', [{
       email: 'admin@codesfortomorrow.com',
       password: await commonHelper.hashedPassword("Admin123"),
       role: "admin"
     }], {});
  },

  async down (queryInterface, Sequelize) {
    
  }
};
