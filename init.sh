
# check if dir livraison exists
if [ ! -d "livraison" ]; then
  mkdir livraison
fi


if [ ! -d "php" ]; then
  mkdir php
fi

git reset HEAD --hard

#get current branch
branch=$(git rev-parse --abbrev-ref HEAD)

git pull origin $branch

yarn
./start.sh