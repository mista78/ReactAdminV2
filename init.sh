
# check if dir livraison exists
if [ ! -d "livraison" ]; then
  mkdir livraison
fi


if [ ! -d "php" ]; then
  mkdir php
fi

git reset HEAD --hard

git pull origin main

yarn
yarn dev