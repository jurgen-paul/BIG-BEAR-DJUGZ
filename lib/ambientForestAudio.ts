/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Ambient Forest Nature Audio Engine
 * Procedural Web Audio API soundscape synthesis for Big Bear Djugs: Interactive Adventure.
 * Generates natural whispering pines, playful songbirds, babbling brook, and twilight crickets.
 */

export type AmbientPreset = 'pines' | 'birds' | 'brook' | 'twilight';

export interface AmbientLayers {
  breeze: boolean;
  birds: boolean;
  brook: boolean;
  crickets: boolean;
}

export const PRESET_CONFIGS: Record<AmbientPreset, { name: string; icon: string; layers: AmbientLayers; masterMix: { breeze: number; birds: number; brook: number; crickets: number } }> = {
  pines: {
    name: 'Whispering Pines',
    icon: '🌲',
    layers: { breeze: true, birds: true, brook: true, crickets: false },
    masterMix: { breeze: 0.35, birds: 0.35, brook: 0.25, crickets: 0 }
  },
  birds: {
    name: 'Songbird Meadow',
    icon: '🐦',
    layers: { breeze: true, birds: true, brook: false, crickets: false },
    masterMix: { breeze: 0.25, birds: 0.65, brook: 0, crickets: 0 }
  },
  brook: {
    name: 'Babbling Brook',
    icon: '💧',
    layers: { breeze: true, birds: true, brook: true, crickets: false },
    masterMix: { breeze: 0.2, birds: 0.2, brook: 0.6, crickets: 0 }
  },
  twilight: {
    name: 'Starry Forest Twilight',
    icon: '🌙',
    layers: { breeze: true, birds: false, brook: true, crickets: true },
    masterMix: { breeze: 0.3, birds: 0, brook: 0.2, crickets: 0.45 }
  }
};

class AmbientForestEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isRunning = false;

  // Layer Gain Nodes
  private breezeGain: GainNode | null = null;
  private birdsGain: GainNode | null = null;
  private brookGain: GainNode | null = null;
  private cricketsGain: GainNode | null = null;

  // Timers and loops
  private birdTimer: any = null;
  private cricketTimer: any = null;

  // Noise sources & filters
  private breezeFilter: BiquadFilterNode | null = null;
  private breezeLfo: OscillatorNode | null = null;
  private brookFilter1: BiquadFilterNode | null = null;
  private brookFilter2: BiquadFilterNode | null = null;
  private brookLfo: OscillatorNode | null = null;

  private currentPreset: AmbientPreset = 'pines';
  private currentLayers: AmbientLayers = { breeze: true, birds: true, brook: true, crickets: false };
  private userVolume = 0.5;

  private getAudioContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    return this.ctx;
  }

  // Create a 5-second buffer of pink noise for natural atmospheric breeze
  private createPinkNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  // Create white noise buffer for water turbulence
  private createWhiteNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  public async start(): Promise<boolean> {
    try {
      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      if (this.isRunning) {
        return true;
      }

      // Master output & Analyser for reactive visuals
      this.analyser = ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, ctx.currentTime);
      // Smooth fade-in
      this.masterGain.gain.linearRampToValueAtTime(this.userVolume, ctx.currentTime + 1.2);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(ctx.destination);

      // Layer Gain Nodes
      this.breezeGain = ctx.createGain();
      this.birdsGain = ctx.createGain();
      this.brookGain = ctx.createGain();
      this.cricketsGain = ctx.createGain();

      this.breezeGain.connect(this.masterGain);
      this.birdsGain.connect(this.masterGain);
      this.brookGain.connect(this.masterGain);
      this.cricketsGain.connect(this.masterGain);

      // 1. Setup Breeze & Whispering Pines
      this.initBreeze(ctx);

      // 2. Setup Babbling Brook
      this.initBrook(ctx);

      // 3. Setup Birds Loop
      this.scheduleBirdChirps();

      // 4. Setup Crickets Loop
      this.scheduleCrickets();

      this.applyPreset(this.currentPreset);
      this.isRunning = true;
      return true;
    } catch (err) {
      console.warn('AmbientForestEngine failed to start:', err);
      return false;
    }
  }

  private initBreeze(ctx: AudioContext) {
    if (!this.breezeGain) return;
    const pinkNoise = ctx.createBufferSource();
    pinkNoise.buffer = this.createPinkNoiseBuffer(ctx);
    pinkNoise.loop = true;

    // Gentle lowpass filter shaping the wind through tree needles
    this.breezeFilter = ctx.createBiquadFilter();
    this.breezeFilter.type = 'lowpass';
    this.breezeFilter.frequency.setValueAtTime(420, ctx.currentTime);
    this.breezeFilter.Q.setValueAtTime(1.2, ctx.currentTime);

    // LFO to simulate gentle gusts of wind
    this.breezeLfo = ctx.createOscillator();
    this.breezeLfo.frequency.setValueAtTime(0.12, ctx.currentTime); // one slow breath every ~8 seconds
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(180, ctx.currentTime);

    this.breezeLfo.connect(lfoGain);
    lfoGain.connect(this.breezeFilter.frequency);

    pinkNoise.connect(this.breezeFilter);
    this.breezeFilter.connect(this.breezeGain);

    pinkNoise.start();
    this.breezeLfo.start();
  }

  private initBrook(ctx: AudioContext) {
    if (!this.brookGain) return;
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = this.createWhiteNoiseBuffer(ctx);
    whiteNoise.loop = true;

    // Bandpass filter for water bubbling frequencies
    this.brookFilter1 = ctx.createBiquadFilter();
    this.brookFilter1.type = 'bandpass';
    this.brookFilter1.frequency.setValueAtTime(850, ctx.currentTime);
    this.brookFilter1.Q.setValueAtTime(3.5, ctx.currentTime);

    this.brookFilter2 = ctx.createBiquadFilter();
    this.brookFilter2.type = 'lowpass';
    this.brookFilter2.frequency.setValueAtTime(1400, ctx.currentTime);

    // Gentle modulation for water bubbling rhythm
    this.brookLfo = ctx.createOscillator();
    this.brookLfo.frequency.setValueAtTime(0.8, ctx.currentTime);
    const brookLfoGain = ctx.createGain();
    brookLfoGain.gain.setValueAtTime(120, ctx.currentTime);

    this.brookLfo.connect(brookLfoGain);
    brookLfoGain.connect(this.brookFilter1.frequency);

    whiteNoise.connect(this.brookFilter1);
    this.brookFilter1.connect(this.brookFilter2);
    this.brookFilter2.connect(this.brookGain);

    whiteNoise.start();
    this.brookLfo.start();
  }

  private scheduleBirdChirps() {
    const playChirp = () => {
      if (!this.isRunning || !this.ctx || !this.birdsGain || !this.currentLayers.birds) {
        this.birdTimer = setTimeout(playChirp, 3000);
        return;
      }

      this.synthesizeBirdChirp();
      // Schedule next chirp in 2.5 - 6.5 seconds with organic variance
      const nextDelay = 2500 + Math.random() * 4000;
      this.birdTimer = setTimeout(playChirp, nextDelay);
    };

    this.birdTimer = setTimeout(playChirp, 1500);
  }

  private synthesizeBirdChirp() {
    if (!this.ctx || !this.birdsGain || this.ctx.state !== 'running') return;
    try {
      const now = this.ctx.currentTime;
      const isWarbler = Math.random() > 0.45;

      if (isWarbler) {
        // Multi-tone sweet woodland warble
        const notes = [2400 + Math.random() * 300, 2800 + Math.random() * 300, 2550 + Math.random() * 200];
        notes.forEach((freq, idx) => {
          if (!this.ctx || !this.birdsGain) return;
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();
          const startTime = now + idx * 0.12;
          const duration = 0.1;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          osc.frequency.exponentialRampToValueAtTime(freq + (idx % 2 === 0 ? 300 : -200), startTime + duration);

          noteGain.gain.setValueAtTime(0, startTime);
          noteGain.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

          osc.connect(noteGain);
          noteGain.connect(this.birdsGain);

          osc.start(startTime);
          osc.stop(startTime + duration + 0.02);
        });
      } else {
        // High gentle chickadee whistle
        const osc = this.ctx.createOscillator();
        const chirpGain = this.ctx.createGain();
        const baseFreq = 3100 + Math.random() * 400;
        const duration = 0.22;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq - 400, now + duration);

        chirpGain.gain.setValueAtTime(0, now);
        chirpGain.gain.linearRampToValueAtTime(0.07, now + 0.03);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(chirpGain);
        chirpGain.connect(this.birdsGain);

        osc.start(now);
        osc.stop(now + duration + 0.05);
      }
    } catch (e) {
      // Audio node scheduling guard
    }
  }

  private scheduleCrickets() {
    const playCrickets = () => {
      if (!this.isRunning || !this.ctx || !this.cricketsGain || !this.currentLayers.crickets) {
        this.cricketTimer = setTimeout(playCrickets, 2000);
        return;
      }

      this.synthesizeCricketChirp();
      const nextDelay = 1800 + Math.random() * 2200;
      this.cricketTimer = setTimeout(playCrickets, nextDelay);
    };

    this.cricketTimer = setTimeout(playCrickets, 1000);
  }

  private synthesizeCricketChirp() {
    if (!this.ctx || !this.cricketsGain || this.ctx.state !== 'running') return;
    try {
      const now = this.ctx.currentTime;
      const numPulses = 3 + Math.floor(Math.random() * 3);
      const pulseDuration = 0.035;

      for (let i = 0; i < numPulses; i++) {
        const osc = this.ctx.createOscillator();
        const pulseGain = this.ctx.createGain();
        const t = now + i * 0.055;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(4500 + Math.random() * 200, t);

        pulseGain.gain.setValueAtTime(0, t);
        pulseGain.gain.linearRampToValueAtTime(0.03, t + 0.008);
        pulseGain.gain.exponentialRampToValueAtTime(0.0001, t + pulseDuration);

        osc.connect(pulseGain);
        pulseGain.connect(this.cricketsGain);

        osc.start(t);
        osc.stop(t + pulseDuration + 0.01);
      }
    } catch (e) {
      // Audio scheduling guard
    }
  }

  public stop() {
    if (!this.isRunning) return;

    if (this.birdTimer) clearTimeout(this.birdTimer);
    if (this.cricketTimer) clearTimeout(this.cricketTimer);

    if (this.ctx && this.masterGain) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
      } catch (e) {
        // ignore ramp error
      }
    }

    setTimeout(() => {
      if (this.ctx && this.ctx.state !== 'closed') {
        this.ctx.close();
        this.ctx = null;
      }
      this.isRunning = false;
      this.masterGain = null;
      this.analyser = null;
      this.breezeGain = null;
      this.birdsGain = null;
      this.brookGain = null;
      this.cricketsGain = null;
    }, 600);
  }

  public setVolume(volume: number) {
    this.userVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.userVolume, now + 0.1);
    }
  }

  public setPreset(preset: AmbientPreset) {
    this.currentPreset = preset;
    const config = PRESET_CONFIGS[preset];
    if (config) {
      this.currentLayers = { ...config.layers };
      this.applyPreset(preset);
    }
  }

  public setLayerActive(layer: keyof AmbientLayers, active: boolean) {
    this.currentLayers[layer] = active;
    this.applyCurrentMix();
  }

  private applyPreset(preset: AmbientPreset) {
    const config = PRESET_CONFIGS[preset];
    if (!config) return;
    this.applyCurrentMix();
  }

  private applyCurrentMix() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const config = PRESET_CONFIGS[this.currentPreset];
    const mix = config ? config.masterMix : { breeze: 0.3, birds: 0.3, brook: 0.3, crickets: 0 };

    if (this.breezeGain) {
      const target = this.currentLayers.breeze ? mix.breeze : 0;
      this.breezeGain.gain.linearRampToValueAtTime(target, now + 0.4);
    }
    if (this.birdsGain) {
      const target = this.currentLayers.birds ? mix.birds : 0;
      this.birdsGain.gain.linearRampToValueAtTime(target, now + 0.4);
    }
    if (this.brookGain) {
      const target = this.currentLayers.brook ? mix.brook : 0;
      this.brookGain.gain.linearRampToValueAtTime(target, now + 0.4);
    }
    if (this.cricketsGain) {
      const target = this.currentLayers.crickets ? mix.crickets : 0;
      this.cricketsGain.gain.linearRampToValueAtTime(target, now + 0.4);
    }
  }

  // Gracefully ducks volume when voice narration plays
  public duck(isDucked: boolean) {
    if (!this.masterGain || !this.ctx || !this.isRunning) return;
    const now = this.ctx.currentTime;
    const target = isDucked ? this.userVolume * 0.25 : this.userVolume;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(target, now + 0.3);
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  public getPreset(): AmbientPreset {
    return this.currentPreset;
  }

  public getLayers(): AmbientLayers {
    return { ...this.currentLayers };
  }

  public getVolume(): number {
    return this.userVolume;
  }
}

// Global engine singleton
export const ambientForest = new AmbientForestEngine();
