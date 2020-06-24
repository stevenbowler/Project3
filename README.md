# Project 3

### Overview
During the coronavirus lockdown period there is a need to locate peaceful and isolated locations outside the city.  Customers will want to conveniently find and reserve a campground often on a last-minute basis. The camping project app that is designed to facilitate the finding and booking of campsites thru the [National Park Service](https://www.nps.gov/).  Team members involved in the development are Gabrielle Byers, Kyla Fitzpatrick, Robert Alanis, and Steven Bowler.  


This project has afforded this programmers the opportunity to gain experience in development of full stack MERN apps including various technologies.  The Packages used include: [Redux](https://www.npmjs.com/package/redux), [@hapi/joi](https://www.npmjs.com/package/@hapi/joi), [bcryptjs](https://www.npmjs.com/package/bcryptjs), [body-parser](https://www.npmjs.com/package/body-parser), [concurrently](https://www.npmjs.com/package/concurrently), [cors](https://www.npmjs.com/package/cors), [dotenv](https://www.npmjs.com/package/dotenv), [express](https://www.npmjs.com/package/express), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [mongoose](https://www.npmjs.com/package/mongoose).


### User Documentation

1. Watch the video tutorial by clicking [this link](https://drive.google.com/file/d/1dXeXGydfJTvsE2GS7LnczJzTW0EKO-wS/view?usp=sharing).

2. See the Campsite app by [clicking here](https://campingproject3.herokuapp.com/).

### Program Documentation

See [program documentation](https://stevenbowler.github.io/MERNshellTwo/docs/index.html) in JSDOC format.

Link to the repository [here](https://github.com/stevenbowler/MERNshellTwo/).

Requires [dotenv](https://www.npmjs.com/package/dotenv) to be installed and a `.env` file must be stored in the root directory for the server side.  The `.env` file must contain the app owner's MongoDB URL with embedded username and password.  _*To use the same user database in development, testing and production then, it is critically important that the TOKEN_SECRET shown below be exactly the same string.*_ The client side root directory must have a `.env.local` file with the variable name `REACT_APP_GOOGLE_API_KEY` and set to equal the Google Geocoding and Geolocation approved API key

`Server side .env file`
````
MONGODB_URI=your_mongodb_url_with_embedded_username_password
TOKEN_SECRET = any_random_string_but_always_use_same_string
````

`Client side .env.local file`
````
REACT_APP_GOOGLE_API_KEY=your_google_geocoding_and_geolocation_approved_api_key
````

To deploy to Heroku then following `git push heroku master` command, and before accessing the app page, will be necesary to set the thre environmental variables with these commands from the Heroku CLI:
````
heroku config:set --app=campingproject3 MONGODB_URI=your_mongodb_url_with_embedded_username_password
heroku config:set --app=campingproject3 TOKEN_SECRET=any_random_string_but_always_use_same_string
heroku config:set --app=campingproject3 REACT_APP_GOOGLE_API_KEY=your_google_geocoding_and_geolocation_approved_api_key
````


## Available Scripts
[Connect Repo with Heroku Video](https://youtu.be/GgNcs9zlFSA?list=PLOFmg4xbN_TPrB6w4rThsFanVxJI_SfER)

Program is deployed to [Heroku](https://www.heroku.com).  Program uses [concurrently](https://www.npmjs.com/package/concurrently), so locally runs server on port 5000 and react app on port 3000.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).







