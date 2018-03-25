


// single projection of one vector
let proj1 = (v1,nn,ey) => {
	let l1 = lenV(nn) - dot(v1,nn)/lenV(nn,nn),
		l2 = lenV(ey) + l1,
		kk = l1/l2;
	return sumV(scaleV(subV(sumV(nn,ey),v1),kk),v1);
}

// projection of vectors in path
let projPath = (path,nn,ey) => {
	let res = [];
	for (let i=0; i<path.length; i++) {
		res.push(proj1(path[i],nn,ey));
	}
	return res;
}

// projection of vectors in mpath
let projMPath = (mp,nn,ey) => {
	let res = [];
	for (let i=0; i<mp.length; i++) {
		res.push(projPath(mp[i],nn,ey));
	}
	return res;
}

// turning projection plane up, i.e. making it lay on XY-plane
// cosA = Nz / |N|

let projToZ = (pl,nn) => {
	pl = shiftMp3d(pl,scaleV(nn,-1));
	let ro = cross(nn,[0,0,1]);
	let cosA = nn[2] / lenV(nn);
	return rotMpC(pl,ro,cosA);
}

// The last step is to rotate plane around Z axis so that it will be fixed to XY plane (screen does not rotate)

let projFixXY = (pl,nn) => {
	let cosB = 0;
	if (nn[0]>=0 && nn[1]>=0) {
		cosB = nn[1] / lenV([nn[0],nn[1],0]);
		return rotMpC(pl,[0,0,1],cosB);
	} else if (nn[0]<0 && nn[1]>=0) { 
		cosB = nn[1] / lenV([nn[0],nn[1],0]);
		return rotMpC(pl,[0,0,-1],cosB);
	} else if (nn[0]<0 && nn[1]<0) { 
		cosB = nn[1] / lenV([nn[0],nn[1],0]);
		return rotMpC(pl,[0,0,-1],cosB);
	} else if (nn[0]>=0 && nn[1]<0) { 
		cosB = nn[1] / lenV([nn[0],nn[1],0]);
		return rotMpC(pl,[0,0,1],cosB);
	}
}

// now we have to remove 3rd element in each vector of plane
// then we can plot it in canvas
let mpath3dto2d = mp3d => {
	for (let i=0; i<mp3d.length; i++) {
		for (let j=0; j<mp3d[i].length; j++) {
			let ch = mp3d[i][j];
			mp3d[i][j] = [ch[0],ch[1]];
		}
	}
	return mp3d;
}

//----------------------------------------//
//            test animation              //
//----------------------------------------//

let obj = [ // cube
				[[-100,100,100],[100,100,100]],
				[[100,100,100],[100,-100,100]],
				[[100,-100,100],[-100,-100,100]],
				[[-100,-100,100],[-100,100,100]],
				[[-100,100,-100],[100,100,-100]],
				[[100,100,-100],[100,-100,-100]],
				[[100,-100,-100],[-100,-100,-100]],
				[[-100,-100,-100],[-100,100,-100]],
				[[-100,100,100],[-100,100,-100]],
				[[100,100,100],[100,100,-100]],
				[[100,-100,100],[100,-100,-100]],
				[[-100,-100,100],[-100,-100,-100]]
			]; 
let obj2 = [  // pyramid
				[[0,0,200],[200,200,-200]],
				[[0,0,200],[200,-200,-200]],
				[[0,0,200],[-200,-200,-200]],
				[[0,0,200],[-200,200,-200]],
				[[-200,-200,-200],[-200,200,-200]],
				[[200,-200,-200],[-200,-200,-200]],
				[[200,200,-200],[200,-200,-200]],
				[[-200,200,-200],[200,200,-200]],
			];
let obj3 = scaleMp3d(obj2,[0.3,0.3,0.3]);
let obj4 = [...obj2, ...shiftMp3d(obj3,[700,-50,-150])];
let obj5 = shiftMp3d(obj4,[-400,50,50]);

