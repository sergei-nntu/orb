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

## Docker compose 
On Docker Hub, there are already ready-to-use images that, when launched, create containers
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

## Docker images