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

  files.forEach((file, index) => {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.webp')) {
      const inputPath = `${inputFolder}/${file}`;
      // const name = `img_${index + 1}`; // можно сгенерить своё имя если надо
      const name = file.substring(0, file.lastIndexOf('.' )); // имя по-умолчанию, как назван фаил

      formats.forEach(format => {
        const outputPath = `${outputFolder}/${name}.${format}`;

        if (!fs.existsSync(outputPath)) {
          sharp(inputPath)
              // если не нужно менять размер, можно просто закоментировать эту строчку
            .resize({ width: 1920})// можно задать размер изображения, например если для галерии 600px, мы можем использовать width: 600, высота подстроиться авто.
            .toFormat(format, {quality: 95, compressionLevel: 3})
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