## Reservation app node server api

### This app include the following features:

- Node.js
- koa
- moment
- winston
- sequelize (sqlite3)
- babel
- jest
- nodemon
- eslint


## Directory Layout

```
.
├── /config/                    # Config 폴더
│   ├── config.json	            # 서버 config
│   └── datasources.json	      # DB config
├── /db/                        # DB model 폴더
│   ├── /migrations/	          # DB tables 정의
│   ├── /models/                # DB model 정의 
│   ├── /seeders/               # DB model seed 데이터 정의
│   └── memoryDb.sqlite         # sqllite file
├── /server/                    # server 폴더
│   ├── /api/	                  # api 폴더
│   ├── /components/            # componets 폴더
│   ├── /constants/             # constants 폴더
│   ├── /middlewares/           # middeware 폴더
│   └── app.js	                # The main JavaScript file (entry point)
├── /spec/                      # swagger 정의
├── /test/                      # Unit and integration tests
├── .babelrc                    # babel config file
├── .sequelizerc                # sequelize conig file
│── package.json                # Dev dependencies and NPM scripts
└── README.md                   # Project overview
```

## Commands

### Run

```zsh
$ yarn                                # Install modules
$ yarn dev                            # Run development mode
$ yarn start                          # Run production mode
```

### Test

```zsh
$ yarn test                           # Run all test
$ yarn test:watch                     # Run unit test
```

### sequelize

```zsh
$ yarn create                         # Create db
$ yarn drop                           # Drop db
$ yarn migrate                        # Create tables
$ yarn migrate:undo                   # Remove tables
$ yarn seed                           # Insert seed data
$ yarn seed:undo                      # Remove inserted seed data
```