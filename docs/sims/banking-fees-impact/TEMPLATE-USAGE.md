# MicroSim Iframe Template Usage Guide

This directory contains a clean, minimal CSS template (`style-iframe.css`) designed for MicroSims embedded in iframes within MkDocs documentation.

## Template Features

- **Minimal spacing**: No extra padding or margins for tight iframe embedding
- **Clean typography**: Simple black text on white background
- **Responsive**: Adjusts font sizes for mobile devices
- **Flexible**: Optional utility classes for common variations
- **Print-friendly**: Hides interactive elements when printing

## How to Use This Template

### For New MicroSims

1. **Copy the template file** to your new MicroSim directory:
   ```bash
   cp docs/sims/banking-fees-impact/style-iframe.css docs/sims/your-microsim/style.css
   ```

2. **Create your HTML file** with this basic structure:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Your MicroSim Title</title>
       <link rel="stylesheet" href="style.css">
       <!-- Add your visualization library (Chart.js, p5.js, etc.) -->
   </head>
   <body>
       <div class="container">
           <div class="header">
               <h1>Your MicroSim Title</h1>
               <p class="subtitle">Brief description of your visualization</p>
           </div>

           <div class="chart-container">
               <canvas id="myChart"></canvas>
               <!-- Or your visualization element -->
           </div>
       </div>

       <script>
           // Your visualization code here
       </script>
   </body>
   </html>
   ```

3. **Embed in your index.md**:
   ```markdown
   ## Interactive Visualization

   <iframe src="main.html" width="100%" height="550" scrolling="no"></iframe>

   [View Fullscreen](main.html){ .md-button .md-button--primary }
   ```

## Customization Options

### Background Colors

The template includes utility classes for different backgrounds:

```html
<!-- Light gray background -->
<div class="container container-light-bg">

<!-- Light blue background -->
<div class="container container-blue-bg">
```

### Header Border

Add a subtle border below the header:

```html
<div class="header header-bordered">
```

### Chart Container Padding

Add minimal padding if needed:

```html
<div class="chart-container chart-container-padded">
```

### Custom Colors

Edit the CSS variables at the top of the file:

```css
.header {
    background: white;      /* Change header background */
    color: black;          /* Change header text color */
}

.container {
    background: aliceblue; /* Change container background */
}
```

## Sizing Guidelines

### Recommended Iframe Heights

- **Simple chart with title**: 500-550px
- **Chart with legend**: 550-620px
- **Complex visualization**: 650-750px

Adjust based on your content. Use browser developer tools to find the exact height.

### Font Size Guidelines

- **Title (h1)**: 24px desktop, 20px mobile
- **Subtitle**: 14px desktop, 12px mobile
- Adjust in the `@media` query if needed

## Best Practices

1. **Keep it minimal**: Only include what's displayed in the iframe
2. **Move content to index.md**: Put all analysis, explanations, and educational content in the documentation file
3. **Test responsive**: Check on mobile, tablet, and desktop
4. **Optimize spacing**: Remove all unnecessary margins and padding for tight embedding
5. **Simple colors**: Use black/white for text, subtle colors for backgrounds

## Example MicroSims Using This Template

- Banking Fees Impact Chart: `docs/sims/banking-fees-impact/`
- [Add your MicroSims here as examples]

## Template Structure

```
your-microsim/
├── main.html           # Main visualization file
├── style.css           # Copy of style-iframe.css
├── index.md            # MkDocs documentation with iframe embed
└── [additional files]  # Data, images, etc.
```

## Common Issues

### Iframe too tall/short
- Adjust the `height` attribute in the iframe tag
- Check for extra padding in `.chart-container`

### Text too small on mobile
- Adjust font sizes in the `@media (max-width: 768px)` section

### Gap between header and chart
- Reduce `.header` bottom padding
- Reduce `.header h1` bottom margin
- Reduce `.chart-container` top padding

### Content doesn't fit
- Check `max-width: 100%` on container
- Ensure visualization is responsive
- Consider reducing font sizes

## Updating the Template

When you improve this template, update both files:
1. `style-iframe.css` (the template)
2. `TEMPLATE-USAGE.md` (this documentation)

This ensures future MicroSims benefit from improvements!

---

**Created**: 2025-11-20
**Last Updated**: 2025-11-20
**Version**: 1.0
