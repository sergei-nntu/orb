# orm-ros

To set up the project, you will need to install [ROS Noetic](http://wiki.ros.org/noetic) and [Moveit](https://moveit.ros.org/install/) on your local machine. You can do this by reading the provided documentation or following the instructions below.

***note: the version of ubuntu used in the example below is 20.04.6***

## ROS Noetic

ROS Noetic Ninjemys is the thirteenth ROS distribution release. It was released on May 23rd, 2020.

ROS Noetic Ninjemys is primarily targeted at the Ubuntu 20.04 (Focal) release, though other systems are supported to varying degrees. For more information on compatibility on other platforms, please see [REP 3: Target Platforms](https://www.ros.org/reps/rep-0003.html)

###  Configuration

Set up your computer to accept software from packages.ros.org.
```
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
```

Set up your keys
```
sudo apt install curl # if you haven't already installed curl
curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -
```

### Installation

First, make sure your Debian package index is up-to-date:
```
sudo apt update
```

Desktop-Full Install: everything in desktop plus 2D/3D simulators and 2D/3D perception packages
```
sudo apt install ros-noetic-desktop-full
```

### Environment setup

You must source this script in every bash terminal you use ROS i
```
source /opt/ros/noetic/setup.bash
```

It can be convenient to automatically source this script every time a new shell is launched. These commands will do that for you.
```
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### Dependencies for building packages

Up to now you have installed what you need to run the core ROS packages. To create and manage your own ROS workspaces, there are various tools and requirements that are distributed separately. For example, rosinstall is a frequently used command-line tool that enables you to easily download many source trees for ROS packages with one command.

To install this tool and other dependencies for building ROS packages, run:

```
sudo apt install python3-rosdep python3-rosinstall python3-rosinstall-generator python3-wstool build-essential
```

#### Initialize rosdep
Before you can use many ROS tools, you will need to initialize rosdep. rosdep enables you to easily install system dependencies for source you want to compile and is required to run some core components in ROS. If you have not yet installed rosdep, do so as follows.

```
sudo apt install python3-rosdep
```

With the following, you can initialize rosdep:
```
sudo rosdep init
rosdep update
```

## Moveit
Moveit - 1 Noetic

### Installation

Install on Ubuntu 20.04 ROS Noetic
```
sudo apt install ros-noetic-moveit
```

## Catkin workspace
The last thing you need to do is create a catkin workspace.
You can do this by reading the provided documentation [here](https://wiki.ros.org/catkin/Tutorials/create_a_workspace) or following the instructions below.

### Create a catkin workspace
Create and build a catkin workspace:
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin_make
```

Before continuing source your new setup.*sh file:
```
source devel/setup.bash
```

### Install source code
Next, git clone orm-ros repository in the catkin_ws/src directory:
```
cd ~/catkin_ws/src
git clone https://github.com/sergei-nntu/orm-ros.git
```

**_note_: don't forget rename the orm-ros directory to we_r2_moveit_config**
```
mv orm-ros we_r2_moveit_config
```

Build the source code:
```
catkin_make
```

## Launch
After completing all the steps above, launch the demo:
```
roslaunch we_r2_moveit_config demo.launch
```