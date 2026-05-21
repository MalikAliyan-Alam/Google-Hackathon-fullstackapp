const agent1_ingestion = (rawText) => {
  // Clean the raw text
  const cleaned = rawText
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Split into chunks of max 500 words
  const words = cleaned.split(' ');
  const chunks = [];
  for (let i = 0; i < words.length; i += 500) {
    chunks.push(words.slice(i, i + 500).join(' '));
  }

  // Detect topic (first 10 words as topic summary)
  const topic = words.slice(0, 10).join(' ');

  // Detect date if present
  const dateMatch = cleaned.match(/\d{4}-\d{2}-\d{2}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}/);
  const date = dateMatch ? dateMatch[0] : new Date().toISOString().split('T')[0];

  const result = {
    source_type: 'news_article',
    topic: topic,
    date: date,
    cleaned_text: cleaned,
    chunks: chunks,
    word_count: words.length,
    chunk_count: chunks.length
  };

  console.log('[Agent 1 - Ingestion] ✓ Content cleaned and chunked');
  console.log(`[Agent 1 - Ingestion] ✓ Words: ${words.length}, Chunks: ${chunks.length}`);
  console.log('[Agent 1 - Ingestion] ✓ Passing to Agent 2...');

  return result;
};

module.exports = agent1_ingestion;
