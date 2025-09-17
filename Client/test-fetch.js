// frontend/test-fetch.js
import dns from 'node:dns'; // Import the dns module

async function testImageFetch() {
  const imageUrl = 'https://via.placeholder.com/150';
  console.log(`Attempting to fetch: ${imageUrl}`);
  try {
    // Explicitly set DNS lookup family preference to IPv4
    const response = await fetch(imageUrl, { family: 4 }); // <--- Add { family: 4 }
    console.log(`Fetch successful! Status: ${response.status}`);
  } catch (error) {
    console.error('Fetch failed!');
    console.error('Error Code:', error.cause?.code);
    console.error('Error Message:', error.message);
    console.error('Full Error:', error);
  }
}

testImageFetch();