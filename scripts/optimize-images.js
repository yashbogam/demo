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

async function ensureDirectoryExists(dir) {
  if (!(await exists(dir))) {
    await mkdir(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Simple SVG optimizer function
async function optimizeSvg(inputPath, outputPath) {
  try {
    // Read the SVG file
    const svgContent = await readFile(inputPath, 'utf8');
    
    // Basic SVG optimization - remove comments, extra spaces, and newlines
    const optimizedSvg = svgContent
      .replace(/<!--(.*?)-->/g, '') // Remove comments
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .replace(/\s{2,}/g, ' ') // Replace multiple spaces with a single space
      .trim();
    
    // Write the optimized SVG to the destination
    await writeFile(outputPath, optimizedSvg);
    
    console.log(`✅ Optimized SVG: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error optimizing SVG ${inputPath}:`, error.message);
    return false;
  }
}

async function main() {
  // Ensure the optimized-images directory exists
  const outputDir = 'public/optimized-images';
  await ensureDirectoryExists(outputDir);
  
  // Large JPGs to optimize
  const largeImages = [
    'med_knowledge.jpg',
    'clinical_dataset.jpg',
    'med_exam.jpg',
    'coverage.jpg',
    'integration.jpg',
    'ai-training.jpg',
    'data-quality.jpg',
  ];

  // Process JPGs to optimized WebP
  for (const imageName of largeImages) {
    const inputPath = `public/${imageName}`;
    const outputPath = `${outputDir}/${imageName.replace('.jpg', '.webp')}`;
    
    try {
      if (!(await exists(inputPath))) {
        console.warn(`Warning: ${inputPath} does not exist. Skipping.`);
        continue;
      }
      
      console.log(`Optimizing ${imageName}...`);
      await sharp(inputPath)
        .resize(1200) // Limit max width to 1200px while maintaining aspect ratio
        .webp({ quality: 80 }) // Convert to WebP with 80% quality
        .toFile(outputPath);
      
      console.log(`✅ Created optimized ${outputPath}`);
    } catch (error) {
      console.error(`❌ Error optimizing ${imageName}:`, error.message);
    }
  }

  // PNG images to convert to WebP
  const pngImages = [
    'Microsoft.svg.png',
    'Kaggle.svg.png'
  ];

  // Process PNGs to WebP
  for (const imageName of pngImages) {
    const inputPath = `public/${imageName}`;
    const outputPath = `${outputDir}/${imageName.replace('.png', '.webp')}`;
    
    try {
      if (!(await exists(inputPath))) {
        console.warn(`Warning: ${inputPath} does not exist. Skipping.`);
        continue;
      }
      
      console.log(`Converting ${imageName} to WebP...`);
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`✅ Created WebP version: ${outputPath}`);
    } catch (error) {
      console.error(`❌ Error converting ${imageName}:`, error.message);
    }
  }

  // SVG files to optimize
  const svgImages = [
    'openai.svg',
    'nvidia.svg',
    'google.svg',
    'HuggingFace.svg',
    'hero.svg',
    '002.svg'
  ];

  // Process SVGs - copy to optimized folder
  for (const imageName of svgImages) {
    const inputPath = `public/${imageName}`;
    const outputPath = `${outputDir}/${imageName}`;
    
    try {
      if (!(await exists(inputPath))) {
        console.warn(`Warning: ${inputPath} does not exist. Skipping.`);
        continue;
      }
      
      console.log(`Optimizing SVG ${imageName}...`);
      await optimizeSvg(inputPath, outputPath);
    } catch (error) {
      console.error(`❌ Error processing SVG ${imageName}:`, error.message);
    }
  }

  console.log(`\n🎉 Image optimization complete! Optimized images are in ${outputDir}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
}); 