# Task Tracker

### Technologies:

- Next JS
- Prisma
- SQLite
- ChatGPT

### Frontend:

Designed by _ChatGPT_. Modified and Described by _Your Very Own!_

### Prisma Installation

```
yarn add prisma @prisma/client sqlite3
yarn prisma init
```

### Setting up SQLite

Edit in "prisma/schema.prisma"

```
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### Add Model

Edit in "prisma/schema.prisma"

```
generator client {
  provider = "prisma-client-js"
}

model UserTask {
  id          String   @id @default(cuid())
  title       String
  description String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Generate Prisma Client

```
yarn prisma generate
```

### Migrate after Updating Model

```
yarn prisma migrate dev --name init
```

### View the Database as GUI

```
yarn prisma studio
```
