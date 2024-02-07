//Ejercicio 2

const ejemplo = {
  a: [1, 2, 3],
  b: [3, 2, 1]
}

const test1 = {
  a: [45, 22, 3],
  b: [3, 55, 100]
}

const test2 = {
  a: [0, 222, 1],
  b: [8, 55, 92]
}

function compare(a, b) {
  if (a === b) {
    return 0
  }
  return a > b ? 1 : -1
}

function execute(prueba = ejemplo) {
  const A = prueba.a
  const B = prueba.b
  let result = { a: 0, b: 0 }
  for (let i = 0; i < A.length; i++) {
    let comparison = compare(A[i] || 0, B[i] || 0)
    if (comparison === 1) {
      result.a++
    } else if (comparison === -1) {
      result.b++
    }
  }
  const matriz = [result.a, result.b]
  console.log(matriz)
}

execute()
