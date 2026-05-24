const lista_servico = {
    itens: {
        titulo: "Veja nossos serviços!",
        lista: [
            {
                id: 1,
                nome: "Mashup Exclusivo",
                descricao: "Criação de mashups personalizados para animar sua festa ou show.",
                imagem: require('../../assets/icone-servico3.jpg'),
                imagens: [
                    require('../../assets/icone-servico3.jpg'),
                    require('../../assets/icone-servico.jpg'),
                    require('../../assets/icone-servico2.jpg'),
                ],
                detalhes: "Criamos mashups únicos e personalizados, combinando suas músicas favoritas com efeitos profissionais. Ideal para festas, casamentos, eventos corporativos e muito mais.",
                personalizado: true,
                badge: "100% Personalizado",
                duracao: "5 a 7 dias úteis",
                formato: "MP3, WAV",
                revisoes: 2,
                contato: {
                    mensagem: "Olá! Gostaria de saber mais sobre o serviço de Mashup Exclusivo.",
                    whatsapp: "5511941340429"
                }
            },
            {
                id: 2,
                nome: "Set ao Vivo",
                descricao: "Performance ao vivo com seleção musical dinâmica e energia de pista.",
                imagem: require('../../assets/icone-servico.jpg'),
                imagens: [
                    require('../../assets/icone-servico.jpg'),
                    require('../../assets/icone-servico2.jpg'),
                    require('../../assets/icone-servico4.jpg'),
                ],
                detalhes: "Performances ao vivo com seleção dinâmica de músicas, ajustadas ao público e à energia do evento. Equipamento profissional incluído.",
                personalizado: true,
                badge: "Equipamento Profissional",
                duracao: "Sob demanda",
                formato: "Ao Vivo",
                revisoes: null,
                contato: {
                    mensagem: "Oi! Gostaria de contratar um Set ao Vivo.",
                    whatsapp: "5511941340429"
                }
            },
            {
                id: 3,
                nome: "Remixagem Personalizada",
                descricao: "Remix profissional de suas faixas ou trilhas para um som único.",
                imagem: require('../../assets/icone-servico2.jpg'),
                imagens: [
                    require('../../assets/icone-servico2.jpg'),
                    require('../../assets/icone-servico3.jpg'),
                    require('../../assets/icone-servico.jpg'),
                ],
                detalhes: "Remix profissional com produção de alta qualidade. Incluindo arranjos originais, novos elementos sonoros e masterização.",
                personalizado: true,
                badge: "Remix Pro",
                duracao: "3 a 5 dias",
                formato: "MP3, WAV, FLAC",
                revisoes: 3,
                contato: {
                    mensagem: "Olá! Tenho interesse em uma Remixagem Personalizada.",
                    whatsapp: "5511941340429"
                }
            },
            {
                id: 4,
                nome: "Consultoria Musical",
                descricao: "Ajuda especializada para montar seu repertório e preparação de evento.",
                imagem: require('../../assets/icone-servico4.jpg'),
                imagens: [
                    require('../../assets/icone-servico4.jpg'),
                    require('../../assets/icone-servico3.jpg'),
                    require('../../assets/icone-servico.jpg'),
                ],
                detalhes: "Consultoria completa para montagem de repertório, dicas de performance, análise de público e estratégia musical para seus eventos.",
                personalizado: false,
                badge: "Consultoria Especializada",
                duracao: "1 a 2 dias",
                formato: "Sessão Online",
                revisoes: null,
                contato: {
                    mensagem: "Oi! Gostaria de agendar uma Consultoria Musical.",
                    whatsapp: "5511941340429"
                }
            }
        ]
    }
}
export default lista_servico;