import dotenv from 'dotenv'; 
dotenv.config();
import './database/database';
import { App } from './app';

export default async function main(){
    const app = new App();
    app.init()
}
main()