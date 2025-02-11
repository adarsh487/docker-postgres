import db from "../../db.js";
import { DataTypes } from "sequelize";

const QuizSchema = db.define(
  "Questions",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    answerType: {
      type: DataTypes.ENUM("INPUT", "RADIO", "CHECKBOX"),
      allowNull: false,
    },
    options: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    answer: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
    },
  },
  { timestamps: true, indexes: [{ fields: ["id", "title", "answer_type"] }] }
);

export default QuizSchema;
