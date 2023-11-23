import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const PopularMovieScreen = ({ navigation }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFkNGZiYTRmMzdmODAwMTQ5ZmMzOWUiLCJlbWFpbCI6ImpvaGFubmUua2hhbm1hbGVrQGVkaGVjLmNvbSIsImV4cGlyYXRpb25EYXRlIjoiMjAyNC0wMy0wOFQwMDowMDowMC4wMDBaIiwiaXNUcmFpbmluZyI6dHJ1ZSwiaWF0IjoxNzAwNzQ1MTU5fQ.Clyljp9rz3cHbkKjj2WY5ZebsjvMAmsTYT_aB91Ny-I";
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [dataResults, setDataResults] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movies/popular",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("response.data >>>", response.data);
        setData(response.data);
        setDataResults(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("catch >>>", error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Text>Loading</Text>
  ) : (
    <View>
      <Text>Films Populaires</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Movie")}
      ></TouchableOpacity>
      <FlatList
        data={dataResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Movie", { id: item.id })}
            >
              <View style={styles.flex_row}>
                <Image
                  source={{ uri: item.poster_path.w154 }}
                  style={styles.poster}
                  resizeMode="contain"
                />

                <View style={styles.right_side}>
                  <Text> {item.original_title}</Text>
                  <Text numberOfLines={3} ellipsizeMode={"tail"}>
                    {item.overview}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  flex_row: {
    flexDirection: "row",
    borderColor: "blue",
    borderWidth: 1,
    justifyContent: "flex-start",
  },

  right_side: {
    borderColor: "red",
    borderWidth: 1,
    padding: 10,
  },

  poster: {
    height: 150,
    width: 200,
  },
});
export default PopularMovieScreen;
