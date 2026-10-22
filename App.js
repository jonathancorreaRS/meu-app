
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const CHAVE_FORMULARIOS = '@CineMundo:formularios';

// PARTE 1 — ATORES
const atores = [
  {
    id: '1',
    nome: 'Robert Downey Jr.',
    filme: 'Homem de Ferro',
    imagem: 'https://commons.wikimedia.org/wiki/Special:FilePath/Robert_Downey_Jr_at_Comic_Con_2007.jpg',
    descricao:
      'Robert Downey Jr. é um ator norte-americano que ficou mundialmente conhecido por interpretar Tony Stark, o Homem de Ferro, no universo cinematográfico da Marvel. Seu personagem é um inventor muito inteligente, empresário e criador de uma armadura tecnológica avançada. Ao longo dos filmes, Tony enfrenta inimigos poderosos, desenvolve novas tecnologias e aprende a assumir responsabilidades cada vez maiores. Sua personalidade combina humor, coragem e inteligência, tornando-o um dos personagens mais conhecidos dos filmes de super-heróis.',
  },
  {
    id: '2',
    nome: 'Zendaya',
    filme: 'Homem-Aranha',
    imagem: 'https://commons.wikimedia.org/wiki/Special:FilePath/Zendaya_by_Gage_Skidmore.jpg',
    descricao:
      'Zendaya é uma atriz, cantora e produtora norte-americana que ganhou destaque em produções para televisão e cinema. Nos filmes recentes do Homem-Aranha, ela interpreta MJ, uma jovem inteligente, observadora e independente que se aproxima de Peter Parker. A personagem participa de momentos importantes da história e ajuda Peter a enfrentar situações difíceis. Além de atuar em filmes de super-heróis, Zendaya também é conhecida por trabalhos dramáticos e por sua participação em produções que exploram relacionamentos, desafios pessoais e amadurecimento.',
  },
  {
    id: '3',
    nome: 'Tom Holland',
    filme: 'Homem-Aranha',
    imagem: 'https://commons.wikimedia.org/wiki/Special:FilePath/TomHolland-byPhilipRomano.jpg',
    descricao:
      'Tom Holland é um ator britânico que começou sua carreira artística ainda jovem e conquistou reconhecimento internacional ao interpretar Peter Parker, o Homem-Aranha. Nos filmes da Marvel, seu personagem precisa conciliar a vida de estudante com as responsabilidades de ser um super-herói. Peter enfrenta vilões, protege pessoas e aprende com seus próprios erros. A interpretação de Holland destaca o lado humano do personagem, mostrando suas amizades, dúvidas, desafios familiares e o esforço necessário para fazer escolhas difíceis.',
  },
  {
    id: '4',
    nome: 'Margot Robbie',
    filme: 'Barbie',
    imagem: 'https://commons.wikimedia.org/wiki/Special:FilePath/Margot_Robbie_2016_cropped_and_retouched.jpg',
    descricao:
      'Margot Robbie é uma atriz e produtora australiana conhecida por participar de grandes produções cinematográficas. No filme Barbie, ela interpreta uma versão da famosa boneca que começa a questionar sua realidade e decide conhecer melhor o mundo real. A história mistura comédia, fantasia e reflexões sobre identidade, expectativas sociais e autoconhecimento. Além de atuar, Margot também trabalha como produtora, participando do desenvolvimento de projetos para o cinema. Sua carreira inclui personagens variados, que demonstram sua versatilidade como atriz.',
  },
  {
    id: '5',
    nome: 'Keanu Reeves',
    filme: 'Matrix',
    imagem: 'https://commons.wikimedia.org/wiki/Special:FilePath/Keanu.jpg',
    descricao:
      'Keanu Reeves é um ator canadense conhecido por suas participações em filmes de ação e ficção científica. Em Matrix, ele interpreta Neo, um programador que descobre que o mundo em que vive pode ser uma realidade simulada por máquinas. A partir dessa descoberta, Neo passa a questionar tudo o que conhecia e se envolve em uma luta pela liberdade da humanidade. O filme ficou famoso por suas ideias filosóficas, cenas de ação e efeitos visuais inovadores, influenciando diversas produções posteriores.',
  },
];

