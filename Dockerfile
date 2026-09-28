FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY services/api/package.json services/api/package.json
COPY packages/contracts/package.json packages/contracts/package.json
RUN npm install --workspace services/api --include-workspace-root
COPY services/api services/api
COPY packages/contracts packages/contracts
EXPOSE 3000
CMD ["npm","--workspace","services/api","run","start"]
