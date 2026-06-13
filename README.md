# 🤖 Customer Review Insight AI

> **AI-Powered Aspect-Based Sentiment Analysis (ABSA) Platform**

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Flask-2.0+-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
  <img src="https://img.shields.io/badge/Hugging%20Face-Transformers-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="Hugging Face" />
  <img src="https://img.shields.io/badge/spaCy-3.0+-09A3D5?style=for-the-badge&logo=spacy&logoColor=white" alt="spaCy" />
  <img src="https://img.shields.io/badge/SQLAlchemy-1.4+-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white" alt="SQLAlchemy" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Project_Status-Production_Ready-success?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/GitHub_Pages-Active-blueviolet?style=flat-square" alt="GH Pages" />
  <img src="https://img.shields.io/badge/Target_Audience-Recruiters_%26_ML_Reviewers-orange?style=flat-square" alt="Target" />
  <img src="https://img.shields.io/badge/Virtual_Internship-Infosys_Springboard-blue?style=flat-square" alt="Infosys Springboard" />
</p>

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [NLP Pipeline Deep Dive](#%EF%B8%8F-nlp-pipeline-deep-dive)
4. [System Architecture](#%EF%B8%8F-system-architecture)
5. [Tech Stack Matrix](#-tech-stack-matrix)
6. [API Endpoints](#-api-endpoints)
7. [Database Schema](#-database-schema)
8. [Folder Structure](#-folder-structure)
9. [Installation & Setup](#-installation--setup)
10. [Usage Workflow](#-usage-workflow)
11. [Screenshots & Gallery](#-screenshots--gallery)
12. [Future Scope](#-future-scope)
13. [License](#-license)
14. [Author & Contact](#-author--contact)
15. [Acknowledgments](#-acknowledgments)

---

## 🔍 Overview

**Customer Review Insight AI** is a professional Aspect-Based Sentiment Analysis (ABSA) platform designed to solve the problem of review scale. Traditional sentiment analysis tools evaluate feedback globally, yielding binary documents classification (e.g. positive/negative) that masks important mixed details: *"The device performance is extremely fast, but the customer support is slow and pricing is high"*.

This platform addresses the gap by integrating **rule-based NLP extraction (spaCy)** to isolate specific aspects from comments, and **deep learning transformers (Hugging Face DistilBERT)** to classify contextual sentiment orientations along with confidence scoring class probabilities. It is optimized for review by technical recruiters and Amazon ML Summer School evaluators as a demonstration of production-grade microservice engineering.

---

## ✨ Key Features

### 👤 User Features
*   **Review Submission**: Paste reviews directly via textarea inputs or upload large CSV spreadsheets.
*   **Aspect-Based Analysis**: Automatically extracts specific features or components of a product and scores their individual sentiments.
*   **Interactive Dashboard**: Provides user metrics, feedback history, and filtering options.
*   **Advanced Filtering**: Filter reviews by category, sentiment orientation, confidence score, and creation date.
*   **Visual Charts**: Renders aspect distribution graphs, trend tracking line-charts, and positive/negative comparisons.
*   **Export Options**: Export datasets to tabular CSVs or generate comprehensive PDF analysis reports.

### 👨‍💼 Admin Features
*   **User Management**: View and audit registered user accounts.
*   **Category Management**: Configure, rename, or structure aspect categories.
*   **Aspect Management**: Define target aspects and keywords to match specific product domains.
*   **System Analytics**: Track activity statistics and processing times across the server.

### 🤖 AI/ML Capabilities
*   **Hybrid Aspect Extraction**: Combines rule-based keyword matching (with fuzzy matching) and dependency parsing (noun phrases and adjectives).
*   **Transformer Classifier**: fine-tuned DistilBERT contextual model with softmax probability confidence scoring (0.0 to 1.0).
*   **Softener Detection**: Adjusts sentiment weight based on structural softeners (e.g., *"a bit"* or *"slightly"*).

---

## ⚙️ NLP Pipeline Deep Dive

The platform processes raw feedback reviews step-by-step:

```
[Raw Review Input] ──> [Text Preprocessing] ──> [spaCy POS & Dependency Parsing]
                                                              │
                                                              ▼
[Dashboard Insights] <── [Database Storage] <── [Hugging Face Sentiment Classification]
```

<details>
<summary><b>🛠️ Step 1: Text Preprocessing & Cleaning</b></summary>

*   **Noise Filtering**: Trims whitespace and removes invalid characters.
*   **Tokenization**: Segmenting sentences into individual semantic units.
*   **Lemmatization**: Normalizing words to their dictionary form (e.g. *"reviews"* to *"review"*).
</details>

<details>
<summary><b>💫 Step 2: spaCy Linguistic Annotation</b></summary>

*   **Part-of-Speech (POS) Tagging**: Isolates nouns, noun chunks, and adjectives.
*   **Dependency Parsing**: Analyzes grammatical structures to link descriptive adjectives (modifiers) to their target nouns (aspects).
*   **Fuzzy Matching**: Matches candidate nouns against admin-defined category keywords, allowing for minor spelling variations.
</details>

<details>
<summary><b>🤗 Step 3: Transformer Sentiment Analysis</b></summary>

*   **Contextual Embeddings**: Feeds aspect terms and their surrounding context window into a pre-trained DistilBERT model.
*   **Logit Evaluation**: Computes classification tensors for Positive, Negative, and Neutral labels.
*   **Softmax Probability Output**: Computes a normalized class probability distribution. The highest score represents the predicted sentiment's **confidence score**.
</details>

---

## 🏗️ System Architecture

The project implements a classic Model-View-Controller (MVC) architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│              User Dashboard | Admin Panel                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Flask Server (app.py)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Routes     │  │  Templates   │  │   Static     │  │
│  │   (Views)    │  │   (Jinja2)   │  │  (CSS/JS)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────┬────────────────────────────────┬───────────┘
             │                                │
             ▼                                ▼
┌────────────────────────┐      ┌────────────────────────┐
│   Database Layer       │      │     NLP Engine         │
│  ┌──────────────────┐  │      │  ┌──────────────────┐  │
│  │ Users            │  │      │  │ spaCy (Aspect    │  │
│  │ RawTexts         │  │      │  │  Extraction)     │  │
│  │ AspectSentiments │  │      │  ├──────────────────┤  │
│  │ Categories       │  │      │  │ Transformers     │  │
│  │ Aspects          │  │      │  │ (Sentiment       │  │
│  │ Admin Accounts   │  │      │  │  Analysis)       │  │
│  └──────────────────┘  │      │  └──────────────────┘  │
└────────────────────────┘      └────────────────────────┘
```

*   **View Layer (Jinja2 Templates)**: Renders HTML pages with custom styles and Bootstrap components.
*   **Controller Layer (Flask Routes)**: Manages route requests, file validations, session middleware, and authentication.
*   **Database Model (SQLAlchemy ORM)**: Integrates SQL-injection safe CRUD queries, storing user metadata and parsed records.

---

## 🛠️ Tech Stack Matrix

| Technology | Layer | Role |
| :--- | :--- | :--- |
| **Python** | Backend | Core application runtime and machine learning pipelines |
| **Flask** | Web Server | Micro-framework handling HTTP routing, session state, and API endpoints |
| **spaCy** | NLP Parsing | Industrial linguistics parser used for tokenization and POS extraction |
| **Hugging Face** | ML Inference | BERT/DistilBERT models evaluating aspect sentiment contexts |
| **SQLAlchemy** | Database ORM | Object relational mapping for MySQL/SQLite relational databases |
| **MySQL / SQLite** | Database | Storage tables for user accounts, uploads metadata, and text analysis |
| **Jinja2** | Template Engine | Dynamic server-side HTML rendering |
| **ReportLab** | Reports | Backend PDF generation engine compiling aspect sentiment charts |
| **HTML5 / CSS3 / JS** | Frontend | Responsive interfaces, glassmorphism designs, and dashboard previews |

---

## 🔌 API Endpoints

### User & Authentication Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/` | Redirects to Register / Login interfaces |
| GET/POST | `/register` | Handles user registration inputs |
| GET/POST | `/login-page` | Renders user login portal |
| GET/POST | `/auth/register` | Endpoint creating new database users |
| GET/POST | `/auth/login` | Endpoint verifying credentials and initializing session |
| GET | `/home` | User dashboard homepage and file/text uploads |
| GET | `/logout` | Clears sessions and redirects to login |
| GET | `/profile` | Displays history of uploads and raw text pastings |
| POST | `/delete_file/<id>` | Deletes uploaded CSV files |
| POST | `/delete_raw_text/<id>` | Deletes individual raw text review entries |
| GET/POST | `/edit_raw_text/<id>` | Modifies saved raw text inputs |
| POST | `/edit_file/<id>` | Renames saved dataset filenames |

### Analysis & Admin Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET/POST | `/admin/login` | Renders admin portal login |
| GET | `/admin/logout` | Clears admin credentials |
| GET | `/admin/home` | Admin metrics dashboard homepage |
| GET | `/admin/users` | Lists and audits registered users |
| GET/POST | `/admin/aspect_categories` | Manage aspect classes and associated keywords |
| GET | `/export-csv` | Generates tabular analysis outputs as CSV downloads |
| GET | `/export-pdf` | Generates structured PDF report downloads containing charts |

---

## 🗄️ Database Schema

The platform maps data relations via the following tables:
*   **User**: Handles user account details (ID, Email, Username, Hashed Password).
*   **RawText**: Stores pasted reviews (Content, User ID relation).
*   **UploadedFile**: Tracks uploaded dataset metadata (Filename, User ID relation).
*   **Category**: Group aspects into custom feature pools (e.g. *Electronics*, *Food*).
*   **Aspect**: Predefined aspect targets under categories (e.g. *Battery*, *Price*).
*   **AspectKeyword**: Keyword dictionary used for rule-based aspect matching.
*   **AspectSentiment**: Records predicted sentiments matched with aspects, confidence scores, and raw review sources.
*   **Admin**: Store independent credentials for dashboard system administration.

---

## 📂 Folder Structure

```
Customer-Review-Insight-AI/
├── customer_review/          # Flask Backend Application
│   ├── static/               # CSS Stylesheets
│   │   ├── login.css
│   │   ├── profile.css
│   │   ├── register.css
│   │   └── style.css
│   ├── templates/            # HTML views (Jinja2 Templates)
│   │   ├── edit_raw_text.html
│   │   ├── home.html
│   │   ├── login.html
│   │   ├── profile.html
│   │   └── register.html
│   ├── uploads/              # Uploaded CSV files
│   ├── app.py                # Main Web App & Models
│   ├── s.py                  # Helper Script (Secret Key Gen)
│   └── .gitignore            # Git exclusions
├── docs/                     # GitHub Pages Portfolio Showcase
│   ├── index.html            # Landing Page View
│   ├── style.css             # Landing Page CSS
│   └── script.js             # Landing Page JavaScript
├── README.md                 # Project Documentation
└── LICENSE                   # MIT License Info
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/monishav24/Customer-Review-Insight-AI.git
cd Customer-Review-Insight-AI
```

### 2. Configure Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies & NLP Models
```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```
*(Ensure `requirements.txt` includes: `Flask`, `Flask-SQLAlchemy`, `PyMySQL`, `cryptography`, `spacy`, `transformers`, `torch`, `python-dotenv`, `PyJWT`, `pandas`, `reportlab`, `matplotlib`).*

### 4. Setup Environment Config
Create a `.env` file inside the `customer_review/` folder:
```env
SECRET_KEY=yoursecretkeyhere
DATABASE_URL=mysql+pymysql://db_user:db_password@localhost:3306/db_name
```
*(If you want to use SQLite instead of MySQL, you can configure your connection string accordingly, e.g. `sqlite:///instance/reviews.db`).*

### 5. Setup Relational Database & Run App
Create your database schema using MySQL Shell or PHPMyAdmin:
```sql
CREATE DATABASE db_name;
```
Run the application server:
```bash
cd customer_review
python app.py
```
*(On launch, SQLAlchemy automatically initializes tables in the specified database schema).*

---

## 📈 Usage Workflow

### For Users
1.  **Register & Authenticate**: Create an account and log in. Session states keep you logged in.
2.  **Ingest Reviews**: Click **Upload Review Dataset (CSV)** to batch process feedback spreadsheets, or paste individual sentences inside **Or Paste Raw Review Text**.
3.  **Audit Data history**: Go to **Profile** to view files and texts, edit text content, or rename files.

### For Admins
1.  **Access Portal**: Go to `/admin/login` and log in with your admin credentials.
2.  **Define Aspects**: Configure categories (e.g. *Performance*) and assign key terms (*CPU*, *latency*, *RAM*).
3.  **Track Metrics**: Track feedback volume, negative review ratios, and system latency.

---

## 🖼️ Screenshots & Gallery

The portfolio landing page showcases:
*   **Live Dashboard Analytics**: Multi-aspect frequency distributions and positive/negative sentiment metrics.
*   **Linguistic Parsing**: spaCy annotation tracing noun components.
*   **PDF Exports**: Styled report outputs summarizing model confidence distributions.

*(Enable **GitHub Pages** targeting the `/docs` folder on the `main` branch to view the live portfolio page).*

---

## 🔮 Future Scope

- [ ] **Multi-Language Models**: Integrate multilingual tokenizer pipelines (e.g. XLM-RoBERTa).
- [ ] **Real-Time Streaming**: Incorporate WebSocket streaming to ingest live review APIs (Google Maps, Yelp).
- [ ] **LLM Summarization**: Use local LLMs to generate text-based executive summaries of sentiment reports.
- [ ] **RAG pipeline**: Vectorize historical reviews using pgvector to answer semantic queries about customer opinion trends.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.

---

## 👤 Author & Contact

*   **GitHub**: [@monishav24](https://github.com/monishav24)
*   **Email**: mv240@example.com
*   **Portfolio Showcase**: [Customer-Review-Insight-AI Portfolio](https://monishav24.github.io/Customer-Review-Insight-AI/)

---

## 🙏 Acknowledgments

*   **Infosys Springboard** for the Virtual Internship 6.0 opportunity.
*   **Hugging Face** for supplying accessible pre-trained transformer checkpoints.
*   **spaCy** team for industrial-grade NLP libraries.
