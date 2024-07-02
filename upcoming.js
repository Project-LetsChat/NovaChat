
// Array of upcoming features
const upcomingFeatures = [
    { title: 'Nothing.', description: 'Nothing new is planned currently as this is a proof-of-concept.' },
    
  ];
  
  // Get the features container
  const featuresContainer = document.getElementById('features-container');
  
  // Create a card for each feature
  for (let feature of upcomingFeatures) {
    let featureCard = document.createElement('div');
    featureCard.className = 'feature-card';
  
    let featureTitle = document.createElement('h2');
    featureTitle.innerText = feature.title;
  
    let featureDescription = document.createElement('p');
    featureDescription.innerText = feature.description;
  
    featureCard.appendChild(featureTitle);
    featureCard.appendChild(featureDescription);
    featuresContainer.appendChild(featureCard);
  }
  