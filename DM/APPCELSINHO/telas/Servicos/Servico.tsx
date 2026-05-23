import React, { useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Texto from '../../componentes/Texto';
import Style from './estiloServico';

interface ServicoProps {
  servico: {
    id: number;
    nome: string;
    imagem: ImageSourcePropType;
    descricao: string;
    imagens: ImageSourcePropType[];
  };
}

export default function Servico({ servico }: ServicoProps) {
  const [statusModal, acaoAbreFecha] = useState(false);
  const [indicePrincipal, setIndicePrincipal] = useState(0);

  return (
    <>
      <Card mode="elevated" style={Style.card}>
        <Card.Cover source={servico.imagem} style={Style.cardCover} />
        <Card.Content style={Style.cardContent}>
          <Texto estiloEspecifico={Style.nome}>{servico.nome}</Texto>
          <Texto estiloEspecifico={Style.descricao}>{servico.descricao}</Texto>
        </Card.Content>
        <Card.Actions style={Style.cardActions}>
          <TouchableOpacity
            style={Style.botaoDetalhes}
            onPress={() => acaoAbreFecha(true)}
          >
            <Ionicons name="list" size={20} color="#ffffff" />
            <Texto estiloEspecifico={Style.textoDetalhes}>Detalhes</Texto>
          </TouchableOpacity>
        </Card.Actions>
      </Card>

      <Modal
        animationType="slide"
        transparent={true}
        visible={statusModal}
        onRequestClose={() => acaoAbreFecha(false)}
      >
        <SafeAreaView style={Style.modalContainer}>
          <TouchableOpacity
            style={Style.botaoModal}
            onPress={() => acaoAbreFecha(false)}
          >
            <Ionicons name="close" size={28} color="#ffffff" />
          </TouchableOpacity>

          <ScrollView 
            style={Style.modal}
            contentContainerStyle={Style.modalContent}
          >
            {/* Carrossel de Imagens */}
            <View style={Style.carrosselContainer}>
              <FlatList
                data={servico.imagens}
                renderItem={({ item }) => (
                  <Image
                    source={item}
                    style={Style.imagemCarrossel}
                    resizeMode="contain"
                  />
                )}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                scrollEventThrottle={16}
                onScroll={(event) => {
                  const contentOffsetX = event.nativeEvent.contentOffset.x;
                  const indice = Math.round(contentOffsetX / 280);
                  setIndicePrincipal(indice);
                }}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              />
            </View>

            {/* Indicadores do Carrossel */}
            <View style={Style.indicadores}>
              {servico.imagens.map((_, index) => (
                <View
                  key={index}
                  style={[
                    Style.ponto,
                    indicePrincipal === index && Style.pontoBrilho,
                  ]}
                />
              ))}
            </View>

            {/* Nome do Serviço */}
            <Texto estiloEspecifico={Style.nomeServico}>
              {servico.nome}
            </Texto>

            {/* Descrição do Serviço */}
            <Texto estiloEspecifico={Style.descServico}>
              {servico.descricao}
            </Texto>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}
