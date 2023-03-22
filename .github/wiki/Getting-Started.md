### Prerequisites

- Ruby version: 3.0.1
- Node version: 16.13.2

### Docker

- Install [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)

- Setup and boot the Docker containers:

```sh
./bin/envsetup.sh
```

### Development

- Set up the dependencies:

  - PostgreSQL:

  ```sh
  brew install postgresql
  brew services start postgresql
  ```

  - Redis:

  ```sh
  brew install redis
  brew services start redis
  ```

  - Foreman:

  ```sh
  brew install foreman
  ```

- Setup the databases:

  - Postgres:

  ```sh
  rake db:setup
  ```

- Run the Rails app

```sh
./bin/dev
```
