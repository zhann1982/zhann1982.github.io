// cross-brawser requestAnimationFrame function:
window.requestAnimFrame = function (callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};
}();

// shortcuts for vanilla js
var $id = function $id(el) {
	return document.getElementById(el);
};
var $qu = function $qu(el) {
	return document.querySelector(el);
};
var $quA = function $quA(el) {
	return document.querySelectorAll(el);
};
var $bd = document.body;

// simplifying trig functions
var sin = function sin(x) {
	return Math.sin(x);
};
var cos = function cos(x) {
	return Math.cos(x);
};
var tan = function tan(x) {
	return Math.tan(x);
};
var PI = Math.PI;
var Tau = 2 * PI;

// simplifying square root
var sqrt = function sqrt(x) {
	return Math.sqrt(x);
};

// simplifying exponent and logarithm functions
var exp = function exp(x) {
	return Math.exp(x);
};
var ln = function ln(x) {
	return Math.log(x);
};

// special function to play animation with intervals
var $anim = function $anim(func, step, interval) {
	var st = function st() {
		return setTimeout(func, step);
	};
	var intr = function intr() {
		return setInterval(st, interval);
	};
	intr();
};

// !!!  special functions which we will need

//random natural number
var rn = function rn(min, max) {
	return Math.ceil(min) + Math.floor((max - min) * Math.random());
};

//random real number
var rrl = function rrl(min, max) {
	return min + (max - min) * Math.random();
};

// make rgba colors functionally available
var rgba = function rgba(r, g, b, op) {
	return "rgba(" + r + ", " + g + ", " + b + ", " + op + ")";
};
var rgb = function rgb(r, g, b) {
	return "rgb(" + r + ", " + g + ", " + b + ")";
};

// make hsla colors functionally available
var hsla = function hsla(h, s, l, op) {
	return "hsla(" + h + ", " + s + ", " + l + ", " + op + ")";
};
var hsl = function hsl(h, s, l) {
	return "hsl(" + h + ", " + s + ", " + l + ")";
};

// random color
var rc = function rc(min, max, op) {
	var r = min + Math.floor((max - min) * Math.random()),
	    g = min + Math.floor((max - min) * Math.random()),
	    b = min + Math.floor((max - min) * Math.random());
	return "rgba(" + r + ", " + g + ", " + b + ", " + op + ")";
};

//random light color
var rlc = function rlc() {
	return rc(220, 255, 1);
};

//random dark color
var rdc = function rdc() {
	return rc(100, 155, 1);
};

// really random color 
var rcol = function rcol() {
	return rc(0, 255, 1);
};

//random 2d-vector with length berween A and B
var rvec2 = function rvec2(a, b) {
	var len = rrl(a, b);
	var ang = rrl(0, 2 * PI);
	return [len * cos(ang), len * sin(ang)];
};

// helper functions ------------
//________________________________________________________
// get N evenly distributed points on x-axis from X to Y
// where X is first number, and Y is the last.
var narray = function narray(x, y, n) {
	if (typeof x == "number" && typeof y == "number" && typeof n == "number" && n % 1 == 0 && n >= 2) {

		if (n == 2) {
			return [x, y];
		} else {
			var dx = (y - x) / (n - 1);
			var arr = [];
			arr.push(x);
			for (var i = 0; i < n - 2; i++) {
				var xx = x + (y - x) * (i + 1) / (n - 1);
				arr.push(xx);
			}
			arr.push(y);
			return arr;
		}
	} else {
		return undefined;
	}
};

// get N evenly distributed points on line, which is 
// passing through 2D-plane from [x0, y0] to [x1, y1]
var darray = function darray(x0, y0, x1, y1, n) {
	var ar1 = narray(x0, x1, n),
	    ar2 = narray(y0, y1, n);
	var res = [];
	for (var i = 0; i < n; i++) {
		res.push([ar1[i], ar2[i]]);
	}
	return res;
};

// get N evenly distributed points on circle, which is 
// on 2D-plane with center at [Cx,Cy]
var carray = function carray(cx, cy, r, ph, n) {
	var arr = narray(0, 2 * Math.PI, n);
	var res = [];
	for (var i = 0; i < n; i++) {
		res.push([cx + r * Math.cos(arr[i] + ph), cy + r * Math.sin(arr[i] + ph)]);
	}
	return res;
};

