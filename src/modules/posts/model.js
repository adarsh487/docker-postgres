import db from "../../db.js";
import { DataTypes } from "sequelize";
import UserSchema from "../users/model.js";

const PostSchema = db.define(
  "Posts",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    media: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    // type: {
    //   type: DataTypes.ENUM("TEXT", "IMAGE", "VIDEO"),
    //   allowNull: false,
    // },
    likes: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    comments: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  },
  { timestamps: true, indexes: [{ fields: ["id", "user_id"] }] }
);

PostSchema.belongsTo(UserSchema, {
  foreignKey: "user_id",
  targetKey: "id",
  foreignKeyConstraint: true,
  as: "postUser",
});

export default PostSchema;
