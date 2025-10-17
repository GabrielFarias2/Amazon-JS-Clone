class Material {
  constructor(nome) {
    this.nome = nome;
  }
}

class Ferramenta {
  constructor(materialPrincipal) {
    this.materialPrincipal = materialPrincipal;
  }
}

class Espada extends Ferramenta {
  constructor(materialPrincipal) {
    super(materialPrincipal);

    this.nome = `Espada de ${materialPrincipal.nome}`;
    this.receita = {
      [this.materialPrincipal.nome]: 2,
      "Graveto": 1,
    };
  }

  mostrarReceita() {
    console.log(`📋 Receita para a ${this.nome}:`);
    for (const material in this.receita) {
      console.log(`-${this.receita[material]}x ${material}`)
    }
  }

  fabricar() {
    console.log(`✨ Ferramenta fabricada com sucesso! ✨`);
    console.log(`Você obteve: ${this.nome}`);
  }
}

  class Picareta extends Ferramenta {
    constructor(materialPrincipal) {
      super(materialPrincipal);
      this.nome = `Picareta de ${this.materialPrincipal.nome}`;
      this.receita = {
        [this.materialPrincipal.nome]: 3,
        "Graveto": 2,
      };
    }
  }

  class Machado extends Ferramenta {
    constructor(materialPrincipal) {
      super(materialPrincipal);
      this.nome = `Machado de ${this.materialPrincipal.nome}`;
      this.receita = {
        [this.materialPrincipal.nome]: 3,
        "Graveto": 2,
      };
    }
  }

console.log("separando os materiais...");
const diamante = new Material("Diamante");
const graveto = new Material("Graveto");

console.log(`Materiais base: ${diamante.nome} e ${graveto.nome}`);

console.log("Objetivo: Criar uma Espada de Diamante!")
const espadaDeDiamante = new Espada(diamante);

espadaDeDiamante.mostrarReceita();

espadaDeDiamante.fabricar();