document.addEventListener('DOMContentLoaded', function() {
  // Array of updates
  const updates = [
    { title: 'Page Replacement: Whats New', description: 'The Whats New page has been replaced with the upcoming page.' },
    { title: 'New Sub-Section: Minor Improvements', description: 'A sub-page in the new Changelog page which has a full list of minor improvements.' },
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
