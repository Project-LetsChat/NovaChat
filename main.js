
function preload()
{

}

function setup()
{
    
    canvas = createCanvas(400, 300);
    canvas.center();
    
}

function draw()
{

}

function save()
{

    save('my_filter_image.png')

}

// PWA
if (!navigator.onLine) {
    alert('You are offline. Some features may be limited.');
    // Handle offline state
  }
