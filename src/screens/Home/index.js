import { StyleSheet, Text, View ,FlatList} from 'react-native';
import BannerMovies from '../../components/bannerFilmes';
import CardMovies from '../../components/cardMovies';
import Header from '../../components/header';
import SearchBar from '../../components/searchbar';
import Filmes from '../../data/movies';
import { useState , useEffect } from 'react';

export default function HomeIndex() {
    const [movies,setFilmes] = useState();

    useEffect(() => {

      async function Filmes() {
        try{
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=af4667b75e17eeffcfbd6d1995bb5e77&language=pt-br-BR&page=1')
        const data = await response.json();
        console.log(data.results)

        setFilmes(data.results)
        }
        catch(error){
          console.log('erro ao buscar filmes',error)
        }
        }

        Filmes();
    } , [])







  return (
    <View style={styles.container}>
     <Header></Header>

     <SearchBar></SearchBar>

     <BannerMovies></BannerMovies>
     
    
     <View style = {{width :"90%"}}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={movies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              
              <CardMovies
                titulo={item.title}
                imagem={item.poster_path}
                nota={item.vote_average}
              />
            )}
          />
        </View>
    
  

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#141a29',
    alignItems:'center'
    
    
  },
});