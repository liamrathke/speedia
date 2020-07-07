![Speedia](https://user-images.githubusercontent.com/33555592/57264828-3c19ff80-7042-11e9-9f50-c99451c4a556.png)

Speedia is  a real-time online Wikipedia racing web-app, built in Vue and Node. Select a category, face your opponent, and reach the final article first!

![Screenshots](https://user-images.githubusercontent.com/33555592/57266482-1bee3e80-704a-11e9-994c-f5c143df3aa9.png)

## Running Speedia Yourself

### Tech Stack

* **[VueJS](https://github.com/vuejs/vue)** (frontend), scaffolded with **[Vue-CLI](https://github.com/vuejs/vue-cli)**
* **[NodeJS 12+](https://nodejs.org/en/download/current/)** with **[ExpressJS](https://github.com/expressjs/express)** (backend)
* **[SocketIO](https://github.com/socketio/socket.io)** (backend WebSockets server), **[Vue-SocketIO](https://github.com/MetinSeylan/Vue-Socket.io)** (frontend WebSockets client)

### Prerequisites

Speedia is tested to work on the following platforms:

* **MacOS** High Sierra 10.13.6+ (x86-64)
* **Ubuntu Linux** 19.0.0+ (x86-64)

*If you're on a Windows environment, running Speedia through the [Ubuntu Terminal](https://tutorials.ubuntu.com/tutorial/tutorial-ubuntu-on-windows) might be possible.*

Before jumping in to everything, it might be a good idea to get familiar with these tools if you aren't already:

* **[Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell))**, which allows us to run, build, and deploy the app
* **[Yarn](https://yarnpkg.com/en/docs/install)** (or **[NPM](https://www.npmjs.com/get-npm)**), the package manager for Node that helps install the app's dependencies

### Installation Steps

1. Clone or download the repository through the `Clone or Download` button here on GitHub or through your command line
2. In the command line, move to the repository and run `yarn install` to install all dependencies
3. Once Yarn has installed everything without errors, open up two terminal windows to separate output from the frontend and the backend (optional but recommended)
4. Run `yarn frontend` in the first terminal to run the frontend web app (available on `localhost:8080`)
5. Run `yarn backend` in the second terminal to run the backend WebSockets server (accessible to the frontend on `localhost:8079`)

### Development

Speedia uses **[Nodemon](https://github.com/remy/nodemon)**, a tool that automatically refreshes the backend whenever changes to backend code (located in the `speedia/server` directory) are detected. Running `yarn frontend` triggers a development server for the frontend, which will automatically refresh the frontend on file changes as well.

### Troubleshooting

If you're running into errors during installation, here are some things to watch out for:

* Speedia uses **[Worker Threads](https://nodejs.org/api/worker_threads.html)** to handle individual games, which is only available out-of-the box in **[NodeJS 12+](https://nodejs.org/en/download/current/)**; make sure that this version is installed on your system
