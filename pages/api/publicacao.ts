import type { NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import nc from 'next-connect';
import { upload, uploadImagemCosmic } from '../../services/uploudImagemCosmic'; // Corrigido o nome do módulo importado
import {conectarMongoDb} from '../../middlewars/conectarMongoDb'; // Corrigido o nome do módulo importado
import {validarTokenJWT} from '../../middlewars/validarTokenJWT'; // Corrigido o nome do módulo importado

const handler = nc()
  .use(upload.single('file'))
  .post(async (req: any, res: NextApiResponse<RespostaPadraoMsg>) => {
      try{
        if(!req || !req.body){
            return res.status(400).json({erro: ' Parametros de entrada inválidos'})
        }

        const {descricao} = req?.body;

      if(!descricao || descricao.length < 2){
        return res.status(400).json({erro : 'Descrição não é válida'})
      }

      if(!req.file){
        return res.status(400).json({erro : 'Imagem é obrigátoria'})
      }

        return res.status(200).json({msg : 'Publicação Válida!'})
      }catch(e){
        return res.status(404).json({erro : 'Parametros de entrada inválidos'})
      }
    
  });


export const config = {
  api: {
    bodyParser: false 
  }
};

export default validarTokenJWT(conectarMongoDb(handler));


  





  