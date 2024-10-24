import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    user:'blog_admin',
    host:'localhost',
    password:'password123',
    database:'blog',
});


export default pool;