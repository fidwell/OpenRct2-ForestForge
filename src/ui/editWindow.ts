import { window, WindowTemplate } from "openrct2-flexui";
import Biome from "../biome";

export function create(biome: Biome): WindowTemplate {
  return window({
    title: `Edit palette ${biome.name}`,
    width: 150,
    height: 100,
    content: []
  });
}
