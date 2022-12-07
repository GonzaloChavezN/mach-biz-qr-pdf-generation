import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: "SourceSansPro-Regular",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 10,
    maxWidth: 300,
    margin: 10,
    padding: 10,
  },
  scissors: {
    marginLeft: 27,
    marginBottom: -9,
  },
  qr: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 266,
    width: 302,
  },
  image: {
    width: 500,
    alignSelf: "center",
  },
  terminal: {
    marginTop: -48,
    fontSize: 19,
    color: "#fff",
    alignSelf: "center",
  },
});
