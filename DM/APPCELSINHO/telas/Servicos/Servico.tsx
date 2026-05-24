import React, { useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ScrollView,
  FlatList,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Texto from '../../componentes/Texto';
import Style from './estiloServico';

interface ContatoProps {
  mensagem: string;
  whatsapp: string;
}

interface ServicoProps {
  servico: {
    id: number;
    nome: string;
    imagem: ImageSourcePropType;
    descricao: string;
    detalhes: string;
    personalizado: boolean;
    badge: string;
    duracao: string;
    formato: string;
    revisoes: number | null;
    contato: ContatoProps;
    imagens: ImageSourcePropType[];
  };
}

function abrirWhatsApp(contato: ContatoProps) {
  const url = `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(contato.mensagem)}`;
  Linking.openURL(url);
}

export default function Servico({ servico }: ServicoProps) {
  const [statusModal, acaoAbreFecha] = useState(false);
  const [indicePrincipal, setIndicePrincipal] = useState(0);

  return (
    <>
      <Card mode="elevated" style={Style.card}>
        <Card.Cover source={servico.imagem} style={Style.cardCover} />
        <Card.Content style={Style.cardContent}>
          {servico.badge && (
            <View style={Style.badgeContainer}>
              <Ionicons name="sparkles" size={12} color="#6d24ca" />
              <Texto estiloEspecifico={Style.badgeTexto}>{servico.badge}</Texto>
            </View>
          )}
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
          <TouchableOpacity
            style={Style.botaoContatoCard}
            onPress={() => abrirWhatsApp(servico.contato)}
          >
            <Ionicons name="logo-whatsapp" size={20} color="#ffffff" />
            <Texto estiloEspecifico={Style.textoContato}>Contratar</Texto>
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

            {servico.badge && (
              <View style={Style.badgeContainerModal}>
                <Ionicons name="sparkles" size={14} color="#6d24ca" />
                <Texto estiloEspecifico={Style.badgeTextoModal}>{servico.badge}</Texto>
              </View>
            )}

            <Texto estiloEspecifico={Style.nomeServico}>
              {servico.nome}
            </Texto>

            <Texto estiloEspecifico={Style.descServico}>
              {servico.descricao}
            </Texto>

            <View style={Style.secaoDetalhes}>
              <Texto estiloEspecifico={Style.secaoTitulo}>Sobre este serviço</Texto>
              <Texto estiloEspecifico={Style.secaoTexto}>{servico.detalhes}</Texto>
            </View>

            <View style={Style.infoGrid}>
              <View style={Style.infoItem}>
                <View style={Style.infoIconLabel}>
                  <Ionicons name="time-outline" size={18} color="#6d24ca" />
                  <Texto estiloEspecifico={Style.infoLabel}>Prazo</Texto>
                </View>
                <Texto estiloEspecifico={Style.infoValor}>{servico.duracao}</Texto>
              </View>
              <View style={Style.infoItem}>
                <View style={Style.infoIconLabel}>
                  <Ionicons name="document-outline" size={18} color="#6d24ca" />
                  <Texto estiloEspecifico={Style.infoLabel}>Formato</Texto>
                </View>
                <Texto estiloEspecifico={Style.infoValor}>{servico.formato}</Texto>
              </View>
              {servico.revisoes !== null && (
                <View style={Style.infoItem}>
                  <View style={Style.infoIconLabel}>
                    <Ionicons name="refresh-outline" size={18} color="#6d24ca" />
                    <Texto estiloEspecifico={Style.infoLabel}>Revisões</Texto>
                  </View>
                  <Texto estiloEspecifico={Style.infoValor}>{servico.revisoes} incluídas</Texto>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={Style.botaoContatoModal}
              onPress={() => abrirWhatsApp(servico.contato)}
            >
              <Ionicons name="logo-whatsapp" size={22} color="#ffffff" />
              <Texto estiloEspecifico={Style.textoContatoModal}>
                Falar sobre este serviço
              </Texto>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}
