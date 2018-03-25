// cross-brawser requestAnimationFrame function:
window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) { 
  window.setTimeout(callback, 1000 / 60); 
};
})();

// shortcuts for vanilla js
let $id = el => document.getElementById(el);
let $qu = el => document.querySelector(el);
let $quA = el => document.querySelectorAll(el);
let $bd = document.body;

// simplifying trig functions
let sin = x => Math.sin(x);
let cos = x => Math.cos(x);
let tan = x => Math.tan(x);
const PI =  Math.PI;
const Tau = 2*PI;

// simplifying square root
let sqrt = x => Math.sqrt(x);

// simplifying exponent and logarithm functions
let exp = x => Math.exp(x);
let ln = x => Math.log(x);

// special function to play animation with intervals
let $anim = (func, step, interval) => {
	let st = () => setTimeout(func, step);
	let intr = () => setInterval(st, interval);
	intr();
}

// !!!  special functions which we will need

//random natural number
let rn = (min, max) => {
	return Math.ceil(min) + Math.floor((max-min)*Math.random());
}

//random real number
let rrl = (min, max) => min + (max-min)*Math.random();

// make rgba colors functionally available
let rgba = (r,g,b,op) => {
	return `rgba(${r}, ${g}, ${b}, ${op})`;
}
let rgb = (r,g,b) => {
	return `rgb(${r}, ${g}, ${b})`;
}

// make hsla colors functionally available
let hsla = (h,s,l,op) => {
	return `hsla(${h}, ${s}, ${l}, ${op})`;
}
let hsl = (h,s,l) => {
	return `hsl(${h}, ${s}, ${l})`;
}

// random color
let rc = (min,max,op) => {
	let r = min + Math.floor((max-min)*Math.random()),
		 g = min + Math.floor((max-min)*Math.random()),
		 b = min + Math.floor((max-min)*Math.random());
	return `rgba(${r}, ${g}, ${b}, ${op})`;
}

//random light color
let rlc = () => rc(220,255,1);

//random dark color
let rdc = () => rc(100,155,1);

// really random color 
let rcol = () => rc(0,255,1);

//random 2d-vector with length berween A and B
let rvec2 = (a,b) => {
	let len = rrl(a,b);
	let ang = rrl(0,2*PI);
	return [len*cos(ang), len*sin(ang)];
}


// helper functions ------------
//________________________________________________________
// get N evenly distributed points on x-axis from X to Y
// where X is first number, and Y is the last.
let narray = (x,y,n) => {
	if (typeof x == "number" && 
		typeof y == "number" && 
		typeof n == "number" && 
		n%1==0 &&
		n >= 2){

		if (n==2){
			return [x,y];
		} else {
			let dx = (y-x)/(n-1);
			let arr = [];
			arr.push(x);
			for (let i=0; i<n-2; i++){
				let xx = x+(y-x)*(i+1)/(n-1);
				arr.push(xx);
			}	
			arr.push(y);
			return arr;
		}
	} else {
		return undefined;
	}
}

// get N evenly distributed points on line, which is 
// passing through 2D-plane from [x0, y0] to [x1, y1]
let darray = (x0,y0,x1,y1,n) => {
	let ar1 = narray(x0,x1,n), ar2 = narray(y0,y1,n);
	let res = [];
	for (let i=0; i<n; i++) {
		res.push([ar1[i],ar2[i]]);
	}
	return res;
}

// get N evenly distributed points on circle, which is 
// on 2D-plane with center at [Cx,Cy]
let carray = (cx, cy, r, ph, n) => {
	let arr = narray(0, 2*Math.PI, n);
	let res = [];
	for (let i=0; i<n; i++) {
		res.push( [ (cx + r*Math.cos(arr[i] + ph)) , (cy + r*Math.sin(arr[i] + ph)) ] );
	}
	return res;
}

