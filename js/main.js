/**
 * Created with JetBrains PhpStorm.
 * User: guillaume
 * Date: 10/05/13
 * Time: 07:41
 * To change this template use File | Settings | File Templates.
 */
var tableauPosition = [[0,474]]; // initialisation du point avec les coordonée minimale  soit (6.5m/s)
var canvas = $("#canvas");
var ctx = canvas[0].getContext("2d");
makeGraduation(ctx)
canvas.on("dblclick", ctx, function (event) {
    $(this).on('mousemove', event.data, clicCanevas);
    $(this).on('click',
        function () {
            $(this).off('mousemove');
            canvas.on('mousemove', ctx, showValues);
            traceLigneEntreCoord(ctx);
        })
});

dragOn.apply(document.getElementById("dragBox"), {
    moveArea: document.getElementById("container")
});

canvas.on('mousemove', ctx, showValues);
circle(350, 350, 300); //Terre
//circle(350, 350, 50); //Noyau Terre
circle(515,100,4,"FF4422") //pount de depart

function clicCanevas(event) {
    var x = event.pageX - $('#canvas').offset().left;
    var y = event.pageY - $('#canvas').offset().top;
    var pos = [];
    pos.push(x, y);

    tracePoint(event.data, x, y, pos);
}
function showValues(event) {
    var x = event.pageX - $('#canvas').offset().left;
    var y = event.pageY - $('#canvas').offset().top;
    var propValueX = x * 6500 / 650, propValueY = 125-(1 / 4 * y);
    document.getElementById('verticalValue').innerHTML = propValueY;
    document.getElementById('horizontalValue').innerHTML = propValueX;
}
function tracePoint(ctx, x, y, posTab) {

    var lenght = tableauPosition.length;
        var lenth2 = lenght - 1;
    console.log("lenth: "+lenght+ " lenth2: "+ lenth2+" pos : "+ posTab+ "x: "+x+"y: "+y);

    if (lenght == 0 || posTab[0] > tableauPosition[lenth2][0]) {
       // ctx.fillStyle = "#000" Ancienne ligne qui trace des points maintenant remplacé par des lignes
        //ctx.fillRect(x, y, 5, 5);
        tableauPosition.push(posTab);
        traceLigneTempsReel(ctx, posTab[0], posTab[1]);
    }
    else {

    }
}
function circle(x, y, radus, color) {

    var canvasGlobes = $('#canvasGlobe');
    var ctxGlobe = canvasGlobes[0].getContext("2d")
    ctxGlobe.beginPath();
    ctxGlobe.lineWidth = "2";
    ctxGlobe.arc(x, y, radus, 0, 2 * Math.PI);
    if (color)
    {
        ctxGlobe.fillStyle="#"+color;
        ctxGlobe.fill();
    }
    else
    {
        ctxGlobe.stroke();
    }


}
function calculateRay()
{
    canvas = $("#canvasGlobe");
    ctxL = canvas[0].getContext("2d");
    nbRay = document.getElementById('numberOfRay').value;
    angle = 180/(parseInt(nbRay)+2);
    console.log("l'angle de depart des Rays est de :"+angle+ " degreeé");
    drawLine(300,56, 250, 200, ctxL);

}
function drawLine(fromX, fromY, toX, toY, ctx)
{
    ctx.beginPath();
    ctx.moveTo(fromX,fromY);
    ctx.lineTo(toX,toY);
    ctx.strokeStyle='#FF4422';
    ctx.stroke();
}
function reini()
{
    canvas = document.getElementById('canvas');
    ctxL = canvas.getContext("2d");
    ctxL.clearRect(0, 0, canvas.width, canvas.height);
    tableauPosition = [[0,474]];
    makeGraduation(ctxL);
}
function traceLigneTempsReel(ctx, x, y)
{
    var sizeof = tableauPosition.length-2
    drawLine(tableauPosition[sizeof][0], tableauPosition[sizeof][1],x, y, ctx);
}
function makeGraduation(ctx)
{
    ctx.font = "10pt Calibri,Geneva,Arial";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("Vitesse (m/s)", 10, 20);
    ctx.fillText("Profondeur (km)",550,490)
    ctx.fillText("- 6.5 M/s", 0, 477)
    ctx.fillText("| 3250Km", 322,498)
}

function minimizeGraph()
{
    document.getElementById("dragBox").style.display = 'none';
    document.getElementById("minimizeGraph").innerHTML = '<button type="button" class="btn" onclick="maximizeGraph();">Graphique</button>';
}

function maximizeGraph()
{
    document.getElementById("dragBox").style.display = '';
    document.getElementById("minimizeGraph").innerHTML = '';
}
