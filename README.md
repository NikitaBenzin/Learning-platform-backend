<p align="center">
  <a href="https://www.youtube.com/@NikitaBenzin" target="blank"><img src="https://i.ibb.co/376303r/benzin-logo-white.png" width="200" alt="NikitaBenzin Logo" /></a>
</p>

## Project Description

# Learning platform, with admin panel.

A backend service for an online course platform providing subscription-based access to courses.

### Tech Stack

- NestJS
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT)

## Installation

```bash
$ npm install
```

## Set up environment variables by creating a `.env` file and adding:

```plaintext
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
```

## Running the app

```bash
# development
$ npm run start
```

# **API Endpoints**

### For user

- User Management: Routes for user registration, login, and getting profile.
- Subscription Management: Routes for getting subscription or subscription renewal.
- Intensive Management: Routes for getting intensives and videos.
- Storage Management: Routes for getting files from storage (Only with PREMIUM role)

### For admin

- ~~User Management: Routes for users adding, updating, removing.~~
- Subscription Management: Routes for subscriptions adding, updating, removing.
- Intensive Management: Routes for intensives adding, updating, removing.
- Storage Management: Routes for file adding, updating, removing

# **Usage Examples**

## For USER

### User management

<span style="color:#bdbdbd; border-radius: 10px;">GET</span> SITE_URL/user - get profile
<span style="color:#ff9900; border-radius: 10px;">PUT</span> SITE_URL/user/settings - update user profile

### Subscription management

<span style="color:#bdbdbd; border-radius: 10px;">GET</span> SITE_URL/subscription - get all subscriptions
<span style="color:#00c947; border-radius: 10px;">POST</span> SITE_URL/subscription/:id - create user subscription depending on subscription

### Intensive management

<span style="color:#bdbdbd; border-radius: 10px;">GET</span> SITE_URL/intensives - get all intensives
<span style="color:#bdbdbd; border-radius: 10px;">GET</span> SITE_URL/intensives/:name - get intensive by name
<span style="color:#bdbdbd; border-radius: 10px;">GET</span> SITE_URL/intensives/:intensiveName/:videoName - get video from intensive

### Storage management

<span style="color:#bdbdbd; border-radius: 10px;">GET</span> SITE_URL/storage - get all files from storage

## For ADMIN

### Self management

<span style="color:#bdbdbd; border-radius: 10px;">GET</span> SITE_URL/admin - get admin profile

### Subscription management

<span style="color:#00c947; border-radius: 10px;">POST</span> SITE_URL/subscription - create subscription
<span style="color:#ff9900; border-radius: 10px;">PUT</span> SITE_URL/subscription/:id - update subscription
<span style="color:#d10000; border-radius: 10px;">DELETE</span> SITE_URL/subscription/:id - delete subscription

### Intensive management

<span style="color:#00c947; border-radius: 10px;">POST</span> SITE_URL/intensive - create intensive
<span style="color:#ff9900; border-radius: 10px;">PUT</span> SITE_URL/intensive/:id - update intensive
<span style="color:#d10000; border-radius: 10px;">DELETE</span> SITE_URL/intensive/:id - delete intensive

### Storage management

<span style="color:#00c947; border-radius: 10px;">POST</span> SITE_URL/storage - create file
<span style="color:#ff9900; border-radius: 10px;">PUT</span> SITE_URL/storage/:id - update file
<span style="color:#d10000; border-radius: 10px;">DELETE</span> SITE_URL/storage/:id - delete file from storage

### Video management

<span style="color:#00c947; border-radius: 10px;">POST</span> SITE_URL/intensive/video - create video
<span style="color:#ff9900; border-radius: 10px;">PUT</span> SITE_URL/intensive/video/:id - update video
<span style="color:#d10000; border-radius: 10px;">DELETE</span> SITE_URL/intensive/video/:id - delete video

<!-- ## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->

## Stay in touch

- Author - Mykyta Korotych

Telegram [NikitaBenzin]('t.me/benzingroupchannel') <br>
Youtube [NikitaBenzin]('https://www.youtube.com/@NikitaBenzin')
