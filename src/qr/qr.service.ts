import QR from "qrcode";
import Canvas from "canvas";
import { centralImage } from "./central.image";

const { options, canvasOptions, urlPrefix, outputMIMEType, patternQuality } = {
  urlPrefix: "machapp://pay-biz/payment",
  outputMIMEType: "image/png",
  patternQuality: "best",
  canvasOptions: {
    width: 600,
    height: 600,
    cwidth: 150,
  },
  options: {
    version: 8,
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 5,
    color: {
      dark: "#6200EE",
      light: "#FFFFFF",
    },
  },
} as const;

export const getBase64QR = async ({
  type,
  identifier,
}: {
  type: "terminal";
  identifier: string;
}): Promise<string> => {
  const url = `${urlPrefix}/terminal_${identifier}`;

  const qrString = await new Promise<string>((resolve) =>
    QR.toString(url, options, (error, string) => {
      resolve(string);
    })
  );

  const qrImage = Buffer.from(qrString);
  const canvas = Canvas.createCanvas(canvasOptions.width, canvasOptions.height);
  const ctx = canvas.getContext("2d");
  const img = await Canvas.loadImage(qrImage, canvasOptions);
  ctx.patternQuality = patternQuality;
  ctx.drawImage(img, 0, 0, canvasOptions.width, canvasOptions.width);
  const buffer = Buffer.from(centralImage, "base64");
  const centralCanvasImage = await Canvas.loadImage(buffer, canvasOptions);
  const center = (ctx.canvas.width - canvasOptions.cwidth) / 2;
  ctx.drawImage(
    centralCanvasImage,
    center,
    center,
    canvasOptions.cwidth,
    canvasOptions.cwidth
  );

  const finalImage = await canvas.toDataURL(outputMIMEType);

  return finalImage;
};
