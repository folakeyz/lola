import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingVertical: 50,
    backgroundColor: "#fff",
    flex: 1,
  },
  loginImage: {
    width: 300,
    height: 300,
  },
  center: {
    justifyContent: "center",
    alignSelf: "center",
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 0,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 0,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    padding: 3,
    paddingTop: 15,
    margin: 5,
    textAlign: "center",
  },
  gold: {
    backgroundColor: "yellowgreen",
  },
  green: {
    backgroundColor: "black",
    color: "white",
  },
  color: {
    backgroundColor: "forestgreen",
    color: "white",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  error: {
    color: "crimson",
    textAlign: "center",
  },
  padding: {
    padding: 10,
  },
  card: {
    width: "100%",
    height: 170,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  textSmallBold: {
    fontSize: 13,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 13,
    fontFamily: "Poppins",
  },
  textMediumBold: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  textMedium: {
    fontSize: 18,
    fontFamily: "Poppins",
  },
  textLarge: {
    fontSize: 25,
    fontFamily: "Poppins",
  },
  textLargeBold: {
    fontSize: 25,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  textLight: {
    color: "white",
  },
  textDark: {
    color: "black",
  },
  order: {
    width: "100%",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  danger: {
    width: 100,
    height: 30,
    color: "black",
    padding: 5,
    paddingTop: 3,
    backgroundColor: "crimson",
  },
});

export default styles;
