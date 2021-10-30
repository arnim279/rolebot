FROM denoland/deno:1.14.1

WORKDIR /app

# Prefer not to run as root.
USER deno

COPY src src
RUN deno cache src/index.ts

COPY secrets.json .
VOLUME [ "data" ]

EXPOSE 4000

CMD [ "ls" ]

#CMD [ "deno", "run", "--allow-net", "--allow-read", "--allow-write", "src/index.ts" ]