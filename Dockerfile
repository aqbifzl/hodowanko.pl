# Use a lightweight Node.js image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install

# Copy the entire app to the container
COPY . .

# Build the React app
RUN pnpm build

# Generate Prisma client
RUN npx prisma generate

# Build the server
RUN NODE_ENV=production pnpm prod:build-server

# Set up the target folder
WORKDIR /app/finish

# Copy necessary files to the target folder
RUN cp -r /app/server-build /app/build /app/prisma /app/pnpm-lock.yaml /app/package.json /app/migrate-and-start.sh .
RUN chmod +x ./migrate-and-start.sh
# Move build/ to server-build/public
RUN mv build/ server-build/public

# Install production dependencies
RUN pnpm i --prod

# Generate Prisma client again
# RUN npx prisma generate
# RUN npx prisma db push

# Expose the necessary port
EXPOSE 3001
# Start the application
CMD ["./migrate-and-start.sh"]
