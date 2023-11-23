import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieScreen = ({ navigation, route }) => {
  console.log(route.params.id);
  const id = route.params.id;
  console.log("id >>>", id);

  const [data2, setData2] = useState();
  const [isLoading2, setIsLoading2] = useState(false);
  const [genre, setGenre] = useState();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFkNGZiYTRmMzdmODAwMTQ5ZmMzOWUiLCJlbWFpbCI6ImpvaGFubmUua2hhbm1hbGVrQGVkaGVjLmNvbSIsImV4cGlyYXRpb25EYXRlIjoiMjAyNC0wMy0wOFQwMDowMDowMC4wMDBaIiwiaXNUcmFpbmluZyI6dHJ1ZSwiaWF0IjoxNzAwNzQ1MTU5fQ.Clyljp9rz3cHbkKjj2WY5ZebsjvMAmsTYT_aB91Ny-I";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response.data >>>", response.data);
        setData2(response.data);

        setIsLoading2(false);
        setGenre(response.data.genres);
      } catch (error) {
        console.log("catch >>>", error);
      }
    };
    fetchData();
  }, []);
  return isLoading2 ? (
    <Text>Loading...</Text>
  ) : (
    <View>
      <Text> {data2.original_title}</Text>
      <Image
        source={{ uri: data2.poster_path.w154 }}
        style={styles.poster}
        resizeMode="contain"
      />
      {/* <FlatList 
      data={genre} 
      keyExtractor={(item) => item.id}
      renderItem={({item})=> {
        return <View>
      }} /> */}

      <Text> {data2.overview}</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PopularMovies");
        }}
      >
        <Text>Retourner aux films</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  poster: {
    height: 150,
    width: 200,
  },
});

export default MovieScreen;
