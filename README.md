# NekorimnasTools Website

This repository contains the code for the NekorimnasTools MultiTool website. It's built using GitHub Pages with Jekyll and includes modern features like animations, 3D effects, and a dark theme.

## Features

- Responsive dark-themed design
- 3D animations and effects using Three.js
- Loading screen initialization
- Interactive download cards
- Mobile-friendly layout

## Setup Instructions

### Local Development

1. Install Ruby and Jekyll (see [Jekyll Installation Guide](https://jekyllrb.com/docs/installation/))
2. Clone this repository
3. Run `bundle install` to install dependencies
4. Run `bundle exec jekyll serve` to start the local development server
5. Visit `http://localhost:4000` in your browser

### GitHub Pages Deployment

This site is designed to work with GitHub Pages out of the box:

1. Push this repository to GitHub
2. Go to repository settings
3. Under "GitHub Pages", select the main branch as the source
4. Your site will be published at `https://[your-username].github.io/[repository-name]/`

## Customizing Content

- Edit `_config.yml` to modify the site title and description
- Update the files array in `_layouts/default.html` to add or change downloadable files
- Modify text in `index.md` to update the main content

## File Structure

- `_config.yml` - Site configuration
- `_layouts/default.html` - Main layout template
- `assets/css/style.scss` - Custom styles including dark theme
- `assets/js/3d-effects.js` - 3D animations with Three.js
- `index.md` - Homepage content

## License

This project is available as open source under the terms of the MIT License. 