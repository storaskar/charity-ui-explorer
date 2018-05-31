# charity-ui-explorer
Charity Explorer UI

# To run locally
Assumption: You have node.js, npm etc installed.
1. Clone the git repo.
```git clone https://github.com/storaskar/charity-ui-explorer.git```
2. Install the dependencies
```$ npm install ```
3. You need to set charity-service-url which will server as backend service for this UI application.
```REACT_APP_API_URL=https://<server>:<port>/api```
e.g.
```REACT_APP_API_URL=http://localhost:4000/api```
4. Start the application
```REACT_APP_API_URL=https://<server>:<port>/api npm start```
There is also runapp.sh which has this command listed. So you could run
```./runapp.sh``` directly after updating url in that
5. You can test whether application started or not by going to `http://localhost:3000`. You should see login screen message if app started successfully.
