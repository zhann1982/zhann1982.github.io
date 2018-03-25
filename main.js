function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
			var _dx = (y - x) / (n - 1);
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
} // end of constructor CnvMaker;
// auxilary functions

//check if all elemens of array are equal. 
// elements are not arrays
var checkEq = function checkEq(v) {
	if (v.length > 1) {
		for (var i = 1; i < v.length; i++) {
			if (v[0] != v[i]) return false;
		}
		return true;
	}
	return false;
};

// checkEq([2,2])  true
// checkEq([5,5,5])  true
// checkEq(["a","a","a","a"])  true

/////-----------------------------------------------------
//  MATRIX and VECTORS

var transpose = function transpose(a) {
	var w = a.length ? a.length : 0,
	    h = a[0] instanceof Array ? a[0].length : 0; // Calculate the width and height of the Array
	if (h === 0 || w === 0) {
		return [];
	} // In case it is a zero matrix, no transpose routine needed.
	var t = []; // i - Counter,  j - Counter, t - Transposed data is stored in this array.
	for (var i = 0; i < h; i++) {
		// Loop through every item in the outer array (height)
		t[i] = []; // Insert a new row (array)
		for (var j = 0; j < w; j++) {
			// Loop through every item per item in outer array (width)
			t[i][j] = a[j][i]; // Save transposed data.
		}
	}
	return t;
};

// create matrix with elements that are random real numbers from 0 to 1
// R - number of rows, C - number of columns
var randM = function randM(r, c) {
	var mt = [];
	for (var i = 0; i < r; i++) {
		var row = [];
		for (var j = 0; j < c; j++) {
			row.push(Math.random());
		}
		mt.push(row);
	}
	return mt;
};

// find dot product of two vectors
// V and U have same length (any natural number)
var dot = function dot(v, u) {
	if (u.length == v.length) {
		var res = 0;
		for (var i = 0; i < u.length; i++) {
			res += u[i] * v[i];
		}
		return res;
	}
};

// previous function can give us length of vector (modulus of vector  |V| )
var lenV = function lenV(v) {
	return Math.pow(dot(v, v), 1 / 2);
};

// also we need unit vector of random vector V/|V|
var unitV = function unitV(vv) {
	var v = [].concat(_toConsumableArray(vv));
	var len = lenV(v);
	for (var i = 0; i < v.length; i++) {
		v[i] /= len;
	}
	return v;
};

// sum of two vectors
var sumV = function sumV(v, u) {
	if (v.length == u.length) {
		var res = [];
		for (var i = 0; i < v.length; i++) {
			res.push(v[i] + u[i]);
		}
		return res;
	}
};

// subtraction of two vectors
var subV = function subV(v, u) {
	if (v.length == u.length) {
		var res = [];
		for (var i = 0; i < v.length; i++) {
			res.push(v[i] - u[i]);
		}
		return res;
	}
};

// multiply vector by scalar (any real number)
var scaleV = function scaleV(v, k) {
	var res = [];
	for (var i = 0; i < v.length; i++) {
		res.push(v[i] * k);
	}
	return res;
};

// let's modify sumV so that we can add more then 2 vectors
var sumVs = function sumVs() {
	for (var _len = arguments.length, vs = Array(_len), _key = 0; _key < _len; _key++) {
		vs[_key] = arguments[_key];
	}

	// check if all vectors have the same length
	for (var i = 0; i < vs.length - 1; i++) {
		if (vs[i].length != vs[i + 1].length) return undefined;
	}
	var res = [];
	for (var _i = 0; _i < vs[0].length; _i++) {
		var el = 0;
		for (var j = 0; j < vs.length; j++) {
			el += vs[j][_i];
		}
		res.push(el);
	}
	return res;
};

//using dot product and lengthes of vectors gives us cosine of angle between them
var cosDot = function cosDot(v1, v2) {
	return dot(v1, v2) / (lenV(v1) * lenV(v2));
};