// Let's double the number of points in path. 
// We can achieve it by putting new points between existing.
// Number of points increases by N-1 (where N is initial number of points)
var addPts = function addPts(mat) {
	var res = [mat[0]];
	for (var i = 0; i < mat.length - 1; i++) {
		var x = (mat[i][0] + mat[i + 1][0]) / 2,
		    y = (mat[i][1] + mat[i + 1][1]) / 2;
		res.push([x, y]);
		res.push(mat[i + 1]);
	}
	return res;
};

// draw polygon with N equal sides, each has length B 
var ngon = function ngon(cx, cy, n, b) {
	var arr = narray(0, 2 * Math.PI, n + 1);
	var r = b * sqrt(1 / (2 * (1 - cos(2 * PI / n))));
	arr.pop();
	var res = [];
	for (var i = 0; i < n; i++) {
		res.push([cx + r * Math.cos(arr[i]), cy + r * Math.sin(arr[i])]);
	}
	return res;
};

// draw polygon with N equal sides, each has length B 
// also you can enter Phase to rotate the body
var ngonp = function ngonp(cx, cy, n, b, ph) {
	var arr = narray(0, 2 * Math.PI, n + 1);
	var r = b * sqrt(1 / (2 * (1 - cos(2 * PI / n))));
	arr.pop();
	var res = [];
	for (var i = 0; i < n; i++) {
		res.push([cx + r * Math.cos(arr[i] + ph), cy + r * Math.sin(arr[i] + ph)]);
	}
	return res;
};

// draw polygon with N equal sides, and radius R 
// also you can enter Phase to rotate the body
var ngonpr = function ngonpr(cx, cy, n, r, ph) {
	var arr = narray(0, 2 * Math.PI, n + 1);
	arr.pop();
	var res = [];
	for (var i = 0; i < n; i++) {
		res.push([cx + r * Math.cos(arr[i] + ph), cy + r * Math.sin(arr[i] + ph)]);
	}
	return res;
};

// draw stars: M is number of leaves, 
// RB is radius of outer-most point of leaf
// RS is radius of inner-most point of leaf
var star = function star(cx, cy, m, rb, rs) {
	var p = [];
	var k = m % 2 == 0 ? 2 : 4;
	var n1 = ngonpr(cx, cy, m, rb, 0 - PI / 2);
	var n2 = ngonpr(cx, cy, m, rs, 2 * PI / (2 * m) - PI / 2);
	for (var i = 0; i < m; i++) {
		p.push(n1[i]);
		p.push(n2[i]);
	}
	p.push(n1[0]);
	return p;
};

// draw sew like path, where Vx, Vy are ones side of one leaf, 
// and M is count of leafs
var sew = function sew(vx, vy, cx, cy, m) {
	vy = -vy;
	var res = [],
	    x = 0,
	    y = 0;
	res.push([x, y]);
	for (var i = 0; i < 2 * m; i++) {
		x += vx;
		y = i % 2 == 0 ? vy : 0;
		res.push([x, y]);
	}
	return transl(res, cx, cy);
};

//draw square sew
var sqSew = function sqSew(b, m, cx, cy) {
	var res = [],
	    x = 0,
	    y = 0;
	res.push([x, y]);
	for (var i = 0; i < 2 * m; i++) {
		y = i % 2 == 0 ? -b : 0;
		res.push([x, y]);
		x += b;
		res.push([x, y]);
	}
	res.pop();
	return transl(res, cx, cy);
};

// find center of mass of multiple points
var cntr = function cntr(mat) {
	var cx = 0,
	    cy = 0;
	for (var i = 0; i < mat.length; i++) {
		cx += mat[i][0];
		cy += mat[i][1];
	}
	return [cx / mat.length, cy / mat.length];
};

// find center of mass of multipath
var cntrMp = function cntrMp(mp) {
	var centers = [];
	for (var i = 0; i < mp.length; i++) {
		centers.push(cntr(mp[i]));
	}
	return cntr(centers);
};

