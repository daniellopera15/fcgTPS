// Completar la implementación de esta clase y el correspondiente vertex shader. 
// No será necesario modificar el fragment shader a menos que, por ejemplo, quieran modificar el color de la curva.
class CurveDrawer 
{
	// Inicialización de los shaders y buffers
	constructor()
	{
		// Creamos el programa webgl con los shaders para los segmentos de recta
		this.prog   = InitShaderProgram( curvesVS, curvesFS );

		// [Completar] Incialización y obtención de las ubicaciones de los atributos y variables uniformes
		this.mvp = gl.getUniformLocation( this.prog, 'mvp' );
		this.mvp_x = gl.getUniformLocation( this.prog, 'mvp_x' );
		this.mvp_y = gl.getUniformLocation( this.prog, 'mvp_y' );
		this.p0 = gl.getUniformLocation( this.prog, 'p0' );
		this.p1 = gl.getUniformLocation( this.prog, 'p1' );
		this.p2 = gl.getUniformLocation( this.prog, 'p2' );
		this.p3 = gl.getUniformLocation( this.prog, 'p3' );

		this.t = gl.getAttribLocation( this.prog, 't' );
				
		// Muestreo del parámetro t
		this.steps = 100;
		var tv = [];
		for ( var i=0; i<this.steps; ++i ) {
			tv.push( i / (this.steps-1) );
		}
		
		// [Completar] Creacion del vertex buffer y seteo de contenido
		this.buffer = gl.createBuffer();
	}

	// Actualización del viewport (se llama al inicializar la web o al cambiar el tamaño de la pantalla)
	setViewport( width, height )
	{
		// [Completar] Matriz de transformación.
		// column-major.
		var trans = [ 2/width,0,0,0,  0,-2/height,0,0, 0,0,1,0, -1,1,0,1 ];
		
		// Matriz para Bezier Cúbica del eje x
		var trans_x = [ Math.pow(1 - this.t, 3), 0, 0, 0, 
						3 * Math.pow(1 - this.t, 2), 0, 0, 0,
						3 * (1 - this.t) * Math.pow(this.t, 2), 0, 0, 0,
						Math.pow(this.t, 3), 0, 0, 0];

		// Matriz para Bezier Cúbica del eje y		
		var trans_y = [ 0, Math.pow(1 - this.t, 3), 0, 0,
						0, 3 * Math.pow(1 - this.t, 2), 0, 0,
						0, 3 * (1 - this.t) * Math.pow(this.t, 2), 0, 0,
						0, Math.pow(this.t, 3), 0, 0];

		// [Completar] Binding del programa y seteo de la variable uniforme para la matriz. 
		gl.useProgram( this.prog );
		gl.uniformMatrix4fv( this.mvp, false, trans );
		gl.uniformMatrix4fv( this.mvp_x, false, trans_x );
		gl.uniformMatrix4fv( this.mvp_y, false, trans_y );
	}

	updatePoints( pt )
	{
		// [Completar] Actualización de las variables uniformes para los puntos de control
		// [Completar] No se olviden de hacer el binding del programa antes de setear las variables 
		// [Completar] Pueden acceder a las coordenadas de los puntos de control consultando el arreglo pt[]:
		// var x = pt[i].getAttribute("cx");
		// var y = pt[i].getAttribute("cy");
	}

	draw()
	{
		// [Completar] Dibujamos la curva como una LINE_STRIP
		// [Completar] No se olviden de hacer el binding del programa y de habilitar los atributos de los vértices
	}
}

// Vertex Shader
//[Completar] El vertex shader se ejecuta una vez por cada punto en mi curva (parámetro step). No confundir punto con punto de control.
// Deberán completar con la definición de una Bezier Cúbica para un punto t. Algunas consideraciones generales respecto a GLSL: si
// declarás las variables pero no las usás, no se les asigna espacio. Siempre poner ; al finalizar las sentencias. Las constantes
// en punto flotante necesitan ser expresadas como X.Y, incluso si son enteros: ejemplo, para 4 escribimos 4.0
var curvesVS = `
	attribute float t;
	uniform mat4 mvp;
	uniform mat4 mvp_x;
	uniform mat4 mvp_y;
	uniform vec2 p0;
	uniform vec2 p1;
	uniform vec2 p2;
	uniform vec2 p3;
	void main()
	{ 
		gl_Position = mvp * ((mvp_x * vec4(p0[0],p1[0],p2[0],p3[0])) + (mvp_y * vec4(p0[1],p1[1],p2[1],p3[1])) + vec4(0,0,0,1));
	}
`;

// Fragment Shader
var curvesFS = `
	precision mediump float;
	void main()
	{
		gl_FragColor = vec4(0,0,1,1);
	}
`;
