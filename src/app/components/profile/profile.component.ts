import {AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {GtlfloaderService} from "../../service/gtlfloader.service";
import {OrbitControls} from "three-stdlib";
import {screenSize, TileServiceService} from "../../service/tile-service.service";


@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements AfterViewInit , OnDestroy {

  myInfo = {
    "32" : "32 is more than just a number to me; it’s a symbol of my journey. It was the identity given to me when I first walked through the doors of my school, a new chapter in my life. This number carries the essence of who I am, a direct reflection of my original identity, 9032 D. It’s a reminder of where I’ve been and how far I’ve come, holding memories and emotions that are deeply intertwined with my personal story.",
    "info": "Hi, I’m Adarsha Kiran Khadka. I grew up beneath the towering mountains, where the natural world shaped my love for hiking and trekking. These outdoor adventures fuel my spirit and drive my passion for exploration. I also have a deep love for sports, always seeking new challenges and ways to stay active.",
    "nepal":"I come from Nepal, a land where the majestic Himalayas stand tall, guarding the heart of a proud and timeless culture. Born in its embrace, I carry its spirit with me, now and always. Nepal’s rich food culture, its warmth, and its traditions are woven into the fabric of who I am. They will remain a part of me, guiding and inspiring me throughout my life.",
    "football":"Football is more than just a game to me—it’s a passion that has shaped who I am. Through every match, I’ve learned the power of teamwork, discipline, and resilience. The sport has taught me to push my limits and never give up, while giving me a sense of purpose and belonging. "
  }
  content = this.myInfo['info']
  fontSize:number = 30

  changeContent(newContent:string) {
    this.content = newContent
    this.resetRotation()
  }
  private originalRotationX = 0;
  private originalRotationY = 0;
  private originalRotationZ = 0;


  @ViewChild('rendererCanvas') canvasRef!: ElementRef;
  private scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private model!: THREE.Group;
  tileService = inject(TileServiceService);
  constructor(private gltfLoader: GtlfloaderService) {
    window.addEventListener('resize', () => {this.onWindowResize()})
    this.getFontSize()
  }

  async ngAfterViewInit() {
    this.setupRenderer();
    this.setupCamera();
    this.setupLights();
    await this.loadModel();
    this.setupControls();
    this.animate();
  }

  private setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true
    });

    this.renderer.setSize(this.tileService.state().widthScreen, this.tileService.state().heightScreen);
  }

  private setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
        75,
        this.tileService.state().widthScreen / this.tileService.state().heightScreen,
        0.1,
        1000
    );
    this.camera.position.z = 10;

  }

  private setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
    this.scene.add(new THREE.AmbientLight(0x404040)); // Base light
    this.scene.add(new THREE.DirectionalLight(0xffffff, 0.5)); // Main light
    this.scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.2));
  }

  private async loadModel() {
    const gltf = await this.gltfLoader.loadModel('./model/profile_d.glb');
    this.model = gltf.scene;
    this.model.position.z = 7.5;
    this.model.position.y = -1;
    this.model.position.x = 0;
    this.originalRotationX = this.model.rotation.x;
    this.originalRotationY = this.model.rotation.y;
    this.originalRotationZ = this.model.rotation.z;
    this.scene.add(this.model);
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


    this.model.rotation.y += delta * 0.6;

  }

  ngOnDestroy(): void {
    window.removeEventListener('wheel', (e) => this.handleWheel(e));
    window.removeEventListener('resize', () => {this.onWindowResize()})
  }


  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
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
}
