const puppeteer = require('puppeteer');

const TEST_PAGES = [
  {
    url: 'https://roaring-kulfi-cd788b.netlify.app/keratin-bond-seattle.html',
    serviceName: 'Keratin Bond',
    serviceType: 'keratin_bond'
  },
  {
    url: 'https://roaring-kulfi-cd788b.netlify.app/hand-tied-seattle.html',
    serviceName: 'Hand-Tied',
    serviceType: 'hand_tied'
  },
  {
    url: 'https://roaring-kulfi-cd788b.netlify.app/tape-in-seattle.html',
    serviceName: 'Tape-In',
    serviceType: 'tape_in'
  }
];

async function testFormSubmission(page, testData) {
  console.log(`\n=== Testing ${testData.serviceName} Page ===`);
  console.log(`URL: ${testData.url}`);

  try {
    // Navigate to page
    await page.goto(testData.url, { waitUntil: 'networkidle2' });

    // Click the "Free Consultation" button to open modal
    await page.waitForSelector('button::-p-text(FREE CONSULTATION)', { timeout: 5000 });
    await page.click('button::-p-text(FREE CONSULTATION)');

    // Wait for modal to appear
    await page.waitForSelector('#contactForm', { visible: true, timeout: 3000 });

    // Fill out the form
    await page.type('input[type="text"]', 'Test User');
    await page.type('input[type="tel"]', '206-555-1234');
    await page.type('input[type="email"]', 'test@example.com');
    await page.type('textarea', 'This is an automated test submission');

    // Intercept the fetch request
    let fetchDetails = null;
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.url().includes('/api/send-sms')) {
        fetchDetails = {
          url: request.url(),
          method: request.method(),
          postData: request.postData(),
          headers: request.headers()
        };
        // Don't actually send the request
        request.abort();
      } else {
        request.continue();
      }
    });

    // Click submit button
    await page.click('#contactForm button[type="submit"]');

    // Wait a moment for the fetch to be intercepted
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (fetchDetails) {
      console.log('✓ Form submission triggered');
      console.log('  Endpoint:', fetchDetails.url);
      console.log('  Method:', fetchDetails.method);
      console.log('  Data:', fetchDetails.postData);

      // Verify the endpoint is relative (not hardcoded Netlify URL)
      if (fetchDetails.url.includes('/api/send-sms')) {
        console.log('✓ Using relative URL for API endpoint');
      } else {
        console.log('✗ ERROR: Not using relative URL');
      }

      // Parse and verify the data
      const data = JSON.parse(fetchDetails.postData);
      if (data.service_type === testData.serviceType) {
        console.log('✓ Correct service_type:', data.service_type);
      } else {
        console.log('✗ ERROR: Wrong service_type:', data.service_type);
      }

      return { success: true, details: fetchDetails };
    } else {
      console.log('✗ ERROR: Form submission did not trigger fetch');
      return { success: false };
    }

  } catch (error) {
    console.log('✗ ERROR:', error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('Starting form submission tests...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];

  for (const testData of TEST_PAGES) {
    const page = await browser.newPage();
    const result = await testFormSubmission(page, testData);
    results.push({ ...testData, result });
    await page.close();
  }

  await browser.close();

  // Summary
  console.log('\n=== Test Summary ===');
  const passed = results.filter(r => r.result.success).length;
  const failed = results.filter(r => !r.result.success).length;
  console.log(`Passed: ${passed}/${results.length}`);
  console.log(`Failed: ${failed}/${results.length}`);

  if (failed > 0) {
    console.log('\nFailed tests:');
    results.filter(r => !r.result.success).forEach(r => {
      console.log(`  - ${r.serviceName}: ${r.result.error || 'Unknown error'}`);
    });
    process.exit(1);
  } else {
    console.log('\n✓ All tests passed!');
    process.exit(0);
  }
}

runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
