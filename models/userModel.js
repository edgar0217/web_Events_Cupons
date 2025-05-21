import { DataTypes } from "sequelize";
import db from "../db/db.js";

const User = db.define("User", {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM("admin", "superadmin"),
    allowNull: false,
    defaultValue: "admin",
  },
});

export default User;
