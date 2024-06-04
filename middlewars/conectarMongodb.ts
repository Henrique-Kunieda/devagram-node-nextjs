import type {NextApiRequest,NextApiResponse, NextApiHandler} from 'next';
import mongoosefrom from 'mongoose';
import type {RespostaPadraoMsg} from '../types/RespostaPadraoMsg'

export const conectarMongoDb = (handler : NextApiHandler) =>
     async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) =>{

        //verificar se o banco ja esta conectado, se estiver seguir para o endpoint
         if(mongoosefrom.connections[0].readyState){
            return handler (req, res);
         }

         //ja que não está conectado, vamos conectar, obter variavel do ambiente preenchida do env
         const {DB_CONEXAO_STRING}= process.env

         //se a env estiver vazia avisar programador, abortar o uso do sistema
         if(!DB_CONEXAO_STRING){
            return res.status(500).json({erro : 'ENV de configuração do banco, não informada'})
         } 
         
         mongoosefrom.connection.on('connected', () => console.log('Banco de Dados conectado'))
         mongoosefrom.connection.on('error', error => console.log('Ocorreu um erro'))
         await mongoosefrom.connect(DB_CONEXAO_STRING);
        
        //agora posso seguir para o endpoint, pois estou conectado no banco
         return handler(req, res);
  
    }

