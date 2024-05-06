import fs from "fs";

fs.copyFile(".env.example", ".env", (err) => {
  if (err) throw err;
  console.log(".env file created successfully!");
});
