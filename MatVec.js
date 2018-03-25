// auxilary functions

//check if all elemens of array are equal. 
// elements are not arrays
let checkEq = v => {
	if (v.length>1) {
		for (let i=1; i<v.length; i++) {
			if (v[0] != v[i]) return false;
		}
		return true;
	}
	return false;
}

// checkEq([2,2])  true
// checkEq([5,5,5])  true
// checkEq(["a","a","a","a"])  true

/////-----------------------------------------------------
//  MATRIX and VECTORS

let transpose = a => {
  let w = a.length ? a.length : 0,
      h = a[0] instanceof Array ? a[0].length : 0;   // Calculate the width and height of the Array
  if(h === 0 || w === 0) { return []; }   			  // In case it is a zero matrix, no transpose routine needed.
  let t = [];    										  // i - Counter,  j - Counter, t - Transposed data is stored in this array.
  for(let i=0; i<h; i++) {   								// Loop through every item in the outer array (height)
    t[i] = [];  												 // Insert a new row (array)
    for(let j=0; j<w; j++) {     						// Loop through every item per item in outer array (width)
      t[i][j] = a[j][i];  									 // Save transposed data.
    }
  }
  return t;
};


// create matrix with elements that are random real numbers from 0 to 1
// R - number of rows, C - number of columns
let randM = (r,c) => {
	let mt = [];
	for (let i=0; i<r; i++) {
		let row = [];
		for (let j=0; j<c; j++){
			row.push(Math.random());
		}
		mt.push(row);
	}
	return mt;
}

// find dot product of two vectors
// V and U have same length (any natural number)
let dot = (v,u) => {
	if (u.length == v.length) {
		let res = 0;
		for (let i=0; i<u.length; i++) {
			res += u[i]*v[i];
		}
		return res;
	}
}

// previous function can give us length of vector (modulus of vector  |V| )
let lenV = v => {
	return Math.pow(dot(v,v),1/2);
}

// also we need unit vector of random vector V/|V|
let unitV = vv => {
	let v = [...vv] 
	let len = lenV(v)
	for (let i=0; i<v.length; i++) {
		v[i] /= len;
	}
	return v;
}

// sum of two vectors
let sumV = (v,u) => {
	if (v.length == u.length) {
		let res = [];
		for (let i=0; i<v.length; i++) {
			res.push(v[i]+u[i]);
		}
		return res
	}
}

// subtraction of two vectors
let subV = (v,u) => {
	if (v.length == u.length) {
		let res = [];
		for (let i=0; i<v.length; i++) {
			res.push(v[i]-u[i]);
		}
		return res
	}
}

// multiply vector by scalar (any real number)
let scaleV = (v,k) => {
	let res = [];
	for (let i=0; i<v.length; i++) {
		res.push(v[i]*k);
	}
	return res;
}

// let's modify sumV so that we can add more then 2 vectors
let sumVs = (...vs) => {
	// check if all vectors have the same length
	for (let i=0; i<vs.length-1; i++) {
		if (vs[i].length != vs[i+1].length) return undefined;
	}
	let res = [];
	for (let i=0; i<vs[0].length; i++) {
		let el = 0;
		for (let j=0; j<vs.length; j++) {
			el += vs[j][i];
		}
		res.push(el);
	}
	return res;
}

//using dot product and lengthes of vectors gives us cosine of angle between them
let cosDot = (v1,v2) => {
	return dot(v1,v2)/(lenV(v1)*lenV(v2));
}

// check if input is matrix (2D matrices like [[1,2],[3,4]] )
let isMatrix = m => {
	if ( !(m instanceof Array) || m.length == 0) return false;
	for (let i=0; i<m.length; i++) {
		if (!(m[i] instanceof Array) || m[i].length == 0) return false;
	}
	for (let i=0; i<m.length-1; i++) {
		if (m[i].length != m[i+1].length) return false;
	}
	return true;
}

//check if matrix is square
let isSquareM = m => {
	return (isMatrix(m) && m.length == m[0].length) ? true : false;
}

// minor matrix is matrix obtained from matrix M by deleting Rth row and Cth column
let minor = (m, r, c) => {
	if ( !(isMatrix(m)) ) return undefined;
	let res = [];
	for (let i=0; i<m.length; i++) {
		if (i==r) continue;
		let row = [];
		for (let j=0; j<m[i].length; j++) {
			if (j==c) continue;
			row.push(m[i][j]);
		}
		res.push(row);
	}
	return res;
}

