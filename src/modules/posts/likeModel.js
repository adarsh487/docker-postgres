import db from "../../db.js";
import { DataTypes } from "sequelize";
import UserSchema from "../users/model.js";
import PostSchema from "./model.js";
const PostLikeSchema = db.define(
  "PostsLikes",
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
    post_id: {
      type: DataTypes.UUID,
      references: {
        model: "Posts",
        key: "id",
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: true, indexes: [{ fields: ["id", "user_id"] }] }
);

PostLikeSchema.belongsTo(PostSchema, {
  foreignKey: "post_id",
  targetKey: "id",
  foreignKeyConstraint: true,
  as: "postUser",
});
PostLikeSchema.belongsTo(UserSchema, {
    foreignKey: "user_id",
    targetKey: "id",
    foreignKeyConstraint: true,
    as: "postLikedBy",
  });
export default PostLikeSchema;
