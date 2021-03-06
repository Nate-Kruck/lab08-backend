const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                  id SERIAL PRIMARY KEY,
                  email VARCHAR(256) NOT NULL,
                  hash VARCHAR(512) NOT NULL
                );
                
                CREATE TABLE gamingPlatform (
                  id SERIAL PRIMARY KEY NOT NULL,
                  name VARCHAR(256) NOT NULL
                );
                
                CREATE TABLE games (
                  id SERIAL PRIMARY KEY NOT NULL,
                  name VARCHAR(512) NOT NULL,
                  platform_id INT NOT NULL REFERENCES gamingPlatform(id),
                  genre VARCHAR(300) NOT NULL,
                  price DECIMAL NOT NULL,
                  rating DECIMAL NOT NULL,
                  mature BOOLEAN,
                  image VARCHAR(512) NOT NULL
                );
                `);
                  
                  

                  
    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  } catch(err) {
    // problem? let's see the error...
    console.log(err);
  } finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
