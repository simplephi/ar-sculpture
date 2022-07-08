import { Loader, LoadingManager, RawShaderMaterial, ShaderMaterialParameters, Object3D } from 'three';
import { GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';

declare class TiltShaderLoader extends Loader {
    constructor(manager: LoadingManager);
    load(brushName: string, onLoad: (response: RawShaderMaterial) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): Promise<void>;
    parse(rawMaterial: RawShaderMaterial): RawShaderMaterial;
    lookupMaterial(nameOrGuid: string): ShaderMaterialParameters;
    lookupMaterialName(nameOrGuid: string): string;
}

declare class GLTFGoogleTiltBrushMaterialExtension implements GLTFLoaderPlugin {
    constructor(parser: GLTFParser, brushPath: string);
    beforeRoot(): Promise<void> | null;
    afterRoot(glTF: Object): Promise<void> | null;
    replaceMaterial(mesh: Object3D, guid: string): void;
}

export { GLTFGoogleTiltBrushMaterialExtension, TiltShaderLoader };
