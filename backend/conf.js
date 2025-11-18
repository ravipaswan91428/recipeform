import { Client, Account, Databases, ID } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') 
    .setProject('68fba59f000587ef26a5'); 

export const account = new Account(client);
export const databases = new Databases(client);
    

export { ID };
