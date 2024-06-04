import type {NextApiRequest,NextApiResponse} from 'next'
import {conectarMongoDb} from '../../middlewars/conectarMongodb';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';

const endpointLogin = (
    req : NextApiRequest, 
    res : NextApiResponse<RespostaPadraoMsg>
) =>{
    if(req.method === 'POST'){
        const {login,senha} = req.body;

        if(login === 'admin@admin.com' &&
            senha === 'Admin@123'){
               return res.status(200).json({msg : 'Usuário e senha autenticados com sucesso'})
            }
             return res.status(405).json({erro : ' Usuário ou senha não encontrados'})
    }
    return res.status(405).json({erro : 'Metodo informado não é válido'})
};

export default conectarMongoDb( endpointLogin);