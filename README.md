# About AllTerrain:
![image](https://user-images.githubusercontent.com/110942717/229334151-76e4201d-d312-47bd-9d75-1a33786e5691.png)


- AllTerrain is a travel based site inspired by FreeRoam.app that allows users to share campsites that they have visited anywhere around the world. This platform provides users with the ability to easily sign up, log in, create, edit or delete campsites. Users can also engage with the map feature that has existing campsites created by other users, and can leave reviews on campsites they visit as well.

To check out the live version of my website, simply follow this link: https://allterrain.onrender.com/ .


## Technologies used:
   - Javascript
   - Python
   - React
   - Redux
   - Flask
   - NodeJS
   - CSS
   - Database: PostgreSQL
   - Hosting: Render

# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.


# Features Directions:

### Checkout the images below before examples of how to use the implemented features from this project! All features follow basic (full or partial) CRUD format.

## Demo User/Log in
You can test some features without logging in, but to test all of them please log in or utilize our demo user.
![image](https://user-images.githubusercontent.com/110942717/229334276-619824bf-a57e-41da-818e-afea5a1b655a.png)

## Sign up:
![image](https://user-images.githubusercontent.com/110942717/229334291-e8a6c215-c684-43a9-a658-f87685587744.png)

## All available campsites:
![image](https://user-images.githubusercontent.com/110942717/229334308-6d52e342-5633-4770-bba4-ae4090c96f25.png)

## Create a campsite
![image](https://user-images.githubusercontent.com/110942717/229334352-a40d88d3-5c7d-4ed7-b4d2-92d9185c2f02.png)

### With the ability to choose your location with a map feature
![image](https://user-images.githubusercontent.com/110942717/229334373-e314945b-d82c-4b2c-8b94-d85189034193.png)

## View details of a campsite
### Edit and delete campsites that you've created and own.
![image](https://user-images.githubusercontent.com/110942717/229334414-95bb2af3-6c09-4387-b79a-d5f1401ff40d.png)

## Add a review of a campsite
![image](https://user-images.githubusercontent.com/110942717/229334440-5b165533-4ba4-4497-9638-6767a64fa2ac.png)

## Bonus Features

### Users have the ability to view the page in light mode or dark mode using a switch built into the navigation bar
![image](https://user-images.githubusercontent.com/110942717/229334505-4c29c54e-a10f-4f6e-8082-d92dfca3cb86.png)


### Users will be shown a 404 page if visiting a link a campsite or link that does not exist
![image](https://user-images.githubusercontent.com/110942717/229334551-b4d779db-e486-44a9-8852-aa0a6d32f267.png)


# Features coming soon...

## My places

### Users will be able to add campsites that they've visited and enjoyed to a list
#### Users will be able to delete campsites that they have visited from this list.


## Checklist

### Users will be able to create and delete checklists for items that they are taking with them on a trip.
#### Users will be able to create multiple lists and add items to individual checklists based on their trip.


