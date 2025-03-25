import {AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {GtlfloaderService} from "../../service/gtlfloader.service";
import {OrbitControls} from "three-stdlib";
import {TileServiceService} from "../../service/tile-service.service";
import {StatComponent} from '../../rComponent/stat/stat.component';


enum sOption {
  Profile,
  Contact,
  Experience,
  Other,
}


@Component({
  selector: 'app-profile',
  imports: [
    StatComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements AfterViewInit , OnDestroy {
  models = ['./model/gTest.glb' , './model/pModel.glb' , './model/profile_d.glb' ]
  scrolledDown = 0
  mdlIdx = 0
  newPaper: any;
  loaded = false
  newLoaded = true
  selected :sOption = sOption.Profile
  myInfo = {
    "32" : "32 is more than just a number; it symbolizes my journey. It was the identity I received when I first entered school, marking a new chapter in my life. It reflects who I am, rooted in my original identity, 9032 D, and serves as a reminder of my past and the distance I've traveled.",
    "info": "👋 Hi , I’m Adarsha. I recently graduated from Missouri State University, and I am actively seeking a software engineering role. I have a strong passion for problem-solving and enjoy tackling complex challenges with innovative solutions.",
    "nepal":"The flag of Nepal on top of my cap is my identity.It's who I am and where I come from. I carry immense pride for my country. The cap, adorned with the logo of the Nepalese flag, symbolizes my deep connection to my roots, my unwavering loyalty to my heritage, and the strength that comes from my people.",
    "football":"That shoe is no mere shoe. It is the embodiment of my unshakable passion for football. It has been an inseparable part of me since childhood, molding me into the person I am today. My devotion to the sport is profound, and over the years, I’ve gathered a collection of memories—each one a cherished reflection of the bond I’ve forged with the game. "
  }
  content = this.myInfo['info']
  fontSize:number = 30
  scrollCount = 0


  private originalRotationX = 0;
  private originalRotationY = 0;
  private originalRotationZ = 0;
  touchStartX = 0
  touchMoveX = 0

  @ViewChild('rendererCanvas') canvasRef!: ElementRef;
  private scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private model!: THREE.Group;
  tileService = inject(TileServiceService);
  constructor(private gltfLoader: GtlfloaderService) {
    window.addEventListener('resize', () => {this.onWindowResize()})
    window.addEventListener('touchstart', (event) => {
      this.touchStartX = event.changedTouches[0].screenX;
    })
    window.addEventListener('touchmove', (event) => {
      this.touchMoveX = event.changedTouches[0].screenX;
      this.handleSwipe()
    })


    this.getFontSize()
  }

  getCanvasWidth():number{
    if(window.innerWidth < 641){

      return window.innerWidth;
    }
    else if(window.innerWidth < 1025){

      return 0.4 * window.innerWidth;
    }
    else{
      return 0.4 * window.innerWidth;
    }
  }


  handleSwipe() {
    let rotate = -10
    if (this.touchMoveX - this.touchStartX < 0){
      rotate = 10
    }

    if (Math.abs(this.touchMoveX - this.touchStartX) > 5) {
      this.model.rotation.y += rotate * 0.6;
      this.touchStartX = this.touchMoveX
    }
  }

  async ngAfterViewInit() {
    this.setupRenderer();
    this.setupCamera();
    this.setupLights();

    this.loadModel('./model/gTest.glb')
      .then(() => {
        this.loaded = true;
      })
      .catch((error) => {
        console.error("Error loading model:", error);
      })
      .finally(() => {

      });
    this.setupControls();
    this.animate();
 }


 protected async newModelLoaded(path:string , idx:number) {
    this.newLoaded = false
   this.mdlIdx = idx;
    this.loadModel(path).then(
      () => {
        this.newLoaded = true
      }
    );
 }







  private setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true
    });

    this.renderer.setSize(this.getCanvasWidth(), this.tileService.state().heightScreen);
  }

  private setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
        75,
        this.getCanvasWidth()/ this.tileService.state().heightScreen,
        0.1,
        1000
    );
    this.camera.position.z = -10;
    this.camera.position.y = 2;


  }

  private setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
    this.scene.add(new THREE.AmbientLight(0x404040)); // Base light
    this.scene.add(new THREE.DirectionalLight(0xffffff, 29)); // Main light
    this.scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1));
  }

  protected async loadModel(path: string) {

    const gltf = await this.gltfLoader.loadModel(path);
    let newModel = gltf.scene;
    newModel.position.y =0.6;
    newModel.position.z = -8.3;
    newModel.position.x = 0;
    this.originalRotationX = newModel.rotation.x;
    this.originalRotationY = newModel.rotation.y;
    this.originalRotationZ = newModel.rotation.z;
    newModel.rotation.y = 10;
    this.scene.add(newModel);
    if(this.loaded){
      this.scene.remove(this.model)
    }
    this.model = newModel;

  }



  private setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enableRotate = false;
    this.controls.enablePan = false;
    this.controls.mouseButtons = {
      LEFT: undefined,
      RIGHT: undefined,
      MIDDLE: undefined
    };

    window.addEventListener('wheel', (e) => this.handleWheel(e));


    if (this.controls) {
      this.controls.enableZoom = false;
    }
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }



  public handleWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    this.scrollCount += delta*10
    if (this.scrollCount < 0){
      this.scrollCount = 0
    }

    this.model.rotation.y += delta * 0.3;

  }

  ngOnDestroy(): void {
    window.removeEventListener('wheel', (e) => this.handleWheel(e));
    window.removeEventListener('resize', () => {this.onWindowResize()})
  }


  onWindowResize() {
    this.camera.aspect = this.getCanvasWidth()/ window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.getCanvasWidth(), window.innerHeight);
    this.getFontSize()
  }

  resetRotation() {
    this.model.rotation.set(
        this.originalRotationX,
        this.originalRotationY - 0.4,
        this.originalRotationZ
    );
  }

  getFontSize(){
    if(window.innerWidth < 768){
      this.fontSize =  12;
    } else {
      this.fontSize =  20;
    }
  }

  addDrawAnimation(elem: HTMLElement) {
    elem.classList.add('drawAnimation');
  }

  protected readonly sOption = sOption;

  isSelected(opt: sOption , color:string) {
    return this.selected == opt ? this.getBgColor(opt) : 'bg-transparent';
  }

  changeScreenOption(opt:sOption , down:number , elm:HTMLElement ) {
    this.selected = opt
    elm.scrollBy(0 , (down - this.scrolledDown)*window.innerHeight)

    this.scrolledDown = down;

  }

  getBgColor(opt:sOption) {
    switch (opt){
      case sOption.Experience:
        return 'bg-amber-400';
      case sOption.Profile:
        return 'bg-purple-400';
      case sOption.Contact:
        return 'bg-orange-400';
      case sOption.Other:
        return 'bg-emerald-400';
      default:
        return 'bg-transparent';
    }
  }


  protected readonly console = console;
  protected readonly window = window;
  protected readonly Math = Math;


  setScrollDown(elm: HTMLDivElement) {
    this.scrolledDown = Math.round(elm.scrollTop / elm.clientHeight)
  }
}
