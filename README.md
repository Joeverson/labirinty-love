# labirinty-love
The simple game using tecnology web, basead in PIXI.js

# Criando Buttons

Para poder cirar buttons é bem simples rimeiro deve-se utilizar a lib keyboard onde ela tbm é responsavel pro usar
ações logicas e fisicas, essse é um contexto que estamos trazendo aqui nesse game

## logicas

Botões logicos são aqueles que não precisam de nada visual para apresentar, ams sim ele analisa e faz alguma coisa qundo algum bntn cadastrado é clicado.

utilizando a codificação ascii sabemos quais botoes estãos endo clicados e com isso podemos fazer alguns eventos com eles.

```
keyboard.logic(buttonKey)
```

Basicamento o logic tem duas funções que são listiners que sabe quando uma tecla foi clidacada ou esta sendo presionada, com isso com o retorno da chamada de keyboard.logic(buttonKey) ele retorna dois listiners individuais, que são press e release, o press faz alguma coisa quando o btn é clicado e o reslease retorna algo quando ele ainda esta sendo presionado, veja abaixo:

```
let left = keyboard.logic(keyButton)

left.press = () => {}
left.release = () => {}
```

## fisicas

Os btns fisicos são queles que aparecem na tela para o cliente, ele é de facil acesso e configuração.

Para poder criar um btn basta fazer a chamada direto da class e utilizar o method create ``` keyboard.fisics.create(width, height, x, y)```. Apois criar você deve definir o texto junto com um estilo para ele usando o PIXI. e por fim, voce adiciona o btn.sprite no container

```
let btn = keyboard.fisics.create(((window.innerWidth / 2) - (60/2)), ((window.innerHeight / 2) - (30/2)), 200, 50)
let = new PIXI.TextStyle({
            fontFamily: 'lobster', // Font Family
            fontSize: 22, // Font Size
            fontStyle: 'italic',// Font Style
            fontWeight: 'bold', // Font Weight
            fill: ['#ffffff', '#F8A9F9'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        })
btn.setText("Start", style)

btn.render(home)
```

# lib para criação de labirintos

deve-se definir um tamanho dos quadros pequenos e quantos vão ser{x,y} nessa ideia
cada quadrado é um objeto que guarda informações de sprites dentro delas

para tirar a proposrção de cada sprite no labirinto vais er o seguinte, onde nQx = numero de quadrado no eixo x, sQx = tamanho do quadrado em pixels no eixo x, sPx = tamanho em pixels do sprite no eixo x.
assim como nQy = numero de quadrado no eixo y, sQy = tamanho do quadrado em pixels no eixo y, sPy = tamanho em pixels do sprite no eixo y



- LEFT (nQx * sQx) + sPx = position exata no eixo x
- RIGHT ((nQx * sQx) + sQx) - sPx = position exata no eixo x
- TOP (nQy * sQy) + sPy = position exata no eixo y
- BOTTOM ((nQy * sQy) + sQy) - sPy = position exata no eixo y


# o que criar

- criar o castelo (apenas uma preload e uma porta quando ele entrar ele vai para outras scene e dentro tem monstros e a novinha para salvar)
- armas e como usar
- equipamentos e como usar
- magias e como usar
- batalhas como vai funcionar
- movimentação do personagem