// find center of mass of multiple lines in path, 
// where we assume that mass is equvalent to length of straight lines
var cntrL = function cntrL(mat) {
	var clx = 0,
	    cly = 0,
	    ll = 0;
	for (var i = 0; i < mat.length - 1; i++) {
		var cx = (mat[i][0] + mat[i + 1][0]) / 2,
		    cy = (mat[i][1] + mat[i + 1][1]) / 2,
		    _ln = sqrt(Math.pow(mat[i][0] - mat[i + 1][0], 2) + Math.pow(mat[i][1] - mat[i + 1][1], 2));
		clx += cx * _ln;
		cly += cy * _ln;
		ll += _ln;
	}
	return [clx / ll, cly / ll];
};

//get length of 2d-vector
var len2d = function len2d(vec) {
	return sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2));
};

// distance between two points in 2d plane
// where two points are [x1,y1] and [x2,y2]
var dist2d = function dist2d(v1, v2) {
	return sqrt(Math.pow(v1[0] - v2[0], 2) + Math.pow(v1[1] - v2[1], 2));
};

// get lengthes of vectors of path
var mLen = function mLen(mat) {
	var res = [];
	for (var i = 0; i < mat.length; i++) {
		res.push(sqrt(Math.pow(mat[i][0], 2) + Math.pow(mat[i][1], 2)));
	}
	return res;
};

// get lengthes of vectors of pathes in multipath
var mmLen = function mmLen(mmat) {
	var mres = [];
	for (var j = 0; j < mmat.length; j++) {
		var res = [];
		for (var i = 0; i < mmat[j].length; i++) {
			res.push(sqrt(Math.pow(mmat[j][i][0], 2) + Math.pow(mmat[j][i][1], 2)));
		}
		mres.push(res);
	}
	return mres;
};

// find product of two matrices: N-by-2 nad 2-by-2
// where the last matrix is a matrix of deformation
// for example it may be matrix of rotation and so on...
var deform = function deform(mat, def, cx, cy) {
	var res = [];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [(mat[i][0] - cx) * def[0][0] + (mat[i][1] - cy) * def[1][0] + cx, (mat[i][0] - cx) * def[0][1] + (mat[i][1] - cy) * def[1][1] + cy];
	}
	return res;
};

// the same function, but the center of deformation is in the center of mass
var deformc = function deformc(mat, def) {
	var res = [],
	    cc = cntrL(mat),
	    cx = cc[0],
	    cy = cc[1];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [(mat[i][0] - cx) * def[0][0] + (mat[i][1] - cy) * def[1][0] + cx, (mat[i][0] - cx) * def[0][1] + (mat[i][1] - cy) * def[1][1] + cy];
	}
	return res;
};

// translate all points by fixed vector V = [tx,ty]
var transl = function transl(mat, tx, ty) {
	var res = [];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [mat[i][0] + tx, mat[i][1] + ty];
	}
	return res;
};

// scale the body of path by COEFFICIENT.
// scaling center is at the center of mass
// scaling by amount of area
var scaleArea = function scaleArea(mat, coef) {
	var res = [];
	var cx = cntr(mat)[0],
	    cy = cntr(mat)[1];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [(mat[i][0] - cx) * sqrt(coef) + cx, (mat[i][1] - cy) * sqrt(coef) + cy];
	}
	return res;
};

// scale the body of path by COEF.
// scaling center is at the center of mass
// scaling linearly
var scaleAxis = function scaleAxis(mat, fx, fy) {
	var res = [],
	    cc = cntr(mat),
	    cx = cc[0],
	    cy = cc[1];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [(mat[i][0] - cx) * fx + cx, (mat[i][1] - cy) * fy + cy];
	}
	return res;
};

// Flip the body vertically
var flipY = function flipY(mat) {
	var res = [],
	    cc = cntrL(mat),
	    cx = cc[0],
	    cy = cc[1];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [mat[i][0] - cx + cx, (mat[i][1] - cy) * -1 + cy];
	}
	return res;
};

// Flip the body horizontally
var flipX = function flipX(mat) {
	var res = [],
	    cc = cntrL(mat),
	    cx = cc[0],
	    cy = cc[1];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [(mat[i][0] - cx) * -1 + cx, mat[i][1] - cy + cy];
	}
	return res;
};

