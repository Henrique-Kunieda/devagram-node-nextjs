import type {NextApiRequest,NextApiResponse} from 'next'
import {conectarMongoDb} from '../../middlewars/conectarMongoDb';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import type {LoginResposta} from '../../types/LoginResposta';
import md5 from 'md5';
import { UsuarioModel } from '@/models/UsuarioModel';
import jwt from 'jsonwebtoken';

const endpointLogin = async (
    req : NextApiRequest, 
    res : NextApiResponse<RespostaPadraoMsg | LoginResposta>
) =>{

     const  {MINHA_CHAVE_JWT} = process.env;
     if(!MINHA_CHAVE_JWT){
        return res.status(500).json({erro: 'ENV JWT não informada'})
        
     }

    if(req.method === 'POST'){
        const {login,senha} = req.body;
        
        const usuarioEncontrados = await UsuarioModel.find({email : login, senha : md5(senha)})
        if(usuarioEncontrados && usuarioEncontrados.length > 0 ){
            const usuarioLogado = usuarioEncontrados[0];

            const token = jwt.sign({_id : usuarioLogado._id}, MINHA_CHAVE_JWT);

               return res.status(200).json({nome : usuarioLogado.nome, email : usuarioLogado.email, token })
            }
             return res.status(405).json({erro : ' Usuário ou senha não encontrados'})
       }
    return res.status(405).json({erro : 'Metodo informado não é válido'})
};

export default conectarMongoDb( endpointLogin);