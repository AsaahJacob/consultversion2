document.addEventListener('DOMContentLoaded', function() {
  const aboutDropdown = document.getElementById('aboutDropdown');
  const dropdownTrigger = document.getElementById('aboutDropdown'); // Replace with the ID of the element that triggers the dropdown

  if (!aboutDropdown || !dropdownTrigger) {
    console.error("Dropdown or trigger element not found!");
    return; // Stop execution if elements aren't found
  }

  // --- Click Toggle Behavior (for all screen sizes) ---
  dropdownTrigger.addEventListener('click', function(event) {
    // Prevent the default link behavior if the trigger is a link
    event.preventDefault();
    aboutDropdown.classList.toggle('hidden');
  });

  // --- Optional: Desktop Hover Behavior (>= 768px) ---
  // Use mouseenter and mouseleave events on the trigger element
  dropdownTrigger.addEventListener('mouseenter', function() {
    if (window.innerWidth >= 768) {
      // Here you might want to manage different classes for hover effect,
      // potentially overriding the 'hidden' class temporarily.
      // Example: Remove 'hidden' and add transition classes for desktop hover
      aboutDropdown.classList.remove('hidden');
      aboutDropdown.classList.add('visible-on-hover'); // Add a class for hover styles
    }
  });

  dropdownTrigger.addEventListener('mouseleave', function() {
    if (window.innerWidth >= 768) {
      // Example: Remove hover transition class and add 'hidden' back
      aboutDropdown.classList.remove('visible-on-hover');
      // Only re-add 'hidden' if the dropdown wasn't clicked open
      // (This part can get complex if you want click and hover to work together seamlessly)
      // A simpler approach might be to only use click OR hover depending on screen size.
       if (!aboutDropdown.classList.contains('hidden')) {
           // If you want hover to fully control on desktop, you might add hidden here.
           // Consider the interaction with the click handler.
       }
    }
  });

  // --- Close dropdown when clicking outside (optional but recommended) ---
  document.addEventListener('click', function(event) {
    // Check if the click is outside the dropdown and the trigger
    if (!aboutDropdown.contains(event.target) && !dropdownTrigger.contains(event.target)) {
      aboutDropdown.classList.add('hidden');
      // Also remove any hover-specific classes if they were used
      aboutDropdown.classList.remove('visible-on-hover');
    }
  });

});
