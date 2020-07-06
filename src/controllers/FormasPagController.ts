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
            var rendimento = 0;
            var receita = 0;

            pagamentos.map(pagamento => {
                try{
                    receitaTotal = receitaTotal + produto[pagamento.id_produto].valor*pagamento.qtde;

                    if(pagamento.id_forma == forma.id){

                        receita = receita + produto[pagamento.id_produto].valor*pagamento.qtde;
                        custo = custo + produto[pagamento.id_produto].custo*pagamento.qtde 
                            + produto[pagamento.id_produto].valor*forma.taxa_universal 
                            + produto[pagamento.id_produto].valor*forma.taxa_cred 
                            + produto[pagamento.id_produto].valor*forma.taxa_deb;
    
                    }

                }catch(error){
                }
            })

            try{
                custo = custo + Number(forma.taxa_inicial);
            }catch(error){
            }

            var porcentagem = receita/receitaTotal;
            rendimento = receita - custo;

            return {
                id: forma.id,
                nome: forma.nome,
                custo: custo.toFixed(2),
                receita: receita.toFixed(2),
                rendimento: rendimento.toFixed(2),
                porcentagem: porcentagem.toFixed(2),
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