document.addEventListener('DOMContentLoaded', function() {
  // Array of updates
  const updates = [
    { title: 'Redesign Phase 4', description: 'The final phase of the redesign is now out.' },
    { title: 'Upstream compatibility', description: 'The entire instance has been moved to the new directory/file structure introduced in LetsChat 6.1.' },
    
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
