import { generate } from "@querycap-dev/generate";
import { parseToRgb, rgb } from "polished";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("generate", () => {
  it("colors", () => {
    const colors: any = {
      gray: [
        "248,249,249,0.99",
        "243,244,245,0.99",
        "228,230,232,0.99",
        "208,212,215,1",
        "170,177,183,1",
        "136,145,154,1",
        "86,99,112,1",
        "48,59,79,1",
        "40,50,67,1",
        "34,42,58,1",
      ],
      darkBlue: [
        "242,246,250,0.99",
        "230,236,246,0.99",
        "205,218,237,0.99",
        "155,181,219,1",
        "105,145,202,1",
        "55,108,184,1",
        "5,71,166,1",
        "4,53,124,1",
        "3,42,99,1",
        "1,21,50,1",
      ],
      blue: [
        "242,247,254,0.99",
        "230,239,254,0.99",
        "205,224,254,0.99",
        "156,192,252,1",
        "106,161,251,1",
        "57,129,249,1",
        "7,98,248,1",
        "6,88,223,1",
        "6,78,198,1",
        "4,59,149,1",
      ],
      purple: [
        "238,236,251,0.99",
        "222,218,247,0.99",
        "189,180,239,1",
        "156,143,232,1",
        "123,106,224,1",
        "89,68,216,1",
        "68,48,187,1",
        "38,27,106,1",
        "20,11,76,1",
        "12,6,45,1",
      ],
      red: [
        "251,236,235,0.99",
        "248,218,217,0.99",
        "240,181,178,0.99",
        "233,143,140,1",
        "225,106,101,1",
        "218,69,63,1",
        "197,44,38,1",
        "154,34,30,1",
        "123,12,7,1",
        "72,7,4,1",
      ],
      yellow: [
        "255,244,232,0.99",
        "255,235,210,0.99",
        "255,214,165,0.99",
        "255,194,121,1",
        "255,173,76,1",
        "255,153,31,1",
        "235,128,0,1",
        "204,111,0,1",
        "179,97,0,1",
        "102,56,0,1",
      ],
      green: [
        "234,247,241,0.99",
        "214,240,229,0.99",
        "172,225,203,0.99",
        "131,210,176,1",
        "89,195,150,1",
        "48,180,124,1",
        "43,161,111,1",
        "38,141,97,1",
        "32,121,83,1",
        "21,81,55,1",
      ],
    };

    const final: any = {
      black: "#020F23",
      white: "#ffffff",
    };

    const color = (c: string) => rgb(parseToRgb(`rgba(${c})`));

    for (const k in colors) {
      final[k] = color(colors[k][6]);
      for (const i in colors[k]) {
        final[k + i] = color(colors[k][i]);
      }
    }

    generate("../index.ts", `export const colors = ${JSON.stringify(final)}`, {
      cwd: __dirname,
    });
  });
});
