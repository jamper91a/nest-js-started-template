<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. This repository have already implemente
the next features:

- Nestify
- Global class validation
- Global guards
- Decorators
- Sequelize
- Configuration service using yml files
- Compression
- Authentication with Passport
- Helmet Protection
- Open Cli

## Global class validation

To implement a global class validation on an controller you must use decorators on the dto:

```javascript
import {IsEmail, IsNotEmpty} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
```

## Global guards.

Some guards were already implemented for convenience:

- Role guard: Allow you to block controller actions base on a role

```javascript
@Post()
@Roles(['admin', 'customer'])
async
create(@Body()
createCatDto: CreateCatDto
)
{
    this.catsService.create(createCatDto);
}
//If roles are not required we can ommit the guard
@Post()
async
create(@Body()
createCatDto: CreateCatDto
)
{
    this.catsService.create(createCatDto);
}
```

For this guard to work properly you must attach the user object to the user request (when user have logged) and you must
specify which propertly of the user object to compare on the file */guards/roles.guard.ts* line 25

## Decorators:

Some common decorators have been implemented

- Public: Will allow to have access to endpoints without being logged

```javascript
@Get()
@Public()
async
findAll()
{
}
```

- User: Will give access to the user auth in on the endpoint

```javascript
@Post('stripe')
@Roles(Constants.groups.spectator)
async
edit(@UserAuth()
user : TokenAuthEntity
)
{
}
```

## Configuration Service

The configuration service has been implemented using yml files. You can have as many enviromental configuration files as
you want. By default the *config-local.yml* was created. To create more copy the *config-local.yml* and on the same
folder with another name such as config-development.yml and when you start nest you must attach the *NODE_ENV* var

```bash
NODE_ENV=development nest start
```

## Sequelize:

Sequelize has been integrate. You must change the credentials on *config-local.yml*

## Authentication with Passport

### Local Authentication

#### Fields

Local authentication implemented using passport. It will use a combination of **username/password** to validate. To
change username for email or a different key, go to *auth/ strategies/local.strategy*

#### Login

To change the logic for validation (use a database, an external service, etc) go to *auth/auth.service.ts* and change
the function validateUser

```javascript 
async validate(username: string, password: string): Promise<any> {
    // Valida with database,etc
    
    return user;
}
```

### Jwt Authentication

All routes are validated using jwt, except for those who hace the decorator *@Public*. To change the logic review the
file *auth/strategies/jwt.strategy*

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Tokens

```bash
# Admin
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
