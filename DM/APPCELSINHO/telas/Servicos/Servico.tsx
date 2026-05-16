import { Card } from "react-native-paper";

import Texto from '../../componentes/Texto'
import Style from './estiloServico'

export default function Servico({servico:{id,nome,imagem,descricao}}:any){
    return (
      <Card mode='elevated' style={Style.card}>
        <Card.Cover source={imagem} style={Style.cardCover} />
        <Card.Content style={Style.cardContent}>
          <Texto estiloEspecifico={Style.nome}>{nome}</Texto>
          <Texto estiloEspecifico={Style.descricao}>{descricao}</Texto>
        </Card.Content>
      </Card>
    )
}