// skew the body horizontally
var skewX = function skewX(mat, deg) {
	var res = [],
	    cc = cntrL(mat),
	    cx = cc[0],
	    cy = cc[1];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [mat[i][0] - cx + cx + (mat[i][1] - cy) * tan(deg), mat[i][1] - cy + cy];
	}
	return res;
};

// skew the body vertically
var skewY = function skewY(mat, deg) {
	var res = [],
	    cc = cntrL(mat),
	    cx = cc[0],
	    cy = cc[1];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [mat[i][0] - cx + cx, mat[i][1] - cy + cy + (mat[i][0] - cx) * tan(deg)];
	}
	return res;
};

// this function translates each point of path differently
// length of both arguments must be equal
var mtransl = function mtransl(mat, mdef) {
	var res = [];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [mat[i][0] + mdef[i][0], mat[i][1] + mdef[i][1]];
	}
	return res;
};

// translate all points of mpath by single V = [tx,ty]
var mPathTransl = function mPathTransl(mpath, v) {
	var res = [];
	for (var i = 0; i < mpath.length; i++) {
		res.push(transl(mpath[i], v[0], v[1]));
	}
	return res;
};

// this function deforms(moves) each point of path differently
// length of both arguments must be equal
var mdeform = function mdeform(mat, mdef, cx, cy) {
	var res = [];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [(mat[i][0] - cx) * mdef[i][0][0] + (mat[i][1] - cy) * mdef[i][1][0] + cx, (mat[i][0] - cx) * mdef[i][0][1] + (mat[i][1] - cy) * mdef[i][1][1] + cy];
	}
	return res;
};

// this function deforms(moves) each point of path differently
// length of both arguments must be equal
var mdeformc = function mdeformc(mat, mdef) {
	var res = [],
	    cc = cntr(mat),
	    cx = cc[0],
	    cy = cc[1];
	for (var i = 0; i < mat.length; i++) {
		res[i] = [(mat[i][0] - cx) * mdef[i][0][0] + (mat[i][1] - cy) * mdef[i][1][0] + cx, (mat[i][0] - cx) * mdef[i][0][1] + (mat[i][1] - cy) * mdef[i][1][1] + cy];
	}
	return res;
};

// stretch the body in certain direction by coefficient K
var stretch = function stretch(mat, deg, k) {
	var res = [],
	    cc = cntrL(mat),
	    cx = cc[0],
	    cy = cc[1];
	for (var i = 0; i < mat.length; i++) {
		var mx = mat[i][0] - cx,
		    my = mat[i][1] - cy;
		var L = k * (cos(deg) * mx + sin(deg) * my),
		    Lp = -sin(deg) * mx + cos(deg) * my;
		var xx = L * cos(deg) + Lp * -sin(deg),
		    yy = L * sin(deg) + Lp * cos(deg);
		res.push([xx + cx, yy + cy]);
	}
	return res;
};

// eye matrix 2-by-2:   [[1,0],[0,1]]
var eye2 = function eye2() {
	return [[1, 0], [0, 1]];
};

// special rotation matrix for function "Deform"
var rotm = function rotm(ang) {
	var cw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	if (cw) {
		return [[cos(ang), sin(ang)], [-sin(ang), cos(ang)]];
	} else {
		return [[cos(-ang), sin(-ang)], [-sin(-ang), cos(-ang)]];
	}
};

// special scaling matrix for function Deform.
// this matrix allows to scale in both X and Y axises
var scalem = function scalem(kx, ky) {
	return [[kx, 0], [0, ky]];
};

// special scaling matrix for function Deform.
// this matrix allows onle scaling whole area
var scaleA = function scaleA(k) {
	return [[sqrt(k), 0], [0, sqrt(k)]];
};

// get random 2d vector
// 'maxl' stands for maximum length
var rv2 = function rv2(maxl) {
	return [rn(0, maxl * sqrt(2)), rn(0, maxl * sqrt(2))];
};

// get matrix(array) of random 2d vectors
var randm = function randm(len, maxl) {
	var res = [];
	for (var i = 0; i < len; i++) {
		res.push(rv2(maxl));
	}
	return res;
};

// ---- Main code for manipulating canvas------------------------

