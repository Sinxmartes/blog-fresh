FROM denoland/deno:latest as base

WORKDIR /app

COPY . ./

CMD ["task", "start", "--allow-net"] 