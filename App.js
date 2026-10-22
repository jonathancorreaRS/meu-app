
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const atores = [
  {
    id: '1',
    nome: 'Ana Lima',
    categoria: 'Drama',
    imagem: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500',
    descricao:
      'Ana Lima é uma atriz fictícia conhecida por interpretar personagens sensíveis e determinados. Em suas histórias, ela demonstra como a coragem, a amizade e a persistência podem transformar situações difíceis.',
  },
  {
    id: '2',
    nome: 'Lucas Martins',
    categoria: 'Ação',
    imagem: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500',
    descricao:
      'Lucas Martins é um ator fictício que participa de aventuras cheias de desafios. Seus personagens valorizam o trabalho em equipe, a responsabilidade e a capacidade de tomar decisões importantes nos momentos difíceis.',
  },
  {
    id: '3',
    nome: 'Mariana Costa',
    categoria: 'Comédia',
    imagem: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500',
    descricao:
      'Mariana Costa é uma atriz fictícia especializada em comédias. Suas histórias mostram como o bom humor aproxima as pessoas, ajuda a superar problemas cotidianos e transforma pequenos acontecimentos em grandes lembranças.',
  },
  {
    id: '4',
    nome: 'Pedro Almeida',
    categoria: 'Aventura',
    imagem: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500',
    descricao:
      'Pedro Almeida é um ator fictício que interpreta exploradores e aventureiros. Seus personagens enfrentam desafios, descobrem lugares desconhecidos e aprendem que a coragem e a cooperação são importantes para superar obstáculos.',
  },
  {
    id: '5',
    nome: 'Julia Ferreira',
    categoria: 'Ficção científica',
    imagem: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500',
    descricao:
      'Julia Ferreira é uma atriz fictícia que participa de histórias futuristas. Seus papéis exploram a tecnologia, as viagens espaciais e os dilemas humanos, mostrando como nossas escolhas podem influenciar o futuro.',
  },
  {
    id: '6',
    nome: 'Rafael Souza',
    categoria: 'Suspense',
    imagem: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500',
    descricao:
      'Rafael Souza é um ator fictício conhecido por histórias de mistério. Seus personagens investigam acontecimentos inesperados, procuram pistas e precisam usar a inteligência para descobrir a verdade por trás de cada situação.',
  },
];

const bastidores = [
  {
    id: '1',
    titulo: 'A preparação para um personagem',
    imagem: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1000',
    descricao:
      'Antes de interpretar um personagem, um ator pode estudar o roteiro, pesquisar sobre a história e praticar suas falas. Também pode observar comportamentos humanos para construir uma interpretação convincente. Essa preparação ajuda a transmitir emoções e tornar cada cena mais natural para o público.',
  },
  {
    id: '2',
    titulo: 'O trabalho em equipe',
    imagem: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1000',
    descricao:
      'Um filme depende da colaboração entre atores, diretores, roteiristas, fotógrafos, figurinistas e muitos outros profissionais. Cada pessoa contribui com habilidades diferentes para alcançar um resultado comum. A comunicação e a organização são fundamentais para que as gravações aconteçam e a história seja contada da melhor maneira.',
  },
  {
    id: '3',
    titulo: 'Câmeras e iluminação',
    imagem: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000',
    descricao:
      'A fotografia de um filme ajuda a construir sua identidade visual. Os profissionais escolhem câmeras, lentes, ângulos e iluminação para transmitir diferentes sensações. Uma cena pode parecer alegre, misteriosa ou assustadora dependendo de como a luz e o enquadramento são utilizados durante a gravação.',
  },
  {
    id: '4',
    titulo: 'Figurinos e maquiagem',
    imagem: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000',
    descricao:
      'O figurino e a maquiagem ajudam a transformar os atores nos personagens da história. As roupas podem indicar a época, a profissão e a personalidade de alguém. Já a maquiagem pode modificar a aparência e criar detalhes importantes para tornar o universo do filme mais convincente.',
  },
  {
    id: '5',
    titulo: 'Edição e efeitos especiais',
    imagem: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000',
    descricao:
      'Depois das gravações, a equipe de edição organiza as cenas e escolhe o ritmo da narrativa. A trilha sonora, os efeitos visuais e os ajustes de imagem ajudam a completar a experiência. Esse trabalho transforma diferentes gravações em um filme que pode emocionar e surpreender o público.',
  },
];

