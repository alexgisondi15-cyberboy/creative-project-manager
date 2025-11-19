import React, { useState, useRef } from 'react';
import { Plus, X, DollarSign, BookOpen, Target, Circle, CheckCircle, Image, Link, FileText, Move, Upload, FolderOpen, Cloud, HardDrive } from 'lucide-react';

export default function CreativeProjectManager() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Brand Design Project',
      budget: { 
        total: 5000, 
        spent: 1200,
        categories: [
          { id: 1, name: 'Equipment', budgeted: 1500, spent: 800 },
          { id: 2, name: 'Software', budgeted: 500, spent: 400 },
          { id: 3, name: 'Contractors', budgeted: 2000, spent: 0 },
          { id: 4, name: 'Marketing', budgeted: 1000, spent: 0 }
        ]
      },
      expenses: [
        { id: 1, date: '2024-11-10', description: 'Camera rental', amount: 500, category: 'Equipment', receipt: '' },
        { id: 2, date: '2024-11-12', description: 'Adobe CC subscription', amount: 55, category: 'Software', receipt: '' }
      ],
      income: [
        { id: 1, date: '2024-11-01', source: 'Client deposit', amount: 2500, status: 'received' },
        { id: 2, date: '2024-12-15', source: 'Final payment', amount: 2500, status: 'pending' }
      ],
      hourly: {
        rate: 75,
        hoursLogged: 16,
        entries: [
          { id: 1, date: '2024-11-10', hours: 8, description: 'Initial concepts and sketches' },
          { id: 2, date: '2024-11-12', hours: 8, description: 'Client revisions' }
        ]
      },
      milestones: [
        { id: 1, text: 'Initial concept approved', completed: true, date: '2024-01-15' },
        { id: 2, text: 'Final delivery', completed: false, date: '2024-02-28' }
      ],
      resources: [],
      team: [
        { id: 1, name: 'Sarah Chen', role: 'Designer', email: 'sarah@example.com' }
      ],
      scrapbook: [
        { id: 1, type: 'note', content: 'Brutalist architecture influences - raw concrete, exposed structures', color: '#f3f4f6', x: 50, y: 50, width: 200, height: 150 },
        { id: 2, type: 'link', url: 'https://example.com', title: 'Reference: Swiss Design Principles', notes: 'Grid systems, typography', x: 300, y: 100, width: 220, height: 120 }
      ],
      files: [
        { id: 1, name: 'brand_mockup_v2.psd', size: '45.2 MB', type: 'PSD', uploadDate: '2024-11-10', url: '#', source: 'local' }
      ],
      connectedStorage: {
        googleDrive: { connected: false, folderId: null },
        dropbox: { connected: false, folderId: null },
        weTransfer: { connected: false }
      }
    }
  ]);

  const defaultResources = [
    // Design & Software
    { category: 'Design Software', title: 'Adobe Creative Cloud Tutorials', url: 'https://helpx.adobe.com/creative-cloud/tutorials-explore.html' },
    { category: 'Design Software', title: 'Figma Learn', url: 'https://help.figma.com/hc/en-us/categories/360002051613-Get-started' },
    
    // Art Theory & History
    { category: 'Art Theory', title: 'The Story of Art by E.H. Gombrich', url: 'https://www.amazon.com/Story-Art-H-Gombrich/dp/0714832472' },
    { category: 'Art Theory', title: 'Ways of Seeing by John Berger', url: 'https://www.amazon.com/Ways-Seeing-Based-BBC-Television/dp/0140135154' },
    { category: 'Art Theory', title: 'Art History Timeline - Khan Academy', url: 'https://www.khanacademy.org/humanities/art-history' },
    { category: 'Art Theory', title: 'Understanding Art Movements', url: 'https://www.theartstory.org/movements-timeline.htm' },
    
    // Critical Thinking & Research
    { category: 'Research Methods', title: 'How to Read a Book by Mortimer Adler', url: 'https://www.amazon.com/How-Read-Book-Classic-Intelligent/dp/0671212095' },
    { category: 'Research Methods', title: 'Media Literacy Resources - Center for Media Literacy', url: 'https://www.medialit.org/' },
    { category: 'Research Methods', title: 'Evaluating Sources - Cornell Library', url: 'https://guides.library.cornell.edu/evaluate' },
    { category: 'Research Methods', title: 'CRAAP Test for Source Evaluation', url: 'https://library.csuchico.edu/help/source-or-information-good' },
    
    // Economics & Art Business
    { category: 'Economics & Business', title: 'The War of Art by Steven Pressfield', url: 'https://www.amazon.com/War-Art-Through-Creative-Battles/dp/1936891026' },
    { category: 'Economics & Business', title: 'Art/Work by Heather Bhandari', url: 'https://www.amazon.com/Art-Work-Revised-Updated-Everything/dp/1439819319' },
    { category: 'Economics & Business', title: 'Understanding Art Market Economics', url: 'https://www.artsy.net/article/artsy-editorial-art-market-explained' },
    
    // Political & Social Context
    { category: 'Political Context', title: 'A People\'s History of the United States by Howard Zinn', url: 'https://www.amazon.com/Peoples-History-United-States/dp/0060838655' },
    { category: 'Political Context', title: 'The Shock Doctrine by Naomi Klein', url: 'https://www.amazon.com/Shock-Doctrine-Rise-Disaster-Capitalism/dp/0312427999' },
    { category: 'Political Context', title: 'Critical Race Theory: An Introduction', url: 'https://www.amazon.com/Critical-Race-Theory-Introduction-Third/dp/147980276X' },
    
    // Videography - Technical
    { category: 'Videography', title: 'In the Blink of an Eye by Walter Murch', url: 'https://www.amazon.com/Blink-Eye-Perspective-Film-Editing/dp/1879505622' },
    { category: 'Videography', title: 'Cinematography Theory - Shot Composition', url: 'https://www.studiobinder.com/blog/rules-of-shot-composition-in-film/' },
    { category: 'Videography', title: 'Understanding Camera Movement', url: 'https://nofilmschool.com/camera-movement' },
    { category: 'Videography', title: 'The 180 Degree Rule Explained', url: 'https://www.masterclass.com/articles/180-degree-rule-explained' },
    
    // Camera & Gear
    { category: 'Camera Equipment', title: 'Understanding Camera Sensors: Full Frame vs Crop', url: 'https://www.bhphotovideo.com/explora/photography/tips-and-solutions/understanding-crop-factor' },
    { category: 'Camera Equipment', title: 'Cinema5D - Camera Reviews & Tests', url: 'https://www.cinema5d.com/' },
    { category: 'Camera Equipment', title: 'DPReview - In-Depth Camera Analysis', url: 'https://www.dpreview.com/' },
    
    // Lighting
    { category: 'Lighting', title: 'Set Lighting Technician\'s Handbook by Harry Box', url: 'https://www.amazon.com/Set-Lighting-Technicians-Handbook-Distribution/dp/0415812763' },
    { category: 'Lighting', title: '3-Point Lighting Fundamentals', url: 'https://www.studiobinder.com/blog/three-point-lighting/' },
    { category: 'Lighting', title: 'Fashion Photography Lighting Setups', url: 'https://www.profoto.com/int/learn/fashion-photography-lighting' },
    { category: 'Lighting', title: 'Understanding Color Temperature & Kelvin', url: 'https://www.bhphotovideo.com/explora/video/tips-and-solutions/understanding-color-temperature' },
    
    // Audio
    { category: 'Audio', title: 'Sound Design by David Sonnenschein', url: 'https://www.amazon.com/Sound-Design-Expressive-Power-Music/dp/1615931201' },
    { category: 'Audio', title: 'The Recordist - Sound Effects Library & Education', url: 'https://www.therecordist.com/' },
    { category: 'Audio', title: 'Understanding Microphone Polar Patterns', url: 'https://www.shure.com/en-US/performance-production/louder/how-to-choose-the-right-microphone-polar-pattern' },
    { category: 'Audio', title: 'Audio Engineering Society Resources', url: 'https://www.aes.org/' },
    
    // Fashion
    { category: 'Fashion', title: 'The Fashion System by Roland Barthes', url: 'https://www.amazon.com/Fashion-System-Roland-Barthes/dp/0520071735' },
    { category: 'Fashion', title: 'Fashion Theory Journal', url: 'https://www.tandfonline.com/toc/rfft20/current' },
    { category: 'Fashion', title: 'Fashion Photography Equipment Guide', url: 'https://www.bhphotovideo.com/explora/photography/buying-guide/fashion-photography-equipment' },
    { category: 'Fashion', title: 'Understanding Fashion Cycles & Trends', url: 'https://www.businessoffashion.com/' },
    
    // Podcasting
    { category: 'Podcasting', title: 'Out on the Wire by Jessica Abel', url: 'https://www.amazon.com/Out-Wire-Storytelling-Secrets-Masters/dp/0385348436' },
    { category: 'Podcasting', title: 'Transom - Public Radio Storytelling', url: 'https://transom.org/' },
    { category: 'Podcasting', title: 'Podcast Equipment Recommendations', url: 'https://podcastengineeringschool.com/podcast-equipment/' },
    { category: 'Podcasting', title: 'NPR Training - Audio Storytelling', url: 'https://training.npr.org/' },
    
    // Music Production
    { category: 'Music Production', title: 'The Mixing Engineer\'s Handbook by Bobby Owsinski', url: 'https://www.amazon.com/Mixing-Engineers-Handbook-4th/dp/0998503304' },
    { category: 'Music Production', title: 'Recording Hip-Hop: Techniques & Equipment', url: 'https://www.soundonsound.com/techniques/recording-hip-hop' },
    { category: 'Music Production', title: 'Recording Rock Music: Mic Placement Guide', url: 'https://www.soundonsound.com/techniques/recording-rock-music' },
    { category: 'Music Production', title: 'Jazz Recording Techniques', url: 'https://www.gearank.com/guides/recording-jazz' },
    { category: 'Music Production', title: 'Electronic Music Production - Syntorial', url: 'https://www.syntorial.com/' },
    
    // Screenwriting
    { category: 'Screenwriting', title: 'Save the Cat by Blake Snyder', url: 'https://www.amazon.com/Save-Last-Book-Screenwriting-Youll/dp/1932907009' },
    { category: 'Screenwriting', title: 'Story by Robert McKee', url: 'https://www.amazon.com/Story-Substance-Structure-Principles-Screenwriting/dp/0060391685' },
    { category: 'Screenwriting', title: 'The Screenwriter\'s Bible by David Trottier', url: 'https://www.amazon.com/Screenwriters-Bible-7th-Complete-Formatting/dp/1935247107' },
    { category: 'Screenwriting', title: 'Script Format & Industry Standards', url: 'https://www.finaldraft.com/learn/screenplay-format/' },
    
    // Conceptual Development
    { category: 'Concept Development', title: 'Art & Fear by David Bayles', url: 'https://www.amazon.com/Art-Fear-Observations-Rewards-Artmaking/dp/0961454733' },
    { category: 'Concept Development', title: 'The Artist\'s Way by Julia Cameron', url: 'https://www.amazon.com/Artists-Way-25th-Anniversary/dp/0143129252' },
    { category: 'Concept Development', title: 'Steal Like an Artist by Austin Kleon', url: 'https://www.amazon.com/Steal-Like-Artist-Things-Creative/dp/0761169253' },
    { category: 'Concept Development', title: 'Finding Your Artistic Voice - Creative Live', url: 'https://www.creativelive.com/class/finding-your-artistic-voice' },
    
    // Thesis & Critical Framework
    { category: 'Thesis Development', title: 'The Craft of Research by Booth, Colomb & Williams', url: 'https://www.amazon.com/Research-Chicago-Writing-Editing-Publishing/dp/022623973X' },
    { category: 'Thesis Development', title: 'Critical Theory: A Very Short Introduction', url: 'https://www.amazon.com/Critical-Theory-Very-Short-Introduction/dp/0192801708' },
    { category: 'Thesis Development', title: 'Artist Statement Workshop', url: 'https://www.gyst-ink.com/artist-statement-guidelines' },
    { category: 'Thesis Development', title: 'Developing Research Questions', url: 'https://writingcenter.unc.edu/tips-and-tools/research-questions/' }
  ];

  const freelancePlatforms = [
    { name: 'Upwork', url: 'https://www.upwork.com/', description: 'General freelancing across all creative fields' },
    { name: 'Fiverr', url: 'https://www.fiverr.com/', description: 'Quick gigs and creative services' },
    { name: 'Dribbble', url: 'https://dribbble.com/hiring', description: 'Designers and illustrators' },
    { name: 'Behance', url: 'https://www.behance.net/', description: 'Creative portfolios and hiring' },
    { name: 'Toptal', url: 'https://www.toptal.com/', description: 'Top 3% of freelance talent' },
    { name: '99designs', url: 'https://99designs.com/', description: 'Design contests and designers' },
    { name: 'Contra', url: 'https://contra.com/', description: 'Commission-free for independents' },
    { name: 'We Work Remotely', url: 'https://weworkremotely.com/', description: 'Remote creative jobs' }
  ];

  const diyInfo = [
    {
      category: 'Permits & Licenses',
      items: [
        { title: 'Special Event Permit', description: 'Required for public gatherings, festivals, and street events' },
        { title: 'Temporary Food Service Permit', description: 'Needed if serving food or beverages at your event' },
        { title: 'Film/Photography Permit', description: 'Required for commercial filming in public spaces' },
        { title: 'Noise Permit', description: 'For amplified sound after certain hours' },
        { title: 'Alcohol License', description: 'Temporary license for serving alcohol at events' }
      ]
    },
    {
      category: 'Venue Types',
      items: [
        { title: 'Community Centers', description: 'Affordable spaces with basic amenities, often city-owned' },
        { title: 'Art Galleries', description: 'Great for creative events, exhibitions, and launches' },
        { title: 'Warehouses', description: 'Raw spaces perfect for DIY transformation' },
        { title: 'Parks & Outdoor Spaces', description: 'Public spaces that usually require permits' },
        { title: 'Pop-up Spaces', description: 'Temporary retail or event spaces in vacant buildings' },
        { title: 'Co-working Spaces', description: 'Modern venues with built-in tech and amenities' }
      ]
    },
    {
      category: 'Resources',
      items: [
        { title: 'City/County Clerk Office', description: 'Start here for permit information and applications' },
        { title: 'Chamber of Commerce', description: 'Business resources and local networking' },
        { title: 'Local Arts Council', description: 'Grants, spaces, and support for creative projects' },
        { title: 'Small Business Development Center', description: 'Free consulting and business resources' },
        { title: 'Peerspace', description: 'Online marketplace for unique venue rentals' }
      ]
    }
  ];
  
  const [activeProject, setActiveProject] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [activeTab, setActiveTab] = useState('project'); // 'project', 'resources', 'freelancers', 'diy'

  const addProject = () => {
    if (newProjectName.trim()) {
      setProjects([...projects, {
        id: Date.now(),
        name: newProjectName,
        budget: { 
          total: 0, 
          spent: 0,
          categories: []
        },
        expenses: [],
        income: [],
        hourly: {
          rate: 0,
          hoursLogged: 0,
          entries: []
        },
        milestones: [],
        resources: [],
        team: [],
        scrapbook: [],
        files: [],
        connectedStorage: {
          googleDrive: { connected: false, folderId: null },
          dropbox: { connected: false, folderId: null },
          weTransfer: { connected: false }
        }
      }]);
      setNewProjectName('');
    }
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
    if (activeProject === projectId) setActiveProject(null);
  };

  const updateBudget = (projectId, field, value) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, budget: { ...p.budget, [field]: parseFloat(value) || 0 } } : p
    ));
  };

  const addBudgetCategory = (projectId, name, budgeted) => {
    if (!name.trim()) return;
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        budget: {
          ...p.budget,
          categories: [...p.budget.categories, { id: Date.now(), name, budgeted: parseFloat(budgeted) || 0, spent: 0 }]
        }
      } : p
    ));
  };

  const deleteBudgetCategory = (projectId, categoryId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        budget: {
          ...p.budget,
          categories: p.budget.categories.filter(c => c.id !== categoryId)
        }
      } : p
    ));
  };

  const addExpense = (projectId, expense) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const updatedCategories = p.budget.categories.map(cat => 
          cat.name === expense.category 
            ? { ...cat, spent: cat.spent + parseFloat(expense.amount) }
            : cat
        );
        return {
          ...p,
          expenses: [...p.expenses, { ...expense, id: Date.now() }],
          budget: {
            ...p.budget,
            spent: p.budget.spent + parseFloat(expense.amount),
            categories: updatedCategories
          }
        };
      }
      return p;
    }));
  };

  const deleteExpense = (projectId, expenseId, amount, category) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const updatedCategories = p.budget.categories.map(cat => 
          cat.name === category 
            ? { ...cat, spent: Math.max(0, cat.spent - parseFloat(amount)) }
            : cat
        );
        return {
          ...p,
          expenses: p.expenses.filter(e => e.id !== expenseId),
          budget: {
            ...p.budget,
            spent: Math.max(0, p.budget.spent - parseFloat(amount)),
            categories: updatedCategories
          }
        };
      }
      return p;
    }));
  };

  const addIncome = (projectId, income) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        income: [...p.income, { ...income, id: Date.now() }]
      } : p
    ));
  };

  const deleteIncome = (projectId, incomeId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        income: p.income.filter(i => i.id !== incomeId)
      } : p
    ));
  };

  const updateIncomeStatus = (projectId, incomeId, status) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        income: p.income.map(i => i.id === incomeId ? { ...i, status } : i)
      } : p
    ));
  };

  const updateHourlyRate = (projectId, rate) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        hourly: { ...p.hourly, rate: parseFloat(rate) || 0 }
      } : p
    ));
  };

  const addTimeEntry = (projectId, entry) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        hourly: {
          ...p.hourly,
          hoursLogged: p.hourly.hoursLogged + parseFloat(entry.hours),
          entries: [...p.hourly.entries, { ...entry, id: Date.now() }]
        }
      } : p
    ));
  };

  const deleteTimeEntry = (projectId, entryId, hours) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        hourly: {
          ...p.hourly,
          hoursLogged: Math.max(0, p.hourly.hoursLogged - parseFloat(hours)),
          entries: p.hourly.entries.filter(e => e.id !== entryId)
        }
      } : p
    ));
  };

  const addFile = (projectId, file) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        files: [...p.files, { ...file, id: Date.now() }]
      } : p
    ));
  };

  const deleteFile = (projectId, fileId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        files: p.files.filter(f => f.id !== fileId)
      } : p
    ));
  };

  const toggleStorage = (projectId, service) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        connectedStorage: {
          ...p.connectedStorage,
          [service]: {
            ...p.connectedStorage[service],
            connected: !p.connectedStorage[service].connected
          }
        }
      } : p
    ));
  };

  const addMilestone = (projectId, text, date) => {
    if (!text.trim()) return;
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        milestones: [...p.milestones, { id: Date.now(), text, completed: false, date }]
      } : p
    ));
  };

  const toggleMilestone = (projectId, milestoneId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        milestones: p.milestones.map(m => 
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        )
      } : p
    ));
  };

  const deleteMilestone = (projectId, milestoneId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        milestones: p.milestones.filter(m => m.id !== milestoneId)
      } : p
    ));
  };

  const addResource = (projectId, title, url) => {
    if (!title.trim()) return;
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        resources: [...p.resources, { id: Date.now(), title, url }]
      } : p
    ));
  };

  const deleteResource = (projectId, resourceId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        resources: p.resources.filter(r => r.id !== resourceId)
      } : p
    ));
  };

  const addTeamMember = (projectId, name, role, email) => {
    if (!name.trim()) return;
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        team: [...p.team, { id: Date.now(), name, role, email }]
      } : p
    ));
  };

  const deleteTeamMember = (projectId, memberId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        team: p.team.filter(m => m.id !== memberId)
      } : p
    ));
  };

  const getAllTeamMembers = () => {
    const allMembers = [];
    projects.forEach(project => {
      project.team.forEach(member => {
        if (!allMembers.find(m => m.email === member.email)) {
          allMembers.push({
            ...member,
            projects: projects.filter(p => p.team.some(tm => tm.email === member.email)).map(p => p.name)
          });
        }
      });
    });
    return allMembers;
  };

  const addScrapbookItem = (projectId, type, data) => {
    const randomX = Math.floor(Math.random() * 600);
    const randomY = Math.floor(Math.random() * 400);
    const defaultWidth = type === 'image' ? 250 : 200;
    const defaultHeight = type === 'image' ? 200 : 150;
    
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        scrapbook: [...p.scrapbook, { 
          id: Date.now(), 
          type, 
          x: randomX, 
          y: randomY,
          width: defaultWidth,
          height: defaultHeight,
          ...data 
        }]
      } : p
    ));
  };

  const deleteScrapbookItem = (projectId, itemId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        scrapbook: p.scrapbook.filter(item => item.id !== itemId)
      } : p
    ));
  };

  const updateScrapbookItem = (projectId, itemId, updates) => {
    setProjects(projects.map(p => 
      p.id === projectId ? {
        ...p,
        scrapbook: p.scrapbook.map(item => 
          item.id === itemId ? { ...item, ...updates } : item
        )
      } : p
    ));
  };

  const project = projects.find(p => p.id === activeProject);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Projects</h1>
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('project')}
              className={`text-sm pb-2 border-b-2 ${
                activeTab === 'project' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              My Projects
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`text-sm pb-2 border-b-2 ${
                activeTab === 'resources' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Learning Resources
            </button>
            <button
              onClick={() => setActiveTab('freelancers')}
              className={`text-sm pb-2 border-b-2 ${
                activeTab === 'freelancers' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Find Freelancers
            </button>
            <button
              onClick={() => setActiveTab('diy')}
              className={`text-sm pb-2 border-b-2 ${
                activeTab === 'diy' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              DIY Events
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`text-sm pb-2 border-b-2 ${
                activeTab === 'team' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Team Overview
            </button>
            <button
              onClick={() => setActiveTab('scrapbook')}
              className={`text-sm pb-2 border-b-2 ${
                activeTab === 'scrapbook' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Scrapbook
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`text-sm pb-2 border-b-2 ${
                activeTab === 'files' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Files & Storage
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar - Project List */}
          {(activeTab === 'project' || activeTab === 'scrapbook' || activeTab === 'files') && (
            <div className="col-span-3">
              <div className="mb-6">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addProject()}
                  placeholder="New project"
                  className="w-full px-3 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-gray-900"
                />
                <button
                  onClick={addProject}
                  className="mt-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              <div className="space-y-1">
                {projects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProject(p.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded ${
                      activeProject === p.id ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={(activeTab === 'project' || activeTab === 'scrapbook' || activeTab === 'files') ? 'col-span-9' : 'col-span-12'}>
            {activeTab === 'project' && project ? (
              <div>
                {/* Project Header */}
                <div className="flex justify-between items-start mb-8">
                  <h2 className="text-3xl font-light text-gray-900">{project.name}</h2>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-gray-400 hover:text-gray-900"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Budget Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign size={18} className="text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-900">Financial Overview</h3>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="p-4 border border-gray-200 rounded">
                      <div className="text-xs text-gray-500 mb-1">Total Budget</div>
                      <div className="text-xl font-light text-gray-900">${project.budget.total.toFixed(2)}</div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded">
                      <div className="text-xs text-gray-500 mb-1">Spent</div>
                      <div className="text-xl font-light text-red-600">${project.budget.spent.toFixed(2)}</div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded">
                      <div className="text-xs text-gray-500 mb-1">Remaining</div>
                      <div className="text-xl font-light text-green-600">${(project.budget.total - project.budget.spent).toFixed(2)}</div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded">
                      <div className="text-xs text-gray-500 mb-1">Expected Income</div>
                      <div className="text-xl font-light text-gray-900">
                        ${project.income.reduce((sum, i) => sum + (i.status === 'received' ? i.amount : 0), 0).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        of ${project.income.reduce((sum, i) => sum + i.amount, 0).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Profit Calculation */}
                  <div className="p-4 bg-gray-50 rounded mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">Projected Profit/Loss</div>
                        <div className="text-xs text-gray-500">
                          Income received - Total spent = Net
                        </div>
                      </div>
                      <div className={`text-2xl font-light ${
                        (project.income.reduce((sum, i) => sum + (i.status === 'received' ? i.amount : 0), 0) - project.budget.spent) >= 0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        ${(project.income.reduce((sum, i) => sum + (i.status === 'received' ? i.amount : 0), 0) - project.budget.spent).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Time Tracking Summary */}
                  {project.hourly.rate > 0 && (
                    <div className="p-4 bg-blue-50 rounded mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">Time Value</div>
                          <div className="text-xs text-gray-500">
                            {project.hourly.hoursLogged} hours × ${project.hourly.rate}/hr
                          </div>
                        </div>
                        <div className="text-2xl font-light text-blue-600">
                          ${(project.hourly.hoursLogged * project.hourly.rate).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Set Total Budget */}
                  <div className="mb-6">
                    <label className="block text-xs text-gray-500 mb-2">Total Project Budget</label>
                    <input
                      type="number"
                      value={project.budget.total}
                      onChange={(e) => updateBudget(project.id, 'total', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    />
                  </div>

                  {/* Budget Categories */}
                  <div className="mb-6">
                    <h4 className="text-xs font-medium text-gray-900 mb-3">Budget by Category</h4>
                    <div className="space-y-2 mb-3">
                      {project.budget.categories.map(cat => {
                        const percentSpent = cat.budgeted > 0 ? (cat.spent / cat.budgeted) * 100 : 0;
                        return (
                          <div key={cat.id} className="p-3 border border-gray-200 rounded">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{cat.name}</div>
                                <div className="text-xs text-gray-500">
                                  ${cat.spent.toFixed(2)} of ${cat.budgeted.toFixed(2)}
                                </div>
                              </div>
                              <button
                                onClick={() => deleteBudgetCategory(project.id, cat.id)}
                                className="text-gray-400 hover:text-gray-900"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${percentSpent > 100 ? 'bg-red-500' : percentSpent > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                style={{ width: `${Math.min(percentSpent, 100)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <AddBudgetCategoryForm onAdd={(name, budgeted) => addBudgetCategory(project.id, name, budgeted)} />
                  </div>

                  {/* Expenses */}
                  <div className="mb-6">
                    <h4 className="text-xs font-medium text-gray-900 mb-3">Expenses</h4>
                    <div className="space-y-2 mb-3">
                      {project.expenses.map(expense => (
                        <div key={expense.id} className="flex items-center gap-3 p-2 border border-gray-200 rounded text-xs">
                          <div className="text-gray-500">{expense.date}</div>
                          <div className="flex-1 text-gray-900">{expense.description}</div>
                          <div className="text-gray-500">{expense.category}</div>
                          <div className="font-medium text-gray-900">${expense.amount.toFixed(2)}</div>
                          <button
                            onClick={() => deleteExpense(project.id, expense.id, expense.amount, expense.category)}
                            className="text-gray-400 hover:text-gray-900"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <AddExpenseForm 
                      categories={project.budget.categories.map(c => c.name)}
                      onAdd={(expense) => addExpense(project.id, expense)} 
                    />
                  </div>

                  {/* Income */}
                  <div className="mb-6">
                    <h4 className="text-xs font-medium text-gray-900 mb-3">Income & Payments</h4>
                    <div className="space-y-2 mb-3">
                      {project.income.map(income => (
                        <div key={income.id} className="flex items-center gap-3 p-2 border border-gray-200 rounded text-xs">
                          <div className="text-gray-500">{income.date}</div>
                          <div className="flex-1 text-gray-900">{income.source}</div>
                          <div className="font-medium text-green-600">${income.amount.toFixed(2)}</div>
                          <select
                            value={income.status}
                            onChange={(e) => updateIncomeStatus(project.id, income.id, e.target.value)}
                            className="px-2 py-1 border border-gray-200 rounded text-xs"
                          >
                            <option value="pending">Pending</option>
                            <option value="received">Received</option>
                          </select>
                          <button
                            onClick={() => deleteIncome(project.id, income.id)}
                            className="text-gray-400 hover:text-gray-900"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <AddIncomeForm onAdd={(income) => addIncome(project.id, income)} />
                  </div>

                  {/* Time Tracking */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 mb-3">Time Tracking</h4>
                    <div className="mb-3">
                      <label className="block text-xs text-gray-500 mb-1">Hourly Rate</label>
                      <input
                        type="number"
                        value={project.hourly.rate}
                        onChange={(e) => updateHourlyRate(project.id, e.target.value)}
                        placeholder="75"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                      />
                    </div>
                    <div className="space-y-2 mb-3">
                      {project.hourly.entries.map(entry => (
                        <div key={entry.id} className="flex items-center gap-3 p-2 border border-gray-200 rounded text-xs">
                          <div className="text-gray-500">{entry.date}</div>
                          <div className="flex-1 text-gray-900">{entry.description}</div>
                          <div className="text-gray-500">{entry.hours}h</div>
                          <div className="font-medium text-gray-900">${(entry.hours * project.hourly.rate).toFixed(2)}</div>
                          <button
                            onClick={() => deleteTimeEntry(project.id, entry.id, entry.hours)}
                            className="text-gray-400 hover:text-gray-900"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <AddTimeEntryForm onAdd={(entry) => addTimeEntry(project.id, entry)} />
                  </div>
                </div>

                {/* Milestones Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Target size={18} className="text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-900">Milestones</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    {project.milestones.map(milestone => (
                      <div key={milestone.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                        <button onClick={() => toggleMilestone(project.id, milestone.id)}>
                          {milestone.completed ? (
                            <CheckCircle size={18} className="text-gray-900" />
                          ) : (
                            <Circle size={18} className="text-gray-300" />
                          )}
                        </button>
                        <span className={`flex-1 text-sm ${milestone.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {milestone.text}
                        </span>
                        <span className="text-xs text-gray-400">{milestone.date}</span>
                        <button
                          onClick={() => deleteMilestone(project.id, milestone.id)}
                          className="text-gray-400 hover:text-gray-900"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <AddMilestoneForm onAdd={(text, date) => addMilestone(project.id, text, date)} />
                </div>

                {/* Resources Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={18} className="text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-900">Learning Resources</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    {project.resources.map(resource => (
                      <div key={resource.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-sm text-gray-900 hover:underline"
                        >
                          {resource.title}
                        </a>
                        <button
                          onClick={() => deleteResource(project.id, resource.id)}
                          className="text-gray-400 hover:text-gray-900"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <AddResourceForm onAdd={(title, url) => addResource(project.id, title, url)} />
                </div>

                {/* Team Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Target size={18} className="text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-900">Team Members</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    {project.team.map(member => (
                      <div key={member.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-xs text-gray-500">{member.role} • {member.email}</div>
                        </div>
                        <button
                          onClick={() => deleteTeamMember(project.id, member.id)}
                          className="text-gray-400 hover:text-gray-900"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <AddTeamMemberForm onAdd={(name, role, email) => addTeamMember(project.id, name, role, email)} />
                </div>
              </div>
            ) : activeTab === 'project' ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-sm">Select a project or create a new one</p>
              </div>
            ) : null}

            {/* Scrapbook Tab */}
            {activeTab === 'scrapbook' && project ? (
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-2">{project.name}</h2>
                <p className="text-sm text-gray-500 mb-8">Scrapbook — Drag and arrange your inspiration</p>
                
                <ScrapbookCanvas 
                  items={project.scrapbook}
                  onDelete={(itemId) => deleteScrapbookItem(project.id, itemId)}
                  onUpdate={(itemId, updates) => updateScrapbookItem(project.id, itemId, updates)}
                />
                
                <AddScrapbookForm onAdd={(type, data) => addScrapbookItem(project.id, type, data)} />
              </div>
            ) : activeTab === 'scrapbook' ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-sm">Select a project to view its scrapbook</p>
              </div>
            ) : null}

            {/* Files Tab */}
            {activeTab === 'files' && project ? (
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-2">{project.name}</h2>
                <p className="text-sm text-gray-500 mb-8">Files & Storage</p>

                {/* Storage Connections */}
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-gray-900 mb-3">Connected Storage</h4>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <button
                      onClick={() => toggleStorage(project.id, 'googleDrive')}
                      className={`p-4 border-2 rounded text-center transition ${
                        project.connectedStorage.googleDrive.connected 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Cloud size={24} className={`mx-auto mb-2 ${
                        project.connectedStorage.googleDrive.connected ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-medium text-gray-900">Google Drive</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {project.connectedStorage.googleDrive.connected ? 'Connected' : 'Click to connect'}
                      </div>
                    </button>

                    <button
                      onClick={() => toggleStorage(project.id, 'dropbox')}
                      className={`p-4 border-2 rounded text-center transition ${
                        project.connectedStorage.dropbox.connected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Cloud size={24} className={`mx-auto mb-2 ${
                        project.connectedStorage.dropbox.connected ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-medium text-gray-900">Dropbox</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {project.connectedStorage.dropbox.connected ? 'Connected' : 'Click to connect'}
                      </div>
                    </button>

                    <button
                      onClick={() => toggleStorage(project.id, 'weTransfer')}
                      className={`p-4 border-2 rounded text-center transition ${
                        project.connectedStorage.weTransfer.connected 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Cloud size={24} className={`mx-auto mb-2 ${
                        project.connectedStorage.weTransfer.connected ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-medium text-gray-900">WeTransfer</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {project.connectedStorage.weTransfer.connected ? 'Connected' : 'Click to connect'}
                      </div>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Connect your cloud storage to access and share large files. All files sync automatically.
                  </p>
                </div>

                {/* Storage Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border border-gray-200 rounded">
                    <div className="text-xs text-gray-500 mb-1">Local Storage</div>
                    <div className="text-xl font-light text-gray-900">
                      {(project.files.reduce((sum, f) => sum + parseFloat(f.size), 0) / 1024).toFixed(2)} GB
                    </div>
                    <div className="text-xs text-gray-400 mt-1">of unlimited</div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded">
                    <div className="text-xs text-gray-500 mb-1">Files</div>
                    <div className="text-xl font-light text-gray-900">{project.files.length}</div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded">
                    <div className="text-xs text-gray-500 mb-1">Connections</div>
                    <div className="text-xl font-light text-gray-900">
                      {Object.values(project.connectedStorage).filter(s => s.connected).length}
                    </div>
                  </div>
                </div>

                {/* File List */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-900 mb-3">Project Files</h4>
                  <div className="space-y-2 mb-3">
                    {project.files.map(file => (
                      <div key={file.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded hover:bg-gray-50">
                        <FolderOpen size={20} className="text-gray-400" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{file.name}</div>
                          <div className="text-xs text-gray-500">
                            {file.type} • {file.size} • Uploaded {file.uploadDate}
                            {file.source !== 'local' && ` • From ${file.source}`}
                          </div>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-xs border border-gray-200 rounded hover:bg-gray-100"
                        >
                          Open
                        </a>
                        <button
                          onClick={() => deleteFile(project.id, file.id)}
                          className="text-gray-400 hover:text-gray-900"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    {project.files.length === 0 && (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        No files yet. Upload files or connect cloud storage above.
                      </div>
                    )}
                  </div>
                  <AddFileForm onAdd={(file) => addFile(project.id, file)} />
                </div>

                {/* Quick Links */}
                <div className="p-4 bg-gray-50 rounded">
                  <h4 className="text-xs font-medium text-gray-900 mb-3">File Transfer Services</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a href="https://wetransfer.com/" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded bg-white hover:bg-gray-50">
                      WeTransfer - Up to 200GB (Pro)
                    </a>
                    <a href="https://www.dropbox.com/transfer" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded bg-white hover:bg-gray-50">
                      Dropbox Transfer - Up to 100GB
                    </a>
                    <a href="https://www.swisstransfer.com/" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded bg-white hover:bg-gray-50">
                      Swiss Transfer - Up to 50GB free
                    </a>
                    <a href="https://www.masv.io/" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded bg-white hover:bg-gray-50">
                      MASV - Unlimited file size, pay per GB
                    </a>
                    <a href="https://send.tresorit.com/" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded bg-white hover:bg-gray-50">
                      Tresorit Send - Up to 5GB encrypted
                    </a>
                    <a href="https://www.hightail.com/" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded bg-white hover:bg-gray-50">
                      Hightail - Up to 250GB
                    </a>
                    <a href="https://filemail.com/" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded bg-white hover:bg-gray-50">
                      Filemail - Up to 50GB free, 1TB paid
                    </a>
                    <a href="https://www.mediafire.com/" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded bg-white hover:bg-gray-50">
                      MediaFire - Up to 1TB storage
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    <strong>For 1TB+ transfers:</strong> MASV (no file size limit), Filemail Pro (1TB), or use dedicated cloud storage like Google Drive/Dropbox with shared links.
                  </p>
                </div>
              </div>
            ) : activeTab === 'files' ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-sm">Select a project to manage its files</p>
              </div>
            ) : null}

            {/* Learning Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-8">Learning Resources</h2>
                <p className="text-sm text-gray-600 mb-8">Deep educational resources for serious creatives - theory, technique, and critical thinking</p>
                
                {['Design Software', 'Art Theory', 'Research Methods', 'Economics & Business', 'Political Context', 
                  'Videography', 'Camera Equipment', 'Lighting', 'Audio', 'Fashion', 'Podcasting', 
                  'Music Production', 'Screenwriting', 'Concept Development', 'Thesis Development'].map(category => {
                  const categoryResources = defaultResources.filter(r => r.category === category);
                  if (categoryResources.length === 0) return null;
                  
                  return (
                    <div key={category} className="mb-8">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">{category}</h3>
                      <div className="space-y-2">
                        {categoryResources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 border border-gray-200 rounded hover:bg-gray-50 text-sm text-gray-900"
                          >
                            {resource.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Freelance Platforms Tab */}
            {activeTab === 'freelancers' && (
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-8">Find Freelancers</h2>
                <p className="text-sm text-gray-600 mb-8">Top platforms to hire creative talent</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {freelancePlatforms.map((platform, idx) => (
                    <a
                      key={idx}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-gray-200 rounded hover:bg-gray-50"
                    >
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{platform.name}</h3>
                      <p className="text-xs text-gray-500">{platform.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* DIY Events Tab */}
            {activeTab === 'diy' && (
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-8">DIY Events Guide</h2>
                <p className="text-sm text-gray-600 mb-8">Everything you need to know about organizing events in your city</p>
                
                {diyInfo.map((section, idx) => (
                  <div key={idx} className="mb-8">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">{section.category}</h3>
                    <div className="space-y-3">
                      {section.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="p-4 border border-gray-200 rounded">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="mt-8 p-4 bg-gray-50 rounded">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Pro Tips</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Start your permit applications 4-6 weeks before your event</li>
                    <li>• Contact your city's special events office early for guidance</li>
                    <li>• Check venue insurance requirements and liability coverage</li>
                    <li>• Budget for permits - they can range from $50 to $500+</li>
                    <li>• Consider joining local creative networks for venue recommendations</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Team Overview Tab */}
            {activeTab === 'team' && (
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-8">Team Overview</h2>
                <p className="text-sm text-gray-600 mb-8">See all team members across your projects</p>
                
                {getAllTeamMembers().length > 0 ? (
                  <div className="space-y-4">
                    {getAllTeamMembers().map((member, idx) => (
                      <div key={idx} className="p-4 border border-gray-200 rounded">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                            <p className="text-xs text-gray-500">{member.role} • {member.email}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-1">Working on:</p>
                          <div className="flex flex-wrap gap-2">
                            {member.projects.map((projectName, pIdx) => (
                              <span key={pIdx} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                                {projectName}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400">
                    <p className="text-sm">No team members added yet. Add team members to your projects to see them here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddMilestoneForm({ onAdd }) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = () => {
    onAdd(text, date);
    setText('');
    setDate('');
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        placeholder="Milestone name"
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <button
        onClick={handleAdd}
        className="px-3 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

function AddResourceForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleAdd = () => {
    onAdd(title, url);
    setTitle('');
    setUrl('');
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Resource title"
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <button
        onClick={handleAdd}
        className="px-3 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

function AddTeamMemberForm({ onAdd }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleAdd = () => {
    onAdd(name, role, email);
    setName('');
    setRole('');
    setEmail('');
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <button
        onClick={handleAdd}
        className="px-3 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

function AddBudgetCategoryForm({ onAdd }) {
  const [name, setName] = useState('');
  const [budgeted, setBudgeted] = useState('');

  const handleAdd = () => {
    onAdd(name, budgeted);
    setName('');
    setBudgeted('');
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        type="number"
        value={budgeted}
        onChange={(e) => setBudgeted(e.target.value)}
        placeholder="Amount"
        className="w-32 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <button
        onClick={handleAdd}
        className="px-3 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

function AddExpenseForm({ categories, onAdd }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    if (description.trim() && amount && category) {
      onAdd({ date, description, amount: parseFloat(amount), category });
      setDate(new Date().toISOString().split('T')[0]);
      setDescription('');
      setAmount('');
      setCategory('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      >
        <option value="">Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-32 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <button
        onClick={handleAdd}
        className="px-3 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

function AddIncomeForm({ onAdd }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('pending');

  const handleAdd = () => {
    if (source.trim() && amount) {
      onAdd({ date, source, amount: parseFloat(amount), status });
      setDate(new Date().toISOString().split('T')[0]);
      setSource('');
      setAmount('');
      setStatus('pending');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        type="text"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Source (e.g., Client deposit)"
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-32 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      >
        <option value="pending">Pending</option>
        <option value="received">Received</option>
      </select>
      <button
        onClick={handleAdd}
        className="px-3 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

function AddTimeEntryForm({ onAdd }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');

  const handleAdd = () => {
    if (description.trim() && hours) {
      onAdd({ date, description, hours: parseFloat(hours) });
      setDate(new Date().toISOString().split('T')[0]);
      setDescription('');
      setHours('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What did you work on?"
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <input
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        placeholder="Hours"
        step="0.5"
        className="w-24 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
      />
      <button
        onClick={handleAdd}
        className="px-3 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

function AddFileForm({ onAdd }) {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('local');

  const handleAdd = () => {
    if (name.trim() && size && type) {
      onAdd({ 
        name, 
        size, 
        type, 
        url: url || '#', 
        source,
        uploadDate: new Date().toISOString().split('T')[0]
      });
      setName('');
      setSize('');
      setType('');
      setUrl('');
      setSource('local');
    }
  };

  return (
    <div className="border border-gray-200 rounded p-3">
      <div className="flex items-center gap-2 mb-3">
        <Upload size={16} className="text-gray-400" />
        <span className="text-xs font-medium text-gray-900">Add File</span>
      </div>
      <div className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="File name (e.g., final_render_v3.mp4)"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type (PSD, MP4, PDF)"
            className="px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
          />
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Size (e.g., 45.2 MB)"
            className="px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
          />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="File URL (optional)"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
        />
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
        >
          <option value="local">Local Upload</option>
          <option value="Google Drive">Google Drive</option>
          <option value="Dropbox">Dropbox</option>
          <option value="WeTransfer">WeTransfer</option>
        </select>
        <button
          onClick={handleAdd}
          className="w-full px-3 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-700"
        >
          Add File
        </button>
      </div>
    </div>
  );
}

function ScrapbookCanvas({ items, onDelete, onUpdate }) {
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [resizing, setResizing] = useState(null);

  const handleMouseDown = (e, item) => {
    if (e.target.classList.contains('resize-handle')) {
      setResizing({ id: item.id, startX: e.clientX, startY: e.clientY, startWidth: item.width, startHeight: item.height });
    } else {
      setDragging({ id: item.id, startX: e.clientX - item.x, startY: e.clientY - item.y });
    }
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = Math.max(0, Math.min(e.clientX - rect.left - dragging.startX, rect.width - 100));
      const newY = Math.max(0, Math.min(e.clientY - rect.top - dragging.startY, rect.height - 100));
      onUpdate(dragging.id, { x: newX, y: newY });
    } else if (resizing) {
      const deltaX = e.clientX - resizing.startX;
      const deltaY = e.clientY - resizing.startY;
      const newWidth = Math.max(150, resizing.startWidth + deltaX);
      const newHeight = Math.max(100, resizing.startHeight + deltaY);
      onUpdate(resizing.id, { width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
  };

  return (
    <div className="mb-4">
      <div
        ref={canvasRef}
        className="relative w-full h-96 border-2 border-gray-200 rounded bg-gray-50 overflow-hidden mb-4"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {items.map(item => (
          <ScrapbookItem
            key={item.id}
            item={item}
            onMouseDown={(e) => handleMouseDown(e, item)}
            onDelete={() => onDelete(item.id)}
            onUpdate={(updates) => onUpdate(item.id, updates)}
          />
        ))}
        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm pointer-events-none">
            Your scrapbook canvas — add items below and drag them around
          </div>
        )}
      </div>
    </div>
  );
}

function ScrapbookItem({ item, onMouseDown, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const style = {
    position: 'absolute',
    left: `${item.x}px`,
    top: `${item.y}px`,
    width: `${item.width}px`,
    height: `${item.height}px`,
    cursor: 'move'
  };

  if (item.type === 'note') {
    return (
      <div
        style={{ ...style, backgroundColor: item.color || '#f3f4f6' }}
        className="p-3 rounded border-2 border-gray-300 shadow-lg group"
        onMouseDown={onMouseDown}
      >
        <div className="flex items-start justify-between mb-2">
          <Move size={14} className="text-gray-400" />
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-900"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <X size={14} />
          </button>
        </div>
        {isEditing ? (
          <textarea
            value={item.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="w-full h-full text-xs bg-transparent border-none focus:outline-none resize-none"
            onMouseDown={(e) => e.stopPropagation()}
          />
        ) : (
          <p
            onClick={() => setIsEditing(true)}
            onMouseDown={(e) => e.stopPropagation()}
            className="text-xs text-gray-700 cursor-text whitespace-pre-wrap overflow-auto h-full"
          >
            {item.content}
          </p>
        )}
        <div
          className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.2) 50%)' }}
        />
      </div>
    );
  }

  if (item.type === 'link') {
    return (
      <div
        style={style}
        className="p-3 rounded border-2 border-gray-300 bg-white shadow-lg group"
        onMouseDown={onMouseDown}
      >
        <div className="flex items-start justify-between mb-2">
          <Move size={14} className="text-gray-400" />
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-900"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <X size={14} />
          </button>
        </div>
        <Link size={14} className="text-gray-400 mb-2" />
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-gray-900 hover:underline block mb-1 overflow-hidden"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {item.title}
        </a>
        {item.notes && (
          <p className="text-xs text-gray-500 overflow-auto">{item.notes}</p>
        )}
        <div
          className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.2) 50%)' }}
        />
      </div>
    );
  }

  if (item.type === 'image') {
    return (
      <div
        style={style}
        className="rounded border-2 border-gray-300 bg-white shadow-lg group overflow-hidden"
        onMouseDown={onMouseDown}
      >
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between z-10">
          <Move size={14} className="text-white drop-shadow" />
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-white bg-gray-900 bg-opacity-50 rounded p-1"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <X size={14} />
          </button>
        </div>
        <img
          src={item.url}
          alt={item.caption || 'Scrapbook image'}
          className="w-full h-full object-cover"
          onMouseDown={(e) => e.stopPropagation()}
        />
        {item.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-white bg-opacity-90">
            <p className="text-xs text-gray-600">{item.caption}</p>
          </div>
        )}
        <div
          className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-white bg-opacity-50"
          style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.3) 50%)' }}
        />
      </div>
    );
  }

  return null;
}

function AddScrapbookForm({ onAdd }) {
  const [mode, setMode] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const [noteColor, setNoteColor] = useState('#f3f4f6');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkNotes, setLinkNotes] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');

  const handleAddNote = () => {
    if (noteContent.trim()) {
      onAdd('note', { content: noteContent, color: noteColor });
      setNoteContent('');
      setNoteColor('#f3f4f6');
      setMode(null);
    }
  };

  const handleAddLink = () => {
    if (linkUrl.trim() && linkTitle.trim()) {
      onAdd('link', { url: linkUrl, title: linkTitle, notes: linkNotes });
      setLinkUrl('');
      setLinkTitle('');
      setLinkNotes('');
      setMode(null);
    }
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      onAdd('image', { url: imageUrl, caption: imageCaption });
      setImageUrl('');
      setImageCaption('');
      setMode(null);
    }
  };

  if (!mode) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => setMode('note')}
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <FileText size={16} /> Add Note
        </button>
        <button
          onClick={() => setMode('link')}
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <Link size={16} /> Add Link
        </button>
        <button
          onClick={() => setMode('image')}
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <Image size={16} /> Add Image
        </button>
      </div>
    );
  }

  if (mode === 'note') {
    return (
      <div className="border border-gray-200 rounded p-3 space-y-2">
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Write your thoughts, ideas, observations..."
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400 resize-none"
          rows={3}
        />
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={noteColor}
            onChange={(e) => setNoteColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
          <button
            onClick={handleAddNote}
            className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-700"
          >
            Add Note
          </button>
          <button
            onClick={() => setMode(null)}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'link') {
    return (
      <div className="border border-gray-200 rounded p-3 space-y-2">
        <input
          type="url"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="URL"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
        />
        <input
          type="text"
          value={linkTitle}
          onChange={(e) => setLinkTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
        />
        <input
          type="text"
          value={linkNotes}
          onChange={(e) => setLinkNotes(e.target.value)}
          placeholder="Notes (optional)"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
        />
        <div className="flex gap-2">
          <button
            onClick={handleAddLink}
            className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-700"
          >
            Add Link
          </button>
          <button
            onClick={() => setMode(null)}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'image') {
    return (
      <div className="border border-gray-200 rounded p-3 space-y-2">
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
        />
        <input
          type="text"
          value={imageCaption}
          onChange={(e) => setImageCaption(e.target.value)}
          placeholder="Caption (optional)"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
        />
        <div className="flex gap-2">
          <button
            onClick={handleAddImage}
            className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-700"
          >
            Add Image
          </button>
          <button
            onClick={() => setMode(null)}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return null;
}