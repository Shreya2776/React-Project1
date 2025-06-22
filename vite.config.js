import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
// vite.config.js
// This is the configuration file for Vite, a build tool for modern web applications.
// It sets up the React plugin and Tailwind CSS for styling.
// Importing React library to create components
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})
//this file is used to configure Vite, a build tool for modern web projects.
// It imports the necessary modules and exports a configuration object that includes 
// the React plugin for Vite.
// This setup allows you to use React features in your Vite project.
// You can add more configurations as needed, such as server settings, build options, etc.
//This file allows you to customise the Vite build process for your React application.
// You can also add other plugins or modify the default settings to suit your project's 
// requirements.

