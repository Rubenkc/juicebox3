const { 
    client,
    getAllUsers,
    createUser
} = require('./index.js');

async function testDB(){
    try{
        console.log('testing database..')

        const users = await getAllUsers();

        console.log("getAllUsers:", users)

        console.log("Done testing database..")

    } catch(err){
        console.log("error testing database..")
        throw err
    
    } 
}

async function dropTables(){
    try{
        console.log('dropping tables..')

        await client.query(`
           DROP TABLE IF EXISTS users;
            `);
        
        console.log('finished droping tables..')

    } catch(err){
        throw err
    }
}

async function createTables(){
    try{

      console.log("Creating tables...")

      await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            );
            `);

      console.log('Finished creating tables..')

    } catch(err){
        throw err
    }
}

async function createInitialUsers(){
    try{
        console.log("Creating users..")

         const albert = await createUser({username: "albert", password:"bertie99"})
         console.log(albert)

        console.log('Finished creating users..')
    } catch(err){
        throw error 
    }
}

async function rebuildDB(){
    try{
        client.connect();

        
        await dropTables();
        await createTables();
        await createInitialUsers();

    } catch(err){
        console.log(err)
    } 
}


rebuildDB()
.then(testDB)
.catch(console.error)
.finally(() => client.end())