function addEvent (obj, evType, fn, useCapture){
	if (obj.addEventListener) { obj.addEventListener(evType, fn, useCapture); }
	else { obj.attachEvent("on"+evType, fn); }
}

function getPos(elem) {
    var pos={'r':0,'l':0,'t':0,'b':0};
    var tmp=elem;

    // on proc?de de parent en parent car IE fonctionne comme ?a
    // (les autres donnent directement la position par rapport ? la page)

    do {
        pos.l += tmp.offsetLeft;
        tmp = tmp.offsetParent;
    } while( tmp !== null );
    pos.r = pos.l + elem.offsetWidth;

    tmp=elem;
    do {
        pos.t += tmp.offsetTop;
        tmp = tmp.offsetParent;
    } while( tmp !== null );
    pos.b = pos.t + elem.offsetHeight;

    return pos;
}

var mousePos = {'x':0,'y':0};
function getMousePos(e) {
	var d = document,
		de = d.documentElement,
		db = document.body;
	
	e = e || window.event;
	if (e.pageX || e.pageY) {
		mousePos.x = e.pageX;
		mousePos.y = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		mousePos.x = e.clientX + db.scrollLeft + de.scrollLeft;
		mousePos.y = e.clientY + db.scrollTop + de.scrollTop;
	}
}

addEvent(document, 'mousemove', getMousePos);

function inRange(aMin, aMax, bMin, bMax) {
    if ( ( (aMin<=bMax) && (aMin>=bMin) ) || ( (aMax<=bMax) && (aMax>=bMin) ) ) { return true; }
    return false ;
}

function isOver(a, b) {
    var posA = getPos(a),
        posB = getPos(b),
        aTop, aBottom, aLeft, aRight,
        bTop, bBottom, bLeft, bRight;
        
    aTop    = posA.t;
    aBottom = posA.b;
    aLeft   = posA.l;
    aRight  = posA.r;
    bTop    = posB.t;
    bBottom = posB.b;
    bLeft   = posB.l;
    bRight  = posB.r;
    
    if ( inRange(aTop, aBottom, bTop, bBottom) && inRange(aLeft, aRight, bLeft, bRight) ) { return true; }
    
    return false;
}

var dragOn = {

	decalX : 0, // m�morise le d�calage horizontal entre la souris et l'�l�ment dragu�
	decalY : 0, // m�morise le d�calage vertical entre la souris et l'�l�ment dragu�
	isDragging : 0, // m�morise l'�l�ment en train d'�tre dragu�
	maxZ : 0, // z-index de l'�l�ment le plus proche (le dernier qu'on a avanc�)

	start : function (elem) {
		// gestion des contraintes min/max par zone-�l�ment
		if (elem.dragOptions.moveArea) {
			var area = typeof elem.dragOptions.moveArea=='object' ? elem.dragOptions.moveArea : elem.dragOptions.moveArea.parentNode;
			area = getPos(area);
			elem.dragOptions.minX = area.l;
			elem.dragOptions.maxX = area.r;
			elem.dragOptions.minY = area.t;
			elem.dragOptions.maxY = area.b;
		}
		
		// relev� de l'�l�ment dragu�
		
		this.isDragging = elem;
		
		// relev� initial de la position de l'�l�ment draggu�
		elem.style.top=getPos(elem).t+'px';
		elem.style.left=getPos(elem).l+'px';

		// calcul de l'�cart avec le curseur
		dragOn.decalX = mousePos.x - getPos(elem).l;
		dragOn.decalY = mousePos.y - getPos(elem).t;
	},

	stop : function () {
		var elem = dragOn.isDragging;
		if (elem) {
			
			// si d�finie en options, retirer la classe css de dragage
			if (elem.dragOptions.movingClass) { elem.className = elem.className.replace(" "+elem.dragOptions.movingClass,''); }
			
			// ne plus consid�rer d'�l�ment � draguer
			dragOn.isDragging = 0;
		}
	},

	apply : function (target, options) {
		// options par d?faut
		options = options || {};
		var handle = options.handle = options.handle ? options.handle : target ;
		options.cssPosition = options.cssPosition ? options.cssPosition : target.style.position ;
		options.moveHoriz = options.moveHoriz===undefined ? 1 : options.moveHoriz;
		options.moveVert = options.moveVert===undefined ? 1 : options.moveVert;

		// m?morisation des options
		target.dragOptions = options;

		// figer la taille de l'?l?ment dragu?
		target.style.width=target.clientWidth+'px';
		target.style.height=target.clientHeight+'px';

		// sur le handle, cr?er les ?v?nement de mise en route/arr?t du drag
		var on,moveFisrt;

		on = function (e) { dragOn.start(target); };
		addEvent(handle, 'mousedown', on);

		moveFisrt = function () { dragOn.before(target); };
		addEvent(target, 'mousedown', moveFisrt);

		// emp?cher la s?lection pendant le d?placement
		handle.onselectstart = function () { return false; }; // ie
		handle.onmousedown = function () { return false; }; // mozilla
	},

	move : function () {
		var elem = dragOn.isDragging,
			opt, // raccourci de elem.dragOptions
			left, top; // positions horizontale et verticale
			
		if (elem) {
			// si un �l�ment � draguer est d�fini
			if (elem) { // le d�placer
				
				// raccourci
				opt = elem.dragOptions;
				
				// position horizontale
				if (opt.moveHoriz) {
					left = mousePos.x - dragOn.decalX;
					left = opt.maxX!==undefined && opt.maxX<left+elem.offsetWidth ? opt.maxX-elem.offsetWidth : left;
					left = opt.minX!==undefined && opt.minX>left ? opt.minX : left;
					elem.style.left = left + "px" ;
				}
				
				// position verticale
				if (opt.moveVert) {
					top = mousePos.y - dragOn.decalY;
					top = opt.maxY!==undefined && opt.maxY<top+elem.offsetHeight ? opt.maxY-elem.offsetHeight : top;
					top = opt.minY!==undefined && opt.minY>top ? opt.minY : top;
					elem.style.top = top + "px" ;
				}
			}
		}
	}
};

addEvent(document, 'mouseup', dragOn.stop);
addEvent(document, 'mousemove', dragOn.move);