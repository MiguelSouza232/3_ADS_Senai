import { FlatList, View, Image } from "react-native";

import Texto from "../../componentes/Texto";
import CadaServico from './Servico'
import Style from './estiloServico'
import servicos from '../mocks/listaServicos'

export default function Index(){
    return (
      <View style={Style.corFundo}>
        <FlatList
          data={servicos.itens.lista}
          renderItem={({item})=> <CadaServico servico={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => (
            <View style={Style.headerContainer}>
              <Image
                source={require('../../assets/LogoCelsinho.png')}
                style={Style.headerLogo}
                resizeMode="contain"
              />
              <Texto estiloEspecifico={Style.headerText}>
                Veja meus serviços!
              </Texto>
            </View>
          )}
          contentContainerStyle={Style.listContent}
        />
      </View>
    )
}