// PARTE 2 — BASTIDORES DO CINEMA
const bastidores = [
  {
    id: '1',
    titulo: 'Preparação dos atores',
    imagem: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900',
    descricao:
      'Antes de começar as gravações, muitos atores estudam cuidadosamente o roteiro e pesquisam sobre os personagens que irão interpretar. Dependendo do papel, podem aprender novas habilidades, realizar treinamentos físicos, praticar sotaques e conversar com especialistas. Essa preparação ajuda a compreender a personalidade e as experiências do personagem. O objetivo é construir uma interpretação convincente, que combine com a história e faça o público acreditar nas situações apresentadas durante o filme.',
  },
  {
    id: '2',
    titulo: 'Efeitos especiais',
    imagem: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=900',
    descricao:
      'Os efeitos especiais ajudam a criar cenas que seriam difíceis, perigosas ou impossíveis de realizar na vida real. As equipes utilizam técnicas como computação gráfica, maquiagem, cenários construídos e efeitos práticos. Em filmes de fantasia e ficção científica, esses recursos permitem representar criaturas, explosões, cidades imaginárias e outros elementos. Depois das gravações, profissionais de efeitos visuais podem trabalhar durante meses para integrar as imagens digitais às cenas filmadas e deixar o resultado mais realista.',
  },
  {
    id: '3',
    titulo: 'Gravação das cenas',
    imagem: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=900',
    descricao:
      'Durante a produção de um filme, uma mesma cena pode precisar de várias tentativas até alcançar o resultado desejado pelo diretor. A equipe organiza câmeras, iluminação, som e a posição dos atores antes de cada gravação. Pequenos detalhes precisam ser repetidos para manter a continuidade entre as cenas, como a posição dos objetos e os movimentos dos personagens. Depois, os melhores trechos são selecionados durante a edição para construir uma história organizada e interessante.',
  },
  {
    id: '4',
    titulo: 'Figurino e maquiagem',
    imagem: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900',
    descricao:
      'As equipes de figurino e maquiagem são responsáveis por ajudar os atores a se transformarem nos personagens. Elas escolhem roupas, acessórios, penteados e técnicas de caracterização que combinam com a história. Em algumas produções, o trabalho precisa representar épocas históricas ou criar personagens fantásticos. Os profissionais também acompanham as gravações para garantir que a aparência continue consistente entre diferentes cenas. Esses detalhes ajudam o público a compreender a personalidade dos personagens e o ambiente em que vivem.',
  },
  {
    id: '5',
    titulo: 'Edição e trilha sonora',
    imagem: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900',
    descricao:
      'Depois que as gravações terminam, os profissionais de edição organizam as cenas e escolhem a melhor sequência para contar a história. A equipe de som acrescenta diálogos, ruídos, efeitos e músicas que combinam com cada momento. A trilha sonora pode aumentar a tensão, destacar uma cena emocionante ou criar uma atmosfera divertida. Esse trabalho exige atenção aos detalhes, porque o ritmo da edição e a escolha dos sons influenciam diretamente a experiência do público ao assistir ao filme.',
  },
];

// CAMPO DE TEXTO
function Campo({ titulo, valor, alterar, dica, teclado }) {
  return (
    <View style={styles.campo}>
      <Text style={styles.rotulo}>{titulo}</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={alterar}
        placeholder={dica}
        keyboardType={teclado || 'default'}
      />
    </View>
  );
}

// CARTÃO DE ATOR
function CartaoAtor({ ator, selecionado, aoSelecionar }) {
  const [erroImagem, setErroImagem] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.cartao, selecionado && styles.cartaoSelecionado]}
      onPress={aoSelecionar}
      activeOpacity={0.85}
    >
      {erroImagem ? (
        <View style={[styles.imagem, styles.imagemAlternativa]}>
          <Text style={styles.emojiImagem}>🎭</Text>
          <Text>Não foi possível carregar a imagem</Text>
        </View>
      ) : (
        <Image
          source={{ uri: ator.imagem }}
          style={styles.imagemAtor}
          resizeMode="cover"
          onError={() => setErroImagem(true)}
        />
      )}

      <View style={styles.cartaoConteudo}>
        <Text style={styles.tituloCartao}>{ator.nome}</Text>
        <Text style={styles.destaque}>Filme: {ator.filme}</Text>
        <Text style={styles.descricao}>{ator.descricao}</Text>
        <Text style={styles.instrucao}>
          {selecionado ? '✓ Selecionado' : 'Toque para selecionar'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// CARTÃO DE BASTIDORES
function CartaoBastidor({ item, selecionado, aoSelecionar }) {
  const [erroImagem, setErroImagem] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.cartao, selecionado && styles.cartaoSelecionado]}
      onPress={aoSelecionar}
      activeOpacity={0.85}
    >
      {erroImagem ? (
        <View style={[styles.imagem, styles.imagemAlternativa]}>
          <Text style={styles.emojiImagem}>🎬</Text>
          <Text>Não foi possível carregar a imagem</Text>
        </View>
      ) : (
        <Image
          source={{ uri: item.imagem }}
          style={styles.imagem}
          resizeMode="cover"
          onError={() => setErroImagem(true)}
        />
      )}

      <View style={styles.cartaoConteudo}>
        <Text style={styles.tituloCartao}>{item.titulo}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.instrucao}>
          {selecionado ? '✓ Selecionado' : 'Toque para selecionar'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// BOTÃO
function Botao({ titulo, acao, secundario = false, perigo = false }) {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        secundario && styles.botaoSecundario,
        perigo && styles.botaoPerigo,
      ]}
      onPress={acao}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.textoBotao,
          secundario && styles.textoBotaoSecundario,
        ]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

