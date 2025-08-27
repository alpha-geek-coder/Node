import fs from 'node:fs'
import { Transform } from 'stream'
import { pipeline } from 'node:stream/promises';
import path from 'path'

const fileUrl = "https://www.gutenberg.org/files/2701/2701-0.txt";
const outputFilePath = path.join(process.cwd(), 'resources', 'moby.md');

async function downloadFile(url, outputPath) {
    const response = await fetch(url);
    if (!response.ok || !response.body) {
        throw new Error(`Failed to fetch ${url}, Status: ${response.status}`)
    }

    // Get total file size from headers
    const totalSize = parseInt(response.headers.get('content-length') || '0')
    let downloadSize = 0;

    // Create progress tracking transform
    const progressTransform = new Transform({
        transform(chunk, encoding, callback) {
            downloadSize += chunk.length;
            const percentage = totalSize ? ((downloadSize / totalSize) * 100).toFixed(1) : 'Unknown';
            
            // Clear line and show progress
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(
              `Progress: ${downloadSize}/${totalSize} bytes (${percentage}%)`
            );

            this.push(chunk); // Pass data through unchanged
            callback();
        }
    })
    const fileStream = fs.createWriteStream(outputPath);
    console.log(`Downloading file from ${url} to ${outputPath}`);

    await pipeline(
        response.body,
        progressTransform,
        fileStream
    )

    console.log('File download successful.');
}

async function readFile(filePath) {
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    try {
        for await (const chunk of readStream) {
            console.log('-- File chunk started ---');
            console.log(chunk);
            console.log('--- File chunk end ---');
        }
        console.log('Finished reading the file.')
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
    }
}

try {
    await downloadFile(fileUrl, outputFilePath);
    // await readFile(outputFilePath);
} catch (error) {
    console.error(`Error reading file: ${error.message}`);
}
