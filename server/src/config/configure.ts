export const configureConnection = () => ({
    host: process.env.HOST,  
    port: parseInt(process.env.PORT),
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
})