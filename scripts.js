// scripts.js

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionalities
    updateScrollMeter();
    initializeFadeInEffect();
    greetUser();
  });
  
  /**
   * 1. Scroll Meter Update
   * Updates the width of the scroll meter based on the user's scroll position.
   */
  function updateScrollMeter() {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
  
      const scrollMeter = document.getElementById('scroll-meter');
      if (scrollMeter) {
        scrollMeter.style.width = `${scrollPercentage}%`;
      }
    });
  }
  
  /**
   * 2. Fade-In Text on Scroll
   * Implements fade-in animations for elements with the 'fade-in' class as they enter the viewport.
   */
  function initializeFadeInEffect() {
    const faders = document.querySelectorAll('.fade-in');
  
    const options = {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Adjust as needed
    };
  
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
  
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once visible
      });
    }, options);
  
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  }
  
  /**
   * 3. API Call to Greet the User Based on Their Country
   * Fetches the user's country using a geolocation API and displays a greeting message.
   */
  async function greetUser() {
    try {
      // Fetch location data from a public IP geolocation API
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
  
      // Extract the country name from the API response
      const country = data.country_name || "the world";
  
      // Create and display the greeting message
      const greeting = document.createElement('div');
      greeting.id = 'greeting';
      greeting.textContent = `Hello ${country}!`;
  
      // Append the greeting to the body
      document.body.appendChild(greeting);
  
      // Trigger the fade-in effect
      requestAnimationFrame(() => {
        greeting.classList.add('visible');
      });
    } catch (error) {
      console.error('Failed to fetch location:', error);
  
      // Optionally, display a default message or hide the greeting
      const greeting = document.createElement('div');
      greeting.id = 'greeting';
      greeting.textContent = `Hello! Welcome to my website!`;
      document.body.appendChild(greeting);
  
      // Trigger the fade-in effect
      requestAnimationFrame(() => {
        greeting.classList.add('visible');
      });
    }
  }
  