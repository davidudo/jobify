# www.favicon.io 
# www.undraw.com 
# www.allkeysgenerator.com
# www.jwt.io
# www.mockaroo.com

# npm install nodemon --save-dev
# npm install concurrently --save-dev

## For .env file

```
PORT=4000 MONGO_URL='mongodb+srv://david_udo:Deanbolt3717*@nodewebprojects.kkmg6.mongodb.net/JobifyWebApp?retryWrites=true&w=majority' JWT_SECRET='8y/B?E(H+MbQeThWmYq3t6w9z$C&F)J@' JWT_LIFETIME='1d'

```

# Script code used during build

```
"scripts": {
    "server": "nodemon server --ignore client",
    "client": "npm start --prefix client",
    "start": "concurrently --kill-others-on-fail \"npm run server\" \" npm run client\""
  },
  
```
 
```
"scripts": {
    "build-client": "cd client && npm run build",
    "server": "nodemon server --ignore client",
    "client": "npm start --prefix client",
    "start": "concurrently --kill-others-on-fail \"npm run server\" \" npm run client\""
  },

```