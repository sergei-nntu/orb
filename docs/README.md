# Installation, configuration, and launch
There are two methods for installing, configuring, and launching the whole infrastructure:

- Locally (orb, orm, orm-ros)
- Docker (docker compose, docker images)

# Locally

Detailed instructions on how to install, configure, and launch the services:

- orm-ros - [launch.md](./orm-ros/launch.md)
- orm - [launch.md](./orm/launch.md)
- orb - [launch.md](./orb/launch.md)

It would be perfect if you moved from the top to the bottom in that order,
so first - orm-ros and last - orb.

# Docker
Docker is a platform designed to make it easier to create, deploy, and run applications 
by using containers. Containers allow a developer to package an application with all of 
its dependencies into a standardized unit for software development, 
which ensures that the application will run seamlessly on any environment, 
whether it be a developer's laptop, a staging environment, or a production server. 
This containerization approach enables greater flexibility, 
efficiency, and consistency in software development and deployment processes.

**_note_: to install docker on your local machine, see [here](https://docs.docker.com/engine/install/)**

## Docker compose 
On the docker hub, there are already ready-to-use images that, when launched, create containers
with pre-configured repositories, so there's no need to configure anything manually.
Moreover, a single file can download all these images at once and run them in a single network - docker-compose.yml.

At first, move to docker directory in the orb repository:
```
cd docker
```

Here you can see the docker-compose.yml file.
To run it, enter the command below:
```
docker compose up
```

**_note_: if you don't have some of those images on your system, 
then 'docker compose' pull these images from the docker hub, 
else will be used already available images on your local machine.**

Remember to remove containers after work:
```
docker compose down
```

## Docker images

You can build the images manually. 
When Docker Compose is executed, it initially checks for the presence of the images on the local machine. 
If they are not available locally, it fetches them from Docker Hub.

### orb

1. Navigate to the `web` directory:
```
cd orb/web
```

2. Execute the following command to create a Docker container from the Docker image:
```
docker build . -t telemetrybalkan/orb
```

### orm & orm-ros 
1. Navigate to the `docker` directory:
```
cd orb/docker
```
2. Execute the following command to create a Docker container from the Docker image:
```
docker build . -t telemetrybalkan/ros
```
**_note:_ this command retrieves the source code from orm-ros and orm, 
integrates it into a single Ubuntu container, and then runs it.**

### Development
If you intend to make modifications on the server side and test them while Docker is running, 
you can clone the orm repository into the `dev` directory and make your changes there.
To test your changes again, rebuild the image using:

```
docker build . -t telemetrybalkan/ros
```

### Docker compose
Once the images are built, the final step is to launch the Docker Compose file located in the `docker` directory:
```
docker compose up
```