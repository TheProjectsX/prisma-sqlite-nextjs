# Task Tracker
Isn't created as a Serious Project. Just created to Clear the concepts of the Used Technologies...

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

### Conversation with ChatGPT

If you are interested in Checking the Conversation with the ChatGPT, you Can [Check Here](https://chat.openai.com/share/c1b551b6-3002-410d-b865-dc2a2468d20d)
