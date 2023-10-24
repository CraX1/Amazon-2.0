# Installation Steps



## Using npm

Run commands

1) ```npm install```


2) ```npm run dev```


## Or using yarn

Run commands 

1) ```npm install --global yarn```

2) ```yarn install```

3) ```yarn run dev```


### If you see the window below then you are set to build AMAZON 2.0!

![Template Screenshot](TemplateScreenshot.jpg?raw=true "Template Screenshot")

Now since we are using Next Auth and using google as provider we will be-
1) Setting up firebase project for this and use the config in the firebase.js
2) To use google authentication we can get the Google_id and Secret_key from the Autthentication section of Firebase
3) on seing the invalid uri requesr go to the link in the error and go to credentials page of google cloud and under OAuth 2.0 Client IDs section
click on the web client link (https://console.cloud.google.com/apis/credentials/oauthclient/616940739802-3i5bj6cs8kqpurg31lleoqv1hqinjus6.apps.googleusercontent.com?project=amzn-2-clone-48587) and there first add URI http://localhost:3000 and in authorised add the http://localhost:3000/api/auth/callback/google
4) Now after signin to get the signed in authentication state wrap the _app.js with the Provider of next-auth/client