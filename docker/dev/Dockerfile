FROM ros:noetic

RUN apt-get update && apt-get install -y \
    git \
    ros-noetic-std-msgs \
    ros-noetic-geometry-msgs \
    ros-noetic-fiducial-msgs \
    ros-noetic-joint-state-publisher \
    ros-noetic-robot-state-publisher \
    ros-noetic-tf2-ros \
    ros-noetic-xacro \
    python3-rospy \
    python3-pip

RUN apt install -y ros-noetic-moveit
RUN apt-get install -y python3-tk

RUN pip3 install flask
RUN pip3 install pyserial

COPY . .

WORKDIR /catkin_ws/src

RUN git clone https://github.com/sergei-nntu/orm-ros.git

RUN /bin/bash -c "source /opt/ros/noetic/setup.bash && catkin_init_workspace"

WORKDIR /catkin_ws
RUN /bin/bash -c "source /opt/ros/noetic/setup.bash && catkin_make"

RUN echo "source /catkin_ws/devel/setup.bash" >> ~/.bashrc

WORKDIR /catkin_ws/src
RUN mv orm-ros we_r2_moveit_config

WORKDIR /catkin_ws/src/we_r2_moveit_config/launch

RUN /bin/bash -c "source /opt/ros/noetic/setup.bash && export ROS_PACKAGE_PATH=/catkin_ws/src:$ROS_PACKAGE_PATH"

CMD ["roscore"]