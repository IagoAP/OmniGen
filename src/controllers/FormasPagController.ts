import {Request, Response} from 'express'
import knex from '../database/connection'

class FormasPagController{
    async index (request: Request, response: Response) {
        const formas_pagamento = await knex('formas_pagamento').select('*');
    
        const pagamentos = await knex('pagamentos').select('*');

        const produto = await knex('produtos').select('*');

        const serializedItens = formas_pagamento.map(forma => {

            var custo = 0;
            var receitaTotal = 0;
            var redimento = 0;
            var receita = 0;

            pagamentos.map(pagamento => {
                try{
                    console.log(produto[pagamento.id_produto].id, pagamento.id_produto);
                }catch(error){
                }

                //var prod = produto[pagamento.id_produto];

                //receitaTotal = receitaTotal + prod.valor*pagamento.qtde;

                if(pagamento.id_forma == forma.id){

                    //receita = receita + produto[pagamento.id_produto].valor*pagamento.qtde;
                    //custo = 

                }
            })

            return {
                id: forma.id,
                nome: forma.nome,
                rendimento: '',
                porcentagem: '',
            }
        })



        const joins = await knex('pagamentos')
            .join('formas_pagamento', 'formas_pagamento.id', '=', 'pagamentos.id_forma')
            .join('produtos','produtos.id','=','pagamentos.id_produto')
            .select('*');

        const dados = pagamentos.map(pagamento => {
            
        })
    
        return response.json(serializedItens);
    }
}
export default FormasPagController;