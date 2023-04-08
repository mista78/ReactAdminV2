
# check if dir livraison exists
if [ ! -d "livraison" ]; then
  mkdir livraison
fi

if [ ! -d "php" ]; then
  mkdir php
fi

git reset HEAD --hard

# check if node is version 14.15.0
node_version=$(node -v)
if [ "$node_version" != "14.15.0" ]; then
  nvm install 14.15.0
  nvm use 14.15.0 && nvm alias default 14.15.0 && nvm use default && nvm cache clear
fi

#get current branch
branch=$(git rev-parse --abbrev-ref HEAD)

git pull origin $branch

yarn
./start.sh