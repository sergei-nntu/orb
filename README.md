# orb

ORB - Open Robotic Brain, which is a web interface for managing robots.

***Note: This project is currently a prototype and is not intended for production use.***

## Introduction

The orb project aims to provide a user-friendly web interface for controlling robots. It allows users to interact with robots using a modern web browser, enabling them to perform various tasks and operations seamlessly.

## Features

- **Real-time Feedback:** Receive real-time feedback and updates from your robot.
- **User-friendly Interface:** Intuitive and easy-to-use interface for seamless interaction.
- **3D Robot Visualization:** Experience a 3D representation of your robot in real-time, providing a visual understanding of its movements and surroundings.
- **Camera Feed:** Access live camera feeds from the robot's perspective, allowing you to see its environment and surroundings.
- **Object Recognition:** Utilizes neural networks for object detection, enabling the robot to identify and determine which objects can be manipulated or interacted with.
- **Prototype Status:** Please note that orb is currently in the prototype stage and may noy have all features fully implemented.

## Installation

***Note: Only the web interface will be installed.*** To control a robot, you'll need to:

- **Install and configure orb, orm and orm-ros on Ubuntu 20.04**
- **Or only use Docker by composing Docker images from the docker hub**

<p>To set up orb locally, follow these steps:</p>

1. Clone the repository:
```
git clone https://github.com/sergei-nntu/orb.git
```

2. Navigate to the project directory:
```
cd orb/web
```

3. Install dependencies:
```
npm install
```

4. Start the development server:
```
npm run start
```

## Contributing

We welcome contributions from the community to improve orb. If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Make sure to follow our contribution guidelines.

## License
This project is licensed under the BSD 2-Clause License - see the [LICENSE](LICENSE) file for details.