// Let's double the number of points in path. 
// We can achieve it by putting new points between existing.
// Number of points increases by N-1 (where N is initial number of points)
let addPts = mat => {
	let res = [mat[0]];
	for (let i=0; i<mat.length-1; i++) {
		let x = (mat[i][0] + mat[i+1][0])/2,
			y = (mat[i][1] + mat[i+1][1])/2;
		res.push([x,y]);
		res.push(mat[i+1]);
	}
	return res;
}

// draw polygon with N equal sides, each has length B 
let ngon = (cx, cy, n, b) => {
	let arr = narray(0, 2*Math.PI, n+1);
	let r = b*sqrt(1/(2*(1-cos((2*PI)/n))));
	arr.pop();
	let res = [];
	for (let i=0; i<n; i++) {
		res.push( [ (cx + r*Math.cos(arr[i])) , (cy + r*Math.sin(arr[i])) ] );
	}
	return res;
}

// draw polygon with N equal sides, each has length B 
// also you can enter Phase to rotate the body
let ngonp = (cx, cy, n, b, ph) => {
	let arr = narray(0, 2*Math.PI, n+1);
	let r = b*sqrt(1/(2*(1-cos((2*PI)/n))));
	arr.pop();
	let res = [];
	for (let i=0; i<n; i++) {
		res.push( [ (cx + r*Math.cos(arr[i]+ph)) , (cy + r*Math.sin(arr[i]+ph)) ] );
	}
	return res;
}

// draw polygon with N equal sides, and radius R 
// also you can enter Phase to rotate the body
let ngonpr = (cx, cy, n, r, ph) => {
	let arr = narray(0, 2*Math.PI, n+1);
	arr.pop();
	let res = [];
	for (let i=0; i<n; i++) {
		res.push( [ (cx + r*Math.cos(arr[i]+ph)) , (cy + r*Math.sin(arr[i]+ph)) ] );
	}
	return res;
}

// draw stars: M is number of leaves, 
// RB is radius of outer-most point of leaf
// RS is radius of inner-most point of leaf
let star = (cx,cy,m,rb,rs) => {
	let p =[];
	let k = (m%2==0)?2:4
	let n1 = ngonpr(cx,cy,m,rb,0-(PI/2));
	let n2 = ngonpr(cx,cy,m,rs,2*PI/(2*m)-(PI/2));
	for (let i=0; i<m; i++) {
		p.push(n1[i]);
		p.push(n2[i]);
	}
	p.push(n1[0])
	return p;
}

// draw sew like path, where Vx, Vy are ones side of one leaf, 
// and M is count of leafs
let sew = (vx,vy,cx,cy,m) => {
	vy = -vy;
	let res = [], x = 0, y = 0;
	res.push([x,y]);
	for (let i=0; i<2*m; i++) {
		x += vx;
		y = (i%2==0)?vy:0;
		res.push([x,y]);
	}
	return transl(res,cx,cy);
}

//draw square sew
let sqSew = (b,m,cx,cy) => {
	let res = [], x = 0, y = 0;
	res.push([x,y]);
	for (let i=0; i<2*m; i++) {
		y = (i%2==0)?-b:0;
		res.push([x,y]);
		x += b;
		res.push([x,y]);
	}
	res.pop();
	return transl(res,cx,cy);
}



// find center of mass of multiple points
let cntr = mat => {
	let cx = 0, cy = 0;
	for (let i=0; i<mat.length; i++) {
		cx += mat[i][0];
		cy += mat[i][1];
	}
	return [cx/mat.length, cy/mat.length];
}

// find center of mass of multipath
let cntrMp = mp => {
	let centers = [];
	for (let i=0; i<mp.length; i++) {
		centers.push(cntr(mp[i]));
	}
	return cntr(centers);
}

// find center of mass of multiple lines in path, 
// where we assume that mass is equvalent to length of straight lines
let cntrL = mat => {
	let clx = 0,
		 cly =0,
		 ll = 0;
	for (let i=0; i<mat.length-1; i++) {
		let cx = (mat[i][0] + mat[i+1][0])/2,
			 cy = (mat[i][1] + mat[i+1][1])/2,
			 ln = sqrt((mat[i][0] - mat[i+1][0])**2 + (mat[i][1] - mat[i+1][1])**2);
		clx += cx*ln;
		cly += cy*ln;
		ll += ln;
	}
	return [clx/ll, cly/ll];
}

