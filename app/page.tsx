'use client'
import '@/app/styles/tailwind.css'
import { useState } from 'react'

export default function Tailwind() {
    const [valorVisor, setValorVisor] = useState("")

    //Criando botões especiais---------------------------------------------------------
    type TbotoesEspeciais = {
        isInput: boolean,
        nome: string,
        sinal: string,
        operador?: string,
    }
    const listaBotoesEspeciais: TbotoesEspeciais[] = [
        { nome: 'Adicao', sinal: '+', operador: ' + ', isInput: true },
        { nome: 'Subtracao', sinal: '-', operador: ' - ', isInput: true },
        { nome: 'Multiplicacao', sinal: 'X', operador: ' * ', isInput: true },
        { nome: 'Divisao', sinal: '/', operador: ' / ', isInput: true },
        { nome: 'Ponto', sinal: '.', operador: '.', isInput: true },
        { nome: 'C', sinal: 'C', isInput: false },
        { nome: 'Ce', sinal: 'CE', isInput: false },
        { nome: 'Igual', sinal: '=', isInput: false },
    ]

    const botoesEspeciais = listaBotoesEspeciais.map(criandoBotoesEspeciais)

    function criandoBotoesEspeciais(item: TbotoesEspeciais, indice: number) {
        if (item.isInput == true) {
            return <button key={indice} onClick={() => inserirVisor(item.operador!)} id={`bt${item.nome}`} className='botao botaoEspecial'>
                {item.sinal}
            </button>
        }
        else {
            return <button key={indice} onClick={() => atualizarVisor(item.nome)} id={`bt${item.nome}`} className='botao botaoEspecial'>
                {item.sinal}
            </button>
        }
    }
    //---------------------------------------------------------------------------

    // Criando botões normais----------------------------------------------------
    const numeros: number[] = []
    for (let i = 0; i <= 9; i++) {
        numeros.push(i)
    }

    const botoes = numeros.map((item, indice) =>
        <button key={indice} id={`bt${item}`} className="botao" onClick={() => inserirVisor(item)}>
            {item}
        </button>
    )
    //-----------------------------------------------------------------------

    // Funções do visor------------------------------------------------------
    function inserirVisor(valor: number | string) {
        setValorVisor(valorVisor + valor)
    }
    function atualizarVisor(parametro: string) {
        if(parametro == 'Ce'){
            setValorVisor(valorVisor.slice(0, -1))
        }
        else if(parametro == 'C'){
            setValorVisor('')
        }
        else{
            setValorVisor(eval(valorVisor))
        }
    }
    //-----------------------------------------------------------------------

    return (
        <main className='bg-orange-300'>
            <div>
                <h1 className='text-center'>Calculadora do Gabriel</h1>
            </div>
            <div className='flex justify-center'>
                <input type="text" id='visor' value={valorVisor} onChange={(e) => setValorVisor(e.target.value)} />
            </div>
            <div id='botoesContainer'>
                {botoes}
                {botoesEspeciais}
            </div>
        </main>
    )
}