/*
 * Bibliothèque gérant les objets de types rais sismiques
 * 
 */

/*
 * terre est un ensemble de constantes utilisées pour instancier les objets Rai
 */
terre = {
	rayon: 300,
	posX: 400,
	posY: 400,
	vitesseInitiale: 6.5,
	tabVitesses: [],
	epicentre: {
		posX: 400,
		posY: 100
	},
	pasTemporel: 200,
	echelle: this.rayon/6500
}

/*
 * prototype d'objets Rai
 */
Rai = function(angle) {
	this.posX = terre.epicentre.posX | 0;
	this.posY = terre.epicentre.posY | 0;
	this.angleIncidence = angle / 180 * Math.PI;
	this.vitesse = terre.vitesseInitiale;
	this.vitessePrecedente = terre.vitesseInitiale;
	this.prof = 1; //la condition de sortie des boucles est à une profondeur de 0 on commence donc tous les rais à 1km de prof
}

Rai.prototype.profondeur = function() {
	var prof = 0;
	/*
	 * à partir des coordonnées this.posX, this.posY et des constantes définissant la Terre,
	 * retourne la valeur de profondeur du front du rai
	 */
	prof = terre.rayon - Math.floor( Math.sqrt( (this.posX - terre.posX)^2 + (this.posY - terre.posY)^2 ) ); //Pythagore !
	
	return prof;
}

Rai.prototype.angleSurf = function() {
	var angle = 0;
	/*
	 * à partir des coordonnées this.posX, this.posY et des constantes définissant la Terre sur écran,
	 * retourne l'angle entre la surface passant par ces coordonnées et la verticale de l'écran
	 * 
	 */

    var coteOppose = terre.posX - this.posX;
    var coteAdjacent = terre.posY - this.posY;

    angle = Math.atan2(coteOppose, coteAdjacent);
	
	return angle;
}

Rai.prototype.vitesse = function() {
	var v = 0;
	/*
	 * À partir du tableau de vitesses, retourne la valeur de vitesse correspondant à la profondeur (this.prof)
	 */
	var profondeurMod10 = Math.floor( this.prof / terre.rayon * 650 )
	v = terre.tabVitesses[ profondeurMod10 ];
	
	return v;
}

Rai.prototype.nouvellePosition = function() {
	var posX=0, posY=0, distance=0, inclinaisonSurface=0;
	/*
	 * À partir de la position précédente (this.posX...) et de l'angle du rayon incident par raport à la 
	 * verticale de la surface, de la vitesse et d'un temps défini dans les constantes de l'univers,
	 * calcule la nouvelle position
	 */
	distance = this.vitesse * terre.pasTemporel * terre.echelle;
	inclinaisonSurface = this.angleSurf();
	
	posX = this.posX + Math.floor(distance * Math.sin(inclinaisonSurface + this.angleIncidence));
	posY = this.posY + Math.floor(distance * Math.cos(inclinaisonSurface + this.angleIncidence));
	
	return {
		x: posX,
		y: posY
	}
}

Rai.prototype.nouvelAngle = function() {
	var angle = 0;
	/*
	 * À partir de la position (this.posX, etc...), et donc de la profondeur, et de l'angle d'incidence,
	 * utilise les lois de Descartes pour déterminer le nouvel angle des rayons (! au delà de la valeur limite, il
	 * 	y a réflexion)
	 */
	angle = Math.asin( (this.vitesse / this.vitessePrecedente) * Math.sin( this.angleIncidence ) );
	return angle;
}
