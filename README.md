# Random Joke Generator 😂

## Overview

A modern, interactive web application that fetches random jokes from multiple external APIs. Built with vanilla HTML, CSS, and JavaScript with a sleek, responsive UI.

## Features

✨ **Core Features:**
- 🎭 Fetch random jokes from multiple APIs
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern dark theme with gradient accents
- ⭐ Save favorite jokes locally
- 📋 Copy jokes to clipboard
- 📤 Share jokes via native share API
- 📊 Track jokes loaded statistics
- 🌐 Support for multiple joke categories

## Available APIs

1. **JokeAPI** (https://jokeapi.dev/)
   - Categories: General, Programming, Knock-Knock, Any
   - High-quality jokes with type filtering

2. **Official Joke API** (https://official-joke-api.appspot.com/)
   - Diverse joke collection
   - Setup/punchline format

3. **icanhazdadjoke** (https://icanhazdadjoke.com/api)
   - Hilarious dad jokes
   - Simple, reliable API

## How to Use

1. **Clone the repository:**
   ```bash
   git clone https://github.com/guiller022grs-lab/random-joke-generator.git
   cd random-joke-generator
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - No installation or build process required

3. **Get Started:**
   - Click "Get New Joke" to load a random joke
   - Select a specific API or category
   - Add jokes to favorites
   - Copy or share jokes with others

## Installation

### Local Development

```bash
# Clone the repository
git clone https://github.com/guiller022grs-lab/random-joke-generator.git

# Navigate to directory
cd random-joke-generator

# Open with Python SimpleHTTPServer (recommended for better experience)
python -m http.server 8000

# Or open index.html directly in your browser
```

### Deployment

- **GitHub Pages:** Push to main branch, enable Pages in repository settings
- **Netlify:** Connect repository, automatic deployment
- **Vercel:** Import project, instant deployment
- **Any static hosting:** Upload HTML, CSS, and JS files

## Project Structure

```
random-joke-generator/
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── script.js       # Application logic
└── README.md       # Documentation
```

## Technical Stack

- **HTML5:** Semantic markup
- **CSS3:** Modern styling with animations
- **JavaScript (ES6+):** Async/await, Fetch API, LocalStorage
- **APIs:** External REST APIs

## Code Architecture

### JokeGenerator Class

```javascript
class JokeGenerator {
    constructor()        // Initialize app
    loadJoke()          // Fetch joke from API
    fetchFromAPI()      // API-specific fetching
    displayJoke()       // Render joke on page
    addToFavorites()    // Save joke locally
    shareJoke()         // Share via native API
    copyJoke()          // Copy to clipboard
    // ... and more
}
```

## Key Features Explained

### 1. Multi-API Support
```javascript
// Dynamically fetch from selected API
await this.fetchFromAPI(this.selectedAPI)
```

### 2. LocalStorage Persistence
```javascript
// Save and load favorites automatically
this.saveFavorites();
this.loadFavorites();
```

### 3. Async/Await Pattern
```javascript
// Clean error handling
async loadJoke() {
    try {
        // fetch logic
    } catch (error) {
        this.showError('...');
    }
}
```

### 4. Responsive Design
- Mobile-first approach
- Flexbox layout system
- Media queries for all screen sizes
- Adaptive button layout

### 5. Smooth Animations
- Fade in/slide animations
- Hover transitions
- Loading spinner
- Staggered element animations

## Customization

### Add Custom Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    /* ... more colors */
}
```

### Add More APIs
1. Add API option to select dropdown in `index.html`
2. Create fetch method in `script.js`:
```javascript
async fetchFromNewAPI() {
    const response = await fetch('API_URL');
    const data = await response.json();
    return {
        text: data.joke,
        type: 'Type Name'
    };
}
```
3. Update `fetchFromAPI()` switch statement

### Modify UI
- Edit colors in CSS variables
- Change button text in HTML
- Modify animations in CSS
- Adjust spacing and sizes

## Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11 (Not supported - uses modern JavaScript)

## Performance

- **Load Time:** < 1s
- **API Response:** Typically 200-500ms
- **Bundle Size:** ~15KB (HTML + CSS + JS)
- **No dependencies:** Vanilla JavaScript only
- **Optimized animations:** 60 FPS

## Accessibility

- Semantic HTML structure
- ARIA-friendly buttons
- Keyboard navigation support
- High contrast colors (WCAG AA compliant)
- Responsive touch targets

## Error Handling

- Network error detection
- API failure fallback
- User-friendly error messages
- Automatic error dismissal
- Loading state management

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Ideas for Enhancements

- 🎯 Add joke search functionality
- 🌍 Add language selection
- 🎤 Add text-to-speech feature
- 📈 Analytics dashboard
- 🎨 Theme switcher (light/dark)
- 🎵 Add sound effects
- ⭐ Rating system for jokes
- 🔗 URL shortening for shares
- 📲 Progressive Web App (PWA)
- 🎬 Video jokes integration

## Troubleshooting

### Jokes not loading?
- Check internet connection
- Verify API is online (visit API URL directly)
- Check browser console for errors
- Try different API source

### Copy button not working?
- Ensure HTTPS is used (required for clipboard API)
- Check browser permissions
- Try manual selection and copy

### Favorites not saving?
- Check if LocalStorage is enabled
- Clear browser cache
- Check available storage space
- Use browser's incognito mode as fallback

## API Documentation

### JokeAPI
- **URL:** https://v2.jokeapi.dev/joke/{category}
- **Categories:** General, Programming, Knock-Knock, Misc, Dark, Pun
- **Docs:** https://jokeapi.dev/

### Official Joke API
- **URL:** https://official-joke-api.appspot.com/random_joke
- **Docs:** https://github.com/15Dkatz/official_joke_api

### icanhazdadjoke
- **URL:** https://icanhazdadjoke.com/?format=json
- **Docs:** https://icanhazdadjoke.com/api

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

- **Developer:** guiller022grs-lab
- **APIs:** JokeAPI, Official Joke API, icanhazdadjoke
- **Inspiration:** Making people laugh! 😂

## Live Demo

Try it live: [Random Joke Generator](https://guiller022grs-lab.github.io/random-joke-generator/)

## Changelog

### v1.0.0 (Initial Release)
- ✅ Multiple API support
- ✅ Favorites system
- ✅ Copy/Share functionality
- ✅ Responsive design
- ✅ Modern UI with animations
- ✅ LocalStorage persistence
- ✅ Statistics tracking
- ✅ Category filtering

## Support

If you find this project helpful, please:
- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 📢 Share with friends

---

**Made with ❤️ by guiller022grs-lab**