// find determinant of square matrix M
let det = m => {
	if ( !(isMatrix(m)) || !(isSquareM(m)) ) return undefined;
	if (m.length ==1 & m[0].length == 1) return m[0][0];
	if (m.length ==2 & m[0].length == 2) return m[0][0]*m[1][1] - m[0][1]*m[1][0];
	let res = 0;
	for (let i=0; i<m.length; i++) {
		if (m[0][i]==0) continue;
		res += ((-1)**i)*m[0][i]*det(minor(m,0,i));
	}
	return res;
}

// find inverse matrix of matrix M. M must be square.
let invM = m => {
	if ( !(isMatrix(m)) || !(isSquareM(m)) ) return undefined;
	let res = [];
	let dt = det(m);
	if (dt == 0) return undefined;
	for (let i=0; i<m.length; i++) {
		let row = [];
		for (let j=0; j<m.length; j++) {
			row.push( ((-1)**(i+j)) * det( minor(m,j,i) ) / dt);
		}
		res.push(row);
	}
	return res;
}

// multiplication of two matrices
let MxM = (m1,m2) => {
	if ( !(isMatrix(m1)) || !(isMatrix(m2)) ) return undefined;
	if (m1[0].length != m2.length) return undefined;
	let res = [];
	for (let i=0; i<m1.length; i++) {
		let row = [];
		for (let j=0; j<m2[0].length; j++) {
			let el = 0;
			for (let k=0; k<m1[0].length; k++) {
				el += m1[i][k]*m2[k][j];
			}
			row.push(el);
		}
		res.push(row);
	}
	return res;
}

// find coefficients of parabola if given three points
// ax^2 + bx + c = y. find a,b,c when given [x1,y1], [x2,y2], [x3,y3]
let parabolaOn3Points2d = (v1,v2,v3) => {
	let Ys = [[v1[1]],[v2[1]],[v3[1]]];
	let Xm = [
					[v1[0]**2,v1[0],1],
					[v2[0]**2,v2[0],1],
					[v3[0]**2,v3[0],1]
				];
	return MxM(invM(Xm),Ys);
}

// find cross product of two vectors (for vector with 3 elements), 
// v1 = [x1,y1,z1], v2 = [x2,y2,z2]
let cross = (v1,v2) => [det([[v1[1],v1[2]],[v2[1],v2[2]]]),
								-det([[v1[0],v1[2]],[v2[0],v2[2]]]),
								det([[v1[0],v1[1]],[v2[0],v2[1]]])
							  ];

// check if V is in form [x, y, z], where x, y and z are numbers
let isRowV = v => {
	if (!(v instanceof Array) || v.length == 0) return false;
	for (let i=0; i<v.length; i++) {
		if (typeof v[i] != "number") return false;
	}
	return true;
}

// check if V is in form [[x],[y],[z]], where x, y and z are numbers
let isColV = v => {
	if (!(v instanceof Array) || v.length == 0) return false;
	for (let i=0; i<v.length; i++) {
		if (!(v[i] instanceof Array) || v[i].length!=1) return false;
		if (typeof v[i][0] != "number") return false;
	}
	return true;
}

// change from [x, y, z] to [[x],[y],[z]]
let RtoC = v => {
	if (isRowV(v) == false) return undefined;
	let res = [];
	for (let i=0; i<v.length; i++) {
		res.push([v[i]]);
	}
	return res;
}

// change from [[x],[y],[z]] to [x, y, z]
let CtoR = v => {
	if (isColV(v) == false) return undefined;
	let res = [];
	for (let i=0; i<v.length; i++) {
		res.push(v[i][0]);
	}
	return res;
}

// diagonal of matrix 
let diagM = m => {
	if (!(isMatrix(m))) return undefined;
	let nn = (m.length <= m[0].length)?m.length:m[0].length;
	let res=[];
	for (let i=0; i<nn; i++) {
		res.push(m[i][i]);
	}
	return res;
}

// find first greatest element in matrix
let maxEl = m => {
	if (!(isMatrix(m))) return undefined;
	let res = m[0][0];
	for (let i=0; i<m.length; i++) {
		for (let j=0; j<m[i].length; j++) {
			res = (res<m[i][j])?m[i][j]:res;
		}
	}
	return res;
}

