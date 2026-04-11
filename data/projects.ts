export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  overview: string;
  problem: string;
  objective: string;
  input: string;
  stack: string[];
  techStack: string[];
  workflow: string[];
  results: string;
  highlights: string[];
  screenshots: { title: string; description: string }[];
  challenges: string;
  learnings: string[];
  impact: string;
  links: {
    label: string;
    href: string;
    variant?: 'default' | 'secondary' | 'ghost';
  }[];
}

export const projectsData: ProjectData[] = [
  {
    slug: 'sales-performance-dashboard',
    title: 'Global Sales Analytics & Executive Dashboard',
    description:
      'End-to-end data analytics solution — from raw retail data to a two-page Power BI executive dashboard — delivering $2.29M revenue insights, KPI tracking, and actionable business recommendations.',
    overview:
      'This project simulates a real-world business analytics environment. Starting from 9,994+ raw retail sales records, I designed the full analytical workflow: business KPI definition, Python-based data cleaning, exploratory data analysis, SQL-driven KPI computation in SQLite, and a two-page interactive Power BI dashboard for executive decision-making. The focus was entirely on generating business value — not modeling.',
    problem:
      'Business stakeholders had no centralized visibility into revenue, profit, regional performance, or the relationship between discounting strategies and profitability. Decisions were made without structured KPI frameworks.',
    objective:
      'Design a full analytics pipeline that answers five core business questions — total revenue, regional performance, underperforming categories, discount impact, and customer segment contribution — and deliver the findings in an executive-ready dashboard.',
    input:
      'Retail sales dataset with 9,994+ records covering orders, customers, product categories, shipping details, discounts, and profit margins across multiple regions and years.',
    stack: ['Python', 'SQL', 'Power BI'],
    techStack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQLite', 'Power BI'],
    workflow: [
      'Business KPI design: defined Total Revenue, Profit, Margin, AOV, and Order Volume as core metrics',
      'Data cleaning in Python: resolved nulls, duplicates, and type inconsistencies across 9,994+ records',
      'Feature engineering: extracted Order Year, Order Month, and Profit Margin columns',
      'Exploratory data analysis: revenue trends, regional comparison, category profitability, discount correlation',
      'SQL analysis: loaded cleaned data into SQLite, wrote structured queries for KPI computation and validation',
      'Power BI dashboard: built two-page interactive report with slicers, KPI cards, trend lines, and scatter analysis'
    ],
    results:
      'Total Revenue: ~$2.29M | Total Profit: ~$286K | Profit Margin: ~12.47%. West region identified as the strongest performer. Furniture category flagged as high-sales but low-margin. High discount rates confirmed to significantly reduce profitability across all segments.',
    highlights: [
      'Two-page executive Power BI dashboard with interactive slicers',
      'Analyzed 9,994+ records with full cleaning and feature engineering pipeline',
      'Quantified discount-to-profit correlation — key strategic finding',
      'SQL KPI layer validated all Python insights independently',
      'Total Revenue $2.29M | Profit $286K | Margin 12.47% surfaced'
    ],
    impact:
      'Delivered a complete business analytics system that enables KPI-driven decision-making. Key recommendation: reducing aggressive discounting and refocusing on high-margin segments could meaningfully improve the 12.47% profit margin. The dashboard is directly presentable to business leadership without technical translation.',
    screenshots: [],
    challenges:
      'Maintaining analytical consistency between Python EDA, SQL aggregations, and the Power BI visual layer — ensuring numbers matched across three different tools and formats without discrepancies.',
    learnings: [
      'Business-focused analytics delivers more stakeholder value than pure modeling — knowing what questions to ask is the hardest part',
      'KPI design must happen before analysis, not after — it defines the entire shape of the work',
      'SQL validation of Python results is not redundant — it catches assumptions and builds trust in the numbers',
      'Dashboard storytelling is a distinct skill: the page structure, flow, and slicer design determine whether insights land'
    ],
    links: [
      { label: 'GitHub', href: '#', variant: 'ghost' }
    ]
  },

  {
    slug: 'employee-performance',
    title: 'Employee Performance & Attrition Prediction System',
    description:
      'Production-grade end-to-end ML platform — Apache Airflow pipelines, FastAPI prediction API, Great Expectations data validation, Grafana monitoring, and a Streamlit dashboard — predicting employee attrition at 85–92% accuracy.',
    overview:
      'A fully containerized machine learning system built to predict whether employees will leave or stay, with automated data ingestion, quality validation, real-time prediction APIs, and interactive dashboards. The system runs entirely on Docker Compose and deploys in under 5 minutes. It goes beyond a notebook — every component is production-ready: Airflow orchestrates pipelines, Great Expectations enforces data quality gates, FastAPI serves sub-200ms predictions, and Grafana tracks system health in real time.',
    problem:
      'HR teams relied on manual analysis and gut instinct for retention decisions, with no predictive capability and no automated data pipeline. High employee turnover carries a cost of up to $50,000 per resignation — making this a direct business problem, not just an analytics exercise.',
    objective:
      'Build a scalable, automated system that ingests employee data, validates it, trains and serves an attrition prediction model via REST API, and presents results through a user-friendly Streamlit interface — with full monitoring and alerting throughout.',
    input:
      'Synthetic and real employee records including Age, Gender, Job Role, Monthly Income, and Job Satisfaction score. Data enters the system via CSV files dropped into a watched directory, triggering the Airflow ingestion pipeline automatically.',
    stack: ['Python', 'Docker', 'Apache Airflow', 'FastAPI', 'Streamlit'],
    techStack: ['Scikit-learn', 'FastAPI', 'Apache Airflow', 'Streamlit', 'PostgreSQL', 'Great Expectations', 'Grafana', 'Redis', 'Docker Compose'],
    workflow: [
      'Data ingestion: Airflow DAG watches raw_data/ directory, triggers pipeline on new CSV files every minute',
      'Data validation: Great Expectations enforces schema, range checks (Age 18–70, Income 1K–100K), and categorical rules — routes to good_data/ or bad_data/',
      'Storage: validated records written to PostgreSQL; bad records logged separately for review',
      'Model training: Random Forest Classifier on 5 features with label encoding; achieves 85–92% accuracy with 0.85 F1-score',
      'Prediction API: FastAPI serves POST /predict endpoint with <200ms response, handles single and batch modes',
      'Frontend: Streamlit app provides single prediction form, CSV batch upload, historical analysis, and result visualization',
      'Monitoring: Grafana dashboards track data quality metrics, API response times, prediction confidence, and system health; Teams webhooks for real-time alerts'
    ],
    results:
      'Prediction accuracy: 85–92% | Precision: 88% | Recall: 83% | F1: 0.85. API processes 10,000+ records per minute with 99.9% uptime. Data validation passes 99.5% quality gate. System reduced manual HR analytics effort by 80% and enables proactive identification of at-risk employees before resignation.',
    highlights: [
      '85–92% attrition prediction accuracy with Random Forest Classifier',
      'Full Docker Compose deployment — entire system live in under 5 minutes',
      'Airflow DAG auto-ingests and validates data with Great Expectations quality gates',
      'FastAPI prediction endpoint — <200ms response, single and batch modes',
      'Grafana + Teams alerting for real-time monitoring and data quality tracking',
      'Business impact: up to $50,000 saved per prevented resignation'
    ],
    impact:
      'The system replaces manual HR analysis with an automated, always-on prediction platform. It enables proactive retention decisions at scale — identifying at-risk employees before they resign, reducing turnover by an estimated 25–40%, and cutting manual analytics effort by 80%. Every prediction is logged, traceable, and auditable.',
    screenshots: [],
    challenges:
      'Integrating six independent services — Airflow, FastAPI, Streamlit, PostgreSQL, Redis, and Grafana — into a single coherent Docker Compose system where each service depends correctly on the others, with proper health checks, retry logic, and data flow between them.',
    learnings: [
      'End-to-end ML systems are vastly more valuable than isolated models — deployment, monitoring, and data quality are where real-world projects succeed or fail',
      'Data validation is not optional: Great Expectations caught schema drift that would have silently degraded model accuracy',
      'Containerization forces you to think in services — it improves architecture discipline and makes the system reproducible by anyone',
      'Monitoring is a product requirement, not an afterthought — Grafana dashboards made the system trustworthy to non-technical stakeholders'
    ],
    links: [
      { label: 'GitHub', href: '#', variant: 'ghost' }
    ]
  },

  {
    slug: 'fake-news',
    title: 'AI Fake News Detection Platform',
    description:
      'Full-stack NLP system using an ensemble of LSTM, GRU, TextCNN, and BERT models combined with live web evidence scraping to classify news credibility with explainable, evidence-backed predictions.',
    overview:
      'A production-oriented fake news detection platform that combines deep learning model ensembles with contextual web evidence retrieval. Rather than a single model predicting credibility, the system layers multiple NLP architectures — LSTM for sequence patterns, GRU for temporal dependencies, TextCNN for local feature extraction, and BERT for contextual language understanding — then augments predictions with scraped web evidence to produce transparent, explainable results. Predictions are stored in PostgreSQL, served via FastAPI, and displayed in a Streamlit interface with full reasoning visible to the user.',
    problem:
      'News content spreads faster than it can be manually verified. A single model flagging text as "fake" or "real" without explanation provides no trust basis for users or journalists — it is a black box. The challenge was building a system that is both accurate and interpretable.',
    objective:
      'Build an NLP platform that classifies news credibility using ensemble deep learning, retrieves web evidence to contextualize the prediction, and presents results with clear reasoning — making AI-driven misinformation detection transparent and actionable.',
    input:
      'News headlines and article text as input. The system also retrieves real-time web content via evidence scraping to cross-reference claims against external sources during prediction.',
    stack: ['Python', 'NLP', 'FastAPI', 'Streamlit'],
    techStack: ['BERT', 'LSTM', 'GRU', 'TextCNN', 'TensorFlow', 'PyTorch', 'FastAPI', 'PostgreSQL', 'Streamlit'],
    workflow: [
      'Text preprocessing: tokenization, stopword removal, lemmatization, and sequence padding for model input',
      'Ensemble prediction: LSTM, GRU, and TextCNN run in parallel for sequence-based classification; BERT adds contextual language understanding',
      'Evidence retrieval: web scraping module queries external sources to find corroborating or contradicting content for the claim',
      'Prediction aggregation: ensemble outputs combined using weighted voting; confidence scores computed per model and overall',
      'Explainability layer: evidence snippets, model confidence breakdown, and reasoning summary surfaced to the user',
      'Storage: predictions, input text, confidence scores, and evidence links persisted to PostgreSQL for audit and analysis',
      'API + UI: FastAPI serves prediction endpoint; Streamlit displays classification result, confidence chart, and supporting evidence'
    ],
    results:
      'Ensemble approach outperforms any single model on credibility classification. BERT contributes the highest individual accuracy on nuanced language; LSTM and GRU capture sequential deception patterns; TextCNN detects sensationalist phrasing. Evidence retrieval adds a grounding layer that increases user trust in the output.',
    highlights: [
      'Four-model ensemble — LSTM, GRU, TextCNN, and BERT — for robust credibility classification',
      'Live web evidence scraping to contextualize and support every prediction',
      'Explainable AI output — confidence per model, evidence links, and plain-language reasoning',
      'Full-stack deployment: FastAPI backend, Streamlit UI, PostgreSQL persistence',
      'Addresses both accuracy and transparency — the two hardest problems in misinformation AI'
    ],
    impact:
      'The platform demonstrates that fake news detection does not have to be a black box. By combining multiple NLP architectures with external evidence, predictions become trustworthy and auditable — suitable for use by fact-checkers, newsrooms, or content moderation teams. The architecture is extensible to real-time social media monitoring.',
    screenshots: [],
    challenges:
      'Balancing prediction accuracy with explainability — more complex ensemble models improve accuracy but make it harder to explain to end users why a piece of content was flagged. The evidence retrieval layer was the bridge that made the output interpretable without sacrificing model depth.',
    learnings: [
      'Explainability is a product requirement in AI systems that affect trust decisions — accuracy alone is insufficient',
      'Ensemble models consistently outperform single models, but the architecture cost requires deliberate design',
      'Evidence retrieval transforms a classification output into a reasoning system — the difference between "this is fake" and "here is why we think so"',
      'Full-stack AI projects force you to think about UX, not just model performance — how results are presented matters as much as how they are computed'
    ],
    links: [
      { label: 'GitHub', href: '#', variant: 'ghost' }
    ]
  },

  {
    slug: 'darknet-analysis',
    title: 'Darknet Drug Trafficker Network Analysis',
    description:
      'Graph-based analysis of darknet activity to identify hidden relationships and criminal networks.',
    overview:
      'Used network analysis techniques to uncover connections between darknet users.',
    problem:
      'Hard to identify relationships in anonymous darknet environments.',
    objective:
      'Reveal patterns and connections using graph analytics.',
    input:
      'Darknet activity and interaction data.',
    stack: ['Python', 'NetworkX'],
    techStack: ['Python', 'NetworkX', 'Matplotlib'],
    workflow: [
      'Data extraction',
      'Graph construction',
      'Cluster analysis',
      'Visualization'
    ],
    results:
      'Identified key nodes and relationships in networks.',
    highlights: [
      'Graph modeling',
      'Network visualization',
      'Pattern discovery'
    ],
    impact:
      'Enabled identification of key actors in networks.',
    screenshots: [],
    challenges:
      'Handling incomplete and noisy data.',
    learnings: [
      'Graph analysis reveals hidden patterns',
      'Data cleaning is critical',
      'Visualization is powerful'
    ],
    links: [
      { label: 'GitHub', href: '#', variant: 'ghost' }
    ]
  },

  {
    slug: 'traffic-yolov8',
    title: 'Real-Time Traffic Monitoring using YOLOv8',
    description:
      'Computer vision system for detecting vehicles and analyzing traffic patterns in real time.',
    overview:
      'Developed a YOLOv8-based system to monitor road activity and detect traffic behavior.',
    problem:
      'Manual traffic monitoring is inefficient.',
    objective:
      'Automate traffic detection and analysis.',
    input:
      'Live video streams from traffic cameras.',
    stack: ['Python', 'YOLOv8', 'OpenCV'],
    techStack: ['YOLOv8', 'OpenCV', 'Deep Learning'],
    workflow: [
      'Video capture',
      'Object detection',
      'Tracking',
      'Analysis'
    ],
    results:
      'Detected vehicles and analyzed traffic flow.',
    highlights: [
      'Real-time detection',
      'Multi-object tracking',
      'Traffic insights'
    ],
    impact:
      'Improved monitoring efficiency with automation.',
    screenshots: [],
    challenges:
      'Balancing accuracy and performance.',
    learnings: [
      'Real-time CV requires optimization',
      'YOLO is powerful for detection',
      'Video data is complex'
    ],
    links: [
      { label: 'GitHub', href: '#', variant: 'ghost' }
    ]
  }
];