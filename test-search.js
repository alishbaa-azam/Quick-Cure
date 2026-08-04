// Simple test script to verify search API is working
// Run this in browser console or as a standalone script

async function testSearch() {
  console.log('Testing Search API...');
  console.log('========================');
  
  try {
    // Test 1: Check if backend is reachable
    console.log('\n1. Testing backend connectivity...');
    const testResponse = await fetch('http://localhost:5000/api/search?query=test&type=all');
    console.log('   Status:', testResponse.status);
    console.log('   Status Text:', testResponse.statusText);
    
    if (testResponse.status === 400) {
      console.log('   ✅ Backend is running (400 = query too short, which is expected)');
    } else if (testResponse.ok) {
      console.log('   ✅ Backend is running');
    } else {
      console.log('   ❌ Backend returned error');
    }
    
    // Test 2: Actual search
    console.log('\n2. Testing search with valid query...');
    const searchResponse = await fetch('http://localhost:5000/api/search?query=doctor&type=all');
    const searchData = await searchResponse.json();
    
    console.log('   Status:', searchResponse.status);
    console.log('   Response:', searchData);
    
    if (searchData.success) {
      console.log('   ✅ Search successful!');
      console.log('   Total results:', searchData.totalResults);
      console.log('   Doctors found:', searchData.results.doctors.length);
      console.log('   Labs found:', searchData.results.labs.length);
      console.log('   Pharmacies found:', searchData.results.pharmacies.length);
    } else {
      console.log('   ❌ Search failed:', searchData.message);
    }
    
    // Test 3: Search with type filter
    console.log('\n3. Testing search with type filter...');
    const filteredResponse = await fetch('http://localhost:5000/api/search?query=lab&type=labs');
    const filteredData = await filteredResponse.json();
    
    console.log('   Status:', filteredResponse.status);
    
    if (filteredData.success) {
      console.log('   ✅ Filtered search successful!');
      console.log('   Labs found:', filteredData.results.labs.length);
    } else {
      console.log('   ❌ Filtered search failed:', filteredData.message);
    }
    
    console.log('\n========================');
    console.log('Test completed!');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nPossible causes:');
    console.error('1. Backend server is not running');
    console.error('2. Backend is not on port 5000');
    console.error('3. Network/firewall issue');
    console.error('\nSolution:');
    console.error('1. Open terminal in QuickCureBackEnd/backend');
    console.error('2. Run: npm start');
    console.error('3. Wait for: Server running on port 5000');
  }
}

// Run the test
testSearch();

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testSearch = testSearch;
  console.log('\n💡 You can run testSearch() anytime in the console to test the API');
}