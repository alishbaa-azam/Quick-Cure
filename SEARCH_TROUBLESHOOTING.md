# Search Functionality - Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: "Backend Server Offline" Error

**Symptoms:**
- Error message: "Backend Server Offline"
- Message: "Please make sure the backend server is running on http://localhost:5000"

**Solution:**
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd QuickCureBackEnd/backend
   ```

2. Start the backend server:
   ```bash
   npm start
   ```

3. You should see: `Server running on port 5000`

4. Keep this terminal running and open a new terminal for the frontend

---

### Issue 2: No Results Found

**Symptoms:**
- Search page loads but shows "No results found"
- Backend is running but returns 0 results

**Possible Causes & Solutions:**

#### A. No data in database
- Ensure you have doctors, labs, and pharmacies registered in the database
- Check backend console logs to see if data is being found

#### B. Search query too specific
- Try broader search terms (e.g., "doctor" instead of "Dr. Smith")
- Search is case-insensitive but requires exact matches

#### C. Database connection issue
- Check backend console for MongoDB connection errors
- Ensure MongoDB is running

---

### Issue 3: CORS Errors

**Symptoms:**
- Console error: "Access to fetch at 'http://localhost:5000/api/search' from origin 'http://localhost:5173' has been blocked by CORS policy"

**Solution:**
The backend already has CORS enabled. If you're still seeing this error:
1. Restart the backend server
2. Clear browser cache and reload
3. Check that backend is running on port 5000

---

### Issue 4: Network/Connection Errors

**Symptoms:**
- "Network Error" in console
- "Failed to perform search" error

**Solution:**
1. Verify backend is running: `http://localhost:5000`
2. Check firewall settings
3. Try accessing backend directly: `http://localhost:5000/api/search?query=test&type=all`
   - Should return error about query length (which means server is working)

---

## Testing Steps

### Step 1: Test Backend Server

1. Start backend:
   ```bash
   cd QuickCureBackEnd/backend
   npm start
   ```

2. Test search endpoint in browser or Postman:
   ```
   http://localhost:5000/api/search?query=doctor&type=all
   ```

3. Expected response:
   ```json
   {
     "success": true,
     "query": "doctor",
     "totalResults": 5,
     "results": {
       "doctors": [...],
       "labs": [...],
       "pharmacies": [...]
     }
   }
   ```

### Step 2: Test Frontend

1. Start frontend:
   ```bash
   cd Quick-Cure/quickcure
   npm run dev
   ```

2. Open browser: `http://localhost:5173`

3. Open browser console (F12)

4. Enter search query in home page search bar

5. Check console for:
   - "Performing search: [query] [type]"
   - "Search response: [data]"
   - Any error messages

### Step 3: Check Backend Logs

When you perform a search, the backend console should show:
```
=== SEARCH REQUEST ===
Query: doctor
Type: all
Search regex: /doctor/i
Searching labs...
Found labs: 2
=== SEARCH RESULTS ===
Total results: 15
Doctors: 10
Labs: 2
Pharmacies: 3
```

If you don't see these logs, the request isn't reaching the backend.

---

## Debug Information

### Check Browser Console
Open browser DevTools (F12) and look for:
1. **Network tab**: Check if request to `http://localhost:5000/api/search` is being made
2. **Console tab**: Look for error messages and logs
3. **Response**: Check the actual API response

### Check Backend Console
Look for:
1. "=== SEARCH REQUEST ===" - indicates request received
2. Error messages - indicates problems
3. MongoDB connection status

### Common Console Messages

**Good signs:**
- "Server running on port 5000"
- "MongoDB Connected"
- "=== SEARCH REQUEST ==="
- "=== SEARCH RESULTS ==="

**Bad signs:**
- "MongoDB connection error"
- "Error in unified search"
- "Network Error"
- CORS errors

---

## Quick Fixes

### Fix 1: Restart Both Servers
```bash
# Terminal 1 - Backend
cd QuickCureBackEnd/backend
npm start

# Terminal 2 - Frontend
cd Quick-Cure/quickcure
npm run dev
```

### Fix 2: Clear Cache and Restart
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
cd Quick-Cure/quickcure
rm -rf node_modules package-lock.json
npm install

cd QuickCureBackEnd/backend
rm -rf node_modules package-lock.json
npm install
```

### Fix 3: Check Port Availability
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# If in use, kill the process or change port in .env
```

### Fix 4: Verify MongoDB is Running
```bash
# Check MongoDB status
mongod --version

# Start MongoDB if not running
net start MongoDB
# or
mongod
```

---

## Environment Variables

### Backend (.env)
Ensure these are set in `QuickCureBackEnd/backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickcure
NODE_ENV=development
```

### Frontend
The frontend uses hardcoded API URL: `http://localhost:5000/api`

If your backend runs on a different port, update:
- `Quick-Cure/quickcure/src/api/searchApi.js`
- `Quick-Cure/quickcure/src/apiConfig.js`

---

## Still Not Working?

### Check These Files:

1. **Backend route is mounted:**
   - `QuickCureBackEnd/backend/server.js` should have:
     ```javascript
     import searchRoutes from "./routes/search.routes.js";
     app.use("/api/search", searchRoutes);
     ```

2. **Frontend route exists:**
   - `Quick-Cure/quickcure/src/App.jsx` should have:
     ```javascript
     import SearchResults from './components/Search/searchResults';
     <Route path="/search" element={<SearchResults />} />
     ```

3. **API service is correct:**
   - `Quick-Cure/quickcure/src/api/searchApi.js` should point to `http://localhost:5000/api`

### Enable Debug Mode

Add this to the top of `searchResults.jsx` to see more logs:
```javascript
console.log('SearchResults component mounted');
console.log('Query from URL:', query);
console.log('Type from URL:', type);
```

---

## Contact for Support

If issues persist:
1. Take screenshots of:
   - Browser console errors
   - Backend console output
   - Network tab showing failed requests
2. Note the exact error message
3. Verify both servers are running
4. Check MongoDB connection

---

## Success Checklist

- [ ] Backend server running on port 5000
- [ ] MongoDB is running and connected
- [ ] Frontend server running on port 5173
- [ ] Can access `http://localhost:5000/api/search?query=test` in browser
- [ ] Browser console shows no CORS errors
- [ ] Backend console shows "=== SEARCH REQUEST ===" when searching
- [ ] Search results display correctly