const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const outputPath = filePath;
  
  try {
    const stats = await fs.stat(filePath);
    const fileSizeInMB = stats.size / (1024 * 1024);
    
    if (ext === '.png') {
      await sharp(filePath)
        .resize(2000, 2000, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .png({
          quality: 90,
          compressionLevel: 9,
          palette: true
        })
        .toFile(outputPath + '.tmp');
        
      await fs.rename(outputPath + '.tmp', outputPath);
      console.log(`✓ Optimisé: ${filePath}`);
      
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(filePath)
        .resize(2000, 2000, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({
          quality: 85,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath + '.tmp');
        
      await fs.rename(outputPath + '.tmp', outputPath);
      console.log(`✓ Optimisé: ${filePath}`);
    }
    
    const newStats = await fs.stat(filePath);
    const newFileSizeInMB = newStats.size / (1024 * 1024);
    
    if (newFileSizeInMB < fileSizeInMB) {
      const reduction = ((fileSizeInMB - newFileSizeInMB) / fileSizeInMB * 100).toFixed(1);
      console.log(`  Réduction: ${reduction}% (${fileSizeInMB.toFixed(2)}MB → ${newFileSizeInMB.toFixed(2)}MB)`);
    }
    
  } catch (error) {
    console.error(`✗ Erreur avec ${filePath}:`, error.message);
  }
}

async function findImages(dir) {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory() && item.name !== 'backup' && item.name !== 'node_modules') {
      files.push(...await findImages(fullPath));
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

async function main() {
  console.log('🎨 Optimisation des images en cours...\n');
  
  const imagesDir = path.join(__dirname, 'public', 'images');
  const images = await findImages(imagesDir);
  
  console.log(`Trouvé ${images.length} images à optimiser\n`);
  
  // Créer une sauvegarde
  const backupDir = path.join(imagesDir, 'backup');
  try {
    await fs.mkdir(backupDir, { recursive: true });
  } catch (error) {
    // Le dossier existe déjà
  }
  
  // Optimiser les images une par une
  for (const imagePath of images) {
    // Sauvegarder d'abord
    const backupPath = path.join(backupDir, path.basename(imagePath));
    try {
      await fs.copyFile(imagePath, backupPath);
    } catch (error) {
      // Continuer même si la sauvegarde échoue
    }
    
    await optimizeImage(imagePath);
  }
  
  console.log('\n✅ Optimisation terminée!');
}

main().catch(console.error);
