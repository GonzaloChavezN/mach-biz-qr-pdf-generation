import { generatePDF, QRPagePayload } from "./pdf/pdf";
import fs from "fs";

const baseDir = `${__dirname}/assets/QRs`;
const commerces = fs
  .readdirSync(baseDir)
  .filter((c) => fs.lstatSync(`${baseDir}/${c}`).isDirectory());

commerces.forEach((commerceName) => {
  const branches = fs
    .readdirSync(`${baseDir}/${commerceName}`)
    .filter((b) =>
      fs.lstatSync(`${baseDir}/${commerceName}/${b}`).isDirectory()
    );
  const terminals = branches
    .map((b) =>
      fs
        .readdirSync(`${baseDir}/${commerceName}/${b}`)
        .filter((t) => t.endsWith(".png"))
        .map((t) => ({ branch: b, path: t }))
    )
    .reduce((acc, curr) => acc.concat(curr), []);
  const payloads = terminals.map((t) => {
    const path = `${baseDir}/${commerceName}/${t.branch}/${t.path}`;
    const bitmap = fs.readFileSync(path, "base64");
    return {
      imageUrl: "data:image/png;base64," + bitmap,
      pathUrl: path,
      text: t.path.split(/\.|\//)[0],
      branch: t.branch,
    };
  });

  const pdfPath = `${baseDir}/${commerceName}/${payloads[0].branch}/${payloads[0].branch}.pdf`;

  generatePDF(pdfPath, payloads);
});

console.log("PDF actualizado");
