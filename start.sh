
port="35729,3000"

# exec env file
source .env



passwordSudo=$SUDO_PASSWORD

# set the password for sudo
echo $passwordSudo | sudo -S echo "sudo password set"


for i in $(echo $port | sed "s/,/ /g")
do
  pid=$(lsof -t -i:$i)
  echo $pid

  # kill the process if it exists
  if [ -n "$pid" ]; then
    echo "killing process $pid"
    sudo  kill -9 $pid
  fi
  lsof -t -i:$port
done





yarn dev