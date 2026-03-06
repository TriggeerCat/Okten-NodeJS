const afs = require("node:fs/promises");
const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

const start = async () => {
    const readPath = path.join(process.cwd(), 'emails.txt');
    const writePath = path.join(process.cwd(), 'emailsSorted.txt');

    const readStream = fs.createReadStream(readPath, 'utf-8');
    const rl = readline.createInterface({input: readStream});

    await afs.unlink(writePath);

    try {
        for await (const line of rl) {
            const email = line.toString().split('\t\t\t')[1];
            if (email.split('@')[1] === 'gmail.com') await afs.appendFile(writePath, `${email}\n`);
        }
    }
    finally {
        rl.close();
    }
}

start().then();