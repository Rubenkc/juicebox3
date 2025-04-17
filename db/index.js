const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/juice-box2');

async function getAllUsers(){
    
    const { rows } = await client.query(`
            SELECT id, username 
            FROM users;
            `)
    return rows;
}

async function createUser({username, password}){  // why do you need to pass an object as the argument 
    try{
        const result = await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2);
            `, [username, password])
        return result
    
    } catch(err){
        throw err;
    }
}


module.exports ={
    client,
    getAllUsers,
    createUser
}