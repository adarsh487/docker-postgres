import db from "../../db.js";
import { DataTypes, Sequelize } from "sequelize";

const UserSchema = db.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userName", "id", "email", "phoneNumber"],
      },
    ],
  }
);
UserSchema.associate = async () => {
  const PostSchema = (await import("../posts/model.js")).default;
  UserSchema.belongsTo(PostSchema, {
    foreignKey: "post_id",
    as: "userPosts",
  });
};

export default UserSchema;
