# Sarah & Martin's Wedding Website

A beautiful, responsive static website for Sarah and Martin's wedding celebration.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Navigation**: Easy-to-use navigation with smooth scrolling
- **RSVP Form**: Complete RSVP form with validation
- **Modern UI**: Elegant design with a romantic aesthetic
- **No Dependencies**: Pure HTML, CSS, and JavaScript - no build tools needed

## Project Structure

```
wedding-website/
├── index.html          # Main HTML file
├── styles/
│   └── main.css        # All styling
├── scripts/
│   └── main.js         # JavaScript functionality
├── images/             # (Add your photos here)
└── README.md           # This file
```

## Sections

1. **Hero Section**: Welcome message with couple names and date
2. **Our Story**: Background about Sarah and Martin and venue information
3. **When**: Itinerary and special events
4. **How**: Travel information, accommodations, dress code, and presents
5. **RSVP**: Interactive form for guests to respond

## Customization

### Adding Images
- Create an `images/` folder
- Add your photos
- Update the HTML to reference your images

### Updating Hotel Information
- Edit the "Where to Stay" section in `index.html`
- Replace placeholder hotel names with actual recommendations

### Adding Bank Account Details
- Update the honeymoon fund link in the "Presents" section
- Replace `#` with your actual bank account link or details

### Form Submission
Currently, the form logs data to the console. To actually collect RSVPs, you'll need to:
1. Set up a backend service (e.g., Google Forms, Formspree, or your own server)
2. Update the form submission handler in `scripts/main.js`

## Deployment

This is a static website, so it can be deployed to:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a repository and enable Pages
- **Any static hosting service**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The form currently shows a success message but doesn't actually send data anywhere
- Hotel recommendations need to be updated with actual options
- Bank account link needs to be added
- Welcome cocktail location is marked as TBD

## License

Private project for Sarah & Martin's wedding.

