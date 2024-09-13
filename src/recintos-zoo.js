class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
      { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: [] },
      { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
      { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: [] },
      { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: [{ especie: "LEAO", quantidade: 1 }] },
    ];

    this.animaisPermitidos = {
      LEAO: { tamanho: 3, biomas: ["savana"] },
      LEOPARDO: { tamanho: 2, biomas: ["savana"] },
      CROCODILO: { tamanho: 3, biomas: ["rio"] },
      MACACO: { tamanho: 1, biomas: ["savana", "floresta"] },
      GAZELA: { tamanho: 2, biomas: ["savana"] },
      HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio", "savana e rio"] }
    };
  }

  analisaRecintos(animal, quantidade) {
    // Valida se o animal existe
    if (!this.animaisPermitidos[animal]) {
      return { erro: "Animal inválido" };
    }

    // Valida se a quantidade é um número positivo
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const { tamanho, biomas } = this.animaisPermitidos[animal];
    let recintosViaveis = [];

    for (let recinto of this.recintos) {
      let espacoOcupado = 0;
      let carnivoroPresente = false;
      let mesmaEspecie = true;
      let possuiOutrosAnimais = recinto.animais.length > 0;

      console.log(`Analisando recinto ${recinto.numero}`);
      
      // Calcula o espaço ocupado pelos animais já presentes
      for (let animalExistente of recinto.animais) {
        const { especie, quantidade } = animalExistente;
        const tamanhoExistente = this.animaisPermitidos[especie].tamanho;
        espacoOcupado += tamanhoExistente * quantidade;

        console.log(`Animal existente: ${especie}, Quantidade: ${quantidade}, Tamanho ocupado: ${tamanhoExistente * quantidade}`);

        // Verifica se já existe um carnívoro diferente no recinto
        if (especie === "LEAO" || especie === "LEOPARDO" || especie === "CROCODILO") {
          carnivoroPresente = true;
          if (especie !== animal) {
            mesmaEspecie = false;
            break; // Se há carnívoros diferentes, interrompa a análise deste recinto
          }
        }
      }

      // Verifica se o animal pode habitar o bioma do recinto
      if (!biomas.includes(recinto.bioma)) continue;

      // Regra: carnívoros só podem ficar com a mesma espécie
      if (carnivoroPresente && !mesmaEspecie) continue;

      // Verifica se há espaço suficiente para o novo animal
      let espacoNecessario = tamanho * quantidade;
      console.log(`Espaço necessário para ${quantidade} ${animal}(s): ${espacoNecessario}`);

      // Regra: espaço extra se houver mais de uma espécie
      if (possuiOutrosAnimais && !mesmaEspecie) espacoNecessario += 1;

      console.log(`Espaço ocupado: ${espacoOcupado}, Espaço necessário: ${espacoNecessario}`);

      if (recinto.tamanhoTotal - espacoOcupado >= espacoNecessario) {
        let espacoLivre = recinto.tamanhoTotal - (espacoOcupado + espacoNecessario);
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
      } else {
        console.log(`Recinto ${recinto.numero} não tem espaço suficiente: necessário ${espacoNecessario}, disponível ${recinto.tamanhoTotal - espacoOcupado}`);
      }
    }

    if (recintosViaveis.length > 0) {
      return { recintosViaveis };
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
}

export { RecintosZoo as RecintosZoo };
