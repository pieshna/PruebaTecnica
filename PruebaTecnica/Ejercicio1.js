//Ejercicio 1
const matrizEjemplo = [
  [1, 2, 3],
  [4, 5, 6],
  [9, 8, 9]
]

const test1 = [
  [11, 2, 4],
  [4, 5, 6],
  [10, 8, -12]
]

const test2 = [
  [21, 4, 4],
  [8, 5, -15],
  [15, 6, 12]
]

function diagonal(matriz) {
  let diagonal = []
  let diagonalInversa = []
  for (let i = 0; i < matriz.length; i++) {
    diagonal.push(matriz[i][i])
    diagonalInversa.push(matriz[i][matriz.length - 1 - i])
  }
  return {
    derecha: { diagonal, suma: suma(diagonal) },
    izquierda: { diagonal: diagonalInversa, suma: suma(diagonalInversa) }
  }
}

function suma(array) {
  return array.reduce((a, b) => a + b, 0)
}

function execute(matriz = matrizEjemplo) {
  const { derecha, izquierda } = diagonal(matriz)
  const abs = Math.abs(derecha.suma - izquierda.suma)
  console.log('diagonal de izquierda a derecha', [
    derecha.diagonal.join(' '),
    derecha.suma
  ])
  console.log('diagonal de derecha a izquierda', [
    izquierda.diagonal.join(' '),
    izquierda.suma
  ])
  console.log('diferencia', abs)
}

execute()
//execute(test1)
//execute(test2)
