class ThreeMap{
    constructor(set) {
        this.set = set;
        this.geoJson = set.mapData;
        this.init();

        // this.mapData = set.mapData;
        // this.color = '#006de0';
        // this.init();
    }
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 1000);
        this.setCamera({ x: 100, y: 0, z: 100 });
        this.setLight();
        this.setRender();

        this.setHelper();
        this.drawMap();
        this.setControl();
        this.animate();
       
        // this.setLight();
        // this.setRender();
    
        // this.setHelper();
    
        // this.drawMap();
    
        // this.setControl();
        // this.animate();
    
        // document.body.addEventListener('click', this.mouseEvent.bind(this));
    }
    setCamera(set) {
        const { x, y, z } = set;
        this.camera.up.x = 0;
        this.camera.up.y = 0;
        this.camera.up.z = 1;
        this.camera.position.set(x, y, z);
        this.camera.lookAt(0, 0, 0);
    }
    setLight() {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.scene.add(directionalLight);
    }
    setHelper() {
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
    }
    setRender() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
    
        // required if controls.enableDamping or controls.autoRotate are set to true
        // this.controls.update();
    
        this.renderer.render(this.scene, this.camera);
    
        // this.doAnimate && this.doAnimate.bind(this)();
    }
    setControl() {
        this.controls = new THREE.OrbitControls(this.camera);
        // this.scene.add(this.controls)
        this.controls.update();
    }
    drawMap() {
        console.log(this.mapData);
        this.geoJson.features.forEach((data,i)=>{
            const areas = data.geometry.coordinates[0];
            const areasData = {
                ...data.properties,
                coordinates:[]
            };
            
            areas.forEach(point=>{
                if(point[0] instanceof Number){
                    areasData.coordinates.push(this.lnglatToMector(point))
                }else{
                    areasData.coordinates[i] = [];
                    point.forEach(pointInner=>{
                        areasData.coordinates[i].push(this.lnglatToMector(pointInner))
                    })
                }
                // areasData.coordinates[0]
                // this.lnglatToMector(point);
                this.vector3json.push(areasData)
            });
          
        })



        // if (!this.geoJson) {
        //   console.error('this.geoJson 数据不能是null');
        //   return;
        // }
        // // 把经纬度转换成x,y,z 坐标
        // this.geoJson.features.forEach(d => {
        //   d.vector3 = [];
        //   d.geometry.coordinates.forEach((coordinates, i) => {
        //     d.vector3[i] = [];
        //     coordinates.forEach((c, j) => {
        //       if (c[0] instanceof Array) {
        //         d.vector3[i][j] = [];
        //         c.forEach(cinner => {
        //           let cp = this.lnglatToMector(cinner);
        //           d.vector3[i][j].push(cp);
        //         });
        //       } else {
        //         let cp = this.lnglatToMector(c);
        //         d.vector3[i].push(cp);
        //       }
        //     });
        //   });
        // });
    
        // console.log(this.mapData);
    
        // // 绘制地图模型
        // const group = new THREE.Group();
        // const lineGroup = new THREE.Group();
        // this.mapData.features.forEach(d => {
        //   const g = new THREE.Group(); // 用于存放每个地图模块。||省份
        //   g.data = d;
        //   d.vector3.forEach(points => {
        //     // 多个面
        //     if (points[0][0] instanceof Array) {
        //       points.forEach(p => {
        //         const mesh = this.drawModel(p);
        //         const lineMesh = this.drawLine(p);
        //         lineGroup.add(lineMesh);
        //         g.add(mesh);
        //       });
        //     } else {
        //       // 单个面
        //       const mesh = this.drawModel(points);
        //       const lineMesh = this.drawLine(points);
        //       lineGroup.add(lineMesh);
        //       g.add(mesh);
        //     }
        //   });
        //   group.add(g);
        // });
        // this.group = group; // 丢到全局去
        // const lineGroupBottom = lineGroup.clone();
        // lineGroupBottom.position.z = -2;
        // this.scene.add(lineGroup);
        // this.scene.add(lineGroupBottom);
        // this.scene.add(group);
    }
    /**
   * @desc 经纬度转换成墨卡托投影
   * @param {array} 传入经纬度
   * @return array [x,y,z]
   */
    lnglatToMector(lnglat){
        if(!this.projection){
            this.projection =d3.geoMercator().center([108.904496, 32.668849]).scale(80).rotate(Math.PI / 4).translate([0, 0]);
            
        }
        // const [y,x]=lnglat;
        const [x,y]= projection([...lnglat]);
        z= 0;
        return [x,y,z];
    }
}