export default function App() {
  const [atorSelecionado, setAtorSelecionado] = useState('1');
  const [bastidorSelecionado, setBastidorSelecionado] = useState(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [filmeFavorito, setFilmeFavorito] = useState('');
  const [comentario, setComentario] = useState('');

  const [genero, setGenero] = useState('Aventura');
  const [plataforma, setPlataforma] = useState('Streaming');

  const [nota, setNota] = useState(5);
  const [interesse, setInteresse] = useState(7);

  const [receberNovidades, setReceberNovidades] = useState(false);
  const [recomendarFilmes, setRecomendarFilmes] = useState(false);

  const [perfilSalvo, setPerfilSalvo] = useState(null);
  const [mensagem, setMensagem] = useState('');

  function salvarPerfil() {
    if (
      !nome.trim() ||
      !email.trim() ||
      !filmeFavorito.trim() ||
      !comentario.trim()
    ) {
      setMensagem('Preencha os quatro campos de texto antes de salvar.');
      return;
    }

    const perfil = {
      nome: nome.trim(),
      email: email.trim(),
      filmeFavorito: filmeFavorito.trim(),
      comentario: comentario.trim(),
      genero,
      plataforma,
      nota,
      interesse,
      receberNovidades,
      recomendarFilmes,
    };

    setPerfilSalvo(perfil);
    setMensagem('Perfil salvo na tela com sucesso!');
  }

  function limparFormulario() {
    setNome('');
    setEmail('');
    setFilmeFavorito('');
    setComentario('');
    setGenero('Aventura');
    setPlataforma('Streaming');
    setNota(5);
    setInteresse(7);
    setReceberNovidades(false);
    setRecomendarFilmes(false);
    setPerfilSalvo(null);
    setMensagem('Formulário e resumo limpos.');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      {/* CABEÇALHO */}
      <View style={styles.cabecalho}>
        <Text style={styles.tituloPrincipal}>CineMundo</Text>
        <Text style={styles.subtitulo}>
          Conheça os atores e descubra os bastidores do cinema
        </Text>
      </View>

      {/* PARTE 1 */}
      <Text style={styles.tituloSecao}>
        Parte 1 — Conheça os atores
      </Text>

      <Text style={styles.instrucao}>
        Explore os perfis abaixo. Selecione um ator para destacá-lo.
      </Text>

      {atores.map((ator) => {
        const selecionado = atorSelecionado === ator.id;

        return (
          <TouchableOpacity
            key={ator.id}
            style={[
              styles.cardAtor,
              selecionado && styles.cardSelecionado,
            ]}
            onPress={() => setAtorSelecionado(ator.id)}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: ator.imagem }}
              style={styles.imagemAtor}
              resizeMode="cover"
            />

            <View style={styles.conteudoAtor}>
              <Text style={styles.nomeAtor}>{ator.nome}</Text>
              <Text style={styles.categoria}>{ator.categoria}</Text>
              <Text style={styles.descricao}>{ator.descricao}</Text>

              <Text style={styles.textoAcao}>
                {selecionado
                  ? 'Ator selecionado ✓'
                  : 'Toque para selecionar'}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {/* PARTE 2 */}
      <Text style={styles.tituloSecao}>
        Parte 2 — Descubra os bastidores
      </Text>

      <Text style={styles.instrucao}>
        Selecione um tema para conhecer como os filmes são produzidos.
      </Text>

      {bastidores.map((item) => {
        const selecionado = bastidorSelecionado === item.id;

        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.cardBastidor,
              selecionado && styles.cardSelecionado,
            ]}
            onPress={() => setBastidorSelecionado(item.id)}
            activeOpacity={0.85}
          >
            <Image
              source={{ uri: item.imagem }}
              style={styles.imagemBastidor}
              resizeMode="cover"
            />

            <View style={styles.conteudoBastidor}>
              <Text style={styles.tituloCard}>{item.titulo}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>

              <Text style={styles.textoAcao}>
                {selecionado
                  ? 'Tema selecionado ✓'
                  : 'Toque para interagir'}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {/* PARTE 3 */}
      <Text style={styles.tituloSecao}>
        Parte 3 — Monte seu perfil cinéfilo
      </Text>

      <Text style={styles.instrucao}>
        Preencha suas informações e salve seu perfil para ver o resumo abaixo.
      </Text>

      <View style={styles.formulario}>
        {/* INPUT 1 */}
        <Text style={styles.rotulo}>1. Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        {/* INPUT 2 */}
        <Text style={styles.rotulo}>2. E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* INPUT 3 */}
        <Text style={styles.rotulo}>3. Filme favorito</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu filme favorito"
          value={filmeFavorito}
          onChangeText={setFilmeFavorito}
        />

        {/* INPUT 4 */}
        <Text style={styles.rotulo}>4. Comentário sobre cinema</Text>
        <TextInput
          style={[styles.input, styles.inputMultilinha]}
          placeholder="Conte o que você gosta nos filmes"
          value={comentario}
          onChangeText={setComentario}
          multiline
          textAlignVertical="top"
        />

        {/* PICKER 1 */}
        <Text style={styles.rotulo}>
          Picker 1 — Gênero favorito
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={genero}
            onValueChange={setGenero}
            style={styles.picker}
          >
            <Picker.Item label="Ação" value="Ação" />
            <Picker.Item label="Aventura" value="Aventura" />
            <Picker.Item label="Comédia" value="Comédia" />
            <Picker.Item label="Drama" value="Drama" />
            <Picker.Item label="Ficção científica" value="Ficção científica" />
            <Picker.Item label="Suspense" value="Suspense" />
            <Picker.Item label="Terror" value="Terror" />
          </Picker>
        </View>

        {/* PICKER 2 */}
        <Text style={styles.rotulo}>
          Picker 2 — Onde você assiste?
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={plataforma}
            onValueChange={setPlataforma}
            style={styles.picker}
          >
            <Picker.Item label="Streaming" value="Streaming" />
            <Picker.Item label="Cinema" value="Cinema" />
            <Picker.Item label="Televisão" value="Televisão" />
            <Picker.Item label="DVD ou Blu-ray" value="DVD ou Blu-ray" />
          </Picker>
        </View>

        {/* SLIDER 1 */}
        <Text style={styles.rotulo}>
          Slider 1 — Sua nota para os filmes: {nota}/10
        </Text>

        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={nota}
          onValueChange={setNota}
          minimumTrackTintColor="#C8103E"
          maximumTrackTintColor="#CBD5E1"
          thumbTintColor="#009688"
        />

        {/* SLIDER 2 */}
        <Text style={styles.rotulo}>
          Slider 2 — Seu interesse por cinema: {interesse}/10
        </Text>

        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={interesse}
          onValueChange={setInteresse}
          minimumTrackTintColor="#C8103E"
          maximumTrackTintColor="#CBD5E1"
          thumbTintColor="#009688"
        />

        {/* SWITCH 1 */}
        <View style={styles.linhaSwitch}>
          <Text style={styles.rotuloSwitch}>
            Switch 1 — Receber novidades
          </Text>

          <Switch
            value={receberNovidades}
            onValueChange={setReceberNovidades}
            trackColor={{ false: '#CBD5E1', true: '#C8103E' }}
            thumbColor={receberNovidades ? '#FFFFFF' : '#F1F5F9'}
          />
        </View>

        {/* SWITCH 2 */}
        <View style={styles.linhaSwitch}>
          <Text style={styles.rotuloSwitch}>
            Switch 2 — Recomendar filmes
          </Text>

          <Switch
            value={recomendarFilmes}
            onValueChange={setRecomendarFilmes}
            trackColor={{ false: '#CBD5E1', true: '#C8103E' }}
            thumbColor={recomendarFilmes ? '#FFFFFF' : '#F1F5F9'}
          />
        </View>

        {/* BOTÃO 1 */}
        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={salvarPerfil}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Salvar perfil</Text>
        </TouchableOpacity>

        {/* BOTÃO 2 */}
        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={limparFormulario}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Limpar formulário</Text>
        </TouchableOpacity>

        {mensagem !== '' && (
          <Text style={styles.mensagem}>{mensagem}</Text>
        )}
      </View>

      {/* RESUMO DO PERFIL SALVO */}
      {perfilSalvo !== null && (
        <View style={styles.cardPerfil}>
          <Text style={styles.tituloPerfil}>
            Perfil salvo — CineMundo
          </Text>

          <Text style={styles.textoPerfil}>
            Nome: {perfilSalvo.nome}
          </Text>

          <Text style={styles.textoPerfil}>
            E-mail: {perfilSalvo.email}
          </Text>

          <Text style={styles.textoPerfil}>
            Filme favorito: {perfilSalvo.filmeFavorito}
          </Text>

          <Text style={styles.textoPerfil}>
            Comentário: {perfilSalvo.comentario}
          </Text>

          <Text style={styles.textoPerfil}>
            Gênero favorito: {perfilSalvo.genero}
          </Text>

          <Text style={styles.textoPerfil}>
            Onde assiste: {perfilSalvo.plataforma}
          </Text>

          <Text style={styles.textoPerfil}>
            Nota para os filmes: {perfilSalvo.nota}/10
          </Text>

          <Text style={styles.textoPerfil}>
            Interesse por cinema: {perfilSalvo.interesse}/10
          </Text>

          <Text style={styles.textoPerfil}>
            Receber novidades: {perfilSalvo.receberNovidades ? 'Sim' : 'Não'}
          </Text>

          <Text style={styles.textoPerfil}>
            Recomendar filmes: {perfilSalvo.recomendarFilmes ? 'Sim' : 'Não'}
          </Text>
        </View>
      )}

      <Text style={styles.rodape}>
        CineMundo — Uma viagem pelo universo do cinema
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },

  conteudo: {
    padding: 20,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },

  cabecalho: {
    backgroundColor: '#8F1238',
    padding: 30,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 35,
  },

  tituloPrincipal: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitulo: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
  },

  tituloSecao: {
    color: '#8F1238',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
  },

  instrucao: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18,
  },

  cardAtor: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  cardSelecionado: {
    borderColor: '#C8103E',
  },

  imagemAtor: {
    width: 145,
    minHeight: 190,
    backgroundColor: '#E2E8F0',
  },

  conteudoAtor: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },

  nomeAtor: {
    color: '#172B4D',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  categoria: {
    color: '#C8103E',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  descricao: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 23,
  },

  textoAcao: {
    color: '#C8103E',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },

  cardBastidor: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  imagemBastidor: {
    width: '100%',
    height: 230,
    backgroundColor: '#CBD5E1',
  },

  conteudoBastidor: {
    padding: 18,
  },

  tituloCard: {
    color: '#172B4D',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  formulario: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
  },

  rotulo: {
    color: '#24344D',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    color: '#172B4D',
  },

  inputMultilinha: {
    height: 110,
    paddingTop: 14,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },

  picker: {
    width: '100%',
    height: 52,
    color: '#172B4D',
  },

  slider: {
    width: '100%',
    height: 45,
    marginBottom: 8,
  },

  linhaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 8,
    gap: 10,
  },

  rotuloSwitch: {
    color: '#24344D',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },

  botaoSalvar: {
    backgroundColor: '#C8103E',
    borderRadius: 12,
    padding: 17,
    alignItems: 'center',
    marginTop: 24,
  },

  botaoLimpar: {
    backgroundColor: '#475569',
    borderRadius: 12,
    padding: 17,
    alignItems: 'center',
    marginTop: 12,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  mensagem: {
    color: '#8F1238',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 15,
    textAlign: 'center',
  },

  cardPerfil: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    marginTop: 25,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#C8103E',
  },

  tituloPerfil: {
    color: '#8F1238',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  textoPerfil: {
    color: '#344054',
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 8,
  },

  rodape: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 15,
    fontSize: 14,
  },
});