//get length of 2d-vector
let len2d = vec => {
	return sqrt(vec[0]**2 + vec[1]**2);
}

// distance between two points in 2d plane
// where two points are [x1,y1] and [x2,y2]
let dist2d = (v1,v2) => {
	return sqrt((v1[0]-v2[0])**2 + (v1[1]-v2[1])**2);
}

// get lengthes of vectors of path
let mLen = (mat) => {
	let res = [];
	for (let i=0; i<mat.length; i++) {
		res.push(sqrt(mat[i][0]**2 + mat[i][1]**2));
	}
	return res;
}

// get lengthes of vectors of pathes in multipath
let mmLen = (mmat) => {
	let mres = [];
	for (let j=0; j<mmat.length; j++) {
		let res = [];
		for (let i=0; i<mmat[j].length; i++) {
			res.push(sqrt(mmat[j][i][0]**2 + mmat[j][i][1]**2));
		}
		mres.push(res);
	}
	return mres;
}

// find product of two matrices: N-by-2 nad 2-by-2
// where the last matrix is a matrix of deformation
// for example it may be matrix of rotation and so on...
let deform = (mat,def,cx,cy) => {
	let res = [];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			(mat[i][0] - cx)*def[0][0] + (mat[i][1] - cy)*def[1][0] + cx,
			(mat[i][0] - cx)*def[0][1] + (mat[i][1] - cy)*def[1][1] + cy
		];
	}
	return res;
}

// the same function, but the center of deformation is in the center of mass
let deformc = (mat,def) => {
	let res = [],
		 cc = cntrL(mat),
		 cx = cc[0],
		 cy = cc[1];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			(mat[i][0] - cx)*def[0][0] + (mat[i][1] - cy)*def[1][0] + cx,
			(mat[i][0] - cx)*def[0][1] + (mat[i][1] - cy)*def[1][1] + cy
		];
	}
	return res;
}

// translate all points by fixed vector V = [tx,ty]
let transl = (mat,tx,ty) => {
	let res = [];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			mat[i][0] + tx, 
			mat[i][1] + ty
		];
	}
	return res;
}

// scale the body of path by COEFFICIENT.
// scaling center is at the center of mass
// scaling by amount of area
let scaleArea = (mat,coef) => {
	let res = []
	let cx = cntr(mat)[0],
		 cy = cntr(mat)[1];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			(mat[i][0] - cx)*sqrt(coef) + cx,
			(mat[i][1] - cy)*sqrt(coef) + cy
		];
	}
	return res;
}

// scale the body of path by COEF.
// scaling center is at the center of mass
// scaling linearly
let scaleAxis = (mat,fx,fy) => {
	let res = [],
		 cc = cntr(mat),
	 	 cx = cc[0],
		 cy = cc[1];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			(mat[i][0] - cx)*fx + cx,
			(mat[i][1] - cy)*fy + cy
		];
	}
	return res;
}

// Flip the body vertically
let flipY = mat => {
	let res = [],
		 cc = cntrL(mat),
	 	 cx = cc[0],
		 cy = cc[1];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			(mat[i][0] - cx) + cx,
			(mat[i][1] - cy)*(-1) + cy
		];
	}
	return res;
}

// Flip the body horizontally
let flipX = mat => {
	let res = [],
		 cc = cntrL(mat),
	 	 cx = cc[0],
		 cy = cc[1];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			(mat[i][0] - cx)*(-1) + cx,
			(mat[i][1] - cy) + cy
		];
	}
	return res;
}

// skew the body horizontally
let skewX = (mat,deg) => {
	let res = [],
		 cc = cntrL(mat),
	 	 cx = cc[0],
		 cy = cc[1];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			(mat[i][0] - cx) + cx + (mat[i][1] - cy)*tan(deg) ,
			(mat[i][1] - cy) + cy
		];
	}
	return res;
}

