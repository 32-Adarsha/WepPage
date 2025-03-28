import {AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {GtlfloaderService} from "../../service/gtlfloader.service";
import {OrbitControls} from "three-stdlib";
import {TileServiceService} from "../../service/tile-service.service";
import {StatComponent} from '../../rComponent/stat/stat.component';
import {Router} from '@angular/router';
import {TicTacToeComponent} from '../../tiles/tic-tac-toe/tic-tac-toe.component';

enum sOption {
  Profile,
  Contact,
  Experience,
  Other,
}


@Component({
  selector: 'app-profile',
  imports: [
    StatComponent,

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements AfterViewInit , OnDestroy {


  models = ['./model/gTest.glb' , './model/pModel.glb' , './model/profile_d.glb' ]
  scrolledDown = 0
  mdlIdx = 0

  loaded = false
  newLoaded = true
  selected :sOption = sOption.Profile


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
  route = inject(Router);
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



  getFontSize(){
    if(window.innerWidth < 768){
      this.fontSize =  12;
    } else {
      this.fontSize =  20;
    }
  }



  protected readonly sOption = sOption;



  changeScreenOption(opt:sOption , down:number , elm:HTMLElement ) {
    this.selected = opt
    elm.scrollBy(0 , (down - this.scrolledDown)*window.innerHeight)

    this.scrolledDown = down;

  }



  protected readonly window = window;



  setScrollDown(elm: HTMLDivElement) {
    this.scrolledDown = Math.round(elm.scrollTop / elm.clientHeight)
  }


  protected readonly TicTacToeComponent = TicTacToeComponent;
}
