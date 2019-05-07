# Speedia

Speedia is  a real-time online Wikipedia racing web-app, built in Vue and Node. Select a category, face  your opponent, and make your way to the final article in fewer articles than your opponent. 

## Running Speedia Yourself

### Tech Stack

* **VueJS** (frontend), scaffolded with **Vue-CLI**
* **NodeJS 12.0+** with **ExpressJS** (backend)
* **SocketIO** (backend WebSockets server), **Vue-SocketIO** (frontend WebSockets client)

### Prerequisites

Speedia is tested to work on these platforms:

* **MacOS** High Sierra 10.13.6+
* **Ubuntu Linux** 18.0.0+

Before jumping in to everything, it might be a good idea to get familiar with these tools if you aren't already:

* The **Unix Shell**, which allows us to run, build, and deploy the app
* **Yarn** (or **NPM**), the package manager for Node that helps install the app's dependencies

### Installation Steps

1. Clone or download the repository through the `Clone or Download` button here on GitHub or through your command line
2. In the command line, move to the repository and run `yarn install` to install all dependencies
3. Once Yarn has installed everything without errors, open up two terminal windows to separate output from the frontend and the backend (optional but recommended)
4. Run `yarn frontend` in the first terminal to run the frontend web app (available on `localhost:8080`)
5. Run `yarn backend` in the second terminal to run the backend WebSockets server (accessible to the frontend on `localhost:8079`)

### Development

Speedia uses **Nodemon**, a tool that automatically refreshes the backend whenever changes to backend code (located in the `speedia/server` directory) are detected. Running `yarn frontend` triggers a development server for the frontend, which will automatically refresh the frontend on file changes as well.

### Troubleshooting

If you're running into errors during installation, here are some things to watch out for:

* Speedia uses **Worker Threads** to handle individual games, which is only available out-of-the box in **NodeJS 12.0.0** or greater; make sure that this version is installed on your system