// La imagen que tienen que modificar viene en el parámetro image y contiene inicialmente los datos originales
// es objeto del tipo ImageData ( más info acá https://mzl.la/3rETTC6  )
// Factor indica la cantidad de intensidades permitidas (sin contar el 0)
function dither(image, factor)
{
	let factorStep = 255 / factor;
	//Calcular como va a ser el factor, ahora se usara solo (0, 255)

	console.log(factorStep);

    // completar
	for (let y = 0; y < image.height ; y++) {
		
	   for (let x = 0; x < image.width ; x++) {
		   
		   let colorPixel = getColorPixel(x, y, image);
		   let newColorPixel = findClosestColor(colorPixel, factor);
		   let errorPixel = calculateError(colorPixel, newColorPixel);
		   
		   changeColor(x, y, image, newColorPixel);
		   
		   if(isValidPosition(x +  1, y    , image)) { addQuantError(x +  1, y    , image, errorPixel, 7 / 48); }
		   if(isValidPosition(x +  2, y    , image)) { addQuantError(x +  2, y    , image, errorPixel, 5 / 48); }

		   if(isValidPosition(x + -2, y + 1, image)) { addQuantError(x + -2, y + 1, image, errorPixel, 3 / 48); }
		   if(isValidPosition(x + -1, y + 1, image)) { addQuantError(x + -1, y + 1, image, errorPixel, 5 / 48); }
		   if(isValidPosition(x +  0, y + 1, image)) { addQuantError(x +  0, y + 1, image, errorPixel, 7 / 48); }
		   if(isValidPosition(x +  1, y + 1, image)) { addQuantError(x +  1, y + 1, image, errorPixel, 5 / 48); }
		   if(isValidPosition(x +  2, y + 1, image)) { addQuantError(x +  2, y + 1, image, errorPixel, 3 / 48); }
		   
		   if(isValidPosition(x + -2, y + 2, image)) { addQuantError(x + -2, y + 2, image, errorPixel, 1 / 48); }
		   if(isValidPosition(x + -1, y + 2, image)) { addQuantError(x + -1, y + 2, image, errorPixel, 3 / 48); }
		   if(isValidPosition(x +  0, y + 2, image)) { addQuantError(x +  0, y + 2, image, errorPixel, 5 / 48); }
		   if(isValidPosition(x +  1, y + 2, image)) { addQuantError(x +  1, y + 2, image, errorPixel, 3 / 48); }
		   if(isValidPosition(x +  2, y + 2, image)) { addQuantError(x +  2, y + 2, image, errorPixel, 1 / 48); }
		}
		
	}
		
}

// Imágenes a restar (imageA y imageB) y el retorno en result
function substraction(imageA,imageB,result) 
{
    // completar

	for (let y = 0; y < imageA.height ; y++) {
		
	   for (let x = 0; x < imageA.width ; x++) {
		   
		   let colorPixelImageA = getColorPixel(x, y, imageA);
		   let colorPixelImageB = getColorPixel(x, y, imageB);
		   let colorIndicesResult = getColorIndicesForCoord(x, y, result.width);
		   
		   for(let i = 0; i < colorIndicesResult.length; i++) {
				let colorA = colorPixelImageA[i];
				let colorB = colorPixelImageB[i];
				let index = colorIndicesResult[i];
				result.data[index] = Math.abs(colorA - colorB);
		   }		   
	   }
	}
	
}

function getColorPixel(x, y, image) {
	
	let colorIndices = getColorIndicesForCoord(x, y, image.width);
	let colorPixel = new Array(3);
	
	for (let i = 0; i < colorPixel.length; i++) {
		
		let colorIndex = colorIndices[i];
		colorPixel[i] = image.data[colorIndex];
		
	}
	
	return colorPixel;
	
}

function getColorIndicesForCoord(x, y, width) {
	  let red = y * (width * 4) + x * 4;
	  return [red, red + 1, red + 2];
}

function findClosestColor(colorIndices, factor) {
	
	let newChannels = new Array(3);

	let factorStep = 255 / factor;
	//Calcular como va a ser el factor, ahora se usara solo (0, 255)

	for (let i=0; i<colorIndices.length; i++) {
		let color = 0;

		while (color <= colorIndices[i]+Math.floor(factorStep/2)) {
			color += factorStep;
		}
		
		newChannels[i] = Math.floor(color);
	}
	
	return newChannels;
	
}

function calculateError(oldColorPixel, newColorPixel) {
	
	let errorPixel = new Array(3);
	
	for (let i = 0; i < errorPixel.length; i++) {
		
		errorPixel[i] = oldColorPixel[i] - newColorPixel[i];
		
	}
	
	return errorPixel;
	
}

function changeColor(x, y, image, newColorPixel) {
	
	let colorIndices = getColorIndicesForCoord(x, y, image.width);
	
	for (let i = 0; i < colorIndices.length; i++) {
		
		let index = colorIndices[i];
		image.data[index] = newColorPixel[i];
		
	}
	
}

function isValidPosition(x, y, image) {
	
	return (x >= 0 && x < image.width) && (y >= 0 && y < image.height);
	
}

function addQuantError(x, y, image, errorPixel, quantError) {
	
	let colorIndices = getColorIndicesForCoord(x, y, image.width);
	
	for (let i = 0; i < colorIndices.length; i++) {
		
		let colorIndex = colorIndices[i];
		image.data[colorIndex] = image.data[colorIndex] + errorPixel[i] * quantError;
		
	}

}