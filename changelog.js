document.addEventListener('DOMContentLoaded', function() {
  // Array of updates
  const updates = [
    { title: 'PWA', description: 'Support for PWA (Progressive Web App) has been added.' },
    { title: 'NovaChat Labs', description: 'NovaChat Labs is a new part of NovaChat that will have a lot of experimental features.' },
    
  ];

  // Get the updates container
  const updatesContainer = document.getElementById('changelog-container');

  // Create a card for each update
  for (let update of updates) {
    let updateCard = document.createElement('div');
    updateCard.className = 'update-card';

    let updateTitle = document.createElement('h2');
    updateTitle.innerText = update.title;

    let updateDescription = document.createElement('p');
    updateDescription.innerText = update.description;

    updateCard.appendChild(updateTitle);
    updateCard.appendChild(updateDescription);
    updatesContainer.appendChild(updateCard);
  }
});

// PWA
if (!navigator.onLine) {
  alert('You are offline. Some features may be limited.');
  // Handle offline state
}
