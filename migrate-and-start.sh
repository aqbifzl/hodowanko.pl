npx prisma generate
npx prisma db push
until npx prisma db push; do
  echo "Waiting for database to be ready..."
  sleep 5
done
node ./server-build/server.js
