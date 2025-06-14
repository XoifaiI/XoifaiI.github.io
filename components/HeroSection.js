.hero {
  margin-bottom: 4rem;
  padding: 4rem 3rem;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%);
  border-radius: 16px;
  border: 1px solid var(--border);
  contain: layout style;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(0, 112, 243, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(0, 217, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.hero > * {
  position: relative;
  z-index: 2;
}

.title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  word-break: break-word;
  hyphens: auto;
  
  /* Modern gradient text */
  background: linear-gradient(135deg, 
    var(--text-primary) 0%, 
    var(--accent-light) 40%, 
    var(--success) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Fallback for unsupported browsers */
  color: var(--text-primary);
  
  /* Text shadow for depth */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  
  /* Ensure proper spacing */
  padding: 0.5rem 0;
  overflow-wrap: break-word;
}

@supports not (-webkit-background-clip: text) {
  .title {
    color: var(--text-primary);
    background: none;
    -webkit-text-fill-color: unset;
  }
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 800px;
  font-weight: 400;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  width: 100%;
}

.stat {
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--bg-elevated);
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stat::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent-light));
  transform: scaleX(0);
  transition: transform var(--transition-normal);
}

.stat:hover::before {
  transform: scaleX(1);
}

.stat:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-light);
}

.statNumber {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent);
  display: block;
  line-height: 1;
  margin-bottom: 0.75rem;
  
  /* Gradient effect */
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@supports not (-webkit-background-clip: text) {
  .statNumber {
    color: var(--accent);
    background: none;
    -webkit-text-fill-color: unset;
  }
}

.statLabel {
  font-size: 0.9rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 1.3;
  text-align: center;
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.actions .btn {
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 10px;
  font-weight: 600;
  min-width: 160px;
  justify-content: center;
}

.actions .btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  box-shadow: 0 4px 15px rgba(0, 112, 243, 0.2);
}

.actions .btn-primary:hover {
  box-shadow: 0 8px 25px rgba(0, 112, 243, 0.3), var(--shadow-glow);
  transform: translateY(-2px);
}

.actions .btn-secondary {
  background: var(--bg-elevated);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.actions .btn-secondary:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent);
  box-shadow: var(--shadow-md);
}

/* Responsive design */
@media (max-width: 768px) {
  .hero {
    padding: 3rem 2rem;
  }
  
  .title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  .stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .stat {
    padding: 1.5rem 1rem;
    min-height: 100px;
  }
  
  .statNumber {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .statLabel {
    font-size: 0.8rem;
  }
  
  .actions {
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .actions .btn {
    min-width: auto;
    width: 100%;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 2rem 1.5rem;
  }
  
  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .stats {
    margin: 1.5rem 0;
    gap: 1rem;
  }
  
  .stat {
    padding: 1.25rem 1rem;
    min-height: 90px;
  }
  
  .statNumber {
    font-size: 1.8rem;
  }
  
  .statLabel {
    font-size: 0.75rem;
  }
  
  .actions {
    margin-top: 1.5rem;
  }
  
  .actions .btn {
    padding: 0.875rem;
    font-size: 0.9rem;
  }
}

/* Ultra-small screens */
@media (max-width: 360px) {
  .hero {
    padding: 1.5rem 1rem;
  }
  
  .title {
    font-size: 1.75rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
  
  .stat {
    padding: 1rem 0.75rem;
    min-height: 80px;
  }
  
  .statNumber {
    font-size: 1.5rem;
  }
  
  .statLabel {
    font-size: 0.7rem;
  }
}

/* Modern animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero > * {
  animation: fadeInUp 0.6s ease-out;
}

.title {
  animation-delay: 0.1s;
}

.subtitle {
  animation-delay: 0.2s;
}

.stats {
  animation-delay: 0.3s;
}

.actions {
  animation-delay: 0.4s;
}

/* Smooth floating animations - Much more frequent updates */
@keyframes smoothFloat {
  0% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  12.5% {
    transform: translateY(-8px) translateX(2px) rotate(0.5deg);
  }
  25% {
    transform: translateY(-15px) translateX(-1px) rotate(-0.3deg);
  }
  37.5% {
    transform: translateY(-10px) translateX(3px) rotate(0.8deg);
  }
  50% {
    transform: translateY(-5px) translateX(-2px) rotate(-0.2deg);
  }
  62.5% {
    transform: translateY(-12px) translateX(1px) rotate(0.6deg);
  }
  75% {
    transform: translateY(-8px) translateX(-3px) rotate(-0.4deg);
  }
  87.5% {
    transform: translateY(-3px) translateX(2px) rotate(0.3deg);
  }
  100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
}

@keyframes smoothFloat2 {
  0% {
    transform: translateY(-5px) translateX(1px) rotate(0.2deg);
  }
  12.5% {
    transform: translateY(-12px) translateX(-2px) rotate(-0.4deg);
  }
  25% {
    transform: translateY(-3px) translateX(3px) rotate(0.7deg);
  }
  37.5% {
    transform: translateY(-18px) translateX(0px) rotate(-0.1deg);
  }
  50% {
    transform: translateY(-8px) translateX(-1px) rotate(0.5deg);
  }
  62.5% {
    transform: translateY(-15px) translateX(2px) rotate(-0.6deg);
  }
  75% {
    transform: translateY(-6px) translateX(-3px) rotate(0.3deg);
  }
  87.5% {
    transform: translateY(-10px) translateX(1px) rotate(-0.2deg);
  }
  100% {
    transform: translateY(-5px) translateX(1px) rotate(0.2deg);
  }
}

@keyframes smoothFloat3 {
  0% {
    transform: translateY(-8px) translateX(-1px) rotate(-0.3deg);
  }
  12.5% {
    transform: translateY(-2px) translateX(3px) rotate(0.6deg);
  }
  25% {
    transform: translateY(-16px) translateX(1px) rotate(-0.5deg);
  }
  37.5% {
    transform: translateY(-6px) translateX(-2px) rotate(0.4deg);
  }
  50% {
    transform: translateY(-13px) translateX(0px) rotate(-0.1deg);
  }
  62.5% {
    transform: translateY(-4px) translateX(2px) rotate(0.7deg);
  }
  75% {
    transform: translateY(-11px) translateX(-1px) rotate(-0.4deg);
  }
  87.5% {
    transform: translateY(-7px) translateX(3px) rotate(0.2deg);
  }
  100% {
    transform: translateY(-8px) translateX(-1px) rotate(-0.3deg);
  }
}

.stat:nth-child(1) {
  animation: smoothFloat 3s ease-in-out infinite;
}

.stat:nth-child(2) {
  animation: smoothFloat2 3.5s ease-in-out infinite;
}

.stat:nth-child(3) {
  animation: smoothFloat3 2.8s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .hero > *,
  .stat {
    animation: none !important;
  }
}
