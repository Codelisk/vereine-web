# syntax=docker/dockerfile:1.7

ARG NODE_IMAGE=node:24.22.2-alpine3.24@sha256:8a32c8cf649a49915a66e81e7a609223c708d0adabf288ee3f4077d765542f85

FROM ${NODE_IMAGE} AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,id=vereine-web-npm,target=/root/.npm \
    npm ci

FROM dependencies AS build
# Die Forwarded-Host-Grenze (security.allowedDomains) wird beim Build festgelegt.
ARG ASTRO_ALLOWED_ORIGIN
ENV ASTRO_ALLOWED_ORIGIN=$ASTRO_ALLOWED_ORIGIN
COPY . .
RUN npm run build

FROM ${NODE_IMAGE} AS production-dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,id=vereine-web-npm-production,target=/root/.npm \
    npm ci --omit=dev

FROM ${NODE_IMAGE} AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321
COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
USER node
EXPOSE 4321
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=5 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:4321/gesund').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]
ENTRYPOINT ["node", "dist/server/entry.mjs"]
