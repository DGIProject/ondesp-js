/*
 * Bibliothèque gérant les objets de types rais sismiques
 * 
 */

/*
 * terre est un ensemble de constantes utilisées pour instancier les objets Rai
 */
terre = {
	rayon: 300,
	x: 400,
	y: 400,
	vitesseInitiale: 6.5,
	tabVitesses: [],
	epicentre: {
		posX: 400,
		posY: 100
	}
}

/*
 * prototype d'objets Rai
 */
Rai = function(angle) {
	this.posX = terre.epicentre.posX;
	this.posY = terre.epicentre.posY;
	this.angle = angle;
	this.vitesse = terre.vitesseInitiale
	this.prof = 1; //la condition de sortie des boucles est à une profondeur de 0 on commence donc tous les rais à 1km de prof
}

Rai.prototype.profondeur = function() {
	var prof = 0;
	/*
	 * à partir des coordonnées this.posX, this.posY et des constantes définissant la Terre,
	 * retourne la valeur de profondeur du front du rai
	 */
	
	return prof;
}

Rai.prototype.angleSurf = function() {
	var angle = 0;
	/*
	 * à partir des coordonnées this.posX, this.posY et des constantes définissant la Terre sur écran,
	 * retourne l'angle entre la surface passant par ces coordonnées et la verticale de l'écran
	 * 
	 */
	
	return angle;
}

Rai.prototype.vitesse = function() {
	var v = 0;
	/*
	 * À partir du tableau de vitesses, retourne la valeur de vitesse correspondant à la profondeur (this.prof)
	 */
	
	return v;
}

Rai.prototype.nouvellePosition = function() {
	var posX=0, posY=0;
	/*
	 * À partir de la position précédente (this.posX...) et de l'angle du rayon incident par raport à la 
	 * verticale de la surface, de la vitesse et d'un temps défini dans les constantes de l'univers,
	 * calcule la nouvelle position
	 */
	
	return {
				x: posX,
				y: posY,
			}
}

Rai.prototype.nouvelAngle = function() {
	var angle;
	/*
	 * À partir de la position (this.posX, etc...), et donc de la profondeur, et de l'angle d'incidence,
	 * utilise les lois de Descartes pour déterminer le nouvel angle des rayons (! au delà de la valeur limite, il
	 * 	y a réflexion)
	 */
	
	return angle;
}