// APLICATIVO PRINCIPAL
export default function App() {
  const [tela, setTela] = useState('inicio');

  const [atorSelecionado, setAtorSelecionado] = useState(null);
  const [bastidorSelecionado, setBastidorSelecionado] = useState(null);
  const [resultadoCombinacao, setResultadoCombinacao] = useState(null);

  // QUATRO CAMPOS DE TEXTO
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [filmeFavorito, setFilmeFavorito] = useState('');
  const [comentario, setComentario] = useState('');

  // DOIS PICKERS
  const [genero, setGenero] = useState('Ação');
  const [plataforma, setPlataforma] = useState('Streaming');

  // DOIS SLIDERS
  const [nota, setNota] = useState(5);
  const [horas, setHoras] = useState(2);

  // DOIS SWITCHES
  const [novidades, setNovidades] = useState(true);
  const [recomendacoes, setRecomendacoes] = useState(false);

  // FORMULÁRIOS SALVOS
  const [formulariosSalvos, setFormulariosSalvos] = useState([]);
  const [carregandoFormularios, setCarregandoFormularios] = useState(true);

  // CARREGAR OS FORMULÁRIOS SALVOS
  useEffect(() => {
    async function carregarFormularios() {
      try {
        const dados = await AsyncStorage.getItem(CHAVE_FORMULARIOS);

        if (dados) {
          const lista = JSON.parse(dados);
          if (Array.isArray(lista)) {
            setFormulariosSalvos(lista);
          }
        }
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível carregar os formulários.');
      } finally {
        setCarregandoFormularios(false);
      }
    }

    carregarFormularios();
  }, []);

  // SALVAR NOVO FORMULÁRIO
  async function salvarFormulario() {
    if (!nome.trim()) {
      Alert.alert('Campo obrigatório', 'Digite seu nome antes de salvar.');
      return;
    }

    const formulario = {
      id: `${Date.now()}-${Math.random()}`,
      nome: nome.trim(),
      idade,
      filmeFavorito,
      comentario,
      genero,
      plataforma,
      nota,
      horas,
      novidades,
      recomendacoes,
      dataAtualizacao: new Date().toLocaleString('pt-BR'),
    };

    try {
      const atualizados = [...formulariosSalvos, formulario];

      await AsyncStorage.setItem(
        CHAVE_FORMULARIOS,
        JSON.stringify(atualizados)
      );

      setFormulariosSalvos(atualizados);
      limparFormulario();

      Alert.alert('Sucesso!', 'Formulário salvo com sucesso.');
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar o formulário.');
    }
  }

  // LIMPAR OS CAMPOS PARA UM NOVO CADASTRO
  function limparFormulario() {
    setNome('');
    setIdade('');
    setFilmeFavorito('');
    setComentario('');
    setGenero('Ação');
    setPlataforma('Streaming');
    setNota(5);
    setHoras(2);
    setNovidades(true);
    setRecomendacoes(false);
  }

  // EXCLUIR FORMULÁRIO DO ARMAZENAMENTO
  async function excluirFormulario(id) {
    try {
      const atualizados = formulariosSalvos.filter(
        (formulario) => formulario.id !== id
      );

      await AsyncStorage.setItem(
        CHAVE_FORMULARIOS,
        JSON.stringify(atualizados)
      );

      setFormulariosSalvos(atualizados);
      Alert.alert('Excluído', 'O formulário foi excluído com sucesso.');
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível excluir o formulário.');
    }
  }

  // CONFIRMAR EXCLUSÃO
  function confirmarExclusao(formulario) {
    const mensagem = `Deseja realmente excluir o formulário de ${formulario.nome}?`;

    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm(mensagem)) {
        excluirFormulario(formulario.id);
      }
      return;
    }

    Alert.alert('Confirmar exclusão', mensagem, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => excluirFormulario(formulario.id),
      },
    ]);
  }

  // COMBINAR OS ITENS SELECIONADOS
  function combinarListas() {
    if (!atorSelecionado || !bastidorSelecionado) {
      Alert.alert(
        'Selecione os itens',
        'Escolha um ator e uma curiosidade dos bastidores.'
      );
      return;
    }

    setResultadoCombinacao({
      ator: atorSelecionado,
      bastidor: bastidorSelecionado,
    });
  }

  return (
    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <Text style={styles.logo}>🎬 CineMundo</Text>
        <Text style={styles.subtitulo}>Seu universo cinematográfico</Text>
      </View>

      {/* NAVEGAÇÃO ENTRE DUAS TELAS */}
      <View style={styles.navegacao}>
        <TouchableOpacity
          style={[styles.navItem, tela === 'inicio' && styles.navAtivo]}
          onPress={() => setTela('inicio')}
        >
          <Text
            style={[
              styles.navTexto,
              tela === 'inicio' && styles.navTextoAtivo,
            ]}
          >
            🎥 Início
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, tela === 'perfil' && styles.navAtivo]}
          onPress={() => setTela('perfil')}
        >
          <Text
            style={[
              styles.navTexto,
              tela === 'perfil' && styles.navTextoAtivo,
            ]}
          >
            👤 Meu perfil
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        {/* TELA 1 — ATORES E BASTIDORES */}
        {tela === 'inicio' && (
          <View>
            <View style={styles.banner}>
              <Text style={styles.tituloBanner}>Bem-vindo ao CineMundo!</Text>
              <Text style={styles.textoBanner}>
                Conheça atores, descubra curiosidades e explore os bastidores
                das produções cinematográficas.
              </Text>
              <Botao
                titulo="Ir para meu perfil"
                acao={() => setTela('perfil')}
              />
            </View>

            <Text style={styles.tituloSecao}>⭐ Parte 1 — Atores</Text>
            <Text style={styles.ajuda}>
              Selecione um ator e depois uma curiosidade na segunda lista.
            </Text>

            {atores.map((ator) => (
              <CartaoAtor
                key={ator.id}
                ator={ator}
                selecionado={atorSelecionado?.id === ator.id}
                aoSelecionar={() => setAtorSelecionado(ator)}
              />
            ))}

            <Text style={styles.tituloSecao}>🎬 Parte 2 — Bastidores</Text>

            {bastidores.map((item) => (
              <CartaoBastidor
                key={item.id}
                item={item}
                selecionado={bastidorSelecionado?.id === item.id}
                aoSelecionar={() => setBastidorSelecionado(item)}
              />
            ))}

            {/* INTERAÇÃO ENTRE AS LISTAS */}
            <View style={styles.blocoInteracao}>
              <Text style={styles.tituloCartao}>
                Combinar itens selecionados
              </Text>

              <Text style={styles.descricao}>
                Ator: {atorSelecionado?.nome || 'Nenhum selecionado'}
              </Text>

              <Text style={styles.descricao}>
                Bastidor:{' '}
                {bastidorSelecionado?.titulo || 'Nenhum selecionado'}
              </Text>

              <Botao
                titulo="Combinar itens selecionados"
                acao={combinarListas}
              />

              {resultadoCombinacao && (
                <View style={styles.resultado}>
                  <Text style={styles.tituloCartao}>
                    🎬 Resultado da combinação
                  </Text>

                  <Text style={styles.destaque}>
                    Ator: {resultadoCombinacao.ator.nome}
                  </Text>

                  <Text style={styles.descricao}>
                    Filme: {resultadoCombinacao.ator.filme}
                  </Text>

                  <Image
                    source={{ uri: resultadoCombinacao.ator.imagem }}
                    style={styles.imagemResultado}
                    resizeMode="cover"
                  />

                  <Text style={styles.destaque}>
                    Curiosidade: {resultadoCombinacao.bastidor.titulo}
                  </Text>

                  <Text style={styles.descricao}>
                    {resultadoCombinacao.bastidor.descricao}
                  </Text>

                  <Text style={styles.descricao}>
                    Esta combinação relaciona o ator escolhido com uma
                    curiosidade sobre a produção cinematográfica, permitindo
                    explorar os dois itens juntos.
                  </Text>

                  <Botao
                    titulo="Limpar resultado"
                    secundario
                    acao={() => setResultadoCombinacao(null)}
                  />
                </View>
              )}

              <Botao
                titulo="Limpar seleções"
                secundario
                acao={() => {
                  setAtorSelecionado(null);
                  setBastidorSelecionado(null);
                  setResultadoCombinacao(null);
                }}
              />
            </View>
          </View>
        )}

        {/* TELA 2 — FORMULÁRIO */}
        {tela === 'perfil' && (
          <View>
            <Text style={styles.tituloPagina}>Meu perfil de cinéfilo</Text>
            <Text style={styles.ajuda}>
              Preencha os campos e salve quantos formulários precisar.
            </Text>

            <View style={styles.formulario}>
              <Campo
                titulo="Nome"
                valor={nome}
                alterar={setNome}
                dica="Digite seu nome"
              />

              <Campo
                titulo="Idade"
                valor={idade}
                alterar={setIdade}
                dica="Digite sua idade"
                teclado="numeric"
              />

              <Campo
                titulo="Filme favorito"
                valor={filmeFavorito}
                alterar={setFilmeFavorito}
                dica="Digite seu filme favorito"
              />

              <Campo
                titulo="Comentário"
                valor={comentario}
                alterar={setComentario}
                dica="Escreva um comentário"
              />

              <Text style={styles.rotulo}>Gênero favorito</Text>
              <View style={styles.picker}>
                <Picker selectedValue={genero} onValueChange={setGenero}>
                  <Picker.Item label="Ação" value="Ação" />
                  <Picker.Item label="Comédia" value="Comédia" />
                  <Picker.Item label="Drama" value="Drama" />
                  <Picker.Item label="Terror" value="Terror" />
                  <Picker.Item label="Ficção científica" value="Ficção científica" />
                  <Picker.Item label="Animação" value="Animação" />
                  <Picker.Item label="Romance" value="Romance" />
                </Picker>
              </View>

              <Text style={styles.rotulo}>Onde prefere assistir?</Text>
              <View style={styles.picker}>
                <Picker selectedValue={plataforma} onValueChange={setPlataforma}>
                  <Picker.Item label="Streaming" value="Streaming" />
                  <Picker.Item label="Cinema" value="Cinema" />
                  <Picker.Item label="Televisão" value="Televisão" />
                  <Picker.Item label="Computador" value="Computador" />
                </Picker>
              </View>

              <Text style={styles.rotulo}>
                Interesse por cinema: {nota}/10
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={10}
                step={1}
                value={nota}
                onValueChange={setNota}
                minimumTrackTintColor="#7054B5"
              />

              <Text style={styles.rotulo}>
                Horas assistindo por semana: {horas}
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={20}
                step={1}
                value={horas}
                onValueChange={setHoras}
                minimumTrackTintColor="#7054B5"
              />

              <View style={styles.linhaSwitch}>
                <Text style={styles.rotulo}>Receber novidades</Text>
                <Switch value={novidades} onValueChange={setNovidades} />
              </View>

              <View style={styles.linhaSwitch}>
                <Text style={styles.rotulo}>Receber recomendações</Text>
                <Switch
                  value={recomendacoes}
                  onValueChange={setRecomendacoes}
                />
              </View>

              <Botao
                titulo="Salvar formulário"
                acao={salvarFormulario}
              />

              <Botao
                titulo="Limpar campos"
                secundario
                acao={limparFormulario}
              />
            </View>

            {/* FORMULÁRIOS SALVOS */}
            <View style={styles.resumo}>
              <Text style={styles.tituloSecao}>
                Formulários salvos ({formulariosSalvos.length})
              </Text>

              {carregandoFormularios ? (
                <Text style={styles.descricao}>Carregando...</Text>
              ) : formulariosSalvos.length === 0 ? (
                <Text style={styles.descricao}>
                  Nenhum formulário salvo ainda.
                </Text>
              ) : (
                formulariosSalvos.map((formulario) => (
                  <View key={formulario.id} style={styles.formularioSalvo}>
                    <Text style={styles.tituloCartao}>
                      {formulario.nome}
                    </Text>

                    <Text style={styles.descricao}>
                      Idade: {formulario.idade || 'Não informada'}
                    </Text>

                    <Text style={styles.descricao}>
                      Filme favorito:{' '}
                      {formulario.filmeFavorito || 'Não informado'}
                    </Text>

                    <Text style={styles.descricao}>
                      Comentário: {formulario.comentario || 'Não informado'}
                    </Text>

                    <Text style={styles.descricao}>
                      Gênero: {formulario.genero}
                    </Text>

                    <Text style={styles.descricao}>
                      Plataforma: {formulario.plataforma}
                    </Text>

                    <Text style={styles.descricao}>
                      Interesse por cinema: {formulario.nota}/10
                    </Text>

                    <Text style={styles.descricao}>
                      Horas por semana: {formulario.horas}
                    </Text>

                    <Text style={styles.descricao}>
                      Receber novidades: {formulario.novidades ? 'Sim' : 'Não'}
                    </Text>

                    <Text style={styles.descricao}>
                      Receber recomendações:{' '}
                      {formulario.recomendacoes ? 'Sim' : 'Não'}
                    </Text>

                    <Text style={styles.dataFormulario}>
                      Salvo em: {formulario.dataAtualizacao}
                    </Text>

                    {/* BOTÃO DE EXCLUSÃO — SEM BOTÃO DE EDITAR */}
                    <Botao
                      titulo="Excluir formulário"
                      perigo
                      acao={() => confirmarExclusao(formulario)}
                    />
                  </View>
                ))
              )}
            </View>
          </View>
        )}

        <Text style={styles.rodape}>CineMundo • Projeto React Native</Text>
      </ScrollView>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F4F2FA',
  },
  cabecalho: {
    backgroundColor: '#282044',
    padding: 20,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#DCD5F2',
    marginTop: 5,
  },
  navegacao: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  navAtivo: {
    borderBottomColor: '#7054B5',
  },
  navTexto: {
    color: '#716C80',
    fontWeight: '600',
  },
  navTextoAtivo: {
    color: '#7054B5',
  },
  conteudo: {
    padding: 15,
    paddingBottom: 40,
  },
  banner: {
    backgroundColor: '#E6DFF8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  tituloBanner: {
    color: '#282044',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textoBanner: {
    color: '#49415E',
    fontSize: 15,
    lineHeight: 22,
  },
  tituloSecao: {
    color: '#282044',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  tituloPagina: {
    color: '#282044',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ajuda: {
    color: '#5E596E',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 15,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E5E1EE',
  },
  cartaoSelecionado: {
    borderColor: '#7054B5',
    borderWidth: 3,
  },
  imagem: {
    width: '100%',
    height: 220,
    backgroundColor: '#DDD8E8',
  },
  imagemAtor: {
    width: '100%',
    height: 280,
    backgroundColor: '#DDD8E8',
    alignSelf: 'center',
  },
  imagemResultado: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#DDD8E8',
  },
  imagemAlternativa: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiImagem: {
    fontSize: 48,
    marginBottom: 8,
  },
  cartaoConteudo: {
    padding: 14,
  },
  tituloCartao: {
    color: '#282044',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  destaque: {
    color: '#7054B5',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descricao: {
    color: '#514C61',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 5,
  },
  instrucao: {
    color: '#7054B5',
    fontWeight: 'bold',
    marginTop: 8,
  },
  blocoInteracao: {
    backgroundColor: '#E6DFF8',
    borderRadius: 14,
    padding: 16,
    marginTop: 12,
  },
  resultado: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  formulario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
  },
  campo: {
    marginBottom: 16,
  },
  rotulo: {
    color: '#353047',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FAF9FD',
    borderWidth: 1,
    borderColor: '#D8D3E5',
    borderRadius: 9,
    padding: 12,
    fontSize: 15,
    color: '#282044',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#D8D3E5',
    borderRadius: 9,
    overflow: 'hidden',
    marginBottom: 18,
  },
  linhaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  botao: {
    backgroundColor: '#7054B5',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  botaoSecundario: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#7054B5',
  },
  textoBotaoSecundario: {
    color: '#7054B5',
  },
  botaoPerigo: {
    backgroundColor: '#B42332',
  },
  resumo: {
    backgroundColor: '#EAE6F3',
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
  },
  formularioSalvo: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D3E5',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  dataFormulario: {
    color: '#777386',
    fontSize: 12,
    marginTop: 5,
  },
  rodape: {
    color: '#817B91',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 25,
  },
});
