import { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  Palette, 
  Zap, 
  Globe, 
  Cpu, 
  ArrowRight,
  Github,
  Twitter,
  Mail,
  ChevronDown,
  Terminal,
  Layers,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Custom hook for scroll animations
function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Particle background component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(50, Math.floor(window.innerWidth / 30));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

// Hero Section
function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div 
          className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">Welcome to my digital space</span>
          </div>
        </div>

        <h1 
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="gradient-text">RayEngmark</span>
        </h1>

        <p 
          className={`text-xl sm:text-2xl md:text-3xl text-slate-300 mb-4 font-light transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Creator • Developer • Explorer
        </p>

        <p 
          className={`text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Building the future with code, creativity, and curiosity. 
          This showcase was crafted entirely by <span className="text-purple-400 font-medium">Kimi</span> in minutes.
        </p>

        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-6 text-lg rounded-xl glow-purple transition-all duration-300 hover:scale-105"
            onClick={scrollToAbout}
          >
            Explore More
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-slate-600 text-slate-300 hover:bg-slate-800/50 px-8 py-6 text-lg rounded-xl transition-all duration-300"
            onClick={() => window.open('https://github.com/RayEngmark', '_blank')}
          >
            <Github className="mr-2 w-5 h-5" />
            View GitHub
          </Button>
        </div>

        {/* Stats */}
        <div 
          className={`grid grid-cols-3 gap-8 max-w-lg mx-auto transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {[
            { value: '∞', label: 'Possibilities' },
            { value: '100%', label: 'AI Powered' },
            { value: '<5min', label: 'Created In' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="animate-bounce">
          <ChevronDown className="w-8 h-8 text-slate-500" />
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div 
            className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <img 
                src="/abstract-art.jpg" 
                alt="Abstract Art" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Powered by</div>
                  <div className="text-xs text-slate-400">Kimi AI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div 
            className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">About This Project</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Built in Minutes,</span>
              <br />
              <span className="gradient-text">Designed to Impress</span>
            </h2>

            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              This entire website — from the stunning visuals to the smooth animations — 
              was generated by Kimi AI in just a few minutes. No templates, no pre-made designs. 
              Just a conversation and some creativity.
            </p>

            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              The AI generated custom artwork, wrote all the code, designed the layout, 
              and even deployed it live. This is the future of creation.
            </p>

            <div className="flex flex-wrap gap-3">
              {['React', 'TypeScript', 'Tailwind CSS', 'AI Generated'].map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 rounded-full glass text-sm text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Capabilities Section
function CapabilitiesSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const capabilities = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'React, TypeScript, Node.js, and more. Complete applications built from scratch.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Palette,
      title: 'AI Image Generation',
      description: 'Stunning custom visuals created on-demand for any project or purpose.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'From idea to deployed product in minutes, not days or weeks.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Globe,
      title: 'Instant Deployment',
      description: 'Live websites and applications deployed with a single command.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Cpu,
      title: 'Smart Automation',
      description: 'Complex workflows, data processing, and task automation handled effortlessly.',
      color: 'from-rose-500 to-red-500',
    },
    {
      icon: Layers,
      title: 'End-to-End Solutions',
      description: 'Everything from design to code to deployment, all in one place.',
      color: 'from-indigo-500 to-violet-500',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">What Kimi Can Do</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Limitless </span>
            <span className="gradient-text">Possibilities</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From code to creativity, Kimi handles it all. Here's just a glimpse of what's possible.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className={`group relative glass-card rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:glow-purple ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cap.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <cap.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">{cap.title}</h3>
              <p className="text-slate-400 leading-relaxed">{cap.description}</p>

              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cap.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div 
          className={`relative glass rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20 animate-gradient" />
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Ready to Build </span>
              <span className="gradient-text">Something Amazing?</span>
            </h2>
            
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
              This entire website was created in under 5 minutes. 
              Imagine what we could build together with more time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-6 text-lg rounded-xl glow-purple transition-all duration-300 hover:scale-105"
                onClick={() => window.open('https://github.com/RayEngmark', '_blank')}
              >
                <Github className="mr-2 w-5 h-5" />
                Check My GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">RayEngmark</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/RayEngmark', label: 'GitHub' },
              { icon: Twitter, href: '#', label: 'Twitter' },
              { icon: Mail, href: 'mailto:hello@rayengmark.com', label: 'Email' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-800/50 text-center">
          <p className="text-slate-500 text-sm">
            Built with <span className="text-purple-400">Kimi AI</span> • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <CapabilitiesSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
