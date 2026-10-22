FROM node:24-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-bookworm-slim AS build
WORKDIR /app
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG S3_PUBLIC_URL=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL S3_PUBLIC_URL=$S3_PUBLIC_URL
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# Build-only key. The deployed runtime MUST supply its own PAYLOAD_SECRET.
ENV PAYLOAD_SECRET=build-only-key-not-used-for-deployment-000000000000
RUN npm run build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000 MEDIA_DIR=/app/media
RUN groupadd --system --gid 1001 wasla && useradd --system --uid 1001 --gid wasla wasla
COPY --from=build --chown=wasla:wasla /app/.next/standalone ./
COPY --from=build --chown=wasla:wasla /app/.next/static ./.next/static
COPY --from=build --chown=wasla:wasla /app/public ./public
RUN mkdir -p media && chown wasla:wasla media
USER wasla
EXPOSE 3000
CMD ["node", "server.js"]
