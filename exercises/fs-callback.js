import fs from "node:fs";

fs.open('./resources/data.txt', 'r', (err, fd) => {
  if (err) throw err;

  // Create a buffer to read data into
    const buffer = Buffer.alloc(1024); // 1KB buffer
    
  fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead) => {
    if (err) throw err;
    console.log("Bytes read:", bytesRead);
      console.log("Content:", buffer.subarray(0, bytesRead).toString());
      
      fs.close(fd, (err) => {
        if (err) throw err;
        console.log("file closed");
      });
  });

})