import React from 'react';
import ReactDOM from 'react-dom/client';
import PrayerTimesApp from './PrayerTimesApp';

// Add PWA meta tags programmatically (alternatively could be in public/index.html)
const addMetaTags = () => {
  const metaTags = [
    { name: 'theme-color', content: '#22C55E' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'Prayer Times' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
  ];

  const linkTags = [
    { rel: 'manifest', href: '/manifest.json' },
    { rel: 'apple-touch-icon', href: '/icon-192x192.png' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css' }
  ];

  metaTags.forEach(tag => {
    const meta = document.createElement('meta');
    Object.entries(tag).forEach(([key, value]) => {
      meta.setAttribute(key, value);
    });
    document.head.appendChild(meta);
  });

  linkTags.forEach(tag => {
    const link = document.createElement('link');
    Object.entries(tag).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
    document.head.appendChild(link);
  });
};

// Call before rendering
addMetaTags();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <PrayerTimesApp />
  </React.StrictMode>
);
