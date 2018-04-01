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
