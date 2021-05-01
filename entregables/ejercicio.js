// Esta función construye una matriz de transfromación de 3x3 en coordenadas homogéneas 
// utilizando los parámetros de posición, rotación y escala. La estructura de datos a 
// devolver es un arreglo 1D con 9 valores en orden "column-major". Es decir, para un 
// arreglo A[] de 0 a 8, cada posición corresponderá a la siguiente matriz:
//
// | A[0] A[3] A[6] |
// | A[1] A[4] A[7] |
// | A[2] A[5] A[8] |
// 
// Se deberá aplicar primero la escala, luego la rotación y finalmente la traslación. 
// Las rotaciones vienen expresadas en grados. 
function BuildTransform( positionX, positionY, rotation, scale )
{

	// | S * Cos(θ) | -S * Sin(θ) |     Tx    |
	// | S * Sin(θ) |  S * Cos(θ) |     Ty    |
	// |     0      |      0      |      1    |

	//M = T R S

	rotation = rotation * Math.PI/180

	return Array(scale * Math.cos(rotation), scale * Math.sin(rotation), 0,
			(-1) * scale * Math.sin(rotation), scale * Math.cos(rotation), 0,
			positionX, positionY, 1);

}

// Esta función retorna una matriz que resula de la composición de trasn1 y trans2. Ambas 
// matrices vienen como un arreglo 1D expresado en orden "column-major", y se deberá 
// retornar también una matriz en orden "column-major". La composición debe aplicar 
// primero trans1 y luego trans2. 
function ComposeTransforms( trans1, trans2 )
{
	return Array(
		crossProductColumnRow(trans2, trans1, 0, 0), crossProductColumnRow(trans2, trans1, 0, 1), crossProductColumnRow(trans2, trans1, 0, 2),
		crossProductColumnRow(trans2, trans1, 1, 0), crossProductColumnRow(trans2, trans1, 1, 1), crossProductColumnRow(trans2, trans1, 1, 2),
		crossProductColumnRow(trans2, trans1, 2, 0), crossProductColumnRow(trans2, trans1, 2, 1), crossProductColumnRow(trans2, trans1, 2, 2)
	);
}


function crossProductColumnRow(matrix1, matrix2, column, row) {
	return matrix1[row]*matrix2[0+3*column] + matrix1[row+3]*matrix2[1+3*column] + matrix1[row+6]*matrix2[2+3*column]
}