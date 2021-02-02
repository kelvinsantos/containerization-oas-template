# your-app-ts

Service to provide backend for your-app-ts

## Ownership

Kelvin Santos

## Tooling

```bash
# vscode extensions
- ESLint
- GitLens - Git supercharged
- Prettier - Code formatter
- OpenAPI (Swagger) Editor
- Swagger Viewer
- vscode-icons
- YAML
```

```bash
# vscode settings.json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"editor.formatOnSave": true,
```

## Development Build Setup

```bash
# dependencies
- postman (latest version)
- mongodb (latest version)
- npm
- node
```

## Dockerized Build Setup

```bash
# start the development cluster
$ docker-compose up -d

# view consolidated logs via docker-compose
$ docker-compose logs -f

# log into app container
$ docker exec -it ${service_name} sh

# shutdown development cluster
$ docker-compose down
```

## Running Unit Tests

```bash
# running the test
$ npm t
```

## Accessing API Documentation

```bash
# accessing api documentation
http://localhost:3000/api-docs/
```
