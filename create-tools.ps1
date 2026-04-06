$tools = @(
    @{name='Base Converter'; path='calculator/base'; emoji='🔢'; desc='Decimal ↔ Hex ↔ Binary ↔ Octal'},
    @{name='Unit Converter'; path='calculator/units'; emoji='📏'; desc='Length, weight, temperature, data'},
    @{name='Time Converter'; path='calculator/time'; emoji='⏱️'; desc='Unix timestamps & timezones'},
    @{name='Hex Encoder'; path='calculator/encoding'; emoji='#️⃣'; desc='Base64, URL, Hex encoding'},
    @{name='Color Converter Pro'; path='color/converter'; emoji='🎨'; desc='HEX, RGB, HSL, OKLCH, LAB'},
    @{name='Tailwind Shade Gen'; path='color/tailwind'; emoji='🎭'; desc='Generate Tailwind color shades'},
    @{name='Harmony Generator'; path='color/harmony'; emoji='🎼'; desc='Create color harmonies'},
    @{name='Palette Generator'; path='color/palette'; emoji='🎨'; desc='Generate color palettes'},
    @{name='Palette Collection'; path='color/palettes'; emoji='📚'; desc='Browse curated palettes'},
    @{name='Contrast Checker'; path='color/contrast'; emoji='✅'; desc='WCAG accessibility checker'},
    @{name='Blindness Simulator'; path='color/blindness'; emoji='👁️'; desc='Simulate color blindness'},
    @{name='Gradient Generator'; path='color/gradient'; emoji='🌈'; desc='Create smooth color gradients'},
    @{name='Favicon Generator'; path='image/favicon'; emoji='🎯'; desc='Generate favicons from text'},
    @{name='SVG Optimizer'; path='image/svg'; emoji='✨'; desc='Optimize SVG files'},
    @{name='Placeholder Generator'; path='image/placeholder'; emoji='🖼️'; desc='Generate placeholder images'},
    @{name='Image Splitter'; path='image/splitter'; emoji='✂️'; desc='Split images into grid tiles'},
    @{name='Image Converter'; path='image/converter'; emoji='🔄'; desc='Convert between image formats'},
    @{name='Image Enhancer'; path='image/enhancer'; emoji='🌟'; desc='Enhance image quality'},
    @{name='Background Remover'; path='image/bg-remover'; emoji='🗑️'; desc='Remove image backgrounds'},
    @{name='Image Tracer'; path='image/tracer'; emoji='📐'; desc='Trace images to vectors'},
    @{name='PX to REM Converter'; path='typography/px-rem'; emoji='📐'; desc='Convert pixels to rem units'},
    @{name='Line Height Calculator'; path='typography/line-height'; emoji='↕️'; desc='Calculate optimal line heights'},
    @{name='Typography Calculator'; path='typography/calc'; emoji='🔢'; desc='Agates, ciceros, picas, points'},
    @{name='Paper Sizes'; path='typography/paper'; emoji='📄'; desc='Reference for all paper sizes'},
    @{name='Glyph Browser'; path='typography/glyphs'; emoji='🔤'; desc='Browse Unicode glyphs'},
    @{name='Font File Explorer'; path='typography/font-explorer'; emoji='📁'; desc='Explore font files'},
    @{name='PDF Preflight'; path='print/pdf-preflight'; emoji='🔍'; desc='Check PDF for print issues'},
    @{name='Guillotine Director'; path='print/guillotine'; emoji='✂️'; desc='Mark guillotine cuts'},
    @{name='Zine Imposer'; path='print/zine'; emoji='📚'; desc='Arrange pages for zine printing'},
    @{name='Print Imposer'; path='print/imposer'; emoji='🖨️'; desc='Arrange pages for printing'},
    @{name='Social Media Cropper'; path='social/cropper'; emoji='🖼️'; desc='Crop for Instagram, Twitter, TikTok'},
    @{name='Matte Generator'; path='social/matte'; emoji='🎭'; desc='Add matte borders to images'},
    @{name='Seamless Scroll Gen'; path='social/seamless'; emoji='🌀'; desc='Create seamless scrolling videos'},
    @{name='Watermarker'; path='social/watermark'; emoji='💧'; desc='Add watermarks to images'},
    @{name='Text Scratchpad'; path='misc/scratchpad'; emoji='📝'; desc='Quick text editor'},
    @{name='Tailwind Cheat Sheet'; path='misc/tailwind'; emoji='🎨'; desc='Tailwind CSS reference'},
    @{name='Barcode Generator'; path='misc/barcode'; emoji='📊'; desc='Generate barcodes'},
    @{name='Meta Tags Generator'; path='misc/meta-tags'; emoji='🏷️'; desc='Generate SEO meta tags'},
    @{name='UUID Validator'; path='misc/uuid-validator'; emoji='🔍'; desc='Validate UUID format'},
    @{name='Regex Patterns Lib'; path='misc/regex-patterns'; emoji='📚'; desc='Common regex patterns'},
    @{name='Shavian Transliterator'; path='misc/shavian'; emoji='🔤'; desc='Convert to Shavian script'}
)

foreach ($tool in $tools) {
    $fullPath = "C:\Users\Jabir\Documents\GitHub\tinkr\frontend\app\tools\$($tool.path)\page.tsx"
    $dir = Split-Path -Parent $fullPath
    
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    
    Write-Host "Creating: $($tool.name)"
}

Write-Host "`n✓ Directories ready for tool generation"
Write-Host "Total tools to create: $($tools.Count)"
