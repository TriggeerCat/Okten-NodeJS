const fs = require('node:fs');
const afs = require('node:fs/promises')
const path = require('node:path');
const readline = require('node:readline/promises')


const start = async () => {
    const emailPath = path.join(process.cwd(), 'emails.txt');
    const sortedPath = path.join(process.cwd(), 'emailsSorted.txt');

    await afs.unlink(sortedPath);

    const fileStream = fs.createReadStream(emailPath, 'utf-8');
    const rl = readline.createInterface({input: fileStream});
    try {
        for await (const line of rl) {
            if (line.split('@')[1] === 'gmail.com')
                await afs.appendFile(sortedPath, line.split('\t\t\t')[1] + '\n');
        }
    } finally {
        await rl.close();
    }
}

start().then();