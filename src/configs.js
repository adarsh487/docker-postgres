import dotenv from "dotenv";

const vars = dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
export default {
  DB_NAME: vars.parsed.DB_NAME,
  DB_USER: vars.parsed.DB_USER,
  PASSWORD: vars.parsed.PASSWORD,
  HOST: vars.parsed.HOST,
  PORT: vars.parsed.PORT,
  DIALECT: vars.parsed.DIALECT,
  GEMINI_KEY: vars.parsed.GEMINI_KEY,
};
