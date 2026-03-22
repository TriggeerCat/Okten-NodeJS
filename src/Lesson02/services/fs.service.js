const fs = require("node:fs/promises");
const path = require("node:path");

const usersFilePath = path.join(process.cwd(), "db", "users.json");

const read = async () => {
    try {
        const json = await fs.readFile(usersFilePath, "utf-8");
        return json ? JSON.parse(json) : [];
    } catch (e) {
        console.log(e);
    }
};

const write = async (users) => {
    try {
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    read,
    write
};
