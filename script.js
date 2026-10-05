// 1. REALTIME HUD TELEMETRY & CROSSHAIR TRACKER
    let crosshairActive = false;
    const telemetryX = document.getElementById('telemetryX');
    const telemetryY = document.getElementById('telemetryY');
    const crosshairH = document.getElementById('crosshairH');
    const crosshairV = document.getElementById('crosshairV');
    const toggleCrosshairBtn = document.getElementById('toggleCrosshairBtn');
    const crosshairState = document.getElementById('crosshairState');

    window.addEventListener('mousemove', (e) => {
      // Simulate real millimeter coordinates based on screen bounds
      const mmX = (e.clientX * 0.42).toFixed(2).padStart(7, '0');
      const mmY = (e.clientY * 0.42).toFixed(2).padStart(7, '0');
      if (telemetryX) telemetryX.textContent = mmX;
      if (telemetryY) telemetryY.textContent = mmY;

      if (crosshairActive && crosshairH && crosshairV) {
        crosshairH.style.top = `${e.clientY}px`;
        crosshairV.style.left = `${e.clientX}px`;
      }
    });

    if (toggleCrosshairBtn) {
      toggleCrosshairBtn.addEventListener('click', () => {
        crosshairActive = !crosshairActive;
        if (crosshairActive) {
          crosshairH.classList.remove('hidden');
          crosshairV.classList.remove('hidden');
          crosshairState.textContent = 'ON';
          toggleCrosshairBtn.classList.add('bg-blue-50', 'text-blue-600', 'border-blue-400');
        } else {
          crosshairH.classList.add('hidden');
          crosshairV.classList.add('hidden');
          crosshairState.textContent = 'OFF';
          toggleCrosshairBtn.classList.remove('bg-blue-50', 'text-blue-600', 'border-blue-400');
        }
      });
    }

    // 2. MOBILE MENU TOGGLE
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
      // Close on link click
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
      });
    }

    // 3. HERO CAD LAYER TOGGLING
    const heroLayers = {
      grid: { el: 'layer-grid', btn: 'btnLayerGrid', active: true },
      dims: { el: 'layer-dims', btn: 'btnLayerDims', active: true },
      furn: { el: 'layer-furn', btn: 'btnLayerFurn', active: true },
      anno: { el: 'layer-anno', btn: 'btnLayerAnno', active: true }
    };

    function toggleHeroLayer(layerKey) {
      const layer = heroLayers[layerKey];
      if (!layer) return;
      layer.active = !layer.active;
      
      const targetEl = document.getElementById(layer.el);
      const targetBtn = document.getElementById(layer.btn);

      if (targetEl) {
        targetEl.style.opacity = layer.active ? '1' : '0';
        targetEl.style.pointerEvents = layer.active ? 'auto' : 'none';
      }

      if (targetBtn) {
        if (layer.active) {
          targetBtn.classList.remove('bg-gray-300', 'text-gray-700');
          targetBtn.classList.add('bg-blue-600', 'text-white');
        } else {
          targetBtn.classList.remove('bg-blue-600', 'text-white');
          targetBtn.classList.add('bg-gray-300', 'text-gray-700');
        }
      }
    }

    // 4. "INSIDE THE DRAWING" INTERACTIVE HOTSPOT DATA
    const hotspotData = {
      dims: {
        tag: 'FEATURE 01 / 04',
        sub: 'CAD INTEGRITY',
        title: 'DIMENSIONS & STRINGS',
        desc: 'Clear, continuous dimensional chains eliminate any need for site contractors to scale or estimate measurements. Every partition and column coordinate is mathematically tied to the site datum point.',
        spec: 'Continuous Chain & Baseline',
        layer: 'A-DIMS-EXT'
      },
      layers: {
        tag: 'FEATURE 02 / 04',
        sub: 'STANDARDIZATION',
        title: 'ORGANIZED CAD LAYERS',
        desc: 'Drawings follow professional ISO architectural layer standards (A-WALL, A-DOOR, A-WIND, A-DIMS, A-TEXT). This ensures seamless trade coordination and allows MEP/HVAC teams to isolate structural walls effortlessly.',
        spec: 'AIA / ISO 13567 Hierarchy',
        layer: 'A-WALL-EXTR'
      },
      anno: {
        tag: 'FEATURE 03 / 04',
        sub: 'LEGIBILITY',
        title: 'TECHNICAL ANNOTATIONS',
        desc: 'Annotated floor heights, clear room area tags, ceiling clearances, and window/door schedules provide full clarity without cluttering primary circulation lines.',
        spec: 'Standard RomanS Font, 2.5mm Plotted',
        layer: 'A-ANNO-TEXT'
      },
      details: {
        tag: 'FEATURE 04 / 04',
        sub: 'BUILDABILITY',
        title: 'CONSTRUCTION DETAILS',
        desc: 'Explicit junction callouts detail wall thicknesses, plaster coats, lintel depths, and damp-proof courses so contractors can execute exactly as designed.',
        spec: 'Masonry & RCC Section Callouts',
        layer: 'A-DETL-ENCL'
      }
    };

    function selectHotspot(key) {
      const data = hotspotData[key];
      if (!data) return;
      document.getElementById('hotspotTag').textContent = data.tag;
      document.getElementById('hotspotSub').textContent = data.sub;
      document.getElementById('hotspotTitle').textContent = data.title;
      document.getElementById('hotspotDesc').textContent = data.desc;
      document.getElementById('hotspotSpec').textContent = data.spec;
      document.getElementById('hotspotLayer').textContent = data.layer;
    }

    // 5. PROJECT DETAIL MODAL SYSTEM & MULTI-VIEW DRAWINGS
    const projectData = {
      1: {
        title: 'Modern Residential Floor Plan',
        category: 'RESIDENTIAL ARCHITECTURE',
        location: 'Uttar Pradesh, India',
        scope: '2D Architectural Layout, Furniture & Schedule',
        software: 'AutoCAD 2026',
        status: 'Approved for Construction',
        requirement: 'The client needed a modern 3-BHK residential floor plan on a 40ft x 60ft plot that maximized natural cross-ventilation, provided private family zoning, and maintained spacious open-concept dining.',
        approach: 'Structured the layout along an axial spine, separating public guest entertainment spaces from private sleeping quarters. Developed comprehensive door/window schedules and verified wall clearances for electrical chases.',
        consid1: 'Optimized foyer circulation to avoid sightlines into private bedrooms.',
        consid2: 'Standardized room spans to minimize structural beam depths.',
        consid3: 'Integrated external utility balconies directly adjacent to the wet kitchen.',
        outcome: 'Delivered a clean, buildable DWG and PDF set with zero dimension conflicts, enabling the contractor to pour foundations without delay.',
        drawings: {
          PLAN: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><rect x="40" y="30" width="420" height="240" stroke="#00D1FF" stroke-width="2"/><line x1="200" y1="30" x2="200" y2="270" stroke="#8E95A5" stroke-width="1.5"/><line x1="40" y1="150" x2="200" y2="150" stroke="#8E95A5" stroke-width="1.5"/><text x="120" y="90" fill="#FFF" text-anchor="middle">BEDROOM 01</text><text x="120" y="210" fill="#FFF" text-anchor="middle">BEDROOM 02</text><text x="320" y="150" fill="#FFF" text-anchor="middle">LIVING & LOUNGE (24' x 16')</text><line x1="40" y1="15" x2="460" y2="15" stroke="#0055FF" stroke-width="1"/><text x="250" y="12" fill="#00D1FF" text-anchor="middle">18,288 mm (60'-0")</text></svg>`,
          ELEVATION: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><line x1="40" y1="260" x2="460" y2="260" stroke="#00D1FF" stroke-width="2"/><rect x="80" y="80" width="340" height="180" stroke="#FFF" stroke-width="2"/><rect x="110" y="100" width="100" height="60" stroke="#00D1FF" stroke-width="1.5"/><rect x="270" y="180" width="60" height="80" stroke="#FFF" stroke-width="1.5"/><text x="250" y="60" fill="#00D1FF" text-anchor="middle">+6,800 ROOF PARAPET</text></svg>`,
          SECTION: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><line x1="50" y1="270" x2="450" y2="270" stroke="#8E95A5" stroke-width="1.5"/><rect x="80" y="140" width="340" height="12" fill="#2A303C" stroke="#FFF" stroke-width="1.5"/><rect x="80" y="50" width="340" height="12" fill="#2A303C" stroke="#FFF" stroke-width="1.5"/><text x="250" y="110" fill="#00D1FF" text-anchor="middle">FLOOR TO SLAB: 3,200 mm</text></svg>`,
          DETAIL: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><rect x="150" y="60" width="200" height="180" stroke="#00D1FF" stroke-width="2"/><text x="250" y="150" fill="#FFF" text-anchor="middle">LINTEL BEARING & SILL SPECIFICATION</text><line x1="120" y1="120" x2="380" y2="120" stroke="#8E95A5" stroke-dasharray="3,3"/></svg>`
        }
      },
      2: {
        title: 'Contemporary Residential Elevation',
        category: 'ARCHITECTURAL ELEVATION',
        location: 'Varanasi, UP',
        scope: 'Façade Detailing, Vertical Levels, Material Callouts',
        software: 'AutoCAD 2026',
        status: 'Client Approved',
        requirement: 'Develop a modern, clean exterior elevation balancing solid masonry masses with framed louvers and continuous balcony railings for a 2-storey bungalow.',
        approach: 'Calculated vertical proportion ratios ensuring window heads aligned across all wall planes. Embedded clear datum levels (+0.00, +3.60m, +7.20m) and annotated weather-shield plaster textures.',
        consid1: 'Sun-shading canopy cantilevers designed to reduce harsh southern heat loads.',
        consid2: 'Groove patterns spaced evenly to maintain visual architectural rhythm.',
        consid3: 'Terrace parapet heights designed to meet building safety code (1100mm).',
        outcome: 'The client and contractor received exact dimensional guidance for exterior formwork with zero ambiguity on opening sizes.',
        drawings: {
          PLAN: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><rect x="60" y="50" width="380" height="200" stroke="#00D1FF" stroke-width="2"/><text x="250" y="150" fill="#FFF" text-anchor="middle">FACADE HORIZONTAL PROJECTION SCHEMATIC</text></svg>`,
          ELEVATION: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><rect x="80" y="60" width="340" height="200" stroke="#00D1FF" stroke-width="2"/><rect x="110" y="80" width="120" height="70" stroke="#FFF" stroke-width="1.5"/><line x1="40" y1="260" x2="460" y2="260" stroke="#8E95A5" stroke-width="2"/><text x="250" y="40" fill="#00D1FF" text-anchor="middle">FRONT ELEVATION (1:100)</text></svg>`,
          SECTION: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><rect x="150" y="50" width="20" height="220" fill="#2A303C" stroke="#FFF"/><text x="250" y="160" fill="#00D1FF" text-anchor="middle">BALCONY PROJECTION CUT</text></svg>`,
          DETAIL: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><rect x="180" y="100" width="140" height="100" stroke="#00D1FF" stroke-width="1.5"/><text x="250" y="150" fill="#FFF" text-anchor="middle">LOUVER PROFILE (1:10)</text></svg>`
        }
      },
      3: {
        title: 'Section & Construction Documentation',
        category: 'TECHNICAL DOCUMENTATION',
        location: 'Obra Industrial Zone, UP',
        scope: 'Building Cross-Section, Slab Details, Foundation Schedule',
        software: 'AutoCAD 2026',
        status: 'Production Ready',
        requirement: 'Provide comprehensive sectional cutting planes through the central staircase core and plumbing duct to guide structural concrete teams.',
        approach: 'Drew full sectional geometry from PCC footing up through the overhead water tank. Plotted step risers, treads, landing beams, and parapet waterproofing coping.',
        consid1: 'Riser height locked strictly to 150mm and tread to 300mm for ergonomics.',
        consid2: 'Slab reinforcement clear covers and damp proofing membrane indicated.',
        consid3: 'Natural drainage falls on terrace slab noted at 1:80 slope.',
        outcome: 'Structural and civil teams executed staircase formwork without any dimensional re-work or level confusion.',
        drawings: {
          PLAN: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><text x="250" y="150" fill="#FFF" text-anchor="middle">STAIRCASE CORE PLAN & STRINGER LAYOUT</text></svg>`,
          ELEVATION: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><text x="250" y="150" fill="#FFF" text-anchor="middle">EXTERNAL SECTIONAL ELEVATION</text></svg>`,
          SECTION: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><path d="M 100,250 L 140,250 L 140,220 L 180,220 L 180,190 L 220,190 L 220,160 L 260,160" stroke="#00D1FF" stroke-width="2"/><text x="320" y="140" fill="#FFF">DOG-LEGGED STAIRCASE CORE</text></svg>`,
          DETAIL: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><rect x="160" y="80" width="180" height="140" stroke="#00D1FF" stroke-width="1.5"/><text x="250" y="150" fill="#FFF" text-anchor="middle">STEP NOSING & HANDRAIL DETAIL</text></svg>`
        }
      },
      4: {
        title: 'Commercial Interior Layout',
        category: 'COMMERCIAL / INTERIOR PLANNING',
        location: 'Lucknow, UP',
        scope: 'Interior Partitioning, Workstation Pods, Conference Fit-out',
        software: 'AutoCAD 2026',
        status: 'Design Development Complete',
        requirement: 'Space plan a 2,800 sq.ft commercial floor for a corporate firm requiring 24 open-plan workstations, 3 executive cabins, reception lobby, and an 8-person conference room.',
        approach: 'Maintained 1200mm to 1500mm aisle widths to guarantee free emergency egress. Grouped workstations around core electrical distribution channels to conceal wiring runs.',
        consid1: 'Acoustic double-glazed partitions specified for conference room.',
        consid2: 'Clear desk offsets from perimeter glass to allow window cleaning access.',
        consid3: 'Dedicated utility room positioned adjacent to the server rack.',
        outcome: 'The layout passed corporate facilities criteria and served as the exact base for electrical and HVAC subcontracting.',
        drawings: {
          PLAN: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><rect x="50" y="40" width="400" height="220" stroke="#00D1FF" stroke-width="2"/><circle cx="150" cy="150" r="40" stroke="#FFF" stroke-width="1.5"/><text x="150" y="155" fill="#FFF" text-anchor="middle">CONFERENCE</text><rect x="250" y="70" width="160" height="70" stroke="#8E95A5" stroke-width="1.5"/><text x="330" y="110" fill="#FFF" text-anchor="middle">WORKSTATION PODS</text></svg>`,
          ELEVATION: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><text x="250" y="150" fill="#FFF" text-anchor="middle">EXECUTIVE CABIN PARTITION ELEVATION</text></svg>`,
          SECTION: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><text x="250" y="150" fill="#FFF" text-anchor="middle">FALSE CEILING & DUCT CLEARANCE SECTION</text></svg>`,
          DETAIL: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><text x="250" y="150" fill="#FFF" text-anchor="middle">DESK POWER RACEWAY & GROMMET DETAIL</text></svg>`
        }
      },
      5: {
        title: 'Site Layout & Measurement Documentation',
        category: 'SITE PLANNING',
        location: 'Sonbhadra Region, UP',
        scope: 'Boundary Survey Translation, Setback Compliance, Driveway',
        software: 'AutoCAD 2026',
        status: 'Municipal Approved',
        requirement: 'Translate physical tape measurements and diagonal triangulations of an irregular plot into a clean digital CAD site layout with setback boundaries.',
        approach: 'Reconciled diagonal check dimensions to correct angle skewing. Placed building envelope strictly within statutory front (4.5m) and rear (3.0m) setback boundaries.',
        consid1: 'Proper turning radii mapped for passenger vehicles at plot entrance.',
        consid2: 'Municipal road widening reservations factored into front baseline.',
        consid3: 'Rainwater slope lines calculated toward municipal storm drains.',
        outcome: 'Municipal authority approved the layout on first submission with zero geometric revision requests.',
        drawings: {
          PLAN: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><polygon points="60,60 440,40 410,260 80,270" stroke="#00D1FF" stroke-width="2.5"/><rect x="140" y="100" width="200" height="120" stroke="#FFF" stroke-width="2"/><text x="240" y="165" fill="#00D1FF" text-anchor="middle">BUILDING FOOTPRINT (SETBACK COMPLIANT)</text></svg>`,
          ELEVATION: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><text x="250" y="150" fill="#FFF" text-anchor="middle">STREETSCAPE & BOUNDARY WALL ELEVATION</text></svg>`,
          SECTION: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><text x="250" y="150" fill="#FFF" text-anchor="middle">SITE RETENTION & DRIVEWAY RAMP GRADIENT</text></svg>`,
          DETAIL: `<svg viewBox="0 0 500 300" class="w-full max-h-[300px] stroke-white fill-none font-mono text-[9px]"><text x="250" y="150" fill="#FFF" text-anchor="middle">STORMWATER GULLY & ENTRANCE GRATE</text></svg>`
        }
      }
    };

    let currentActiveProject = 1;

    function openProjectModal(id) {
      currentActiveProject = id;
      const data = projectData[id];
      if (!data) return;

      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalCategory').textContent = data.category;
      document.getElementById('modalMetaLocation').textContent = data.location;
      document.getElementById('modalMetaScope').textContent = data.scope;
      document.getElementById('modalMetaSoftware').textContent = data.software;
      document.getElementById('modalMetaStatus').textContent = data.status;
      document.getElementById('modalRequirement').textContent = data.requirement;
      document.getElementById('modalApproach').textContent = data.approach;
      document.getElementById('modalConsid1').textContent = data.consid1;
      document.getElementById('modalConsid2').textContent = data.consid2;
      document.getElementById('modalConsid3').textContent = data.consid3;
      document.getElementById('modalOutcome').textContent = data.outcome;

      switchModalDrawing('PLAN');

      const modal = document.getElementById('projectModal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.classList.add('overflow-hidden');
    }

    function switchModalDrawing(viewKey) {
      const data = projectData[currentActiveProject];
      if (!data || !data.drawings[viewKey]) return;

      document.getElementById('modalDrawingCanvas').innerHTML = data.drawings[viewKey];

      // Update Tab button states
      document.querySelectorAll('.modal-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-view') === viewKey) {
          btn.classList.remove('bg-gray-800', 'text-gray-300');
          btn.classList.add('bg-blue-600', 'text-white');
        } else {
          btn.classList.remove('bg-blue-600', 'text-white');
          btn.classList.add('bg-gray-800', 'text-gray-300');
        }
      });
    }

    function closeProjectModal() {
      const modal = document.getElementById('projectModal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    }

    // Close on backdrop click
    document.getElementById('projectModal').addEventListener('click', (e) => {
      if (e.target.id === 'projectModal') closeProjectModal();
    });

    // 6. RESUME MODAL SYSTEM
    function openResumeModal() {
      const modal = document.getElementById('resumeModal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.classList.add('overflow-hidden');
    }

    function closeResumeModal() {
      const modal = document.getElementById('resumeModal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    }

    document.getElementById('resumeModal').addEventListener('click', (e) => {
      if (e.target.id === 'resumeModal') closeResumeModal();
    });

    // 7. CONTACT FORM SUBMISSION HANDLER
    function handleContactSubmit(e) {
      e.preventDefault();
      const form = document.getElementById('contactForm');
      const successMsg = document.getElementById('formSuccessMessage');
      
      // Simulate prompt delivery
      form.reset();
      successMsg.classList.remove('hidden');
      setTimeout(() => {
        successMsg.classList.add('hidden');
      }, 7000);
    }

    // Keyboard navigation (ESC to close modals)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProjectModal();
        closeResumeModal();
      }
    });
