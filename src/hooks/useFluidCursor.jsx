// src/hooks/useFluidCursor.js
import { useEffect, useRef } from 'react';

const useFluidCursor = (config = {}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ----- Default configuration -----
    const options = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1440,
      DENSITY_DISSIPATION: 3.5,
      VELOCITY_DISSIPATION: 2,
      PRESSURE: 0.1,
      PRESSURE_ITERATIONS: 20,
      CURL: 3,
      SPLAT_RADIUS: 0.2,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLOR_UPDATE_SPEED: 10,
      TRANSPARENT: true,
      ...config,
    };

    // ----- Helper functions (no gl dependency) -----
    const getSupportedFormat = (gl, internalFormat, format, type) => {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        if (internalFormat === gl.R16F) return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
        if (internalFormat === gl.RG16F) return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
        return null;
      }
      return { internalFormat, format };
    };

    const supportRenderTextureFormat = (gl, internalFormat, format, type) => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    };

    const compileShader = (gl, type, source, keywords) => {
      let finalSource = source;
      if (keywords) {
        let kwString = '';
        keywords.forEach(kw => { kwString += '#define ' + kw + '\n'; });
        finalSource = kwString + source;
      }
      const shader = gl.createShader(type);
      gl.shaderSource(shader, finalSource);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(shader));
      return shader;
    };

    const createProgram = (gl, vertexShader, fragmentShader) => {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(program));
      return program;
    };

    const getUniforms = (gl, program) => {
      const uniforms = {};
      const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const name = gl.getActiveUniform(program, i).name;
        uniforms[name] = gl.getUniformLocation(program, name);
      }
      return uniforms;
    };

    class Program {
      constructor(gl, vertexShader, fragmentShader) {
        this.program = createProgram(gl, vertexShader, fragmentShader);
        this.uniforms = getUniforms(gl, this.program);
      }
      bind(gl) { gl.useProgram(this.program); }
    }

    class Material {
      constructor(gl, vertexShader, fragmentShaderSource) {
        this.gl = gl;
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = {};
        this.activeProgram = null;
        this.uniforms = {};
      }
      setKeywords(keywords) {
        const gl = this.gl;
        let hash = keywords.join(',');
        if (this.programs[hash]) {
          this.activeProgram = this.programs[hash];
        } else {
          const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
          const program = createProgram(gl, this.vertexShader, fragmentShader);
          this.programs[hash] = program;
          this.activeProgram = program;
        }
        this.uniforms = getUniforms(gl, this.activeProgram);
      }
      bind() { this.gl.useProgram(this.activeProgram); }
    }

    // ----- Get WebGL context -----
    const getWebGLContext = (canvas) => {
      const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
      let gl = canvas.getContext('webgl2', params);
      const isWebGL2 = !!gl;
      if (!isWebGL2) gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
      let halfFloat;
      let supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
      let formatRGBA, formatRG, formatR;
      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }
      return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    };

    const { gl, ext } = getWebGLContext(canvas);
    if (!ext.supportLinearFiltering) {
      options.DYE_RESOLUTION = 256;
      options.SHADING = false;
    }

    // ----- Shader sources (gl is now available) -----
    const baseVertexShaderSource = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, baseVertexShaderSource, null);

    const copyShaderSource = `precision mediump float; varying vec2 vUv; uniform sampler2D uTexture; void main() { gl_FragColor = texture2D(uTexture, vUv); }`;
    const clearShaderSource = `precision mediump float; varying vec2 vUv; uniform sampler2D uTexture; uniform float value; void main() { gl_FragColor = value * texture2D(uTexture, vUv); }`;
    const splatShaderSource = `
      precision highp float;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      varying vec2 vUv;
      void main() {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p,p)/radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `;
    const advectionShaderSource = `
      precision highp float;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      varying vec2 vUv;
      void main() {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
      }
    `;
    const divergenceShaderSource = `
      precision mediump float;
      uniform sampler2D uVelocity;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      void main() {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;
    const curlShaderSource = `
      precision mediump float;
      uniform sampler2D uVelocity;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      void main() {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vort = R - L - T + B;
        gl_FragColor = vec4(0.5 * vort, 0.0, 0.0, 1.0);
      }
    `;
    const vorticityShaderSource = `
      precision highp float;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      void main() {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T)-abs(B), abs(R)-abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 vel = texture2D(uVelocity, vUv).xy + force * dt;
        gl_FragColor = vec4(vel, 0.0, 1.0);
      }
    `;
    const pressureShaderSource = `
      precision mediump float;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      void main() {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float div = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - div) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;
    const gradientSubtractShaderSource = `
      precision mediump float;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      void main() {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 vel = texture2D(uVelocity, vUv).xy - vec2(R - L, T - B);
        gl_FragColor = vec4(vel, 0.0, 1.0);
      }
    `;
    const displayShaderSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      #ifdef SHADING
      varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform vec2 texelSize;
      #endif
      void main() {
        vec3 c = texture2D(uTexture, vUv).rgb;
        #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;
        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);
        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);
        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
        #endif
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
      }
    `;

    const copyProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, copyShaderSource, null));
    const clearProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, clearShaderSource, null));
    const splatProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, splatShaderSource, null));
    const advectionProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, advectionShaderSource, null));
    const divergenceProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, divergenceShaderSource, null));
    const curlProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, curlShaderSource, null));
    const vorticityProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, vorticityShaderSource, null));
    const pressureProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, pressureShaderSource, null));
    const gradienSubtractProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, gradientSubtractShaderSource, null));
    const displayMaterial = new Material(gl, vertexShader, displayShaderSource);

    // ----- Geometry setup -----
    const vertices = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
    const indices = new Uint16Array([0,1,2, 0,2,3]);
    const vertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const idxBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    const blit = (target, clear = false) => {
      if (!target) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (clear) {
        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };

    // ----- FBO helpers -----
    const createFBO = (w, h, internalFormat, format, type, param) => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0,0,w,h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return { texture, fbo, width:w, height:h, texelSizeX:1/w, texelSizeY:1/h, attach(id){ gl.activeTexture(gl.TEXTURE0+id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; } };
    };
    const createDoubleFBO = (w,h,internalFormat,format,type,param) => {
      const fbo1 = createFBO(w,h,internalFormat,format,type,param);
      const fbo2 = createFBO(w,h,internalFormat,format,type,param);
      return { width:w, height:h, texelSizeX:fbo1.texelSizeX, texelSizeY:fbo1.texelSizeY, read:fbo1, write:fbo2, swap(){ const tmp=this.read; this.read=this.write; this.write=tmp; } };
    };
    const resizeFBO = (target, w, h, internalFormat, format, type, param) => {
      const newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind(gl);
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO);
      return newFBO;
    };
    const resizeDoubleFBO = (target, w, h, internalFormat, format, type, param) => {
      if (target.width===w && target.height===h) return target;
      target.read = resizeFBO(target.read,w,h,internalFormat,format,type,param);
      target.write = createFBO(w,h,internalFormat,format,type,param);
      target.width = w; target.height = h;
      target.texelSizeX = 1/w; target.texelSizeY = 1/h;
      return target;
    };
    const getResolution = (res) => {
      let aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspect<1) aspect = 1/aspect;
      const min = Math.round(res);
      const max = Math.round(res * aspect);
      return gl.drawingBufferWidth > gl.drawingBufferHeight ? { width:max, height:min } : { width:min, height:max };
    };
    const scaleByPixelRatio = (input) => Math.floor(input * (window.devicePixelRatio || 1));
    const wrap = (v,min,max) => { const r = max-min; return r===0 ? min : ((v-min)%r)+min; };
    const HSVtoRGB = (h,s,v) => {
      let i=Math.floor(h*6), f=h*6-i, p=v*(1-s), q=v*(1-f*s), t=v*(1-(1-f)*s);
      let r,g,b;
      switch(i%6){
        case 0: r=v; g=t; b=p; break;
        case 1: r=q; g=v; b=p; break;
        case 2: r=p; g=v; b=t; break;
        case 3: r=p; g=q; b=v; break;
        case 4: r=t; g=p; b=v; break;
        default: r=v; g=p; b=q; break;
      }
      return {r,g,b};
    };
    const generateColor = () => {
      let c = HSVtoRGB(Math.random(),1,1);
      c.r*=0.15; c.g*=0.15; c.b*=0.15;
      return c;
    };
    const correctDeltaX = (delta) => { let ar = canvas.width/canvas.height; if(ar<1) delta*=ar; return delta; };
    const correctDeltaY = (delta) => { let ar = canvas.width/canvas.height; if(ar>1) delta/=ar; return delta; };
    const correctRadius = (radius) => { let ar = canvas.width/canvas.height; if(ar>1) radius*=ar; return radius; };

    // ----- Simulation state -----
    let dye, velocity, divergence, curl, pressure;
    let pointers = [{ id:-1, down:false, moved:false, texcoordX:0,texcoordY:0, prevTexcoordX:0,prevTexcoordY:0, deltaX:0,deltaY:0, color:generateColor() }];
    let lastUpdateTime = performance.now();
    let colorUpdateTimer = 0;

    const initFramebuffers = () => {
      const simRes = getResolution(options.SIM_RESOLUTION);
      const dyeRes = getResolution(options.DYE_RESOLUTION);
      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      gl.disable(gl.BLEND);
      if (!dye) dye = createDoubleFBO(dyeRes.width,dyeRes.height,rgba.internalFormat,rgba.format,texType,filtering);
      else dye = resizeDoubleFBO(dye,dyeRes.width,dyeRes.height,rgba.internalFormat,rgba.format,texType,filtering);
      if (!velocity) velocity = createDoubleFBO(simRes.width,simRes.height,rg.internalFormat,rg.format,texType,filtering);
      else velocity = resizeDoubleFBO(velocity,simRes.width,simRes.height,rg.internalFormat,rg.format,texType,filtering);
      divergence = createFBO(simRes.width,simRes.height,r.internalFormat,r.format,texType,gl.NEAREST);
      curl = createFBO(simRes.width,simRes.height,r.internalFormat,r.format,texType,gl.NEAREST);
      pressure = createDoubleFBO(simRes.width,simRes.height,r.internalFormat,r.format,texType,gl.NEAREST);
    };

    const updateColors = (dt) => {
      colorUpdateTimer += dt * options.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer,0,1);
        pointers.forEach(p => { p.color = generateColor(); });
      }
    };

    const splat = (x,y,dx,dy,color) => {
      splatProgram.bind(gl);
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatProgram.uniforms.point, x, y);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0);
      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(options.SPLAT_RADIUS / 100));
      blit(velocity.write);
      velocity.swap();
      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(dye.write);
      dye.swap();
    };

    const splatPointer = (p) => {
      const dx = p.deltaX * options.SPLAT_FORCE;
      const dy = p.deltaY * options.SPLAT_FORCE;
      splat(p.texcoordX, p.texcoordY, dx, dy, p.color);
    };

    const clickSplat = (p) => {
      const color = generateColor();
      color.r *= 10; color.g *= 10; color.b *= 10;
      const dx = 10 * (Math.random()-0.5);
      const dy = 30 * (Math.random()-0.5);
      splat(p.texcoordX, p.texcoordY, dx, dy, color);
    };

    const step = (dt) => {
      gl.disable(gl.BLEND);
      curlProgram.bind(gl);
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);
      vorticityProgram.bind(gl);
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, options.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write); velocity.swap();
      divergenceProgram.bind(gl);
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);
      clearProgram.bind(gl);
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, options.PRESSURE);
      blit(pressure.write); pressure.swap();
      for (let i=0; i<options.PRESSURE_ITERATIONS; i++) {
        pressureProgram.bind(gl);
        gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write); pressure.swap();
      }
      gradienSubtractProgram.bind(gl);
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write); velocity.swap();
      advectionProgram.bind(gl);
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      let velId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, options.VELOCITY_DISSIPATION);
      blit(velocity.write); velocity.swap();
      if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, options.DENSITY_DISSIPATION);
      blit(dye.write); dye.swap();
    };

    const renderFrame = (target) => {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      const width = target ? target.width : gl.drawingBufferWidth;
      const height = target ? target.height : gl.drawingBufferHeight;
      displayMaterial.bind();
      if (options.SHADING) gl.uniform2f(displayMaterial.uniforms.texelSize, 1/width, 1/height);
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      blit(target);
    };

    // ----- Animation loop -----
    let animFrameId;
    const update = () => {
      const now = performance.now();
      let dt = Math.min((now - lastUpdateTime) / 1000, 0.016666);
      lastUpdateTime = now;
      const w = scaleByPixelRatio(canvas.clientWidth);
      const h = scaleByPixelRatio(canvas.clientHeight);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        initFramebuffers();
      }
      updateColors(dt);
      pointers.forEach(p => { if (p.moved) { p.moved=false; splatPointer(p); } });
      step(dt);
      renderFrame(null);
      animFrameId = requestAnimationFrame(update);
    };

    // ----- Event handlers -----
    const onMouseMove = (e) => {
      const p = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      const texX = posX / canvas.width;
      const texY = 1 - posY / canvas.height;
      p.prevTexcoordX = p.texcoordX;
      p.prevTexcoordY = p.texcoordY;
      p.texcoordX = texX;
      p.texcoordY = texY;
      p.deltaX = correctDeltaX(p.texcoordX - p.prevTexcoordX);
      p.deltaY = correctDeltaY(p.texcoordY - p.prevTexcoordY);
      p.moved = true;
      p.color = generateColor();
    };
    const onMouseDown = (e) => {
      const p = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      p.texcoordX = posX / canvas.width;
      p.texcoordY = 1 - posY / canvas.height;
      p.prevTexcoordX = p.texcoordX;
      p.prevTexcoordY = p.texcoordY;
      p.deltaX = 0; p.deltaY = 0;
      p.moved = false;
      p.color = generateColor();
      clickSplat(p);
    };

    // ----- Initialization -----
    const displayKeywords = options.SHADING ? ['SHADING'] : [];
    displayMaterial.setKeywords(displayKeywords);
    initFramebuffers();
    lastUpdateTime = performance.now();
    update();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);

    // ----- Cleanup -----
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [config]);

  return canvasRef;
};

export default useFluidCursor;