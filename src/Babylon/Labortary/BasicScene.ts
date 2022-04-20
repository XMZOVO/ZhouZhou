import {
  ArcRotateCamera,
  Animation,
  AxesViewer,
  Color3,
  Color4,
  CubeTexture,
  Engine,
  MergeMeshesOptimization,
  Scene,
  SceneLoader,
  Vector3,
  AbstractMesh,
  CubicEase,
  EasingFunction,
  Mesh,
  PointLight,
  LightGizmo,
  Light,
  GizmoManager,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class BasicScene {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  camera1: ArcRotateCamera;

  meshes: AbstractMesh[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.CreateScene();
    this.CreateModel();
    this.CreateCamera();
    this.CreateLight();

    this.engine.runRenderLoop(() => {
      this.scene.render();
      //   console.log(this.camera1.position);
    });

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }

  CreateScene() {
    this.engine = new Engine(this.canvas, true, { adaptToDeviceRatio: true });
    this.engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    this.scene = new Scene(this.engine);
    // new AxesViewer(this.scene, 3)

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "environment/harbor.env",
      this.scene
    );
    envTex.gammaSpace = false;
    this.scene.environmentTexture = envTex;
    // this.scene.createDefaultSkybox(envTex, true, 1000, 0.25);
    this.scene.environmentIntensity = 0.2;

    this.scene.clearColor = new Color4(0, 0, 0, 1);

    // new AxesViewer(this.scene, 10)
  }

  async CreateModel() {
    const detector = await SceneLoader.ImportMeshAsync(
      "",
      "model/Lab/",
      "SCENE.gltf",
      this.scene
    );
    // this.scene.createDefaultLight(true);
  }

  CreateCamera() {
    this.camera1 = new ArcRotateCamera(
      "camera1",
      0,
      Math.PI / 2,
      4,
      new Vector3(2.5, -1, -3),
      this.scene
    );

    if (window.innerHeight / window.innerWidth > 1.76) {
      this.camera1.radius = 7;
    }

    this.camera1.position = new Vector3(-1, 2.81, 1);

    this.camera1.attachControl();
    this.camera1.minZ = 0;
    this.camera1.wheelPrecision = 10;
    // this.camera1.wheelDeltaPercentage = 0.1;
  }

  CreateLight(): void {
    const pointLight = new PointLight(
      "pointLight",
      new Vector3(1.5, 1.8, -1.5),
      this.scene
    );

    // pointLight.diffuse = new Color3(0, 1, 1);
    pointLight.intensity = 5;
    pointLight.radius = 10;

    const pointLight2 = new PointLight(
      "pointLight2",
      new Vector3(-1.2, 0.8, -1.5),
      this.scene
    );

    pointLight2.diffuse = new Color3(1, 165 / 255, 0);
    pointLight2.intensity = 5;
    pointLight2.range = 0.2;

    // this.CreateGizmos(pointLight);
    // this.CreateGizmos(pointLight2);
  }

  CreateGizmos(customLight: Light): void {
    const lightGizmo = new LightGizmo();
    lightGizmo.scaleRatio = 2;
    lightGizmo.light = customLight;

    const gizmoManager = new GizmoManager(this.scene);
    gizmoManager.positionGizmoEnabled = true;
    gizmoManager.rotationGizmoEnabled = true;
    gizmoManager.usePointerToAttachGizmos = false;
    gizmoManager.attachToMesh(lightGizmo.attachedMesh);
  }
}
