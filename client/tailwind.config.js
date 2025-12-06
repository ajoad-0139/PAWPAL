module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Ensure this is set correctly
  theme: {
    extend: {
      screens: {
        laptop: '1280px',
        'mid-laptop': '1440px',
        desktop: '1600px',
        monitor: '1920px',
        'wide-monitor': '2560px',
      },
    },
  },
  plugins: [],
};
