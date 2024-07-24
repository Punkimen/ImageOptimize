const sharp = require('sharp');
const fs = require('fs');

const inputFolder = 'images';
const outputFolder = 'optimizeImage';

const formats = ['webp'];

if (!fs.existsSync(inputFolder)) {
  fs.mkdirSync(outputFolder)
}


fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const inputPath = `${inputFolder}/${file}`;
      const name = file.substring(0, file.lastIndexOf('.'));

      formats.forEach(format => {
        const outputPath = `${outputFolder}/${name}.${format}`;

        if (!fs.existsSync(outputPath)) {
          sharp(inputPath)
            .toFormat(format, {quality: 95})
            .toFile(outputPath, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log(`${name}.${format} saved`);
              }
            });
        }
      });
    }
  });
});