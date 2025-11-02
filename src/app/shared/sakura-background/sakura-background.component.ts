import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';

interface SakuraParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  swayAmplitude: number;
  swayFrequency: number;
  startX: number;
  rotation: number; // 新增旋轉角度
}

@Component({
  selector: 'app-sakura-background',
  templateUrl: './sakura-background.component.html',
  styleUrls: ['./sakura-background.component.scss'],
  standalone: true
})
export class SakuraBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sakuraCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: SakuraParticle[] = [];
  private animationId: number | null = null;
  private angle = 0;

  private maxParticles = 30;
  private sakuraColor = '#FFB6C1'; // 淺粉色

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    this.initParticles();
    this.animate();
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): SakuraParticle {
    const radius = Math.random() * 4 + 3; // 花瓣大小
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height - this.canvas.height,
      radius,
      vx: Math.random() * 0.5 - 0.25,
      vy: 0.3 + Math.random() * 0.5,
      opacity: Math.random() * 0.5 + 0.5,
      swayAmplitude: Math.random() * 15 + 10,
      swayFrequency: Math.random() * 0.3 + 0.1,
      startX: Math.random() * this.canvas.width,
      rotation: Math.random() * Math.PI * 2 // 隨機初始旋轉
    };
  }

  private drawPetal(p: SakuraParticle) {
    this.ctx.save();
    this.ctx.globalAlpha = p.opacity;
    this.ctx.fillStyle = this.sakuraColor;
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.rotation);

    // 繪製五瓣櫻花
    for (let i = 0; i < 5; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.bezierCurveTo(
        p.radius * 0.5, -p.radius * 0.8,
        p.radius * 1.2, -p.radius * 0.2,
        p.radius * 0.8, p.radius * 0.5
      );
      this.ctx.bezierCurveTo(
        p.radius * 0.5, p.radius * 0.8,
        -p.radius * 0.5, p.radius * 0.8,
        -p.radius * 0.8, p.radius * 0.5
      );
      this.ctx.bezierCurveTo(
        -p.radius * 1.2, -p.radius * 0.2,
        -p.radius * 0.5, -p.radius * 0.8,
        0, 0
      );
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.rotate((Math.PI * 2) / 5); // 每瓣旋轉 72 度
    }
    this.ctx.restore();
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.angle += 0.01;

    this.particles.forEach(p => {
      // 更新位置
      p.x += p.vx + Math.sin(this.angle + p.startX * 0.01) * p.swayAmplitude * p.swayFrequency;
      p.y += p.vy;
      p.vy += 0.015; // 輕微重力
      p.rotation += 0.02; // 旋轉速度

      // 邊界重生
      if (p.y > this.canvas.height + p.radius) {
        p.y = -p.radius;
        p.x = Math.random() * this.canvas.width;
        p.startX = p.x;
        p.vy = 0.3 + Math.random() * 0.5;
        p.rotation = Math.random() * Math.PI * 2;
      }

      // 繪製花瓣
      this.drawPetal(p);
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}