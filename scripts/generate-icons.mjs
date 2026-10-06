/**
 * Generate PWA icons as PNG files.
 *
 * This script creates simple PNG icons with the Savevero brand colors.
 * Run with: node scripts/generate-icons.mjs
 *
 * Note: This generates basic PNG icons. For production, replace with
 * properly designed icons using a design tool.
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { deflateSync } from "zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// Ensure public directory exists
mkdirSync(publicDir, { recursive: true });

/**
 * Create a minimal PNG file with a solid color.
 * This is a simplified PNG generator for basic icons.
 */
function createSolidPNG(width, height, r, g, b, a = 255) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type (RGBA)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // Create raw pixel data
  const rawData = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const rowStart = y * (1 + width * 4);
    rawData[rowStart] = 0; // filter byte
    for (let x = 0; x < width; x++) {
      const pixelStart = rowStart + 1 + x * 4;
      rawData[pixelStart] = r;
      rawData[pixelStart + 1] = g;
      rawData[pixelStart + 2] = b;
      rawData[pixelStart + 3] = a;
    }
  }

  // Compress
  const compressed = deflateSync(rawData);

  // Build PNG
  const chunks = [signature];

  // IHDR chunk
  const ihdrChunk = Buffer.alloc(8 + 13 + 4);
  ihdrChunk.writeUInt32BE(13, 0);
  ihdrChunk.write("IHDR", 4);
  ihdr.copy(ihdrChunk, 8);
  const ihdrCrc = crc32(ihdrChunk.slice(4, 8 + 13));
  ihdrChunk.writeUInt32BE(ihdrCrc, 8 + 13);
  chunks.push(ihdrChunk);

  // IDAT chunk
  const idatChunk = Buffer.alloc(8 + compressed.length + 4);
  idatChunk.writeUInt32BE(compressed.length, 0);
  idatChunk.write("IDAT", 4);
  compressed.copy(idatChunk, 8);
  const idatCrc = crc32(idatChunk.slice(4, 8 + compressed.length));
  idatChunk.writeUInt32BE(idatCrc, 8 + compressed.length);
  chunks.push(idatChunk);

  // IEND chunk
  const iendChunk = Buffer.alloc(12);
  iendChunk.writeUInt32BE(0, 0);
  iendChunk.write("IEND", 4);
  const iendCrc = crc32(iendChunk.slice(4, 8));
  iendChunk.writeUInt32BE(iendCrc, 8);
  chunks.push(iendChunk);

  return Buffer.concat(chunks);
}

// CRC32 implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Brand colors
const brandBg = [27, 24, 54]; // #1b1836
const brandFg = [247, 246, 241]; // #f7f6f1

// Generate icons
const sizes = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "icon-maskable-512.png", size: 512 },
];

for (const { name, size } of sizes) {
  // Create a simple solid color icon with brand background
  const png = createSolidPNG(size, size, ...brandBg);
  writeFileSync(join(publicDir, name), png);
  console.log(`Generated ${name} (${size}x${size})`);
}

console.log("\nPWA icons generated successfully!");
console.log("Note: These are basic solid-color icons. Replace with properly designed icons for production.");