// skew the body vertically
let skewY = (mat,deg) => {
	let res = [],
		 cc = cntrL(mat),
	 	 cx = cc[0],
		 cy = cc[1];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			(mat[i][0] - cx) + cx,
			(mat[i][1] - cy) + cy + (mat[i][0] - cx)*tan(deg)
		];
	}
	return res;
}



// this function translates each point of path differently
// length of both arguments must be equal
let mtransl = (mat,mdef) => {
	let res = [];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			mat[i][0] + mdef[i][0], 
			mat[i][1] + mdef[i][1]
		];
	}
	return res;
}

// translate all points of mpath by single V = [tx,ty]
let mPathTransl = (mpath,v) => {
	let res = [];
	for (let i=0; i<mpath.length; i++) {
		res.push(transl(mpath[i],v[0],v[1]));
	}
	return res;
}

// this function deforms(moves) each point of path differently
// length of both arguments must be equal
let mdeform = (mat,mdef,cx,cy) => {
	let res = [];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			(mat[i][0] - cx)*mdef[i][0][0] + (mat[i][1] - cy)*mdef[i][1][0] + cx,
			(mat[i][0] - cx)*mdef[i][0][1] + (mat[i][1] - cy)*mdef[i][1][1] + cy
		];
	}
	return res;
}

// this function deforms(moves) each point of path differently
// length of both arguments must be equal
let mdeformc = (mat,mdef) => {
	let res = [],
		 cc = cntr(mat),
		 cx = cc[0],
		 cy = cc[1];
	for (let i=0; i<mat.length; i++) {
		res[i] = [
			(mat[i][0] - cx)*mdef[i][0][0] + (mat[i][1] - cy)*mdef[i][1][0] + cx,
			(mat[i][0] - cx)*mdef[i][0][1] + (mat[i][1] - cy)*mdef[i][1][1] + cy
		];
	}
	return res;
}

// stretch the body in certain direction by coefficient K
let stretch = (mat, deg, k) => {
	let res = [],
		 cc = cntrL(mat),
		 cx = cc[0], cy = cc[1];
	for (let i=0; i<mat.length; i++) {
		let mx = mat[i][0] - cx,
			 my = mat[i][1] - cy;
		let L  =  k*(cos(deg)*mx + sin(deg)*my),
			 Lp =    -sin(deg)*mx + cos(deg)*my;
		let xx = L*cos(deg) + Lp*(-sin(deg)),
			 yy = L*sin(deg) + Lp*cos(deg);
		res.push([xx+cx,yy+cy]);
	}
	return res;
}


// eye matrix 2-by-2:   [[1,0],[0,1]]
let eye2 = () => {
	return [[1,0],[0,1]];
}

// special rotation matrix for function "Deform"
let rotm = (ang, cw = true)=> {
	if (cw) {
		return [ 
					[cos(ang), sin(ang)], 
					[-sin(ang), cos(ang)]
				 ];
	} else {
		return [ 
					[cos(-ang), sin(-ang)], 
					[-sin(-ang), cos(-ang)]
				 ];
	}
}

// special scaling matrix for function Deform.
// this matrix allows to scale in both X and Y axises
let scalem = (kx,ky)=> {
		return [ 
			[ kx, 0 ], 
			[ 0 , ky]
		];
}

// special scaling matrix for function Deform.
// this matrix allows onle scaling whole area
let scaleA = (k)=> {
		return [ 
			[ sqrt(k), 0 ], 
			[ 0 , sqrt(k)]
		];
}

// get random 2d vector
// 'maxl' stands for maximum length
let rv2 = (maxl)=> {
		return [ 
			rn(0,maxl*sqrt(2)),
			rn(0,maxl*sqrt(2)),
		];
}

// get matrix(array) of random 2d vectors
let randm = (len,maxl) => {
	let res = [];
	for (let i=0;i<len;i++) {
		res.push(rv2(maxl));
	}
	return res;
}

// ---- Main code for manipulating canvas------------------------