// find first smallest element in matrix
let minEl = m => {
	if (!(isMatrix(m))) return undefined;
	let res = m[0][0];
	for (let i=0; i<m.length; i++) {
		for (let j=0; j<m[i].length; j++) {
			res = (res>m[i][j])?m[i][j]:res;
		}
	}
	return res;
}

// shift by place two different rows of matrix
let shiftR = (m,r,c) => {
	if (!(isMatrix(m))) return undefined;
	if (r>m.length || c>m.length) return undefined;
	let res = [];
	for (let i=0; i<m.length; i++) {
		if (i==r) {
			res.push(m[c]);
		} else if (i==c) {
			res.push(m[r]);
		} else {
			res.push(m[i]);	  
		}
	}
	return res;
}

// create square identity matrix
let eyeSq = n => {
	let res = [];
	for (let i=0; i<n; i++) {
		let row = [];
		for (let j=0; j<n; j++) {
			if (i==j) {
				row.push(1);
			} else {
				row.push(0);
			}
		}
		res.push(row);
	}
	return res;
}

// create any identity matrix (not only square)
let eyeM = (r,c) => {
	let res = [];
	for (let i=0; i<r; i++) {
		let row = [];
		for (let j=0; j<c; j++) {
			if (i==j) {
				row.push(1);
			} else {
				row.push(0);
			}
		}
		res.push(row);
	}
	return res;
}

// create matrix with all elements equal to 1
let onesM = (r,c) => {
	let res = [];
	for (let i=0; i<r; i++) {
		let row = [];
		for (let j=0; j<c; j++) {
				row.push(1);
		}
		res.push(row);
	}
	return res;
}

// create matrix with all elements equal to 0
let zerosM = (r,c) => {
	let res = [];
	for (let i=0; i<r; i++) {
		let row = [];
		for (let j=0; j<c; j++) {
				row.push(0);
		}
		res.push(row);
	}
	return res;
}

// let's create some auxilary functions for matrix operations

