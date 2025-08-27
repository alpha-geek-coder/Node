import fs from 'node:fs/promises';

async function readFile() {
    const fileName = './resources/data.txt';
    try {
        const data = await fs.readFile(fileName, 'utf8');
        console.log('Content:', data);
        
        const content = '\nSome more new content';
        await fs.writeFile(fileName, content, { flag: "a+" });
        console.log("Wrote some content");

        const newContent = await fs.readFile(fileName, 'utf8');
        console.log(newContent);
    } catch (err) {
        console.error(err);
    }
}

readFile();