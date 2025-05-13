const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');

const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const execPromise = promisify(exec);

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'optimized-images');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Image files to optimize
const imageFiles = [
  'clinical.jpg',
  'qna.jpg',
  'Medical-tools.jpg',
  'information.jpg',
  'management.jpg', 
  'documentation.jpg',
  'support.jpg'
];

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  for (const file of imageFiles) {
    const inputPath = path.join(PUBLIC_DIR, file);
    // Convert to lowercase and use webp format for better compression
    const outputName = file.toLowerCase().replace(/\.[^.]+$/, '.webp');
    const outputPath = path.join(OUTPUT_DIR, outputName);
    
    // Skip if file doesn't exist
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${file} - file not found`);
        continue;
      }
      
    console.log(`Optimizing ${file}...`);
    
    try {
      await sharp(inputPath)
        .resize({ width: 1200, height: 800, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      const savedSize = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(2);
      
      console.log(`✅ ${file} → ${outputName} (${savedSize}% smaller)`);
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error);
    }
  }

  console.log('Optimization complete!');
}

optimizeImages().catch(err => {
  console.error('Failed to optimize images:', err);
  process.exit(1);
}); 