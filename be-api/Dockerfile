# ----- Stage 1: Build -----
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# ----- Stage 2: Run (production image) -----
FROM node:20

WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Set production environment
ENV NODE_ENV=production

# Optional: copy .env at runtime via docker --env-file
# (Don't copy .env here unless you're hardcoding values)
# COPY .env .env

# Expose port
EXPOSE 3000

# Start app
# CMD ["node", "dist/index.js"]
CMD ["npm", "start"]

