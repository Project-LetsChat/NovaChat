document.addEventListener('DOMContentLoaded', function() {
  // Array of updates
  const updates = [
    { title: 'Redesign', description: 'NovaChat has gotten redesigned in order to give it a more modern look.' },
    { title: 'Rebranding', description: 'The site has been renamed to NovaChat' },
    
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