// let's make constructor for craeting canvas nodes and manipulating them:
function CnvMaker() {
	var _this = this;

	// create canvas node and get its context
	this.canvasNode = document.createElement("canvas");
	this.ctx = this.canvasNode.getContext('2d');

	// draw that canvas node
	this.init = function (el, w, h) {
		// set width and height
		_this.canvasNode.width = w;
		_this.canvasNode.height = h;

		// draw borders and margin 
		_this.canvasNode.style.border = '1px solid gray';
		_this.canvasNode.style.margin = '10px';

		// put that canvas node to document body
		$qu(el).appendChild(_this.canvasNode);
	};

	//collection of objects should be stored here (optional)
	this.objs = {
		square: {
			path: [[-30, -30], [30, -30], [30, 30], [-30, 30]],
			col: "red",
			w: 5,
			cap: "round"
		}

		// resize canvas (Note: resizing clears the canvas node)
	};this.resize = function (w, h) {
		_this.canvasNode.width = w;
		_this.canvasNode.height = h;
	};

	// delete canvas
	this.del = function () {
		_this.canvasNode.remove();
	};

	// clear whole canvas
	this.cls = function () {
		_this.ctx.clearRect(0, 0, _this.canvasNode.width, _this.canvasNode.height);
	};

	// fill canvas with certain color
	this.fill = function (col) {
		_this.ctx.fillStyle = col;
		_this.ctx.fillRect(0, 0, _this.canvasNode.width, _this.canvasNode.height);
	};

	// fill latest path with color (meaning the line formed by path)
	this.fillPath = function (col) {
		_this.ctx.fillStyle = col;
		_this.ctx.fill();
	};

	// function for drawing a single straight line (from one point to another)
	this.line = function (x0, y0, xf, yf, col, w) {
		var cap = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'round';

		_this.ctx.strokeStyle = col;
		_this.ctx.lineWidth = w;
		_this.ctx.lineCap = cap;
		_this.ctx.beginPath();
		_this.ctx.moveTo(x0, y0);
		_this.ctx.lineTo(xf, yf);
		_this.ctx.stroke();
	};

	// function for drawing a single straight line (from one point to another)
	this.line2d = function (v1, v2, col, w) {
		var cap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'round';

		_this.ctx.strokeStyle = col;
		_this.ctx.lineWidth = w;
		_this.ctx.lineCap = cap;
		_this.ctx.beginPath();
		_this.ctx.moveTo(v1[0], v1[1]);
		_this.ctx.lineTo(v2[0], v2[1]);
		_this.ctx.stroke();
	};

	// function for drawing path of lines, 
	// where MAT is array of points like [ [x1,y1], [x2,y2], [x3,y3], [x4,y4]]
	this.path = function (mat, col, w) {
		var cap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'round';

		_this.ctx.strokeStyle = col;
		_this.ctx.lineWidth = w;
		_this.ctx.lineCap = cap;
		_this.ctx.beginPath();
		_this.ctx.moveTo(mat[0][0], mat[0][1]);
		for (var i = 1; i < mat.length; i++) {
			_this.ctx.lineTo(mat[i][0], mat[i][1]);
		}
		_this.ctx.stroke();
	};

	this.mpaths = function (matm, colm, wm, capm) {
		for (var i = 0; i < matm.length; i++) {
			_this.path(matm[i], colm[i], wm[i], capm[i]);
		}
	};

	this.mpath = function (matm, col, w) {
		var cap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'round';

		for (var i = 0; i < matm.length; i++) {
			_this.path(matm[i], col, w, cap);
		}
	};
	// draw straight line with multiple lines
	this.linePath = function (x0, y0, xf, yf, len, col, w) {
		var cap = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'round';

		var mat = darray(x0, y0, xf, yf, len);
		_this.path(mat, col, w, cap = 'round');
	};
	// draw circle with multiple lines
	this.circlePath = function (cx, cy, r, ph, len, col, w) {
		var cap = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'round';

		var mat = carray(cx, cy, r, ph, len);
		_this.path(mat, col, w, cap = 'round');
	};

	// draw quadratic curve
	this.quad = function (x0, y0, cx, cy, xf, yf, col, w) {
		var cap = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 'round';

		_this.ctx.strokeStyle = col;
		_this.ctx.lineWidth = w;
		_this.ctx.lineCap = cap;
		_this.ctx.beginPath();
		_this.ctx.moveTo(x0, y0);
		_this.ctx.quadraticCurveTo(cx, cy, xf, yf);
		_this.ctx.stroke();
		// this.ctx.fillStyle = col;
		// this.ctx.fill();
	};

	// draw bezier curve
	this.bez = function (x0, y0, cx1, cy1, cx2, cy2, xf, yf, col, w) {
		var cap = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 'round';

		_this.ctx.strokeStyle = col;
		_this.ctx.lineWidth = w;
		_this.ctx.lineCap = cap;
		_this.ctx.beginPath();
		_this.ctx.moveTo(x0, y0);
		_this.ctx.bezierCurveTo(cx1, cy1, cx2, cy2, xf, yf);
		_this.ctx.stroke();
		// this.ctx.fillStyle = col;
		// this.ctx.fill();
	};

	// draw colored polygon from points
	this.poly = function (mat, col, fillCol, w) {
		var join = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'round';

		_this.ctx.strokeStyle = col;
		_this.ctx.lineWidth = w;
		_this.ctx.lineJoin = join; // miter(default), bevel, round
		_this.ctx.beginPath();
		_this.ctx.moveTo(mat[0][0], mat[0][1]);
		for (var i = 1; i < mat.length; i++) {
			_this.ctx.lineTo(mat[i][0], mat[i][1]);
		}
		_this.ctx.closePath();
		_this.ctx.stroke();
		_this.ctx.fillStyle = fillCol;
		_this.ctx.fill();
	};

	// draw colored polygons from multiple set of polygons; 
	// here polygons have same colors and linewidth
	this.mpoly = function (mpath, col, fillCol, w) {
		var join = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'round';

		for (var i = 0; i < mpath.length; i++) {
			_this.poly(mpath[i], col, fillCol, w, join);
		}
	};

	// draw colored polygons from multiple set of polygons; 
	// here polygons have different colors and linewidth
	this.mpolys = function (mpath, col, fillCol, w, join) {
		for (var i = 0; i < mpath.length; i++) {
			_this.poly(mpath[i], col[i], fillCol[i], w[i], join[i]);
		}
	};

	// draw arc
	this.arc = function (x, y, r, sAngle, eAngle, counterclockwise, col, w) {
		var cap = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 'round';

		_this.ctx.strokeStyle = col;
		_this.ctx.lineWidth = w;
		_this.ctx.lineCap = cap;
		_this.ctx.beginPath();
		_this.ctx.arc(x, y, r, sAngle, eAngle, counterclockwise);
		_this.ctx.stroke();
	};

	// rotate single point X,Y around pivot PX,PY by an angle dT
	this.rotp = function (x, y, px, py, dt) {
		var xx = x - px,
		    yy = y - py;
		var rx = xx * Math.cos(dt) - yy * Math.sin(dt) + px;
		var ry = xx * Math.sin(dt) + yy * Math.cos(dt) + py;
		return [rx, ry];
	};

	// rotate points of any path around pivot PX,PY by an angle dT
	this.rotatePath = function (mat, px, py, dt, col, w) {
		var cap = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'round';

		var nmat = [];
		for (var i = 0; i < mat.length; i++) {
			nmat[i] = _this.rotp(mat[i][0], mat[i][1], px, py, dt);
		}
		_this.path(nmat, col, w, cap);
	};

	// rotate points of any path around center of mass by an angle dT
	this.rotateCntr = function (mat, dt, col, w) {
		var cap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'round';

		var nmat = [],
		    cn = cntr(mat),
		    px = cn[0],
		    py = cn[1];
		for (var i = 0; i < mat.length; i++) {
			nmat[i] = _this.rotp(mat[i][0], mat[i][1], px, py, dt);
		}
		_this.path(nmat, col, w, cap);
	};

	this.text = function (txt, x, y, family, size, col) {
		_this.ctx.font = size + "px " + family;
		_this.ctx.fillStyle = col;
		_this.ctx.fillText(txt, x, y);
	};
} // end of constructor CnvMaker