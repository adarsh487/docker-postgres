"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      media: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true,
      },
      likes: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      comments: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Posts");
  },
};
