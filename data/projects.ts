export interface ProjectData {
  slug: string;
  title: string;
  /** Short label shown above the title, e.g. "Team project" */
  context?: string;
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
    slug: 'repeat-purchase-recovery',
    title: 'Repeat Purchase Recovery: E-Commerce Retention Analysis',
    context: 'Product analytics case study',
    description:
      'Why do only 3% of customers come back? A retention analysis of 93K Olist customers using a six-layer SQL pipeline, cohort analysis and scenario modelling, ending in three prioritised, testable retention plays.',
    overview:
      'An end-to-end product analytics case study on the Olist Brazilian E-Commerce dataset (Sep 2016 – Aug 2018). I built a six-layer SQLite pipeline of 20 analytical views, from cleaned base tables to customer-level marts and dashboard views, and validated it with 63 read-only checks. On top of it I analysed repeat purchasing, return timing, cohort retention, lifetime value and churn signals, then modelled the potential impact of three retention initiatives.',
    problem:
      'Only about 3% of customers placed a second order. Around 90,500 customers bought once and never returned, so growth depended almost entirely on acquiring new customers.',
    objective:
      'Answer three questions: when are customers most likely to return, which behavioural and operational signals are associated with repeat purchasing, and where should retention effort go for the biggest reach and value.',
    input:
      'Olist public e-commerce dataset (Kaggle): 7 of 9 source CSVs, delivered orders only, customers identified by customer_unique_id rather than the order-scoped customer_id.',
    stack: ['SQL', 'Python', 'Power BI'],
    techStack: ['SQLite', 'SQL', 'Python', 'pandas', 'NumPy', 'Matplotlib', 'Jupyter', 'Power BI'],
    workflow: [
      'Layer 1–2: cleaned base views and order-level aggregations',
      'Layer 3–4: customer-order fact table and order sequencing to identify first and repeat purchases',
      'Layer 5: customer-level marts for repeat status, retention cohorts, CLV, behavioural segments and churn signals',
      'Layer 6: dashboard-ready views feeding a Power BI report',
      'Validation: 63 read-only checks (V1–V63) to verify every layer',
      'Scenario analysis: sensitivity model for three retention initiatives under explicit assumptions'
    ],
    results:
      'Lifetime repeat rate 3.0% (2,801 repeat buyers out of 93,358 customers). Median time to second order: 29 days, with about half of repeat buyers returning within 30 days. Single-item first orders (90% of customers) repeat at 2.15% vs 5.38% for 6+ item baskets. Holiday-acquired cohorts retain at 1.55% vs 2.42% for mid-2017 cohorts. Repeat buyers spend 58% more over 90 days (R$253 vs R$161).',
    highlights: [
      '20-view SQL pipeline across 6 layers, validated by 63 checks',
      '93,358 customers and 96,478 delivered orders analysed',
      'Identified the first 30 days as the key intervention window',
      'Three prioritised retention plays: cross-sell, holiday re-engagement, delivery-delay recovery',
      'Combined scenario: ~928 additional repeat buyers, about +33% on the current base'
    ],
    impact:
      'Turned a 3% repeat rate into three prioritised, testable retention initiatives. The combined medium scenario suggests ~928 extra repeat buyers (+33%), presented as a directional estimate with stated assumptions rather than a forecast.',
    screenshots: [],
    challenges:
      'Handling right-censoring (recent customers have had less time to return) and keeping findings honest: the data shows associations, not causes, so recommendations are framed as experiments to run, with an A/B test design as the next step.',
    learnings: [
      'Choosing the right customer identifier changes every downstream metric',
      'Layered SQL views make a large pipeline easy to validate and debug',
      'Scenario models are most useful when their assumptions are stated openly',
      'Retention work should end in a testable plan, not just a dashboard'
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/thirurishi/repeat-purchase-recovery', variant: 'ghost' }
    ]
  },

  {
    slug: 'fake-news',
    title: 'AI Fake News Detection Platform',
    context: 'Team project',
    description:
      'Full-stack NLP platform that classifies news claims with an LSTM, GRU and TextCNN ensemble, then explains the verdict using live web evidence and a RAG pipeline (FAISS, LangChain, Groq LLM).',
    overview:
      'A team-built fact-checking platform trained on the LIAR dataset. Three deep learning models (LSTM, GRU, TextCNN) each give a probability and verdict, combined into an ensemble prediction. The system then scrapes the web for related content, scores evidence relevance with a BERT classifier, retrieves similar claims from a FAISS vector index, and asks an LLM to write two justifications: one from the dataset context and one from web evidence. Everything is served through a FastAPI backend with JWT authentication, stored in PostgreSQL, and shown in a Streamlit app, all running with Docker Compose.',
    problem:
      'A model that just says "fake" or "true" gives fact-checkers no reason to trust it. The challenge was to make predictions both accurate and explainable.',
    objective:
      'Combine ensemble deep learning with retrieval and web evidence so that every prediction comes with a readable justification and supporting sources.',
    input:
      'LIAR dataset (train/valid/test) of labelled political statements with metadata; user-entered claims at prediction time; web pages retrieved live for evidence.',
    stack: ['Python', 'NLP', 'RAG', 'FastAPI'],
    techStack: ['TensorFlow', 'PyTorch', 'Transformers', 'BERT', 'LangChain', 'FAISS', 'Groq', 'FastAPI', 'PostgreSQL', 'Streamlit', 'Docker'],
    workflow: [
      'Text preprocessing with NLTK; LSTM, GRU and TextCNN trained on the LIAR dataset',
      'Ensemble: each model returns a probability and verdict, combined into a final prediction',
      'Web evidence: BeautifulSoup scraping, LLM summarisation, BERT relevance scoring',
      'RAG: FAISS index of LIAR claims retrieves similar examples as context',
      'LLM (LangChain + Groq) writes two justifications, from dataset context and from web evidence',
      'FastAPI backend with JWT auth; PostgreSQL stores users, predictions, evidence and feedback',
      'Streamlit UI with quick-check and full-input modes, history and user feedback; Docker Compose setup'
    ],
    results:
      'A working end-to-end platform: every prediction shows per-model probabilities, the ensemble verdict, web evidence summaries and two LLM justifications, all stored for traceability.',
    highlights: [
      'Three-model deep learning ensemble (LSTM, GRU, TextCNN)',
      'RAG pipeline with FAISS retrieval and LLM-generated justifications',
      'Live web evidence with BERT relevance scoring',
      'JWT authentication, prediction history and user feedback loop',
      'One-command deployment with Docker Compose'
    ],
    impact:
      'Shows how misinformation detection can be explainable: users see not just a verdict, but the evidence and reasoning behind it, which is what fact-checkers and moderation teams need to trust a model.',
    screenshots: [],
    challenges:
      'Linking several independent parts (three models, a scraper, a vector index, an LLM and a database) into one reliable request flow, and keeping the response useful when web evidence is thin or off-topic.',
    learnings: [
      'Explainability matters as much as accuracy when outputs affect trust',
      'RAG grounds LLM output in real data instead of free generation',
      'Storing every intermediate result makes a complex pipeline debuggable',
      'Clear interfaces between components are what make team work scale'
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/ganpat-patel-012/dsa8-al-s3-25', variant: 'ghost' }
    ]
  },

  {
    slug: 'ai-resume-job-match-analyzer',
    title: 'AI Resume & Job Match Analyzer',
    context: 'Deployed app',
    description:
      'NLP app that scores how well a resume matches a job description, finds missing skills and generates recruiter-style feedback, a cover letter and a LinkedIn message. Deployed on Streamlit Cloud.',
    overview:
      'A complete application with a clean, tested codebase: PDF resume parsing, skill extraction, TF-IDF semantic matching and an explainable weighted ATS score. It generates improvement feedback, ATS-friendly resume bullets, a cover letter and a LinkedIn outreach message, exports a report, and keeps analysis history in SQLite. Everything runs locally with no external API calls, so resumes stay private.',
    problem:
      'Candidates often cannot tell why their resume fails ATS screening. Comparing a resume against a job description by hand is slow and does not show clearly which skills are missing.',
    objective:
      'Give candidates an instant, explainable match score with concrete next steps and ready-to-use application material.',
    input:
      'A text-based PDF resume and a pasted job description.',
    stack: ['Python', 'NLP', 'Streamlit'],
    techStack: ['Python', 'Streamlit', 'FastAPI', 'Scikit-learn', 'TF-IDF', 'PyMuPDF', 'SQLite', 'Pytest'],
    workflow: [
      'PDF parsing with PyMuPDF and text cleaning',
      'Skill extraction: matched and missing skills between resume and job description',
      'Semantic similarity with TF-IDF and cosine similarity',
      'ATS score = 50% skill match + 30% semantic similarity + 20% resume completeness',
      'Feedback, resume bullets, cover letter and LinkedIn message generation',
      'SQLite history with delete support; downloadable report',
      'Unit tests with Pytest; deployed on Streamlit Cloud'
    ],
    results:
      'Analysis in under 5 seconds per resume, with a transparent 0–100 score and clear bands (strong, good, moderate, low match).',
    highlights: [
      'Explainable weighted ATS scoring formula',
      'Skill gap detection with matched and missing skills',
      'Cover letter and LinkedIn message generation',
      'Modular codebase with parser, scoring and generator layers',
      'Unit-tested with Pytest and deployed on Streamlit Cloud'
    ],
    impact:
      'Helps candidates see exactly why their resume does or does not match a role, and what to change, in seconds and without sending personal data to an external service.',
    screenshots: [],
    challenges:
      'Designing a score that is simple enough to explain to users but still meaningful, by combining keyword matching, semantic similarity and section completeness with fixed, documented weights.',
    learnings: [
      'A score is only useful if users can see how it was calculated',
      'Text preprocessing quality drives matching accuracy',
      'A modular structure makes testing and adding features much easier',
      'Running locally is a real feature when users upload personal documents'
    ],
    links: [
      { label: 'Live demo', href: 'https://ai-resume-job-match-analyzer.streamlit.app/', variant: 'default' },
      { label: 'GitHub', href: 'https://github.com/thirurishi/ai-resume-job-match-analyzer', variant: 'ghost' }
    ]
  },

  {
    slug: 'employee-performance',
    title: 'Employee Attrition Prediction: End-to-End ML System',
    context: 'Team project',
    description:
      'Containerised ML system that predicts employee attrition, with Airflow ingestion, Great Expectations data validation, a FastAPI prediction service, a Streamlit app and Grafana monitoring.',
    overview:
      'A team-built system that covers the full ML lifecycle, not just a notebook. CSV files dropped into a folder are picked up by an Airflow DAG, validated with Great Expectations and routed to good or bad data. Valid data goes to PostgreSQL, a Random Forest model serves predictions through FastAPI, a Streamlit app supports single and batch predictions plus history, and Grafana tracks data quality and API metrics. The whole stack runs with Docker Compose.',
    problem:
      'HR teams often decide on retention by gut feeling, with no automated data pipeline or early warning for employees at risk of leaving.',
    objective:
      'Build an automated, monitored pipeline that ingests and validates employee data, serves attrition predictions through an API and makes them easy to use for non-technical users.',
    input:
      'Synthetic employee records with Age, Gender, Job Role, Monthly Income and Job Satisfaction, delivered as CSV files.',
    stack: ['Python', 'Airflow', 'FastAPI', 'Docker'],
    techStack: ['Scikit-learn', 'Apache Airflow', 'Great Expectations', 'FastAPI', 'Streamlit', 'PostgreSQL', 'Grafana', 'Redis', 'Docker Compose'],
    workflow: [
      'Ingestion: Airflow DAG scans the raw data folder every minute',
      'Validation: Great Expectations checks schema, ranges and categories, then routes files to good or bad data',
      'Storage: valid records and validation statistics saved to PostgreSQL',
      'Model: Random Forest classifier with label-encoded features',
      'Serving: FastAPI POST /predict (single and batch) and GET /past-predictions',
      'Frontend: Streamlit app for predictions, CSV upload and history',
      'Monitoring: Grafana dashboards and Microsoft Teams alerts for data quality issues'
    ],
    results:
      'Reported model performance: 85–92% accuracy, 88% precision, 83% recall, F1 0.85 on the synthetic dataset. Full stack starts with a single docker-compose command.',
    highlights: [
      'Automated ingestion and data quality gates with Airflow and Great Expectations',
      'Bad data separated and reported instead of silently entering the model',
      'FastAPI prediction service with single and batch modes',
      'Grafana monitoring and Teams alerting',
      'Seven services orchestrated with Docker Compose'
    ],
    impact:
      'Demonstrates production thinking: validation, monitoring and traceable predictions around the model. Every prediction is logged with its source so results can be audited.',
    screenshots: [],
    challenges:
      'Getting seven services (Airflow, FastAPI, Streamlit, PostgreSQL, Redis, Grafana and the Airflow database) to start in the right order and communicate reliably inside Docker Compose.',
    learnings: [
      'Deployment, validation and monitoring are where ML projects succeed or fail',
      'Data quality checks belong before the model, not after',
      'Containers force clear boundaries between services',
      'Monitoring makes a system trustworthy for non-technical users'
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/navaraja20/Employee-performance-prediction', variant: 'ghost' }
    ]
  },

  {
    slug: 'retail-profitability-analytics',
    title: 'Retail Profitability & Business Intelligence',
    context: 'BI case study',
    description:
      'Power BI solution built on a star-schema data model, DAX measures and four SQL analysis scripts, investigating which products, categories and discount levels drive or destroy profit.',
    overview:
      'A business intelligence project that goes from SQL analysis to a modelled Power BI report. I structured the data as a fact table with four dimensions, wrote six core DAX measures, and built two report pages: an executive overview and a profitability deep dive. SQL results were reconciled against Power BI measures, and data quality, assumptions and limitations are documented in the repository.',
    problem:
      'Strong revenue can hide loss-making products and discount levels. The business needed to see where profit is actually made and lost.',
    objective:
      'Identify the categories, products and discount bands with low or negative profit, and present them in a report that managers can filter and explore themselves.',
    input:
      'Retail order dataset: 10,194 sales rows, 5,111 orders and 38,654 units sold.',
    stack: ['SQL', 'Power BI', 'DAX'],
    techStack: ['SQLite', 'SQL', 'Power Query', 'Power BI', 'DAX', 'Data Modelling'],
    workflow: [
      'SQL analysis: overall KPIs, category profitability, product profitability, discount bands',
      'Power Query: data preparation and transformation',
      'Star schema: FactSales with DimProduct, DimCustomer, DimDate and DimRegion',
      'DAX: Total Revenue, Total Profit, Profit Margin %, Orders, Quantity, Average Order Value',
      'Report: Executive Overview and Profitability Deep Dive pages with slicers and conditional formatting',
      'Validation: SQL results reconciled with Power BI measures; data quality report written'
    ],
    results:
      'Revenue 2.33M, profit 292.3K, profit margin 12.56% across 5,111 orders. Negative-profit products highlighted with conditional formatting, and profitability compared across discount bands.',
    highlights: [
      'Star-schema data model with one fact and four dimension tables',
      'Six core DAX measures',
      'Four SQL scripts answering defined business questions',
      'SQL-to-Power BI reconciliation of all reported KPIs',
      'Documented data model, measures and data quality'
    ],
    impact:
      'Gives managers a self-service view of where profit is lost, down to individual products and discount levels, backed by numbers that reconcile between SQL and Power BI.',
    screenshots: [],
    challenges:
      'Making sure every KPI matched exactly between SQL and DAX, and handling source formatting and currency assumptions honestly in the documentation.',
    learnings: [
      'A good data model makes DAX simpler and reports faster',
      'Reconciling two tools catches errors that one tool alone would hide',
      'Documenting limitations builds trust in the numbers',
      'Discount patterns show associations, not proven causes'
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/thirurishi/retail-profitability-analytics', variant: 'ghost' }
    ]
  },

  {
    slug: 'sales-performance-dashboard',
    title: 'Global Sales Performance Analysis & Executive Dashboard',
    context: 'Analytics case study',
    description:
      'End-to-end retail analytics: Python cleaning and EDA, SQL KPI validation and a two-page Power BI executive dashboard covering ~$2.29M in revenue across 9,994 records.',
    overview:
      'This project follows a real business analytics workflow from raw data to executive reporting. I defined the business questions and KPIs first, cleaned and explored the data in Python, recalculated the KPIs in SQLite to validate the Python results, and built a two-page Power BI dashboard for decision-makers.',
    problem:
      'Stakeholders had no single view of revenue, profit, regional performance or how discounting relates to profitability.',
    objective:
      'Answer five business questions: overall revenue and profit, strongest regions, underperforming categories, the link between discounts and profit, and which customer segments drive revenue.',
    input:
      'Retail sales dataset with 9,994 records covering orders, customers, categories, regions, discounts and profit.',
    stack: ['Python', 'SQL', 'Power BI'],
    techStack: ['Python', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQLite', 'Power BI'],
    workflow: [
      'Business understanding: defined KPIs for revenue, profit, margin, order volume and AOV',
      'Data preparation in pandas: missing values, duplicates, types, dates and engineered features',
      'Exploratory analysis: trends, regions, categories, segments and discount vs profit',
      'SQL in SQLite: KPI calculation and cross-check against Python results',
      'Power BI: Executive Overview and Business Deep Dive pages with slicers'
    ],
    results:
      'Revenue ~$2.29M, profit ~$286K, margin ~12.47%. West is the strongest region, Furniture has strong sales but weak margins, higher discounts are associated with lower profit, and the Consumer segment brings the largest revenue share.',
    highlights: [
      'Two-page executive Power BI dashboard with interactive slicers',
      '9,994 records cleaned and analysed',
      'KPIs validated across Python and SQL',
      'Discount-versus-profit analysis flagged loss-making areas',
      'Clear recommendations for pricing, categories, regions and segments'
    ],
    impact:
      'Delivers an executive-ready view of performance and four concrete recommendations: review aggressive discounting, rework low-margin categories like Furniture, learn from the West region, and use segment data for targeting.',
    screenshots: [],
    challenges:
      'Keeping numbers consistent across Python, SQL and Power BI so the dashboard could be trusted without re-checking.',
    learnings: [
      'Define the business questions and KPIs before touching the data',
      'Validating in a second tool builds trust in the numbers',
      'Dashboard layout decides whether insights actually land',
      'Correlation in business data is a starting point for investigation, not proof'
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/thirurishi/global-sales-performance-analysis', variant: 'ghost' }
    ]
  }
];
