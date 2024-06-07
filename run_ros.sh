#! /bin/bash

current_dir=""${PWD##*/}
echo "CURRENT_DIRECTORY: $current_dir"

DIR=$(pwd)

cd "${DIR}/docker"

# Функция для установки пакета через brew, если он еще не установлен
brew_install_if_not_installed() {
  if ! brew list -1 | grep -q "^${1}\$"; then
    brew install "$1"
  fi
}

# Устанавливаем Homebrew, если он еще не установлен
if ! command -v brew &> /dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Обновляем Homebrew и устанавливаем необходимые пакеты
brew update
brew_install_if_not_installed git
brew_install_if_not_installed python3
brew_install_if_not_installed pip3
brew_install_if_not_installed tk

# Устанавливаем ROS Noetic через brew (если доступно) или используя официальный способ установки для macOS
# Для macOS ARM может понадобиться установка через сторонние источники или использование виртуальной машины

# Устанавливаем Python пакеты
pip3 install flask
pip3 install pyserial

# Клонируем репозиторий
git clone https://github.com/sergei-nntu/orm.git

# Создаем рабочую директорию catkin
mkdir -p /catkin_ws/src
cd /catkin_ws/src

# Клонируем второй репозиторий
git clone https://github.com/sergei-nntu/orm-ros.git

# Инициализируем catkin workspace
source /opt/ros/noetic/setup.bash
catkin_init_workspace

# Компилируем catkin workspace
cd /catkin_ws
source /opt/ros/noetic/setup.bash
catkin_make

# Добавляем в bashrc source команду
echo "source /catkin_ws/devel/setup.bash" >> ~/.bashrc
source ~/.bashrc

# Переименовываем директорию
cd /catkin_ws/src
mv orm-ros we_r2_moveit_config

# Переходим в директорию launch
cd /catkin_ws/src/we_r2_moveit_config/launch

# Экспортируем ROS_PACKAGE_PATH
source /opt/ros/noetic/setup.bash
export ROS_PACKAGE_PATH=/catkin_ws/src:$ROS_PACKAGE_PATH

# Запускаем roscore
roscore



# Загружаем ROS Noetic окружение
source /opt/ros/noetic/setup.bash

# Переходим в рабочую директорию catkin
cd /catkin_ws

# Компилируем catkin workspace
catkin_make

# Источаем скомпилированное окружение
source /catkin_ws/devel/setup.bash

# Запускаем ROS launch файл в фоновом режиме
roslaunch we_r2_moveit_config demo.launch &

# Ждем 10 секунд для завершения инициализации ROS системы
sleep 10

# Переходим в директорию с Python скриптами
cd ../orm/src/python

# Запускаем HTTP сервер в фоновом режиме
python3 orm_http_server.py &

# Ждем 5 секунд для завершения инициализации HTTP сервера
sleep 5

# Запускаем контроллер
python3 orm_usb_controller.py