let cc1 = new CnvMaker();
cc1.init(".block-1",500,400);
let rad = 800;
let da = 0.01;
$anim(function () {
	let nrm = [rad*cos(da),rad*sin(da),200];
	// nrm is normal vector of a plane on which we are 
	// projecting obj
	// eyeV is vector which we add to nrm to get the position of eye.
	let eyeV = [...scaleV(unitV(nrm),300)];
	let pl = projMPath(obj5,nrm,eyeV);
	let plZ = projToZ(pl,nrm);
	let plXY = projFixXY(plZ,nrm);
	cc1.cls();
	cc1.text("Camera is rotating around two pyramids",80,50,"arial",18,"black")
	cc1.mpath(mPathTransl(mpath3dto2d(plXY),[250,200]),"red",3);
	da = da + 0.01;
}, 50,20);

// another test: camera moves along fixed line
// camera is looking to the center
let obj6 = [ // this is path
	[200,0,200],
	[-200,0,200],
	[-200,0,-200],
	[200,0,-200],
	[200,0,200]
];

let obj7 = [
			[[-300,-300,-200],[-300,300,-200],[300,300,-200],[300,-300,-200]],
			shift3d(obj6,[0,-200,0]),
		   	shift3d(obj6,[0,-150,0]),
			shift3d(obj6,[0,-100,0]),
			shift3d(obj6,[0,-50,0]),
			obj6
		   ];

let cc2 = new CnvMaker();
cc2.init(".block-2",500,400);
let dx = 7;
let nrm2 = [-1200,280,0];
$anim(function () {
	nrm2[0] = nrm2[0]+dx;
	let eyeV = [...scaleV(unitV(nrm2),300)];
	let pl = projMPath(obj7,nrm2,eyeV);
	let plZ = projToZ(pl,nrm2);
	let plXY = projFixXY(plZ,nrm2);
	cc2.cls();
	cc2.text("Camera is moving along straight line",80,50,"arial",18,"black")
	cc2.mpoly(mPathTransl(mpath3dto2d(plXY),[250,200]),"green","yellow",3);
	if (nrm2[0]>1200) {
		dx = -1*dx;
	} else if (nrm2[0]<-1200) {
		dx = -1*dx;   
	}
}, 50,20);


// test3: rotating object moves along straight line infront of camera
let obj8 = copyMpath(obj);

let cc3 = new CnvMaker();
cc3.init(".block-3",500,400);
let da2 = 0.05, dx2 = 5;
let nrm3 = [0,550,300];
let posit = [-600,0,0];
$anim(function () {
	posit[0] = posit[0] + dx2;
	obj8 = rotMp(obj8,[1,0,0],da2);
	let objT = shiftMp3d(obj8,posit);
	let eyeV = [...scaleV(unitV(nrm3),300)];
	let pl = projMPath(objT,nrm3,eyeV);
	let plZ = projToZ(pl,nrm3);
	let plXY = projFixXY(plZ,nrm3);
	cc3.cls();
	cc3.text("Rotating object is moving along straight line",50,50,"arial",18,"black");
	cc3.text("in front of camera",50,80,"arial",18,"black");
	cc3.mpath(mPathTransl(mpath3dto2d(plXY),[250,200]),"blue",3);
	if (posit[0]>600) {
		dx2 = -1*dx2;
	} else if (posit[0]<-600) {
		dx2 = -1*dx2;   
	}
}, 50,20);


// let's create some mpathes
// first we will define points, then we will join them with lines
let points = [[200,200,200],[-200,200,200],[-200,-200,200],[200,-200,200],
			  [200,200,-200],[-200,200,-200],[-200,-200,-200],[200,-200,-200]];

let mpath1 = []
for (let i=0; i<points.length-1; i++) {
	for (let j=i+1; j<points.length; j++) {
		mpath1.push([[...points[i]],[...points[j]]]);
	}
}


let cc4 = new CnvMaker();
cc4.init(".block-4",500,400);
let nrm4 = [0,550,260];
let eyeV2 = [...scaleV(unitV(nrm4),300)];
let ang = 0;
$anim(function () {
	mpath1 = rotMp(mpath1,[sin(ang),0,cos(ang)],0.03);
	let pl = projMPath(mpath1,nrm4,eyeV2);
	let plZ = projToZ(pl,nrm4);
	let plXY = projFixXY(plZ,nrm4);
	cc4.cls();
	cc4.text("Rotating object around Z-axis",50,50,"arial",18,"black");
	cc4.mpath(mPathTransl(mpath3dto2d(plXY),[250,200]),"purple",3);
	ang = ang + 0.003;
}, 50,20);
