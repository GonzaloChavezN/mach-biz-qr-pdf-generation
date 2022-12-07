import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  Image,
  Font,
} from "@react-pdf/renderer";
import { Scissors } from "./scissors";
import { pdfStyles } from "./pdf.styles";

Font.register({
  family: "SourceSansPro-Regular",
  src: `${__dirname}/../assets/SourceSansPro-Regular.ttf`,
});

const IMPRIME_QR_URL = `${__dirname}/../assets/imprime-qr.png`;

export interface QRPagePayload {
  imageUrl: string;
  text: string;
}

const QRPage = ({ payload }: { payload: QRPagePayload }) => {
  //const qrUrl = getBase64QR({ identifier: "hola", type: "terminal" });
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.text}>
        <Text>
          Ahora puedes imprimir tu código QR. Sitúalo en un área visible para
          que tus clientes puedan leerlo.
        </Text>
      </View>
      <View>
        <View style={pdfStyles.scissors}>
          <Scissors></Scissors>
        </View>
        <Image style={pdfStyles.image} source={IMPRIME_QR_URL} />
        <Image style={pdfStyles.qr} source={payload.imageUrl} />
        <Text style={pdfStyles.terminal}>{payload.text}</Text>
      </View>
    </Page>
  );
};

const MyDocument = ({ payloads }: { payloads: QRPagePayload[] }) => (
  <Document>
    {payloads.map((payload) => (
      <QRPage key={payload.text} payload={payload}></QRPage>
    ))}
  </Document>
);

export function generatePDF(output: string, payloads: QRPagePayload[]) {
  ReactPDF.render(<MyDocument payloads={payloads} />, output);
}