// check if input is matrix (2D matrices like [[1,2],[3,4]] )
var isMatrix = function isMatrix(m) {
	if (!(m instanceof Array) || m.length == 0) return false;
	for (var i = 0; i < m.length; i++) {
		if (!(m[i] instanceof Array) || m[i].length == 0) return false;
	}
	for (var _i2 = 0; _i2 < m.length - 1; _i2++) {
		if (m[_i2].length != m[_i2 + 1].length) return false;
	}
	return true;
};

//check if matrix is square
var isSquareM = function isSquareM(m) {
	return isMatrix(m) && m.length == m[0].length ? true : false;
};

// minor matrix is matrix obtained from matrix M by deleting Rth row and Cth column
var minor = function minor(m, r, c) {
	if (!isMatrix(m)) return undefined;
	var res = [];
	for (var i = 0; i < m.length; i++) {
		if (i == r) continue;
		var row = [];
		for (var j = 0; j < m[i].length; j++) {
			if (j == c) continue;
			row.push(m[i][j]);
		}
		res.push(row);
	}
	return res;
};

// find determinant of square matrix M
var det = function det(m) {
	if (!isMatrix(m) || !isSquareM(m)) return undefined;
	if (m.length == 1 & m[0].length == 1) return m[0][0];
	if (m.length == 2 & m[0].length == 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
	var res = 0;
	for (var i = 0; i < m.length; i++) {
		if (m[0][i] == 0) continue;
		res += Math.pow(-1, i) * m[0][i] * det(minor(m, 0, i));
	}
	return res;
};

// find inverse matrix of matrix M. M must be square.
var invM = function invM(m) {
	if (!isMatrix(m) || !isSquareM(m)) return undefined;
	var res = [];
	var dt = det(m);
	if (dt == 0) return undefined;
	for (var i = 0; i < m.length; i++) {
		var row = [];
		for (var j = 0; j < m.length; j++) {
			row.push(Math.pow(-1, i + j) * det(minor(m, j, i)) / dt);
		}
		res.push(row);
	}
	return res;
};

// multiplication of two matrices
var MxM = function MxM(m1, m2) {
	if (!isMatrix(m1) || !isMatrix(m2)) return undefined;
	if (m1[0].length != m2.length) return undefined;
	var res = [];
	for (var i = 0; i < m1.length; i++) {
		var row = [];
		for (var j = 0; j < m2[0].length; j++) {
			var el = 0;
			for (var k = 0; k < m1[0].length; k++) {
				el += m1[i][k] * m2[k][j];
			}
			row.push(el);
		}
		res.push(row);
	}
	return res;
};

// find coefficients of parabola if given three points
// ax^2 + bx + c = y. find a,b,c when given [x1,y1], [x2,y2], [x3,y3]
var parabolaOn3Points2d = function parabolaOn3Points2d(v1, v2, v3) {
	var Ys = [[v1[1]], [v2[1]], [v3[1]]];
	var Xm = [[Math.pow(v1[0], 2), v1[0], 1], [Math.pow(v2[0], 2), v2[0], 1], [Math.pow(v3[0], 2), v3[0], 1]];
	return MxM(invM(Xm), Ys);
};

// find cross product of two vectors (for vector with 3 elements), 
// v1 = [x1,y1,z1], v2 = [x2,y2,z2]
var cross = function cross(v1, v2) {
	return [det([[v1[1], v1[2]], [v2[1], v2[2]]]), -det([[v1[0], v1[2]], [v2[0], v2[2]]]), det([[v1[0], v1[1]], [v2[0], v2[1]]])];
};

// check if V is in form [x, y, z], where x, y and z are numbers
var isRowV = function isRowV(v) {
	if (!(v instanceof Array) || v.length == 0) return false;
	for (var i = 0; i < v.length; i++) {
		if (typeof v[i] != "number") return false;
	}
	return true;
};

// check if V is in form [[x],[y],[z]], where x, y and z are numbers
var isColV = function isColV(v) {
	if (!(v instanceof Array) || v.length == 0) return false;
	for (var i = 0; i < v.length; i++) {
		if (!(v[i] instanceof Array) || v[i].length != 1) return false;
		if (typeof v[i][0] != "number") return false;
	}
	return true;
};

// change from [x, y, z] to [[x],[y],[z]]
var RtoC = function RtoC(v) {
	if (isRowV(v) == false) return undefined;
	var res = [];
	for (var i = 0; i < v.length; i++) {
		res.push([v[i]]);
	}
	return res;
};

// change from [[x],[y],[z]] to [x, y, z]
var CtoR = function CtoR(v) {
	if (isColV(v) == false) return undefined;
	var res = [];
	for (var i = 0; i < v.length; i++) {
		res.push(v[i][0]);
	}
	return res;
};

// diagonal of matrix 
var diagM = function diagM(m) {
	if (!isMatrix(m)) return undefined;
	var nn = m.length <= m[0].length ? m.length : m[0].length;
	var res = [];
	for (var i = 0; i < nn; i++) {
		res.push(m[i][i]);
	}
	return res;
};

// find first greatest element in matrix
var maxEl = function maxEl(m) {
	if (!isMatrix(m)) return undefined;
	var res = m[0][0];
	for (var i = 0; i < m.length; i++) {
		for (var j = 0; j < m[i].length; j++) {
			res = res < m[i][j] ? m[i][j] : res;
		}
	}
	return res;
};

// find first smallest element in matrix
var minEl = function minEl(m) {
	if (!isMatrix(m)) return undefined;
	var res = m[0][0];
	for (var i = 0; i < m.length; i++) {
		for (var j = 0; j < m[i].length; j++) {
			res = res > m[i][j] ? m[i][j] : res;
		}
	}
	return res;
};

// shift by place two different rows of matrix
var shiftR = function shiftR(m, r, c) {
	if (!isMatrix(m)) return undefined;
	if (r > m.length || c > m.length) return undefined;
	var res = [];
	for (var i = 0; i < m.length; i++) {
		if (i == r) {
			res.push(m[c]);
		} else if (i == c) {
			res.push(m[r]);
		} else {
			res.push(m[i]);
		}
	}
	return res;
};

// create square identity matrix
var eyeSq = function eyeSq(n) {
	var res = [];
	for (var i = 0; i < n; i++) {
		var row = [];
		for (var j = 0; j < n; j++) {
			if (i == j) {
				row.push(1);
			} else {
				row.push(0);
			}
		}
		res.push(row);
	}
	return res;
};

// create any identity matrix (not only square)
var eyeM = function eyeM(r, c) {
	var res = [];
	for (var i = 0; i < r; i++) {
		var row = [];
		for (var j = 0; j < c; j++) {
			if (i == j) {
				row.push(1);
			} else {
				row.push(0);
			}
		}
		res.push(row);
	}
	return res;
};

// create matrix with all elements equal to 1
var onesM = function onesM(r, c) {
	var res = [];
	for (var i = 0; i < r; i++) {
		var row = [];
		for (var j = 0; j < c; j++) {
			row.push(1);
		}
		res.push(row);
	}
	return res;
};

// create matrix with all elements equal to 0
var zerosM = function zerosM(r, c) {
	var res = [];
	for (var i = 0; i < r; i++) {
		var row = [];
		for (var j = 0; j < c; j++) {
			row.push(0);
		}
		res.push(row);
	}
	return res;
};

// let's create some auxilary functions for matrix operations

// get matrix that shifts two rows by places
var E_rs = function E_rs(r1, r2, nr, nc) {
	// here NR and NC are the number of rows and columns of initial matrix
	// R1 and R2 are the ezact rows that will be changed by places.
	var ey = eyeSq(nr);
	for (var i = 0; i < nr; i++) {
		for (var j = 0; j < nr; j++) {
			if (i == r1) {
				ey[i][i] = 0;
				ey[i][r2] = 1;
			} else if (i == r2) {
				ey[i][i] = 0;
				ey[i][r1] = 1;
			} else {
				continue;
			}
		}
	}
	return ey;
};

// the previous matrix changes two columns by places if transposed
// but you should check sizes of matrices, so they can be applied in matrix multiplication
var E_cs = function E_cs(c1, c2, nr, nc) {
	var ee = E_rs(c1, c2, nc, nc);
	return transpose(ee);
};

// let's find matrix that reduces lower rows to the form of [0, y, z]
// we will need it in RREF function (Row reduced echelon form)
// usually we take first row, if its first element is not equal to zero (so called Pivot elements in diagonal)
// before applying this function check pivot elements for zeros

// this function reduces one row only
var E_rd0 = function E_rd0(r, c, m) {
	// r > c
	//if (m[c][c] == 0) return eyeSq(m.length);
	if (m[r][c] != 0) {
		var res = eyeSq(m.length);
		res[r][c] = -1 * m[r][c] / m[c][c]; // m[c][c] pivot point
		return res;
	} else {
		return eyeSq(m.length);
	}
	return undefined;
};

// this function uses function above to reduce all rows from R, including only columns that begin from C
var E_rd1 = function E_rd1(r, c, m) {
	var res = eyeSq(m.length);
	var m2 = m.slice();
	if (m[c][c] == 0) {
		res = MxM(E_rc0(c, m2), res);
		m2 = MxM(res, m2);
	}
	for (var i = r; i < m.length; i++) {
		res = MxM(E_rd0(i, c, m2), res);
	}
	return res;
};

// this function uses function above to get complete elimination matrix 
// that gives Upper matrix for M  :   E*M = U
var E_rd2 = function E_rd2(m) {
	var res = void 0;
	for (var i = 1; i < (m[0].length + 1 > m.length ? m.length : m[0].length + 1); i++) {
		if (i == 1) {
			res = E_rd1(i, i - 1, m);
		} else {
			res = MxM(E_rd1(i, i - 1 <= m[0].length ? i - 1 : m[0].length, MxM(res, m)), res);
		}
	}
	return res;
};

// this function checks if all first elements of rows are equal to zero
// it begins from given indexes
var is00 = function is00(r, c, m) {
	for (var i = r; i < m.length; i++) {
		if (m[i][c] != 0) return false;
	}
	return true;
};

// this function gives matrix for single row exchange
// it is always square matrix with S rows
var R_ex = function R_ex(r1, r2, s) {
	var res = [];
	for (var i = 0; i < s; i++) {
		var row = [];
		for (var j = 0; j < s; j++) {
			if (i == r1 && j == r2) {
				row.push(1);
			} else if (i == r2 && j == r1) {
				row.push(1);
			} else if (i != r1 && i != r2 && i == j) {
				row.push(1);
			} else {
				row.push(0);
			}
		}
		res.push(row);
	}
	return res;
};

// this function gives matrix that changes rows by places, 
// so that pivot element is not equal to zero
var E_rc0 = function E_rc0(c, m) {
	if (is00(c, c, m)) return eyeSq(m.length);
	var res = [];
	if (m[c][c] == 0) {
		for (var i = c + 1; i < m.length; i++) {
			if (m[i][c] != 0) {
				res = R_ex(c, i, m.length);
				break;
			}
		}
	}
	return res.length != 0 ? res : eyeSq(m.length);
};

// let's turn to zero numbers that are less then 10^-14
var tol14 = function tol14(m) {
	for (var i = 0; i < m.length; i++) {
		for (var j = 0; j < m[i].length; j++) {
			if (Math.abs(m[i][j]) < 1e-13) m[i][j] = 0;
		}
	}
	return m;
};

//Now we have tools to get LU decomposition of matrix
var LU = function LU(m) {
	var L = invM(E_rd2(m));
	var U = MxM(E_rd2(m), m);
	return [L, U];
};

/*--------------------------------------
	Additional functions for 3d vectors
*/

// projection of vector V on vector U
// let projVU = (v,u) => {
// 	return dot(v,u)/dot(u,u);
// }

// center of mass for path3d => [[1,1,1],[2,1,5],[3,2,5],...]
var cntr3d = function cntr3d(path) {
	var sx = 0,
	    sy = 0,
	    sz = 0;
	for (var i = 0; i < path.length; i++) {
		sx += path[i][0];
		sy += path[i][1];
		sz += path[i][2];
	}
	return [sx / path.length, sy / path.length, sz / path.length];
};

// center of mass for multipath3d => [path,path,path,...] where path is [[1,1,1],[2,1,5],[3,2,5],...]
var cntrMp3d = function cntrMp3d(mp) {
	var centers = [];
	for (var i = 0; i < mp.length; i++) {
		centers.push(cntr3d(mp[i]));
	}
	return cntr3d(centers);
};

// shift all points of path by one vector
var shift3d = function shift3d(pth, v) {
	var path = copyPath(pth);
	for (var i = 0; i < path.length; i++) {
		path[i] = sumV(path[i], v);
	}
	return path;
};

// shift all points of mpath by one vector
var shiftMp3d = function shiftMp3d(mpth, v) {
	var mp = copyMpath(mpth);
	for (var i = 0; i < mp.length; i++) {
		mp[i] = shift3d(mp[i], v);
	}
	return mp;
};

// scale all vectors of path
var scale3d = function scale3d(pth, sv) {
	// sv is scale vector [coefX,coefY,coefZ]
	var path = copyPath(pth);
	for (var i = 0; i < path.length; i++) {
		path[i][0] *= sv[0];
		path[i][1] *= sv[1];
		path[i][2] *= sv[2];
	}
	return path;
};

// scale all vectors of mpath
var scaleMp3d = function scaleMp3d(mpth, sv) {
	// sv is scale vector [coefX,coefY,coefZ]
	var mpath = copyMpath(mpth);
	for (var i = 0; i < mpath.length; i++) {
		mpath[i] = scale3d(mpath[i], sv);
	}
	return mpath;
};

// to avoid referencing in arrays we have to copy arrays functionally
var copyV = function copyV(v) {
	var nv = [].concat(_toConsumableArray(v));
	return nv;
};

// copy the path
var copyPath = function copyPath(path) {
	var npath = [];
	for (var i = 0; i < path.length; i++) {
		npath[i] = copyV(path[i]);
	}
	return npath;
};

// copy the mpath
var copyMpath = function copyMpath(mpath) {
	var nmpath = [];
	for (var i = 0; i < mpath.length; i++) {
		nmpath[i] = copyPath(mpath[i]);
	}
	return nmpath;
};

////////////////////////////////////////////////////////////////////////

/*

		QUATERNIONS

*/

// multiplication of two quaternions
// quaternions are in the form of [a,b,c,d]

// basic check for quaternion
// is the number a quaternion 
var isQuat = function isQuat(v) {
	if (!(v instanceof Array) || v.length != 4) return false;
	for (var i = 0; i < 4; i++) {
		if (typeof v[i] != "number") return false;
	}
	return true;
};

// length or modulus of quaternion can be found with lenV function
// lenV([0.5, 0.5, 0.5, 0.5]) = 1

// conjugate of quaternion
var conjQ = function conjQ(q) {
	return [q[0], -q[1], -q[2], -q[3]];
};

//we can use unitV function to find unit quaternion of 
//any other quaternion: unitV([1,1,1,1]) = [0.5, 0.5, 0.5, 0.5]

//find a,v form of quaternion, where a is real part and v is imaginary vector part
var av = function av(q) {
	if (q.length == 4) {
		return [q[0], [q[1], q[2], q[3]]];
	} else if (q.length == 3) {
		return [0, [q[0], q[1], q[2]]];
	}
};

// multiplying quaternion by a real number can be 
// achieved with scaleV function
// scaleV([1,1,1,1],5) = [5, 5, 5, 5]

// multiplication of two quaternions q and p
var qxp = function qxp(q, p) {
	var q1 = av(q),
	    q2 = av(p);
	return [q1[0] * q2[0] - dot(q1[1], q2[1])].concat(_toConsumableArray(sumVs(scaleV(q1[1], q2[0]), scaleV(q2[1], q1[0]), cross(q1[1], q2[1]))));
};

// Now we can rotate vector around any axis that is given by unit vector U

var vRot = function vRot(vv, uu, ang) {
	var v = copyV(vv);
	var u = copyV(uu);
	u = unitV(u);
	ang /= 2;
	var rq = [Math.cos(ang)].concat(_toConsumableArray(scaleV(u, Math.sin(ang))));
	var res = qxp(qxp(rq, v), conjQ(rq));
	return av(res)[1];
};

// let's use rotation with quaternions to rotate path, where path is [[x1,x2,x3],[y1,y2,y3],[z1,z2,z3],...]
var rotPath = function rotPath(pth, uu, ang) {
	var path = copyPath(pth);
	var u = copyV(uu);
	var res = [];
	for (var i = 0; i < path.length; i++) {
		res.push(vRot(path[i], u, ang));
	}
	return res;
};

// let's use rotation with quaternions to rotate mpath, where mpath is array of pathes.
var rotMp = function rotMp(mpth, uu, ang) {
	var mp = copyPath(mpth);
	var u = copyV(uu);
	var res = [];
	for (var i = 0; i < mp.length; i++) {
		var path = [];
		for (var j = 0; j < mp[i].length; j++) {
			path.push(vRot(mp[i][j], u, ang));
		}
		res.push(path);
	}
	return res;
};

//let's modify rotation with quaternions: instead of angle we will use cosine of angle
// we need it because sometimes it is easier to avoid arccosines.
//remember: cos(α) = cos^2(α/2) – sin^2(α/2) = 2cos^2(α/2) – 1 = 1 – 2sin^2(α/2)
//cos(α/2) = sqrt( (cos(α)+1)/2 )

var vRotCos = function vRotCos(vv, uu, cosA) {
	var v = copyV(vv);
	var u = copyV(uu);
	u = unitV(u);
	var cosAby2 = Math.pow((cosA + 1) / 2, 1 / 2);
	var sinAby2 = Math.pow((1 - cosA) / 2, 1 / 2);
	var rq = [cosAby2].concat(_toConsumableArray(scaleV(u, sinAby2)));
	var res = qxp(qxp(rq, v), conjQ(rq));
	return av(res)[1];
};

// let's use this cosA rotation for pathes.
var rotPathC = function rotPathC(pth, uu, cosA) {
	var path = copyPath(pth);
	var u = copyV(uu);
	var res = [];
	for (var i = 0; i < path.length; i++) {
		res.push(vRotCos(path[i], u, cosA));
	}
	return res;
};

// let's use cosA rotation for mpathes.
var rotMpC = function rotMpC(mpth, uu, cosA) {
	var mp = copyPath(mpth);
	var u = copyV(uu);
	var res = [];
	for (var i = 0; i < mp.length; i++) {
		var path = [];
		for (var j = 0; j < mp[i].length; j++) {
			path.push(vRotCos(mp[i][j], u, cosA));
		}
		res.push(path);
	}
	return res;
};

// single projection of one vector
var proj1 = function proj1(v1, nn, ey) {
	var l1 = lenV(nn) - dot(v1, nn) / lenV(nn, nn),
	    l2 = lenV(ey) + l1,
	    kk = l1 / l2;
	return sumV(scaleV(subV(sumV(nn, ey), v1), kk), v1);
};

// projection of vectors in path
var projPath = function projPath(path, nn, ey) {
	var res = [];
	for (var i = 0; i < path.length; i++) {
		res.push(proj1(path[i], nn, ey));
	}
	return res;
};

// projection of vectors in mpath
var projMPath = function projMPath(mp, nn, ey) {
	var res = [];
	for (var i = 0; i < mp.length; i++) {
		res.push(projPath(mp[i], nn, ey));
	}
	return res;
};

// turning projection plane up, i.e. making it lay on XY-plane
// cosA = Nz / |N|

var projToZ = function projToZ(pl, nn) {
	pl = shiftMp3d(pl, scaleV(nn, -1));
	var ro = cross(nn, [0, 0, 1]);
	var cosA = nn[2] / lenV(nn);
	return rotMpC(pl, ro, cosA);
};

// The last step is to rotate plane around Z axis so that it will be fixed to XY plane (screen does not rotate)

var projFixXY = function projFixXY(pl, nn) {
	var cosB = 0;
	if (nn[0] >= 0 && nn[1] >= 0) {
		cosB = nn[1] / lenV([nn[0], nn[1], 0]);
		return rotMpC(pl, [0, 0, 1], cosB);
	} else if (nn[0] < 0 && nn[1] >= 0) {
		cosB = nn[1] / lenV([nn[0], nn[1], 0]);
		return rotMpC(pl, [0, 0, -1], cosB);
	} else if (nn[0] < 0 && nn[1] < 0) {
		cosB = nn[1] / lenV([nn[0], nn[1], 0]);
		return rotMpC(pl, [0, 0, -1], cosB);
	} else if (nn[0] >= 0 && nn[1] < 0) {
		cosB = nn[1] / lenV([nn[0], nn[1], 0]);
		return rotMpC(pl, [0, 0, 1], cosB);
	}
};

// now we have to remove 3rd element in each vector of plane
// then we can plot it in canvas
var mpath3dto2d = function mpath3dto2d(mp3d) {
	for (var i = 0; i < mp3d.length; i++) {
		for (var j = 0; j < mp3d[i].length; j++) {
			var ch = mp3d[i][j];
			mp3d[i][j] = [ch[0], ch[1]];
		}
	}
	return mp3d;
};

//----------------------------------------//
//            test animation              //
//----------------------------------------//

var obj = [// cube
[[-100, 100, 100], [100, 100, 100]], [[100, 100, 100], [100, -100, 100]], [[100, -100, 100], [-100, -100, 100]], [[-100, -100, 100], [-100, 100, 100]], [[-100, 100, -100], [100, 100, -100]], [[100, 100, -100], [100, -100, -100]], [[100, -100, -100], [-100, -100, -100]], [[-100, -100, -100], [-100, 100, -100]], [[-100, 100, 100], [-100, 100, -100]], [[100, 100, 100], [100, 100, -100]], [[100, -100, 100], [100, -100, -100]], [[-100, -100, 100], [-100, -100, -100]]];
var obj2 = [// pyramid
[[0, 0, 200], [200, 200, -200]], [[0, 0, 200], [200, -200, -200]], [[0, 0, 200], [-200, -200, -200]], [[0, 0, 200], [-200, 200, -200]], [[-200, -200, -200], [-200, 200, -200]], [[200, -200, -200], [-200, -200, -200]], [[200, 200, -200], [200, -200, -200]], [[-200, 200, -200], [200, 200, -200]]];
var obj3 = scaleMp3d(obj2, [0.3, 0.3, 0.3]);
var obj4 = [].concat(obj2, _toConsumableArray(shiftMp3d(obj3, [700, -50, -150])));
var obj5 = shiftMp3d(obj4, [-400, 50, 50]);

var cc1 = new CnvMaker();
cc1.init(".block-1", 500, 400);
var rad = 800;
var da = 0.01;
$anim(function () {
	var nrm = [rad * cos(da), rad * sin(da), 200];
	// nrm is normal vector of a plane on which we are 
	// projecting obj
	// eyeV is vector which we add to nrm to get the position of eye.
	var eyeV = [].concat(_toConsumableArray(scaleV(unitV(nrm), 300)));
	var pl = projMPath(obj5, nrm, eyeV);
	var plZ = projToZ(pl, nrm);
	var plXY = projFixXY(plZ, nrm);
	cc1.cls();
	cc1.text("Camera is rotating around two pyramids", 80, 50, "arial", 18, "black");
	cc1.mpath(mPathTransl(mpath3dto2d(plXY), [250, 200]), "red", 3);
	da = da + 0.01;
}, 50, 20);

// another test: camera moves along fixed line
// camera is looking to the center
var obj6 = [// this is path
[200, 0, 200], [-200, 0, 200], [-200, 0, -200], [200, 0, -200], [200, 0, 200]];

var obj7 = [[[-300, -300, -200], [-300, 300, -200], [300, 300, -200], [300, -300, -200]], shift3d(obj6, [0, -200, 0]), shift3d(obj6, [0, -150, 0]), shift3d(obj6, [0, -100, 0]), shift3d(obj6, [0, -50, 0]), obj6];

var cc2 = new CnvMaker();
cc2.init(".block-2", 500, 400);
var dx = 7;
var nrm2 = [-1200, 280, 0];
$anim(function () {
	nrm2[0] = nrm2[0] + dx;
	var eyeV = [].concat(_toConsumableArray(scaleV(unitV(nrm2), 300)));
	var pl = projMPath(obj7, nrm2, eyeV);
	var plZ = projToZ(pl, nrm2);
	var plXY = projFixXY(plZ, nrm2);
	cc2.cls();
	cc2.text("Camera is moving along straight line", 80, 50, "arial", 18, "black");
	cc2.mpoly(mPathTransl(mpath3dto2d(plXY), [250, 200]), "green", "yellow", 3);
	if (nrm2[0] > 1200) {
		dx = -1 * dx;
	} else if (nrm2[0] < -1200) {
		dx = -1 * dx;
	}
}, 50, 20);

// test3: rotating object moves along straight line infront of camera
var obj8 = copyMpath(obj);

var cc3 = new CnvMaker();
cc3.init(".block-3", 500, 400);
var da2 = 0.05,
    dx2 = 5;
var nrm3 = [0, 550, 300];
var posit = [-600, 0, 0];
$anim(function () {
	posit[0] = posit[0] + dx2;
	obj8 = rotMp(obj8, [1, 0, 0], da2);
	var objT = shiftMp3d(obj8, posit);
	var eyeV = [].concat(_toConsumableArray(scaleV(unitV(nrm3), 300)));
	var pl = projMPath(objT, nrm3, eyeV);
	var plZ = projToZ(pl, nrm3);
	var plXY = projFixXY(plZ, nrm3);
	cc3.cls();
	cc3.text("Rotating object is moving along straight line", 50, 50, "arial", 18, "black");
	cc3.text("in front of camera", 50, 80, "arial", 18, "black");
	cc3.mpath(mPathTransl(mpath3dto2d(plXY), [250, 200]), "blue", 3);
	if (posit[0] > 600) {
		dx2 = -1 * dx2;
	} else if (posit[0] < -600) {
		dx2 = -1 * dx2;
	}
}, 50, 20);

// let's create some mpathes
// first we will define points, then we will join them with lines
var points = [[200, 200, 200], [-200, 200, 200], [-200, -200, 200], [200, -200, 200], [200, 200, -200], [-200, 200, -200], [-200, -200, -200], [200, -200, -200]];

var mpath1 = [];
for (var i = 0; i < points.length - 1; i++) {
	for (var j = i + 1; j < points.length; j++) {
		mpath1.push([[].concat(_toConsumableArray(points[i])), [].concat(_toConsumableArray(points[j]))]);
	}
}

var cc4 = new CnvMaker();
cc4.init(".block-4", 500, 400);
var nrm4 = [0, 550, 260];
var eyeV2 = [].concat(_toConsumableArray(scaleV(unitV(nrm4), 300)));
var ang = 0;
$anim(function () {
	mpath1 = rotMp(mpath1, [sin(ang), 0, cos(ang)], 0.03);
	var pl = projMPath(mpath1, nrm4, eyeV2);
	var plZ = projToZ(pl, nrm4);
	var plXY = projFixXY(plZ, nrm4);
	cc4.cls();
	cc4.text("Rotating object around Z-axis", 50, 50, "arial", 18, "black");
	cc4.mpath(mPathTransl(mpath3dto2d(plXY), [250, 200]), "purple", 3);
	ang = ang + 0.003;
}, 50, 20);