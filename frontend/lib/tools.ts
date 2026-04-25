export const tools = [
  // ===== CORE TOOLS (6) =====
  { name: 'Text Tools', emoji: '🔤', category: 'text', url: '/tools/text', description: 'UPPER, lower, Title, camelCase, snake_case, kebab-case' },
  { name: 'JSON Formatter', emoji: '📄', category: 'converter', url: '/tools/json', description: 'Pretty print, minify, validate JSON' },
  { name: 'UUID Generator', emoji: '🎲', category: 'generator', url: '/tools/uuid', description: 'Generate unique IDs in bulk' },
  { name: 'Color Converter', emoji: '🎨', category: 'color', url: '/tools/color', description: 'HEX ↔ RGB ↔ HSL conversion' },
  { name: 'Base64 Encoder', emoji: '🔒', category: 'encoder', url: '/tools/base64', description: 'Encode and decode Base64' },
  { name: 'Password Checker', emoji: '🔐', category: 'security', url: '/tools/password', description: 'Check strength & get tips' },

  // ===== COLOR TOOLS (7) =====
  { name: 'Color Converter Pro', emoji: '🎨', category: 'color', url: '/tools/color/converter', description: 'HEX, RGB, HSL conversion' },
  { name: 'Contrast Checker', emoji: '✅', category: 'color', url: '/tools/color/contrast', description: 'WCAG accessibility checker' },
  { name: 'Blindness Simulator', emoji: '👁️', category: 'color', url: '/tools/color/blindness', description: 'Simulate color blindness' },
  { name: 'Gradient Generator', emoji: '🌈', category: 'color', url: '/tools/color/gradient', description: 'Create smooth color gradients' },
  { name: 'Palette Generator', emoji: '🎨', category: 'color', url: '/tools/color/palette', description: 'Generate color palettes' },

  // ===== IMAGE TOOLS (8) =====
  { name: 'Placeholder Generator', emoji: '🖼️', category: 'image', url: '/tools/image/placeholder', description: 'Generate placeholder images' },
  { name: 'QR Code Generator', emoji: '📱', category: 'image', url: '/tools/image/qr-code', description: 'Generate QR codes' },
  { name: 'Avatar Generator', emoji: '👤', category: 'image', url: '/tools/image/avatar', description: 'Generate custom avatars' },
  { name: 'Image Compressor', emoji: '📦', category: 'image', url: '/tools/image/compressor', description: 'Compress PNG, JPG, WebP' },
  { name: 'Image Resizer', emoji: '📐', category: 'image', url: '/tools/image/resizer', description: 'Resize images with presets' },
  { name: 'Image Format Converter', emoji: '🔄', category: 'image', url: '/tools/image/format-converter', description: 'Convert between image formats' },
  { name: 'Image to Base64', emoji: '📝', category: 'image', url: '/tools/image/to-base64', description: 'Convert images to Base64' },
  { name: 'Image Noise Reducer', emoji: '✨', category: 'image', url: '/tools/image/noise-reducer', description: 'Reduce image noise' },

  // ===== PDF TOOLS (5) =====
  { name: 'PDF Generator', emoji: '📝', category: 'pdf', url: '/tools/pdf/generator', description: 'Create PDF from text input' },
  { name: 'PDF Merger', emoji: '📎', category: 'pdf', url: '/tools/pdf/merger', description: 'Merge multiple PDFs into one' },
  { name: 'PDF Splitter', emoji: '✂️', category: 'pdf', url: '/tools/pdf/splitter', description: 'Split PDFs by page range' },
  { name: 'PDF to Text', emoji: '📄', category: 'pdf', url: '/tools/pdf/to-text', description: 'Extract text from PDF' },
  { name: 'PDF Watermark Remover', emoji: '🧹', category: 'pdf', url: '/tools/pdf/watermark-remover', description: 'Remove watermarks from PDFs' },

  // ===== TYPOGRAPHY & TEXT (7) =====
  { name: 'PX to REM Converter', emoji: '📐', category: 'typography', url: '/tools/typography/px-rem', description: 'Convert pixels to rem units' },
  { name: 'Word Counter', emoji: '📝', category: 'typography', url: '/tools/typography/word-count', description: 'Count words, chars, paragraphs' },
  { name: 'Slug Generator', emoji: '🔗', category: 'text', url: '/tools/string/slug', description: 'Generate URL slugs' },
  { name: 'String Reverser', emoji: '⬅️', category: 'text', url: '/tools/string/reverse', description: 'Reverse text' },
  { name: 'Palindrome Checker', emoji: '↔️', category: 'text', url: '/tools/string/palindrome', description: 'Check palindromes' },
  { name: 'Lipsum Generator', emoji: '📚', category: 'text', url: '/tools/text/lipsum', description: 'Generate Lorem Ipsum text' },
  { name: 'Lorem Picker', emoji: '📖', category: 'text', url: '/tools/text/lorem-picker', description: 'Pick Lorem Ipsum text' },
  { name: 'Markdown Preview', emoji: '📝', category: 'text', url: '/tools/text/markdown-preview', description: 'Preview markdown in real-time' },

  // ===== CALCULATORS (18) =====
  { name: 'Age Calculator', emoji: '🎂', category: 'calculator', url: '/tools/calculator/age', description: 'Calculate age from birth date' },
  { name: 'BMI Calculator', emoji: '⚖️', category: 'calculator', url: '/tools/calculator/bmi', description: 'Calculate Body Mass Index' },
  { name: 'Loan Calculator', emoji: '💰', category: 'calculator', url: '/tools/calculator/loan', description: 'Calculate loan payments' },
  { name: 'Mortgage Calculator', emoji: '🏠', category: 'calculator', url: '/tools/calculator/mortgage', description: 'Calculate mortgage payments' },
  { name: 'ROI Calculator', emoji: '📈', category: 'calculator', url: '/tools/calculator/roi', description: 'Calculate return on investment' },
  { name: 'GPA Calculator', emoji: '🎓', category: 'calculator', url: '/tools/calculator/gpa', description: 'Calculate GPA' },
  { name: 'Tip & Split Calculator', emoji: '🍽️', category: 'calculator', url: '/tools/calculator/tip-split', description: 'Calculate tips and split bills' },
  { name: 'Discount Calculator', emoji: '💳', category: 'calculator', url: '/tools/calculator/discount', description: 'Calculate discounts' },
  { name: 'Currency Converter', emoji: '💱', category: 'calculator', url: '/tools/calculator/currency', description: 'Convert between currencies' },
  { name: 'Universal Converter', emoji: '🔄', category: 'calculator', url: '/tools/calculator/universal-converter', description: 'Convert units and measurements' },
  { name: 'Percentage Calculator', emoji: '📊', category: 'calculator', url: '/tools/calculator/percentage', description: 'Calculate percentages' },
  { name: 'Tip Calculator', emoji: '💰', category: 'calculator', url: '/tools/calculator/tip', description: 'Calculate tips quickly' },
  { name: 'Statistics', emoji: '📈', category: 'calculator', url: '/tools/calculator/statistics', description: 'Mean, median, std dev' },
  { name: 'Scientific Calculator', emoji: '🧮', category: 'calculator', url: '/tools/calculator/scientific', description: 'sin, cos, tan, sqrt, log, factorial' },
  { name: 'Base Converter', emoji: '🔢', category: 'calculator', url: '/tools/calculator/base', description: 'Decimal ↔ Hex ↔ Binary ↔ Octal' },
  { name: 'Unit Converter', emoji: '📏', category: 'calculator', url: '/tools/calculator/units', description: 'Length, weight, temperature, data' },

  // ===== CODE TOOLS (2) =====
  { name: 'CSS Minifier', emoji: '🎨', category: 'code', url: '/tools/code/css-minifier', description: 'Minify CSS code' },
  { name: 'HTML Minifier', emoji: '🏷️', category: 'code', url: '/tools/code/html-minifier', description: 'Minify HTML code' },

  // ===== GENERATORS (3) =====
  { name: 'Barcode Generator', emoji: '📊', category: 'generator', url: '/tools/misc/barcode', description: 'Generate barcodes' },
  { name: 'Meta Tags Generator', emoji: '🏷️', category: 'seo', url: '/tools/misc/meta-tags', description: 'Generate SEO meta tags' },
  { name: 'Invoice Generator', emoji: '📋', category: 'generator', url: '/tools/misc/invoice', description: 'Generate invoices' },

  // ===== ENCODERS/CRYPTO (2) =====
  { name: 'URL Encoder', emoji: '🔗', category: 'encoder', url: '/tools/crypto/url', description: 'Encode and decode URLs' },
  { name: 'Hash Generator', emoji: '#️⃣', category: 'encoder', url: '/tools/crypto/hash', description: 'Generate MD5, SHA256' },

  // ===== VALIDATORS (3) =====
  { name: 'Email Validator', emoji: '✉️', category: 'validator', url: '/tools/validators/email', description: 'Validate email addresses' },
  { name: 'URL Validator', emoji: '✔️', category: 'validator', url: '/tools/validators/url', description: 'Validate URLs' },
  { name: 'JSON Validator', emoji: '📄', category: 'validator', url: '/tools/validators/json', description: 'Validate JSON format' },

  // ===== REFERENCE & UTILITIES (8) =====
  { name: 'Tailwind Cheat Sheet', emoji: '🎨', category: 'reference', url: '/tools/misc/tailwind', description: 'Tailwind CSS reference' },
  { name: 'Regex Tester', emoji: '🧪', category: 'reference', url: '/tools/misc/regex', description: 'Test regular expressions' },
  { name: 'Regex Patterns Lib', emoji: '📚', category: 'reference', url: '/tools/misc/regex-patterns', description: 'Common regex patterns' },
  { name: 'Text Scratchpad', emoji: '📝', category: 'text', url: '/tools/misc/scratchpad', description: 'Quick text editor' },
  { name: 'IP Validator', emoji: '🌐', category: 'validator', url: '/tools/misc/ip', description: 'Validate IPv4/IPv6' },
  { name: 'UUID Validator', emoji: '🔍', category: 'validator', url: '/tools/misc/uuid-validator', description: 'Validate UUID format' },
  { name: 'Prime Checker', emoji: '🔢', category: 'math', url: '/tools/misc/prime', description: 'Check if number is prime' },
  { name: 'Fibonacci Gen', emoji: '🔀', category: 'math', url: '/tools/misc/fibonacci', description: 'Generate Fibonacci sequence' },

  // ===== CONVERTERS (5) =====
  { name: 'Timezone Converter', emoji: '⏰', category: 'converter', url: '/tools/misc/timezone', description: 'Convert between timezones' },
  { name: 'Unit Converter (Advanced)', emoji: '📏', category: 'converter', url: '/tools/misc/unit-converter', description: 'Advanced unit conversion' },
  { name: 'File Size Converter', emoji: '💾', category: 'converter', url: '/tools/converter/file-size', description: 'Convert between file size units' },
  { name: 'vCard Generator', emoji: '📇', category: 'generator', url: '/tools/misc/vcard', description: 'Generate vCard files' },
  { name: 'Markdown to HTML', emoji: '📝', category: 'converter', url: '/tools/misc/markdown', description: 'Convert Markdown to HTML' },

  // ===== UTILITIES (5) =====
  { name: 'Text Statistics', emoji: '📊', category: 'text', url: '/tools/misc/text-stats', description: 'Analyze text statistics' },
  { name: 'Checksum Generator', emoji: '🔐', category: 'encoder', url: '/tools/misc/checksum', description: 'Generate file checksums' },

  // ===== ADDITIONAL TOOLS (6) =====
  { name: 'ASCII Code Lookup', emoji: '🔤', category: 'reference', url: '/tools/misc/ascii', description: 'ASCII character code reference' },
  { name: 'Binary Translator', emoji: '0️⃣', category: 'converter', url: '/tools/misc/binary', description: 'Convert text to binary and vice versa' },
  { name: 'SVG to PNG', emoji: '🖼️', category: 'image', url: '/tools/misc/svg-to-png', description: 'Convert SVG images to PNG' },
  { name: 'Data URI Generator', emoji: '📦', category: 'encoder', url: '/tools/misc/data-uri', description: 'Convert files to Data URIs' },
  { name: 'Case Converter', emoji: '🔤', category: 'text', url: '/tools/text/case-converter', description: 'Convert text case styles' },
  { name: 'Morse Code Translator', emoji: '📡', category: 'converter', url: '/tools/misc/morse', description: 'Convert text to Morse code' },

  // ===== NEW DATA TOOLS (5) =====
  { name: 'CSV to JSON', emoji: '📊', category: 'converter', url: '/tools/data/csv-to-json', description: 'Convert CSV to JSON format' },
  { name: 'JSON to CSV', emoji: '📊', category: 'converter', url: '/tools/data/json-to-csv', description: 'Convert JSON to CSV format' },
  { name: 'XML to JSON', emoji: '📄', category: 'converter', url: '/tools/data/xml-to-json', description: 'Convert XML to JSON' },
  { name: 'YAML Parser', emoji: '📝', category: 'reference', url: '/tools/data/yaml', description: 'Parse and validate YAML' },
  { name: 'Data Formatter', emoji: '✨', category: 'converter', url: '/tools/data/formatter', description: 'Pretty-print JSON and YAML' },

  // ===== NEW SECURITY TOOLS (4) =====
  { name: 'ROT13 Encoder', emoji: '🔐', category: 'security', url: '/tools/security/rot13', description: 'Encode/decode ROT13' },
  { name: 'Caesar Cipher', emoji: '🔐', category: 'security', url: '/tools/security/caesar', description: 'Caesar cipher encryption' },
  { name: 'Base32 Encoder', emoji: '🔒', category: 'encoder', url: '/tools/security/base32', description: 'Encode/decode Base32' },
  { name: 'Hex Encoder', emoji: '🔤', category: 'encoder', url: '/tools/security/hex', description: 'Hex encode/decode' },

  // ===== NEW MATH TOOLS (2) =====
  { name: 'Unit Converter Advanced', emoji: '⚖️', category: 'calculator', url: '/tools/math/unit-converter-advanced', description: 'Advanced unit conversion' },
  { name: 'Matrix Calculator', emoji: '📐', category: 'calculator', url: '/tools/math/matrix', description: 'Matrix operations' },

  // ===== NEW DESIGN TOOLS (4) =====
  { name: 'Color Name Finder', emoji: '🎨', category: 'color', url: '/tools/design/color-names', description: 'Find color names by hex/RGB' },
  { name: 'Image Metadata Viewer', emoji: '📸', category: 'image', url: '/tools/design/image-metadata', description: 'View image EXIF data' },
  { name: 'SVG Editor', emoji: '✏️', category: 'image', url: '/tools/design/svg-editor', description: 'Edit and optimize SVG' },
  { name: 'Font Preview', emoji: '🔤', category: 'typography', url: '/tools/design/font-preview', description: 'Preview Google Fonts' },

  // ===== NEW TEXT TOOLS (3) =====
  { name: 'Diff Checker', emoji: '📝', category: 'text', url: '/tools/text/diff-checker', description: 'Compare text differences' },
  { name: 'Word Frequency Analyzer', emoji: '📊', category: 'text', url: '/tools/text/word-freq', description: 'Analyze word frequency' },
  { name: 'Readability Score', emoji: '📖', category: 'text', url: '/tools/text/readability', description: 'Calculate readability metrics' },

  // ===== NEW WEB TOOLS (5) =====
  { name: 'URL Parser', emoji: '🔗', category: 'web', url: '/tools/web/url-parser', description: 'Parse URL components' },
  { name: 'HTTP Status Codes', emoji: '🌐', category: 'reference', url: '/tools/web/http-codes', description: 'HTTP status code reference' },
  { name: 'Regex Tester Advanced', emoji: '🧪', category: 'reference', url: '/tools/web/regex-tester', description: 'Advanced regex testing' },
  { name: 'API Response Formatter', emoji: '📦', category: 'converter', url: '/tools/web/api-formatter', description: 'Format API responses' },
  { name: 'DNS Lookup Simulator', emoji: '🌐', category: 'web', url: '/tools/web/dns-lookup', description: 'Simulate DNS lookups' },

  // ===== NEW TOOLS (4) =====
  { name: 'JWT Decoder', emoji: '🔑', category: 'web', url: '/tools/web/jwt-decoder', description: 'Decode & inspect JSON Web Tokens' },
  { name: 'Unix Timestamp', emoji: '⏱️', category: 'converter', url: '/tools/web/unix-timestamp', description: 'Convert Unix timestamps ↔ human dates' },
  { name: 'Cron Builder', emoji: '⏰', category: 'web', url: '/tools/web/cron-builder', description: 'Visual cron expression builder & explainer' },
  { name: 'Box Shadow Generator', emoji: '🌑', category: 'design', url: '/tools/design/box-shadow', description: 'Visual CSS box-shadow builder' },
];

export const categories = [
  { name: 'All', value: 'all' },
  { name: 'Calculators', value: 'calculator' },
  { name: 'Colors', value: 'color' },
  { name: 'Converters', value: 'converter' },
  { name: 'Design', value: 'design' },
  { name: 'Encoders', value: 'encoder' },
  { name: 'Generators', value: 'generator' },
  { name: 'Images', value: 'image' },
  { name: 'Math', value: 'math' },
  { name: 'PDFs', value: 'pdf' },
  { name: 'Reference', value: 'reference' },
  { name: 'SEO', value: 'seo' },
  { name: 'Security', value: 'security' },
  { name: 'Text Tools', value: 'text' },
  { name: 'Typography', value: 'typography' },
  { name: 'Validators', value: 'validator' },
  { name: 'Code', value: 'code' },
  { name: 'Web', value: 'web' },
];

export const stats = {
  total: 113,
  categories: 18,
};
