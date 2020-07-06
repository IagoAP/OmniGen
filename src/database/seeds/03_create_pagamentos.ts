import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('pagamentos').insert([
        { id_produto: '1', id_forma: '2', qtde: '3' },
        { id_produto: '2', id_forma: '4', qtde: '2' },
        { id_produto: '3', id_forma: '1', qtde: '5' },
        { id_produto: '4', id_forma: '3', qtde: '2' },
        { id_produto: '2', id_forma: '1', qtde: '3' },
        { id_produto: '1', id_forma: '1', qtde: '1' },
        { id_produto: '3', id_forma: '2', qtde: '4' },
        { id_produto: '2', id_forma: '2', qtde: '1' },
        { id_produto: '2', id_forma: '3', qtde: '1' },
        { id_produto: '4', id_forma: '3', qtde: '2' },
        { id_produto: '1', id_forma: '3', qtde: '5' },
    ])
}