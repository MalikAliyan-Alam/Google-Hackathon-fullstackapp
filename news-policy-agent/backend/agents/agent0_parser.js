const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const agent0_parser = async (filePath, fileType) => {
  console.log('[Agent 0 - Parser] ✓ File received:', filePath);
  console.log('[Agent 0 - Parser] ✓ File type:', fileType);

  try {
    let extractedText = '';

    if (fileType === 'pdf') {
      console.log('[Agent 0 - Parser] ✓ Parsing PDF...');
      const dataBuffer = fs.readFileSync(filePath);
      const parser = new PDFParse({ data: dataBuffer });
      const pdfData = await parser.getText();
      extractedText = pdfData.text;
      console.log(`[Agent 0 - Parser] ✓ PDF pages: ${pdfData.total}`);
      console.log(`[Agent 0 - Parser] ✓ Raw text length: ${extractedText.length}`);

      // Clean extracted text properly
      extractedText = extractedText
        .replace(/\s+/g, ' ')
        .replace(/[^\x20-\x7E\n]/g, ' ')
        .trim();

      if (extractedText.length > 4000) {
        extractedText = extractedText.substring(0, 4000);
      }

      console.log(`[Agent 0 - Parser] ✓ Cleaned text: ${extractedText.substring(0, 100)}...`);
    }

    else if (fileType === 'image') {
      console.log('[Agent 0 - Parser] ✓ Reading image as base64...');
      const imageBuffer = fs.readFileSync(filePath);
      extractedText = imageBuffer.toString('base64');
      console.log('[Agent 0 - Parser] ✓ Image converted to base64');
    }

    // Cleanup temp file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('[Agent 0 - Parser] ✓ Temp file cleaned up');
    }

    console.log('[Agent 0 - Parser] ✓ File parsed successfully');
    console.log('[Agent 0 - Parser] ✓ Passing to Agent 1...');

    return {
      success: true,
      fileType: fileType,
      extractedText: fileType === 'pdf' ? extractedText : null,
      imageBase64: fileType === 'image' ? extractedText : null,
      parsedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error('[Agent 0 - Parser] ✗ Error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = agent0_parser;
