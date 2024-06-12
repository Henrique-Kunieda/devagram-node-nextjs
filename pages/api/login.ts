import type {NextApiRequest,NextApiResponse} from 'next'
import {conectarMongoDb} from '../../middlewars/conectarMongoDB';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import md5 from 'md5';
import { UsuarioModel } from '@/models/UsuarioModel';

const endpointLogin = async (
    req : NextApiRequest, 
    res : NextApiResponse<RespostaPadraoMsg>
) =>{
    if(req.method === 'POST'){
        const {login,senha} = req.body;
        
        const usuarioEncontrados = await UsuarioModel.find({email : login, senha : md5(senha)})
        if(usuarioEncontrados && usuarioEncontrados.length > 0 ){
            const usuarioLogado = usuarioEncontrados[0];
               return res.status(200).json({msg : `Usuário ${usuarioLogado.nome} autenticado com sucesso`})
            }
             return res.status(405).json({erro : ' Usuário ou senha não encontrados'})
    }
    return res.status(405).json({erro : 'Metodo informado não é válido'})
};

export default conectarMongoDb( endpointLogin);