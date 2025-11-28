const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg');


const port = process.env.PORT || 4000;
const app = express();

//connect to postgres
const PG_HOST='postgres-db';
const PG_PORT='5432';
const PG_USER='root';
const PG_PASSWORD='example';

const URI = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/mydatabase`;

const pgClient = new Client({
  connectionString: URI,
});

pgClient.connect().then(() => console.log('Connected to Postgres')).catch(err => console.log('Postgres connection error:', err));

//conenct to redis
const REDIS_HOST='redis';
const REDIS_PORT='6379';
const redisClient = redis.createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` });
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.connect();

// //conect to mongodb
// const DB_USER='root';
// const DB_PASSWORD='example';
// const DB_PORT='27017';
// const DB_NAME='mydatabase';
// const DB_HOST='mongo';

// const URI=`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
// mongoose.connect(URI).then(() => console.log('DB connected')).catch(err => console.log('DB connection error:', err));

app.get('/', (req, res) => {
  redisClient.set('products', 'products...')
  res.send('<h1>  helooooo from AWS using in docker hub<h1>');
});

app.get('/data', async (req, res) => {
  const products= await redisClient.get('products');
  res.send(`<h1> products from redis: <h2>${products}</h2></h1>`);
});

app.listen(port,()=> console.log(`app is up and running on port: ${port} `));
  