// let's make constructor for craeting canvas nodes and manipulating them:
function CnvMaker ()  {
	// create canvas node and get its context
	this.canvasNode = document.createElement("canvas");
	this.ctx = this.canvasNode.getContext('2d');
	
	// draw that canvas node
	this.init = (el,w,h) => {
		// set width and height
		this.canvasNode.width = w;
		this.canvasNode.height = h;		
		
		// draw borders and margin 
		this.canvasNode.style.border = '1px solid gray';
		this.canvasNode.style.margin = '10px';
		
		// put that canvas node to document body
		$qu(el).appendChild(this.canvasNode);
	}
	
	//collection of objects should be stored here (optional)
	this.objs = {
		square: {
			path: [[-30,-30],[30,-30],[30,30],[-30,30]],
			col: "red",
			w: 5,
			cap: "round"
		}
	}
	
	// resize canvas (Note: resizing clears the canvas node)
	this.resize = (w,h) => {
		this.canvasNode.width = w;
		this.canvasNode.height = h;	
	}
	
	// delete canvas
	this.del = () => {
		this.canvasNode.remove();
	}
	
	// clear whole canvas
	this.cls = () => {
		this.ctx.clearRect(0,0,this.canvasNode.width,this.canvasNode.height);
	}
	
	// fill canvas with certain color
	this.fill = col => {
		this.ctx.fillStyle = col;
		this.ctx.fillRect(0,0,this.canvasNode.width,this.canvasNode.height);
	}
	
	// fill latest path with color (meaning the line formed by path)
	this.fillPath = col => {
		this.ctx.fillStyle = col;
		this.ctx.fill();
	}

	// function for drawing a single straight line (from one point to another)
	this.line = ( x0, y0, xf, yf, col, w, cap='round') => {
		this.ctx.strokeStyle = col;
		this.ctx.lineWidth = w;
		this.ctx.lineCap = cap;
		this.ctx.beginPath();
		this.ctx.moveTo(x0,y0);
		this.ctx.lineTo(xf,yf);
		this.ctx.stroke();
	}
	
	// function for drawing a single straight line (from one point to another)
	this.line2d = ( v1, v2, col, w, cap='round') => {
		this.ctx.strokeStyle = col;
		this.ctx.lineWidth = w;
		this.ctx.lineCap = cap;
		this.ctx.beginPath();
		this.ctx.moveTo(v1[0],v1[1]);
		this.ctx.lineTo(v2[0],v2[1]);
		this.ctx.stroke();
	}
	
	// function for drawing path of lines, 
	// where MAT is array of points like [ [x1,y1], [x2,y2], [x3,y3], [x4,y4]]
	this.path = (mat, col, w, cap='round') => {
		this.ctx.strokeStyle = col;
		this.ctx.lineWidth = w;
		this.ctx.lineCap = cap;
		this.ctx.beginPath();
		this.ctx.moveTo(mat[0][0],mat[0][1]);
		for (let i=1; i<mat.length; i++) {
			this.ctx.lineTo(mat[i][0],mat[i][1]);
		}
		this.ctx.stroke();
	}
	
	this.mpaths = (matm, colm, wm, capm) => {
		for (let i=0; i<matm.length; i++) {
			this.path( matm[i], colm[i], wm[i], capm[i] );
		}
	}
	
	this.mpath = (matm, col, w, cap='round') => {
		for (let i=0; i<matm.length; i++) {
			this.path( matm[i], col, w, cap );
		}
	}
	// draw straight line with multiple lines
	this.linePath = ( x0, y0, xf, yf, len, col, w, cap='round') => {
      let mat = darray(x0, y0, xf, yf, len);
		this.path(mat, col, w, cap='round');
	}
	// draw circle with multiple lines
	this.circlePath = ( cx, cy, r, ph, len, col, w, cap='round') => {
      let mat = carray(cx, cy, r, ph, len);
		this.path(mat, col, w, cap='round');
	}
	
	// draw quadratic curve
	this.quad = ( x0, y0, cx, cy, xf, yf, col, w, cap='round') => {
		this.ctx.strokeStyle = col;
		this.ctx.lineWidth = w;
		this.ctx.lineCap = cap;
		this.ctx.beginPath();
		this.ctx.moveTo(x0,y0);
		this.ctx.quadraticCurveTo(cx,cy,xf,yf);
		this.ctx.stroke();
		// this.ctx.fillStyle = col;
		// this.ctx.fill();
	}
	
	// draw bezier curve
	this.bez = ( x0, y0, cx1,cy1, cx2,cy2, xf, yf, col, w, cap='round') => {
		this.ctx.strokeStyle = col;
		this.ctx.lineWidth = w;
		this.ctx.lineCap = cap;
		this.ctx.beginPath();
		this.ctx.moveTo(x0,y0);
		this.ctx.bezierCurveTo(cx1,cy1,cx2,cy2,xf,yf);
		this.ctx.stroke();
		// this.ctx.fillStyle = col;
		// this.ctx.fill();
	}
	
	// draw colored polygon from points
	this.poly = (mat,col,fillCol,w, join='round') => {
		this.ctx.strokeStyle = col;
		this.ctx.lineWidth = w;
		this.ctx.lineJoin = join; // miter(default), bevel, round
		this.ctx.beginPath();
		this.ctx.moveTo(mat[0][0],mat[0][1]);
		for (let i=1; i<mat.length; i++) {
			this.ctx.lineTo(mat[i][0],mat[i][1]);
		}
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fillStyle = fillCol;
		this.ctx.fill();
	}
	
	// draw colored polygons from multiple set of polygons; 
	// here polygons have same colors and linewidth
	this.mpoly = (mpath,col,fillCol,w, join='round') => {
		for (let i=0; i<mpath.length; i++) {
			this.poly(mpath[i],col,fillCol,w, join);
		}
	}
	
	// draw colored polygons from multiple set of polygons; 
	// here polygons have different colors and linewidth
	this.mpolys = (mpath,col,fillCol,w, join) => {
		for (let i=0; i<mpath.length; i++) {
			this.poly(mpath[i],col[i],fillCol[i],w[i], join[i]);
		}
	}
	
	// draw arc
	this.arc = (x,y,r,sAngle,eAngle,counterclockwise, col, w, cap='round') => {
		this.ctx.strokeStyle = col;
		this.ctx.lineWidth = w;
		this.ctx.lineCap = cap;
		this.ctx.beginPath();
		this.ctx.arc(x,y,r,sAngle,eAngle,counterclockwise);
		this.ctx.stroke();
	}
	
	// rotate single point X,Y around pivot PX,PY by an angle dT
	this.rotp = (x,y, px, py, dt) => {
		let xx = x - px, yy = y - py;
		let rx = xx*Math.cos(dt) - yy*Math.sin(dt) + px;
		let ry = xx*Math.sin(dt) + yy*Math.cos(dt) + py;
		return [rx,ry];
	}
	
	// rotate points of any path around pivot PX,PY by an angle dT
	this.rotatePath = (mat, px,py, dt, col, w, cap='round') => {
		let nmat = [];
		for (let i=0; i<mat.length; i++) {
			nmat[i] = this.rotp(mat[i][0],mat[i][1],px,py,dt);
		}
		this.path(nmat,col,w, cap)
	}
	
	// rotate points of any path around center of mass by an angle dT
	this.rotateCntr = (mat, dt, col, w, cap='round') => {
		let nmat = [],
			 cn = cntr(mat),
			 px = cn[0],
			 py = cn[1];		
		for (let i=0; i<mat.length; i++) {
			nmat[i] = this.rotp(mat[i][0],mat[i][1],px,py,dt);
		}
		this.path(nmat,col,w, cap)
	}
	
	this.text = (txt,x,y,family,size,col) => {
		this.ctx.font = size + "px " + family;
		this.ctx.fillStyle = col;
		this.ctx.fillText(txt, x, y);
	}
} // end of constructor CnvMaker