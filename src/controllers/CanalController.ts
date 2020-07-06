import {Request, Response} from 'express'
import knex from '../database/connection'

class CanalController{

    async show (request: Request, response: Response) {
        const { id } = request.params;

        const canal = await knex('formas_pagamento').where('id', id).first();

        if(!canal){
            return response.status(400).json({message: 'Point not found.' });
        }

        const serializedCanais = {
            ...canal
        }

        

        return response.json(serializedCanais);
    }
}

export default CanalController;