// get matrix that shifts two rows by places
let E_rs = (r1,r2,nr,nc) => {
	// here NR and NC are the number of rows and columns of initial matrix
	// R1 and R2 are the ezact rows that will be changed by places.
	let ey = eyeSq(nr);
	for (let i=0; i<nr; i++) {
		for (let j=0; j<nr; j++) {
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
}

// the previous matrix changes two columns by places if transposed
// but you should check sizes of matrices, so they can be applied in matrix multiplication
let E_cs = (c1,c2,nr,nc) => {
	let ee = E_rs(c1,c2,nc,nc);
	return transpose(ee);
}

// let's find matrix that reduces lower rows to the form of [0, y, z]
// we will need it in RREF function (Row reduced echelon form)
// usually we take first row, if its first element is not equal to zero (so called Pivot elements in diagonal)
// before applying this function check pivot elements for zeros

// this function reduces one row only
let E_rd0 = (r,c,m) => {   // r > c
	//if (m[c][c] == 0) return eyeSq(m.length);
	if (m[r][c] != 0) {
		let res = eyeSq(m.length);
		res[r][c] = -1*m[r][c]/m[c][c];  // m[c][c] pivot point
		return res;	 
	} else {
		return eyeSq(m.length);
	}
	return undefined;
}

// this function uses function above to reduce all rows from R, including only columns that begin from C
let E_rd1 = (r,c,m) => {
	let res = eyeSq(m.length);
	let m2 = m.slice();
	if (m[c][c] == 0) {
		res = MxM(E_rc0(c,m2),res);
		m2 = MxM(res,m2);
	} 
	for (let i=r; i<m.length; i++) {
		res = MxM(E_rd0(i,c,m2),res);
	}
	return res;
}

// this function uses function above to get complete elimination matrix 
// that gives Upper matrix for M  :   E*M = U
let E_rd2 = m => {
	let res;
	for (let i=1; i<((m[0].length+1 > m.length)?(m.length):(m[0].length+1)); i++) {
		if (i==1) {
			res = E_rd1(i,i-1,m);
		} else { 
			res = MxM(E_rd1(i,
								 (  ((i-1)<=m[0].length)  ?  (i-1)  :  (m[0].length)  )
								 ,MxM(res,m)),res);
		}
	}
	return res;
}

// this function checks if all first elements of rows are equal to zero
// it begins from given indexes
let is00 = (r,c,m) => {
	for (let i=r; i<m.length; i++) {
		if (m[i][c]!=0) return false;
	}
	return true;
}

// this function gives matrix for single row exchange
// it is always square matrix with S rows
let R_ex = (r1,r2,s) => {
	let res = [];
	for (let i=0; i<s; i++) {
		let row = [];
		for (let j=0; j<s; j++) {
			if (i == r1 && j == r2) {
				row.push(1);
			} else if (i == r2 && j == r1) {
				row.push(1);
			} else if (i != r1 && i != r2 && i==j) {
				row.push(1);
			} else { 
				row.push(0); 
			}
		}
		res.push(row);
	}
	return res;
}

// this function gives matrix that changes rows by places, 
// so that pivot element is not equal to zero
let E_rc0 = (c,m) => {
	if (is00(c,c,m)) return eyeSq(m.length);
	let res = [];
	if (m[c][c]==0) {
		for (let i=c+1; i<m.length; i++) {
			if (m[i][c]!=0) {
				res = R_ex(c,i,m.length);
				break;
			}
		}
	}
	return (res.length!=0)?(res):(eyeSq(m.length));
}

// let's turn to zero numbers that are less then 10^-14
let tol14 = m => {
	for (let i=0; i<m.length; i++) {
		for (let j=0; j<m[i].length; j++) {
			if (Math.abs(m[i][j])<1e-13) m[i][j] = 0;	
		}
	}
	return m;
}

//Now we have tools to get LU decomposition of matrix
let LU = m => {
	let L = invM(E_rd2(m));
	let U = MxM(E_rd2(m),m);
	return [L,U];
}


/*--------------------------------------
	Additional functions for 3d vectors
*/

// projection of vector V on vector U
// let projVU = (v,u) => {
// 	return dot(v,u)/dot(u,u);
// }

// center of mass for path3d => [[1,1,1],[2,1,5],[3,2,5],...]
let cntr3d = path => {
	let sx = 0, sy = 0, sz = 0;
	for (let i=0; i<path.length; i++) {
		sx += path[i][0];
		sy += path[i][1];
		sz += path[i][2];
	}
	return [sx/path.length,sy/path.length,sz/path.length];
}

// center of mass for multipath3d => [path,path,path,...] where path is [[1,1,1],[2,1,5],[3,2,5],...]
let cntrMp3d = mp => {
	let centers = [];
	for (let i=0; i<mp.length; i++) {
		centers.push(cntr3d(mp[i]));
	}
	return cntr3d(centers);
} 

// shift all points of path by one vector
let shift3d = (pth,v) => {
	let path = copyPath(pth);
	for (let i=0; i<path.length; i++) {
		path[i] = sumV(path[i],v);
	}
	return path;
}

// shift all points of mpath by one vector
let shiftMp3d = (mpth,v) => {
	let mp = copyMpath(mpth);
	for (let i=0; i<mp.length; i++) {
		mp[i] = shift3d(mp[i],v);
	}
	return mp;
}

// scale all vectors of path
let scale3d = (pth,sv) => {
	// sv is scale vector [coefX,coefY,coefZ]
	let path = copyPath(pth);
	for (let i=0; i<path.length; i++) {
		path[i][0] *= sv[0];
		path[i][1] *= sv[1];
		path[i][2] *= sv[2];
	}
	return path;
}

// scale all vectors of mpath
let scaleMp3d = (mpth,sv) => {
	// sv is scale vector [coefX,coefY,coefZ]
	let mpath = copyMpath(mpth);
	for (let i=0; i<mpath.length; i++) {
		mpath[i] = scale3d(mpath[i],sv);
	}
	return mpath;
}

// to avoid referencing in arrays we have to copy arrays functionally
let copyV = v => {
	let nv = [...v];
	return nv;
}

// copy the path
let copyPath = path => {
	let npath = [];
	for (let i=0; i<path.length; i++) {
		npath[i] = copyV(path[i]);
	}
	return npath;
}

// copy the mpath
let copyMpath = mpath => {
	let nmpath = [];
	for (let i=0; i<mpath.length; i++) {
		nmpath[i] = copyPath(mpath[i]);
	}
	return nmpath;
}


////////////////////////////////////////////////////////////////////////

/*

		QUATERNIONS

*/

// multiplication of two quaternions
// quaternions are in the form of [a,b,c,d]

// basic check for quaternion
// is the number a quaternion 
let isQuat = v => {
	if (!(v instanceof Array) || v.length != 4) return false;
	for (let i=0; i<4; i++) {
		if (typeof v[i] != "number") return false;
	}
	return true;
}

// length or modulus of quaternion can be found with lenV function
// lenV([0.5, 0.5, 0.5, 0.5]) = 1

// conjugate of quaternion
let conjQ = q => {
	return  [q[0],-q[1],-q[2],-q[3]];
}

//we can use unitV function to find unit quaternion of 
//any other quaternion: unitV([1,1,1,1]) = [0.5, 0.5, 0.5, 0.5]

//find a,v form of quaternion, where a is real part and v is imaginary vector part
let av = q => {
	if (q.length == 4) {
		return 	[  q[0],  [ q[1], q[2], q[3] ]  ];
	} else if (q.length == 3) {
		return 	[  0,  [ q[0], q[1], q[2] ]  ];
	}
	
}

// multiplying quaternion by a real number can be 
// achieved with scaleV function
// scaleV([1,1,1,1],5) = [5, 5, 5, 5]

// multiplication of two quaternions q and p
let qxp = (q,p) => {
	let q1 = av(q), q2 = av(p);
	return 	[
					q1[0]*q2[0] - dot(q1[1],q2[1]),
					...sumVs(
								scaleV(q1[1],q2[0]),
								scaleV(q2[1],q1[0]),
								cross(q1[1],q2[1])
							)
				];
}

// Now we can rotate vector around any axis that is given by unit vector U

let vRot = (vv,uu,ang) => {
	let v = copyV(vv);
	let u = copyV(uu);
	u = unitV(u);
	ang /= 2;
	let rq = [ 	Math.cos(ang), 
				 	...scaleV(u, Math.sin(ang)) ];
	let res = qxp(qxp(rq,v),conjQ(rq));
	return av(res)[1];
}

// let's use rotation with quaternions to rotate path, where path is [[x1,x2,x3],[y1,y2,y3],[z1,z2,z3],...]
let rotPath = (pth,uu,ang) => {
	let path = copyPath(pth);
	let u = copyV(uu);
	let res = [];
	for (let i=0; i<path.length; i++) {
		res.push(vRot(path[i],u,ang));
	}
	return res;
}

// let's use rotation with quaternions to rotate mpath, where mpath is array of pathes.
let rotMp = (mpth,uu,ang) => {
	let mp = copyPath(mpth);
	let u = copyV(uu);
	let res = [];
	for (let i=0; i<mp.length; i++) {
		let path = [];
		for (let j=0; j<mp[i].length; j++) {
			path.push(vRot(mp[i][j],u,ang));
		}
		res.push(path);
	}
	return res;
}

//let's modify rotation with quaternions: instead of angle we will use cosine of angle
// we need it because sometimes it is easier to avoid arccosines.
//remember: cos(α) = cos^2(α/2) – sin^2(α/2) = 2cos^2(α/2) – 1 = 1 – 2sin^2(α/2)
//cos(α/2) = sqrt( (cos(α)+1)/2 )

let vRotCos = (vv,uu,cosA) => {
	let v = copyV(vv);
	let u = copyV(uu);
	u = unitV(u);
	let cosAby2 = Math.pow((cosA + 1)/2,1/2);
	let sinAby2 = Math.pow((1 - cosA)/2,1/2);
	let rq = [ 	cosAby2, 
				 	...scaleV(u, sinAby2) ];
	let res = qxp(qxp(rq,v),conjQ(rq));
	return av(res)[1];
}

// let's use this cosA rotation for pathes.
let rotPathC = (pth,uu,cosA) => {
	let path = copyPath(pth);
	let u = copyV(uu);
	let res = [];
	for (let i=0; i<path.length; i++) {
		res.push(vRotCos(path[i],u,cosA));
	}
	return res;
}

// let's use cosA rotation for mpathes.
let rotMpC = (mpth,uu,cosA) => {
	let mp = copyPath(mpth);
	let u = copyV(uu);
	let res = [];
	for (let i=0; i<mp.length; i++) {
		let path = [];
		for (let j=0; j<mp[i].length; j++) {
			path.push(vRotCos(mp[i][j],u,cosA));
		}
		res.push(path);
	}
	return res;
}