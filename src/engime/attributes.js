import utils from "../utils/utils";
/**
 * 
 * lib usada para gerenciar os atributos dos personagens 
 * 
 */
const FORCA = 10,
  VELOCIDADE = 10,
  HP = 50;

 export default {   
  generate() {
    const atributos = {
      forca: utils.random(FORCA),
      velocidade: utils.random(VELOCIDADE),
      hp: utils.random(HP),
    }

    return atributos;
  }
 };