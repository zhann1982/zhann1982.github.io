function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {if (window.CP.shouldStopExecution(1)){break;} arr2[i] = arr[i]; }
window.CP.exitedLoop(1);
 return arr2; } else { return Array.from(arr); } }

// auxilary functions

//check if all elemens of array are equal. 
// elements are not arrays
var checkEq = function checkEq(v) {
	if (v.length > 1) {
		for (var i = 1; i < v.length; i++) {if (window.CP.shouldStopExecution(2)){break;}
			if (v[0] != v[i]) return false;
		}
window.CP.exitedLoop(2);

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
	for (var i = 0; i < h; i++) {if (window.CP.shouldStopExecution(4)){break;}
		// Loop through every item in the outer array (height)
		t[i] = []; // Insert a new row (array)
		for (var j = 0; j < w; j++) {if (window.CP.shouldStopExecution(3)){break;}
			// Loop through every item per item in outer array (width)
			t[i][j] = a[j][i]; // Save transposed data.
		}
window.CP.exitedLoop(3);

	}
window.CP.exitedLoop(4);

	return t;
};

// create matrix with elements that are random real numbers from 0 to 1
// R - number of rows, C - number of columns
var randM = function randM(r, c) {
	var mt = [];
	for (var i = 0; i < r; i++) {if (window.CP.shouldStopExecution(6)){break;}
		var row = [];
		for (var j = 0; j < c; j++) {if (window.CP.shouldStopExecution(5)){break;}
			row.push(Math.random());
		}
window.CP.exitedLoop(5);

		mt.push(row);
	}
window.CP.exitedLoop(6);

	return mt;
};

// find dot product of two vectors
// V and U have same length (any natural number)
var dot = function dot(v, u) {
	if (u.length == v.length) {
		var res = 0;
		for (var i = 0; i < u.length; i++) {if (window.CP.shouldStopExecution(7)){break;}
			res += u[i] * v[i];
		}
window.CP.exitedLoop(7);

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
	for (var i = 0; i < v.length; i++) {if (window.CP.shouldStopExecution(8)){break;}
		v[i] /= len;
	}
window.CP.exitedLoop(8);

	return v;
};

// sum of two vectors
var sumV = function sumV(v, u) {
	if (v.length == u.length) {
		var res = [];
		for (var i = 0; i < v.length; i++) {if (window.CP.shouldStopExecution(9)){break;}
			res.push(v[i] + u[i]);
		}
window.CP.exitedLoop(9);

		return res;
	}
};

// subtraction of two vectors
var subV = function subV(v, u) {
	if (v.length == u.length) {
		var res = [];
		for (var i = 0; i < v.length; i++) {if (window.CP.shouldStopExecution(10)){break;}
			res.push(v[i] - u[i]);
		}
window.CP.exitedLoop(10);

		return res;
	}
};

// multiply vector by scalar (any real number)
var scaleV = function scaleV(v, k) {
	var res = [];
	for (var i = 0; i < v.length; i++) {if (window.CP.shouldStopExecution(11)){break;}
		res.push(v[i] * k);
	}
window.CP.exitedLoop(11);

	return res;
};

// let's modify sumV so that we can add more then 2 vectors
var sumVs = function sumVs() {
	for (var _len = arguments.length, vs = Array(_len), _key = 0; _key < _len; _key++) {if (window.CP.shouldStopExecution(12)){break;}
		vs[_key] = arguments[_key];
	}
window.CP.exitedLoop(12);


	// check if all vectors have the same length
	for (var i = 0; i < vs.length - 1; i++) {if (window.CP.shouldStopExecution(13)){break;}
		if (vs[i].length != vs[i + 1].length) return undefined;
	}
window.CP.exitedLoop(13);

	var res = [];
	for (var _i = 0; _i < vs[0].length; _i++) {if (window.CP.shouldStopExecution(15)){break;}
		var el = 0;
		for (var j = 0; j < vs.length; j++) {if (window.CP.shouldStopExecution(14)){break;}
			el += vs[j][_i];
		}
window.CP.exitedLoop(14);

		res.push(el);
	}
window.CP.exitedLoop(15);

	return res;
};

//using dot product and lengthes of vectors gives us cosine of angle between them
var cosDot = function cosDot(v1, v2) {
	return dot(v1, v2) / (lenV(v1) * lenV(v2));
};

// check if input is matrix (2D matrices like [[1,2],[3,4]] )
var isMatrix = function isMatrix(m) {
	if (!(m instanceof Array) || m.length == 0) return false;
	for (var i = 0; i < m.length; i++) {if (window.CP.shouldStopExecution(16)){break;}
		if (!(m[i] instanceof Array) || m[i].length == 0) return false;
	}
window.CP.exitedLoop(16);

	for (var _i2 = 0; _i2 < m.length - 1; _i2++) {if (window.CP.shouldStopExecution(17)){break;}
		if (m[_i2].length != m[_i2 + 1].length) return false;
	}
window.CP.exitedLoop(17);

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
	for (var i = 0; i < m.length; i++) {if (window.CP.shouldStopExecution(19)){break;}
		if (i == r) continue;
		var row = [];
		for (var j = 0; j < m[i].length; j++) {if (window.CP.shouldStopExecution(18)){break;}
			if (j == c) continue;
			row.push(m[i][j]);
		}
window.CP.exitedLoop(18);

		res.push(row);
	}
window.CP.exitedLoop(19);

	return res;
};

// find determinant of square matrix M
var det = function det(m) {
	if (!isMatrix(m) || !isSquareM(m)) return undefined;
	if (m.length == 1 & m[0].length == 1) return m[0][0];
	if (m.length == 2 & m[0].length == 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
	var res = 0;
	for (var i = 0; i < m.length; i++) {if (window.CP.shouldStopExecution(20)){break;}
		if (m[0][i] == 0) continue;
		res += Math.pow(-1, i) * m[0][i] * det(minor(m, 0, i));
	}
window.CP.exitedLoop(20);

	return res;
};

// find inverse matrix of matrix M. M must be square.
var invM = function invM(m) {
	if (!isMatrix(m) || !isSquareM(m)) return undefined;
	var res = [];
	var dt = det(m);
	if (dt == 0) return undefined;
	for (var i = 0; i < m.length; i++) {if (window.CP.shouldStopExecution(22)){break;}
		var row = [];
		for (var j = 0; j < m.length; j++) {if (window.CP.shouldStopExecution(21)){break;}
			row.push(Math.pow(-1, i + j) * det(minor(m, j, i)) / dt);
		}
window.CP.exitedLoop(21);

		res.push(row);
	}
window.CP.exitedLoop(22);

	return res;
};

// multiplication of two matrices
var MxM = function MxM(m1, m2) {
	if (!isMatrix(m1) || !isMatrix(m2)) return undefined;
	if (m1[0].length != m2.length) return undefined;
	var res = [];
	for (var i = 0; i < m1.length; i++) {if (window.CP.shouldStopExecution(25)){break;}
		var row = [];
		for (var j = 0; j < m2[0].length; j++) {if (window.CP.shouldStopExecution(24)){break;}
			var el = 0;
			for (var k = 0; k < m1[0].length; k++) {if (window.CP.shouldStopExecution(23)){break;}
				el += m1[i][k] * m2[k][j];
			}
window.CP.exitedLoop(23);

			row.push(el);
		}
window.CP.exitedLoop(24);

		res.push(row);
	}
window.CP.exitedLoop(25);

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
	for (var i = 0; i < v.length; i++) {if (window.CP.shouldStopExecution(26)){break;}
		if (typeof v[i] != "number") return false;
	}
window.CP.exitedLoop(26);

	return true;
};

// check if V is in form [[x],[y],[z]], where x, y and z are numbers
var isColV = function isColV(v) {
	if (!(v instanceof Array) || v.length == 0) return false;
	for (var i = 0; i < v.length; i++) {if (window.CP.shouldStopExecution(27)){break;}
		if (!(v[i] instanceof Array) || v[i].length != 1) return false;
		if (typeof v[i][0] != "number") return false;
	}
window.CP.exitedLoop(27);

	return true;
};

// change from [x, y, z] to [[x],[y],[z]]
var RtoC = function RtoC(v) {
	if (isRowV(v) == false) return undefined;
	var res = [];
	for (var i = 0; i < v.length; i++) {if (window.CP.shouldStopExecution(28)){break;}
		res.push([v[i]]);
	}
window.CP.exitedLoop(28);

	return res;
};

// change from [[x],[y],[z]] to [x, y, z]
var CtoR = function CtoR(v) {
	if (isColV(v) == false) return undefined;
	var res = [];
	for (var i = 0; i < v.length; i++) {if (window.CP.shouldStopExecution(29)){break;}
		res.push(v[i][0]);
	}
window.CP.exitedLoop(29);

	return res;
};

// diagonal of matrix 
var diagM = function diagM(m) {
	if (!isMatrix(m)) return undefined;
	var nn = m.length <= m[0].length ? m.length : m[0].length;
	var res = [];
	for (var i = 0; i < nn; i++) {if (window.CP.shouldStopExecution(30)){break;}
		res.push(m[i][i]);
	}
window.CP.exitedLoop(30);

	return res;
};

// find first greatest element in matrix
var maxEl = function maxEl(m) {
	if (!isMatrix(m)) return undefined;
	var res = m[0][0];
	for (var i = 0; i < m.length; i++) {if (window.CP.shouldStopExecution(32)){break;}
		for (var j = 0; j < m[i].length; j++) {if (window.CP.shouldStopExecution(31)){break;}
			res = res < m[i][j] ? m[i][j] : res;
		}
window.CP.exitedLoop(31);

	}
window.CP.exitedLoop(32);

	return res;
};

// find first smallest element in matrix
var minEl = function minEl(m) {
	if (!isMatrix(m)) return undefined;
	var res = m[0][0];
	for (var i = 0; i < m.length; i++) {if (window.CP.shouldStopExecution(34)){break;}
		for (var j = 0; j < m[i].length; j++) {if (window.CP.shouldStopExecution(33)){break;}
			res = res > m[i][j] ? m[i][j] : res;
		}
window.CP.exitedLoop(33);

	}
window.CP.exitedLoop(34);

	return res;
};

// shift by place two different rows of matrix
var shiftR = function shiftR(m, r, c) {
	if (!isMatrix(m)) return undefined;
	if (r > m.length || c > m.length) return undefined;
	var res = [];
	for (var i = 0; i < m.length; i++) {if (window.CP.shouldStopExecution(35)){break;}
		if (i == r) {
			res.push(m[c]);
		} else if (i == c) {
			res.push(m[r]);
		} else {
			res.push(m[i]);
		}
	}
window.CP.exitedLoop(35);

	return res;
};

// create square identity matrix
var eyeSq = function eyeSq(n) {
	var res = [];
	for (var i = 0; i < n; i++) {if (window.CP.shouldStopExecution(37)){break;}
		var row = [];
		for (var j = 0; j < n; j++) {if (window.CP.shouldStopExecution(36)){break;}
			if (i == j) {
				row.push(1);
			} else {
				row.push(0);
			}
		}
window.CP.exitedLoop(36);

		res.push(row);
	}
window.CP.exitedLoop(37);

	return res;
};

// create any identity matrix (not only square)
var eyeM = function eyeM(r, c) {
	var res = [];
	for (var i = 0; i < r; i++) {if (window.CP.shouldStopExecution(39)){break;}
		var row = [];
		for (var j = 0; j < c; j++) {if (window.CP.shouldStopExecution(38)){break;}
			if (i == j) {
				row.push(1);
			} else {
				row.push(0);
			}
		}
window.CP.exitedLoop(38);

		res.push(row);
	}
window.CP.exitedLoop(39);

	return res;
};

// create matrix with all elements equal to 1
var onesM = function onesM(r, c) {
	var res = [];
	for (var i = 0; i < r; i++) {if (window.CP.shouldStopExecution(41)){break;}
		var row = [];
		for (var j = 0; j < c; j++) {if (window.CP.shouldStopExecution(40)){break;}
			row.push(1);
		}
window.CP.exitedLoop(40);

		res.push(row);
	}
window.CP.exitedLoop(41);

	return res;
};

// create matrix with all elements equal to 0
var zerosM = function zerosM(r, c) {
	var res = [];
	for (var i = 0; i < r; i++) {if (window.CP.shouldStopExecution(43)){break;}
		var row = [];
		for (var j = 0; j < c; j++) {if (window.CP.shouldStopExecution(42)){break;}
			row.push(0);
		}
window.CP.exitedLoop(42);

		res.push(row);
	}
window.CP.exitedLoop(43);

	return res;
};

// let's create some auxilary functions for matrix operations

// get matrix that shifts two rows by places
var E_rs = function E_rs(r1, r2, nr, nc) {
	// here NR and NC are the number of rows and columns of initial matrix
	// R1 and R2 are the ezact rows that will be changed by places.
	var ey = eyeSq(nr);
	for (var i = 0; i < nr; i++) {if (window.CP.shouldStopExecution(45)){break;}
		for (var j = 0; j < nr; j++) {if (window.CP.shouldStopExecution(44)){break;}
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
window.CP.exitedLoop(44);

	}
window.CP.exitedLoop(45);

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
	for (var i = r; i < m.length; i++) {if (window.CP.shouldStopExecution(46)){break;}
		res = MxM(E_rd0(i, c, m2), res);
	}
window.CP.exitedLoop(46);

	return res;
};

// this function uses function above to get complete elimination matrix 
// that gives Upper matrix for M  :   E*M = U
var E_rd2 = function E_rd2(m) {
	var res = void 0;
	for (var i = 1; i < (m[0].length + 1 > m.length ? m.length : m[0].length + 1); i++) {if (window.CP.shouldStopExecution(47)){break;}
		if (i == 1) {
			res = E_rd1(i, i - 1, m);
		} else {
			res = MxM(E_rd1(i, i - 1 <= m[0].length ? i - 1 : m[0].length, MxM(res, m)), res);
		}
	}
window.CP.exitedLoop(47);

	return res;
};

// this function checks if all first elements of rows are equal to zero
// it begins from given indexes
var is00 = function is00(r, c, m) {
	for (var i = r; i < m.length; i++) {if (window.CP.shouldStopExecution(48)){break;}
		if (m[i][c] != 0) return false;
	}
window.CP.exitedLoop(48);

	return true;
};

// this function gives matrix for single row exchange
// it is always square matrix with S rows
var R_ex = function R_ex(r1, r2, s) {
	var res = [];
	for (var i = 0; i < s; i++) {if (window.CP.shouldStopExecution(50)){break;}
		var row = [];
		for (var j = 0; j < s; j++) {if (window.CP.shouldStopExecution(49)){break;}
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
window.CP.exitedLoop(49);

		res.push(row);
	}
window.CP.exitedLoop(50);

	return res;
};

// this function gives matrix that changes rows by places, 
// so that pivot element is not equal to zero
var E_rc0 = function E_rc0(c, m) {
	if (is00(c, c, m)) return eyeSq(m.length);
	var res = [];
	if (m[c][c] == 0) {
		for (var i = c + 1; i < m.length; i++) {if (window.CP.shouldStopExecution(51)){break;}
			if (m[i][c] != 0) {
				res = R_ex(c, i, m.length);
				break;
			}
		}
window.CP.exitedLoop(51);

	}
	return res.length != 0 ? res : eyeSq(m.length);
};

// let's turn to zero numbers that are less then 10^-14
var tol14 = function tol14(m) {
	for (var i = 0; i < m.length; i++) {if (window.CP.shouldStopExecution(53)){break;}
		for (var j = 0; j < m[i].length; j++) {if (window.CP.shouldStopExecution(52)){break;}
			if (Math.abs(m[i][j]) < 1e-13) m[i][j] = 0;
		}
window.CP.exitedLoop(52);

	}
window.CP.exitedLoop(53);

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
	for (var i = 0; i < path.length; i++) {if (window.CP.shouldStopExecution(54)){break;}
		sx += path[i][0];
		sy += path[i][1];
		sz += path[i][2];
	}
window.CP.exitedLoop(54);

	return [sx / path.length, sy / path.length, sz / path.length];
};

// center of mass for multipath3d => [path,path,path,...] where path is [[1,1,1],[2,1,5],[3,2,5],...]
var cntrMp3d = function cntrMp3d(mp) {
	var centers = [];
	for (var i = 0; i < mp.length; i++) {if (window.CP.shouldStopExecution(55)){break;}
		centers.push(cntr3d(mp[i]));
	}
window.CP.exitedLoop(55);

	return cntr3d(centers);
};

// shift all points of path by one vector
var shift3d = function shift3d(pth, v) {
	var path = copyPath(pth);
	for (var i = 0; i < path.length; i++) {if (window.CP.shouldStopExecution(56)){break;}
		path[i] = sumV(path[i], v);
	}
window.CP.exitedLoop(56);

	return path;
};

// shift all points of mpath by one vector
var shiftMp3d = function shiftMp3d(mpth, v) {
	var mp = copyMpath(mpth);
	for (var i = 0; i < mp.length; i++) {if (window.CP.shouldStopExecution(57)){break;}
		mp[i] = shift3d(mp[i], v);
	}
window.CP.exitedLoop(57);

	return mp;
};

// scale all vectors of path
var scale3d = function scale3d(pth, sv) {
	// sv is scale vector [coefX,coefY,coefZ]
	var path = copyPath(pth);
	for (var i = 0; i < path.length; i++) {if (window.CP.shouldStopExecution(58)){break;}
		path[i][0] *= sv[0];
		path[i][1] *= sv[1];
		path[i][2] *= sv[2];
	}
window.CP.exitedLoop(58);

	return path;
};

// scale all vectors of mpath
var scaleMp3d = function scaleMp3d(mpth, sv) {
	// sv is scale vector [coefX,coefY,coefZ]
	var mpath = copyMpath(mpth);
	for (var i = 0; i < mpath.length; i++) {if (window.CP.shouldStopExecution(59)){break;}
		mpath[i] = scale3d(mpath[i], sv);
	}
window.CP.exitedLoop(59);

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
	for (var i = 0; i < path.length; i++) {if (window.CP.shouldStopExecution(60)){break;}
		npath[i] = copyV(path[i]);
	}
window.CP.exitedLoop(60);

	return npath;
};

// copy the mpath
var copyMpath = function copyMpath(mpath) {
	var nmpath = [];
	for (var i = 0; i < mpath.length; i++) {if (window.CP.shouldStopExecution(61)){break;}
		nmpath[i] = copyPath(mpath[i]);
	}
window.CP.exitedLoop(61);

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
	for (var i = 0; i < 4; i++) {if (window.CP.shouldStopExecution(62)){break;}
		if (typeof v[i] != "number") return false;
	}
window.CP.exitedLoop(62);

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
	for (var i = 0; i < path.length; i++) {if (window.CP.shouldStopExecution(63)){break;}
		res.push(vRot(path[i], u, ang));
	}
window.CP.exitedLoop(63);

	return res;
};

// let's use rotation with quaternions to rotate mpath, where mpath is array of pathes.
var rotMp = function rotMp(mpth, uu, ang) {
	var mp = copyPath(mpth);
	var u = copyV(uu);
	var res = [];
	for (var i = 0; i < mp.length; i++) {if (window.CP.shouldStopExecution(65)){break;}
		var path = [];
		for (var j = 0; j < mp[i].length; j++) {if (window.CP.shouldStopExecution(64)){break;}
			path.push(vRot(mp[i][j], u, ang));
		}
window.CP.exitedLoop(64);

		res.push(path);
	}
window.CP.exitedLoop(65);

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
	for (var i = 0; i < path.length; i++) {if (window.CP.shouldStopExecution(66)){break;}
		res.push(vRotCos(path[i], u, cosA));
	}
window.CP.exitedLoop(66);

	return res;
};

// let's use cosA rotation for mpathes.
var rotMpC = function rotMpC(mpth, uu, cosA) {
	var mp = copyPath(mpth);
	var u = copyV(uu);
	var res = [];
	for (var i = 0; i < mp.length; i++) {if (window.CP.shouldStopExecution(68)){break;}
		var path = [];
		for (var j = 0; j < mp[i].length; j++) {if (window.CP.shouldStopExecution(67)){break;}
			path.push(vRotCos(mp[i][j], u, cosA));
		}
window.CP.exitedLoop(67);

		res.push(path);
	}
window.CP.exitedLoop(68);

	return res;
};